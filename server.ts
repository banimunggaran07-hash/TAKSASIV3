import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import * as xlsx from 'xlsx';
import { getInitialSeedData } from './seed_data.ts';
import {
  seedInitialDataIfEmpty,
  listEntity,
  getEntityById,
  createEntityRecord,
  updateEntityRecord,
  deleteEntityRecord,
  bulkInsertEntityRecords
} from './src/db/repo.ts';
import { optionalAuth, requireAuth, activeSessions } from './src/middleware/auth.ts';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rewrite /apps/* and /app-logs/* to /api/* so client calls without /api prefix route cleanly
app.use((req, _res, next) => {
  if (req.url.startsWith('/apps/') || req.url.startsWith('/app-logs/')) {
    req.url = '/api' + req.url;
  }
  next();
});

// Local in-memory fallback store
const STORE_FILE = path.join(process.cwd(), 'data_store.json');
let fallbackStore: Record<string, any[]> = {};

function initFallbackStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      fallbackStore = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
      return;
    }
  } catch (err) {
    console.warn('Fallback store read warning:', err);
  }
  fallbackStore = getInitialSeedData();
}

initFallbackStore();

function getFallback(entity: string): any[] {
  if (!fallbackStore[entity]) fallbackStore[entity] = [];
  return fallbackStore[entity];
}

function persistFallbackStore() {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(fallbackStore, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn('Persist fallback store error:', err.message);
  }
}

// Initial seed trigger for Cloud SQL
seedInitialDataIfEmpty().catch(err => {
  console.warn('Cloud SQL initial check notice:', err.message);
});

const upload = multer({ storage: multer.memoryStorage() });

// Health check
app.get(['/health', '/api/health'], (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Smart taksasi V2.1.3',
    server_mode: 'Standalone Independent Server (Dedicated Self-Hosted Node.js / Express Engine)',
    database: 'Cloud SQL PostgreSQL & Firebase Firestore',
    firebase: {
      projectId: 'eng-object-1n2tx',
      firestoreDatabaseId: 'ai-studio-baniinthehouse-f0e85c23-a555-41f7-822f-df7af6af7cb8',
      region: 'asia-southeast1'
    },
    timestamp: new Date().toISOString()
  });
});

// Current user profile
const currentUser = {
  id: 'user_bani',
  name: 'Bani Munggaran',
  full_name: 'Bani Munggaran',
  email: 'bani.munggaran07@gmail.com',
  role: 'admin',
  cabang: 'Cabang Jakarta Pusat',
  phone: '081234567890',
  created_at: '2026-01-01T00:00:00.000Z'
};

// Endpoint registrasi session aktif dari client Firebase Auth
app.post('/api/auth/session', (req: any, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  const token = authHeader.split('Bearer ')[1];
  const { uid, email, displayName, photoURL } = req.body;
  if (!uid || !email) {
    return res.status(400).json({ error: 'Missing required user parameters' });
  }

  const sessionUser = {
    uid,
    id: uid,
    email,
    name: displayName || email.split('@')[0],
    role: 'admin',
    cabang: 'Cabang Jakarta Pusat',
    phone: '081234567890',
    photoURL: photoURL || null,
    created_at: new Date().toISOString()
  };

  activeSessions.set(token, sessionUser);
  res.json({ success: true, user: sessionUser });
});

// Public settings endpoint
app.get('/api/apps/public/prod/public-settings/by-id/:appId', (req, res) => {
  res.json({
    id: req.params.appId,
    name: 'Smart taksasi V2.1.3',
    app_id: req.params.appId,
    public: true,
    auth_required: false,
    theme: {
      primary: '#0ea5e9'
    }
  });
});

// Direct APK Download routes (with self-healing auto-unpack)
app.get(['/download-apk', '/SmartTaksasi.apk', '/base.apk'], (_req, res) => {
  const apkPath = path.join(process.cwd(), 'public', 'SmartTaksasi.apk');
  if (!fs.existsSync(apkPath)) {
    const baseZip = path.join(process.cwd(), 'SMART_TAKSASI_BASE_APK.zip');
    if (fs.existsSync(baseZip)) {
      try {
        const { execSync } = require('child_process');
        execSync('python3 -c "import zipfile, shutil; z=zipfile.ZipFile(\'SMART_TAKSASI_BASE_APK.zip\'); z.extract(\'base.apk\', \'public\'); shutil.copyfile(\'public/base.apk\', \'public/SmartTaksasi.apk\')"');
      } catch (err: any) {
        console.warn('Auto-unpack APK notice:', err.message);
      }
    }
  }

  if (fs.existsSync(apkPath)) {
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="SmartTaksasi-v2.1.3.apk"');
    res.sendFile(apkPath);
  } else {
    res.status(404).send('File APK tidak ditemukan');
  }
});

// Update user profile & preferences endpoint
app.post('/api/user/profile', optionalAuth, (req: any, res) => {
  const { name, photo_url, preferences } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null;

  if (token && activeSessions.has(token)) {
    const sess = activeSessions.get(token);
    if (name) sess.name = name;
    if (photo_url) sess.photoURL = photo_url;
    activeSessions.set(token, sess);
  }

  if (name) currentUser.name = name;
  if (photo_url) (currentUser as any).photo_url = photo_url;

  res.json({
    success: true,
    user: {
      ...currentUser,
      name: name || currentUser.name,
      photo_url: photo_url || (currentUser as any).photo_url
    },
    preferences: preferences || {}
  });
});

// User auth me endpoints (with safe fallback to avoid unhandled 401 runtime error)
app.get(['/api/apps/:appId/users/me', '/api/users/me'], optionalAuth, (req: any, res) => {
  if (req.user) {
    res.json({
      ...currentUser,
      id: req.user.uid || req.user.id || currentUser.id,
      email: req.user.email || currentUser.email,
      name: req.user.name || (req.user.email ? req.user.email.split('@')[0] : currentUser.name),
      photo_url: req.user.photoURL || (currentUser as any).photo_url || null
    });
  } else {
    res.json({
      ...currentUser,
      is_guest: true
    });
  }
});

app.get(['/api/apps/:appId/entities/User/me', '/api/entities/User/me'], optionalAuth, (req: any, res) => {
  if (req.user) {
    res.json({
      ...currentUser,
      id: req.user.uid || req.user.id || currentUser.id,
      email: req.user.email || currentUser.email,
      name: req.user.name || (req.user.email ? req.user.email.split('@')[0] : currentUser.name),
      photo_url: req.user.photoURL || (currentUser as any).photo_url || null
    });
  } else {
    res.json({
      ...currentUser,
      is_guest: true
    });
  }
});

// Analytics tracking
app.post(['/api/apps/:appId/analytics/track/batch', '/api/analytics/track/batch'], (_req, res) => {
  res.json({ success: true, count: 1 });
});

// MCP Consent & Authorization stubs
app.all(['/api/apps/:appId/mcp/consent-info', '/api/mcp/consent-info'], (_req, res) => {
  res.json({ success: true, authorized: true, consent: true });
});

app.all(['/api/apps/:appId/mcp/authorize-grant', '/api/mcp/authorize-grant'], (_req, res) => {
  res.json({ success: true, authorized: true, grant: 'approved' });
});

// Logout endpoints
app.all(['/api/apps/auth/logout', '/api/apps/:appId/auth/logout', '/api/auth/logout'], (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Users listing
app.get(['/api/apps/:appId/users', '/api/users'], optionalAuth, async (_req, res) => {
  try {
    const list = await listEntity('User');
    res.json(list.length > 0 ? list : getFallback('User'));
  } catch {
    res.json(getFallback('User'));
  }
});

// Invite user
app.post(['/api/apps/:appId/runtime/users/invite-user', '/api/runtime/users/invite-user', '/api/users/invite'], optionalAuth, async (req, res) => {
  const { user_email, role } = req.body;
  const newUser = {
    id: `user_${Date.now()}`,
    name: (user_email || 'Marketing Staff').split('@')[0],
    full_name: (user_email || 'Marketing Staff').split('@')[0],
    email: user_email,
    role: role || 'marketing',
    cabang: 'Cabang Jakarta Pusat',
    phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
    created_at: new Date().toISOString()
  };
  try {
    await createEntityRecord('User', newUser);
  } catch {
    getFallback('User').push(newUser);
  }
  res.json({ success: true, user: newUser });
});

// Entity list
app.get(['/api/apps/:appId/entities/:entity', '/api/entities/:entity'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  try {
    const rows = await listEntity(entityName, req.query);
    if (Array.isArray(rows) && rows.length > 0) {
      return res.json(rows);
    }
  } catch (err: any) {
    console.warn(`[Cloud SQL] ${entityName} read query fallback:`, err.message);
  }
  const fallback = getFallback(entityName);
  if (req.query.q) {
    try {
      const q = typeof req.query.q === 'string' ? JSON.parse(req.query.q as string) : req.query.q;
      if (q && typeof q === 'object') {
        const filtered = fallback.filter((item: any) => {
          for (const [k, v] of Object.entries(q)) {
            if (v !== undefined && v !== null && v !== '') {
              if (String(item[k] || '').toLowerCase() !== String(v).toLowerCase()) return false;
            }
          }
          return true;
        });
        return res.json(filtered);
      }
    } catch {}
  }
  res.json(Array.isArray(fallback) ? fallback : []);
});

// Entity list v2
app.get(['/api/apps/:appId/entities/:entity/v2/list', '/api/entities/:entity/v2/list'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  try {
    const rows = await listEntity(entityName, req.query);
    if (Array.isArray(rows) && rows.length > 0) {
      return res.json(rows);
    }
  } catch (err: any) {
    console.warn(`[Cloud SQL] ${entityName} v2/list fallback:`, err.message);
  }
  const fallback = getFallback(entityName);
  res.json(Array.isArray(fallback) ? fallback : []);
});

// Entity count
app.get(['/api/apps/:appId/entities/:entity/count', '/api/entities/:entity/count'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  try {
    const rows = await listEntity(entityName, req.query);
    if (Array.isArray(rows) && rows.length > 0) {
      return res.json({ count: rows.length });
    }
    return res.json({ count: getFallback(entityName).length });
  } catch {
    return res.json({ count: getFallback(entityName).length });
  }
});

// Single entity get
app.get(['/api/apps/:appId/entities/:entity/:id', '/api/entities/:entity/:id'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  const id = String(req.params.id);
  try {
    const item = await getEntityById(entityName, id);
    if (item) return res.json(item);
  } catch {}
  const fallbackItem = getFallback(entityName).find(x => String(x.id) === id);
  if (fallbackItem) return res.json(fallbackItem);
  res.status(404).json({ error: 'Record not found' });
});

// Create entity
app.post(['/api/apps/:appId/entities/:entity', '/api/entities/:entity'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  try {
    const created = await createEntityRecord(entityName, req.body);
    getFallback(entityName).unshift(created);
    persistFallbackStore();
    return res.status(201).json(created);
  } catch (err: any) {
    console.warn(`[Cloud SQL] Fallback for create ${entityName}:`, err.message);
    const item = {
      ...req.body,
      id: req.body.id || `${entityName.toLowerCase()}_${Date.now()}`,
      created_date: req.body.created_date || new Date().toISOString()
    };
    getFallback(entityName).unshift(item);
    persistFallbackStore();
    return res.status(201).json(item);
  }
});

// Bulk create & batch alias
app.post(['/api/apps/:appId/entities/:entity/bulk', '/api/apps/:appId/entities/:entity/batch', '/api/entities/:entity/bulk', '/api/entities/:entity/batch'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  const records = Array.isArray(req.body) ? req.body : req.body.records || [];
  try {
    const created = await bulkInsertEntityRecords(entityName, records);
    getFallback(entityName).unshift(...created);
    persistFallbackStore();
    return res.status(201).json(created);
  } catch (err: any) {
    console.warn(`[Cloud SQL] Fallback for bulk ${entityName}:`, err.message);
    const created = records.map((r: any, idx: number) => ({
      ...r,
      id: r.id || `${entityName.toLowerCase()}_${Date.now()}_${idx}`,
      created_date: r.created_date || new Date().toISOString()
    }));
    getFallback(entityName).unshift(...created);
    persistFallbackStore();
    return res.status(201).json(created);
  }
});

// Upsert
app.post(['/api/apps/:appId/entities/:entity/upsert', '/api/entities/:entity/upsert'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  const { records = [], key = 'id' } = req.body;
  try {
    for (const rec of records) {
      if (rec[key]) {
        const existing = await getEntityById(entityName, String(rec[key]));
        if (existing) {
          await updateEntityRecord(entityName, String(rec[key]), rec);
        } else {
          await createEntityRecord(entityName, rec);
        }
      } else {
        await createEntityRecord(entityName, rec);
      }
    }
    persistFallbackStore();
    return res.json(records);
  } catch {
    const collection = getFallback(entityName);
    for (const rec of records) {
      const idx = collection.findIndex(x => String(x[key]) === String(rec[key]));
      if (idx >= 0) collection[idx] = { ...collection[idx], ...rec };
      else collection.unshift(rec);
    }
    persistFallbackStore();
    return res.json(records);
  }
});

// Delete multiple / clear entity
app.post(['/api/apps/:appId/entities/:entity/delete-many', '/api/entities/:entity/delete-many'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  const { ids } = req.body;
  const collection = getFallback(entityName);
  if (Array.isArray(ids) && ids.length > 0) {
    const set = new Set(ids.map(String));
    const remaining = collection.filter(item => !set.has(String(item.id)));
    fallbackStore[entityName] = remaining;
  } else {
    // Clear all
    fallbackStore[entityName] = [];
  }
  persistFallbackStore();
  res.json({ success: true, count: fallbackStore[entityName].length });
});

// Update single entity
app.put(['/api/apps/:appId/entities/:entity/:id', '/api/entities/:entity/:id'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  const id = String(req.params.id);
  try {
    const updated = await updateEntityRecord(entityName, id, req.body);
    return res.json(updated);
  } catch {
    const collection = getFallback(entityName);
    const idx = collection.findIndex(x => String(x.id) === id);
    if (idx >= 0) {
      collection[idx] = { ...collection[idx], ...req.body };
      persistFallbackStore();
      return res.json(collection[idx]);
    }
    return res.status(404).json({ error: 'Record not found' });
  }
});

// Delete single entity
app.delete(['/api/apps/:appId/entities/:entity/:id', '/api/entities/:entity/:id'], optionalAuth, async (req, res) => {
  const entityName = String(req.params.entity);
  const id = String(req.params.id);
  try {
    await deleteEntityRecord(entityName, id);
  } catch {}
  const collection = getFallback(entityName);
  const idx = collection.findIndex(x => String(x.id) === id);
  if (idx >= 0) {
    collection.splice(idx, 1);
    persistFallbackStore();
  }
  res.json({ success: true, id });
});

// Import file (Excel/CSV)
app.post(['/api/apps/:appId/entities/:entity/import', '/api/entities/:entity/import'], upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];
    const rows = xlsx.utils.sheet_to_json<any>(sheet);

    const entityName = String(req.params.entity);
    try {
      const created = await bulkInsertEntityRecords(entityName, rows);
      getFallback(entityName).unshift(...created);
      persistFallbackStore();
      return res.json({ success: true, count: created.length, records: created });
    } catch {
      const addedRows = rows.map((r, i) => ({
        ...r,
        id: `${entityName.toLowerCase()}_${Date.now()}_${i}`,
        created_date: new Date().toISOString()
      }));
      getFallback(entityName).unshift(...addedRows);
      persistFallbackStore();
      return res.json({ success: true, count: addedRows.length, records: addedRows });
    }
  } catch (err: any) {
    console.error('Import error:', err);
    res.status(500).json({ error: err.message || 'Import processing failed' });
  }
});

// Server-side Multi-Sheet Excel Inspection endpoint
app.post('/api/excel/inspect', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File Excel tidak ditemukan' });
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetDetails = workbook.SheetNames.map(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json<any>(sheet, { header: 1, blankrows: false });
      const headers = rows.length > 0 && Array.isArray(rows[0]) ? rows[0].map(String) : [];
      const dataRows = rows.slice(1).filter(r => Array.isArray(r) && r.some(cell => cell !== null && cell !== undefined && cell !== ''));
      const sample = dataRows.slice(0, 10).map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((h, idx) => {
          obj[h || `Col_${idx + 1}`] = row[idx] ?? '';
        });
        return obj;
      });

      // Suggest entity based on sheet name and headers
      const lower = sheetName.toLowerCase();
      let suggested = 'OtrPrice';
      if (lower.includes('clop')) suggested = 'ClopContract';
      else if (lower.includes('bq') || lower.includes('booking')) suggested = 'BookingQuality';
      else if (lower.includes('gform') || lower.includes('follow') || lower.includes('bahan')) suggested = 'FollowUpBahan';
      else if (lower.includes('price') || lower.includes('angsuran')) suggested = 'PriceList';
      else if (lower.includes('prospek') || lower.includes('lead')) suggested = 'Prospect';

      return {
        name: sheetName,
        rowCount: dataRows.length,
        headers,
        sampleRows: sample,
        suggestedEntity: suggested
      };
    });

    res.json({
      success: true,
      fileName: req.file.originalname,
      sheetCount: workbook.SheetNames.length,
      sheets: sheetDetails
    });
  } catch (err: any) {
    console.error('Excel inspection error:', err);
    res.status(500).json({ error: err.message || 'Gagal membaca struktur Excel' });
  }
});

// Zip backup download endpoints (packaged system & data)
app.get(['/api/download/backup-zip', '/api/download/zip', '/download-zip'], (_req, res) => {
  const zipPath = path.join(process.cwd(), 'smart-taksasi-complete.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="smart-taksasi-complete.zip"');
    fs.createReadStream(zipPath).pipe(res);
  } else {
    res.status(404).json({ error: 'Zip file not found' });
  }
});

// App logs endpoints (activity log viewer support)
app.get(['/api/app-logs/:appId', '/app-logs/:appId'], optionalAuth, async (_req, res) => {
  try {
    const logs = await listEntity('ActivityLog');
    if (logs && logs.length > 0) return res.json(logs);
  } catch {}
  res.json(getFallback('ActivityLog'));
});

app.get(['/api/app-logs/:appId/stats', '/app-logs/:appId/stats'], (_req, res) => {
  const count = getFallback('ActivityLog').length;
  res.json({ total: count, count });
});

app.post(['/api/app-logs/:appId/log-user-in-app/:userId', '/app-logs/:appId/log-user-in-app/:userId'], (_req, res) => {
  res.json({ success: true });
});

// Socket.io / Engine.io polling fallback
app.all(['/ws-user-apps/socket.io/*', '/socket.io/*'], (_req, res) => {
  const sid = 'sess_' + Date.now();
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  res.send(`0{"sid":"${sid}","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000}`);
});

// Serve static assets from public/ directory
const publicDir = path.join(process.cwd(), 'public');
app.use(express.static(publicDir));

// Fallback to index.html for SPA client-side routes (never return HTML for API calls)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/apps/') || req.path.startsWith('/app-logs/')) {
    return res.status(404).json({ error: 'Endpoint not found', path: req.path });
  }
  const indexHtml = path.join(process.cwd(), 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.status(404).send('Not Found');
  }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  const sid = 'sess_' + Date.now();
  // Engine.io open packet
  ws.send(`0{"sid":"${sid}","upgrades":[],"pingInterval":25000,"pingTimeout":20000}`);

  ws.on('message', (data) => {
    const msg = data.toString();
    if (msg === '2') {
      ws.send('3'); // Engine.io pong
    } else if (msg.startsWith('40')) {
      ws.send(`40{"sid":"${sid}"}`); // Socket.io connected
    }
  });

  ws.on('error', () => {});
});

server.listen(PORT, HOST, () => {
  console.log(`[Smart taksasi V2.1.3] Server running on http://${HOST}:${PORT} with Cloud SQL PostgreSQL and WebSocket support`);
});
