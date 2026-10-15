import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { openMasterImportHub } from './master-import-hub';

// Initialize Firebase client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Ensure local persistence default
try {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
} catch {
  // Ignore fallback
}

type AuthMode = 'login' | 'register';

let currentMode: AuthMode = 'login';
let isSubmitting = false;
let currentUserInstance: User | null = null;
let activeCameraStream: MediaStream | null = null;

// Human-friendly error translation in Indonesian
function getErrorMessage(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
      return 'Akun dengan email ini belum terdaftar. Silakan pilih Daftar Akun.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau kata sandi yang Anda masukkan salah.';
    case 'auth/email-already-in-use':
      return 'Alamat email ini sudah terdaftar. Silakan pilih Masuk ke Akun.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu pendek. Masukkan minimal 6 karakter.';
    case 'auth/invalid-email':
      return 'Format alamat email tidak valid.';
    case 'auth/popup-closed-by-user':
      return 'Jendela masuk Google ditutup sebelum proses selesai.';
    case 'auth/popup-blocked':
      return 'Jendela popup Google diblokir browser. Izinkan popup untuk melanjutkan.';
    case 'auth/network-request-failed':
      return 'Gagal terhubung ke jaringan. Periksa sambungan internet Anda.';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat lagi.';
    case 'auth/operation-not-allowed':
      return 'Metode autentikasi ini sedang dinonaktifkan di Firebase Console. Gunakan Masuk dengan Google.';
    default:
      return error?.message || 'Terjadi kesalahan saat autentikasi. Silakan coba lagi.';
  }
}

// Notify backend about active user session
async function syncSessionWithBackend(token: string, user: User) {
  try {
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'User Taksasi'),
        photoURL: user.photoURL || null
      })
    });
  } catch (err) {
    console.warn('Session sync warning (non-blocking):', err);
  }
}

// Manage user state in localStorage for app compatibility (independent server)
function purgeLegacyStorage() {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = (localStorage.key(i) || '').toLowerCase();
      if (k.startsWith('base') && k.includes('44')) {
        localStorage.removeItem(localStorage.key(i) || '');
      }
    }
  } catch (_) {}
}

function setAppSession(token: string, user: User) {
  localStorage.setItem('smart_access_token', token);
  localStorage.setItem('auth_token', token);
  localStorage.setItem('token', token);
  purgeLegacyStorage();
  localStorage.setItem(
    'smart_taksasi_user',
    JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'User Taksasi'),
      photoURL: user.photoURL || null
    })
  );
}

function clearAppSession() {
  localStorage.removeItem('smart_access_token');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('token');
  purgeLegacyStorage();
  localStorage.removeItem('smart_taksasi_user');
}


// Helper to download files directly via Blob without leaving the page or triggering auth redirects
export function downloadFileViaBlob(url: string, filename: string, btnElement?: HTMLElement | null) {
  const originalHtml = btnElement ? btnElement.innerHTML : '';
  if (btnElement) {
    btnElement.innerHTML = `
      <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Mengunduh...</span>
    `;
  }

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.blob();
    })
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
      if (btnElement) {
        btnElement.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Tersimpan!</span>
        `;
        setTimeout(() => {
          if (btnElement) btnElement.innerHTML = originalHtml;
        }, 2500);
      }
    })
    .catch(err => {
      console.warn('Direct blob fetch notice:', err);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (btnElement) btnElement.innerHTML = originalHtml;
    });
}

// Render or remove the Topbar User Status Bar
function renderUserBar(user: User) {
  currentUserInstance = user;
  let bar = document.getElementById('smart-taksasi-user-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'smart-taksasi-user-bar';
    bar.className =
      'fixed top-3 right-3 sm:top-4 sm:right-5 z-[9990] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1629]/95 border border-cyan-500/30 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300';
    document.body.appendChild(bar);
  }

  const name = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
  const email = user.email || '';
  const initial = (name.charAt(0) || 'U').toUpperCase();

  const avatarHtml = user.photoURL
    ? `<img src="${user.photoURL}" alt="${name}" class="w-7 h-7 rounded-full object-cover border border-cyan-400/50 shadow-sm" />`
    : `<div class="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white font-bold text-xs flex items-center justify-center border border-cyan-300/40">${initial}</div>`;

  bar.innerHTML = `
    <button id="btn-topbar-download-apk" type="button" class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.35)] transition-all cursor-pointer" title="Unduh File Aplikasi Android (.apk)">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Unduh APK</span>
    </button>
    <div class="h-4 w-px bg-slate-700/80"></div>
    <button id="btn-smart-profile" type="button" class="flex items-center gap-2 pr-2 text-left hover:opacity-90 active:scale-95 transition-all max-w-[170px] sm:max-w-[220px] cursor-pointer" title="Buka Profil & Pengaturan Sesi">
      ${avatarHtml}
      <div class="flex flex-col min-w-0">
        <span class="text-xs font-semibold text-slate-100 truncate leading-tight">${name}</span>
        <span class="text-[10px] text-cyan-400 truncate leading-tight">${email}</span>
      </div>
    </button>
    <div class="h-4 w-px bg-slate-700/80"></div>
    <button id="btn-smart-logout" class="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/25 active:scale-95 border border-rose-500/30 transition-all cursor-pointer" title="Keluar dari akun">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span class="hidden sm:inline">Keluar</span>
    </button>
  `;

  const topbarApkBtn = document.getElementById('btn-topbar-download-apk');
  if (topbarApkBtn) {
    topbarApkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadFileViaBlob('/SmartTaksasi.apk', 'SmartTaksasi-v2.1.3.apk', topbarApkBtn);
    });
  }



  // Profile modal click
  const profileBtn = document.getElementById('btn-smart-profile');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      openUserProfileModal(user);
    });
  }

  // Logout click
  const logoutBtn = document.getElementById('btn-smart-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm(`Yakin ingin keluar dari akun ${name}?`)) {
        try {
          await signOut(auth);
          clearAppSession();
          await fetch('/api/apps/auth/logout', { method: 'POST' }).catch(() => {});
          window.location.reload();
        } catch (err) {
          console.warn('Logout notice:', err);
          window.location.reload();
        }
      }
    });
  }
}

function removeUserBar() {
  const bar = document.getElementById('smart-taksasi-user-bar');
  if (bar) bar.remove();
}

// Show/Hide Root Container
function setAppAccessGranted(granted: boolean) {
  const root = document.getElementById('root');
  if (root) {
    if (granted) {
      root.style.removeProperty('display');
      root.style.removeProperty('opacity');
      root.style.removeProperty('pointer-events');
      root.style.display = 'block';
      root.classList.remove('hidden');
    } else {
      root.style.setProperty('display', 'none', 'important');
      root.style.setProperty('opacity', '0');
      root.style.setProperty('pointer-events', 'none');
      root.classList.add('hidden');
    }
  }
}

// ==========================================
// USER PROFILE MODAL & CAMERA INTEGRATION
// ==========================================
export function openUserProfileModal(user: User) {
  let modal = document.getElementById('smart-user-profile-modal');
  if (modal) modal.remove();

  // Stop any active camera streams
  stopCameraStream();

  const name = user.displayName || (user.email ? user.email.split('@')[0] : 'User Taksasi');
  const email = user.email || '';
  const initial = (name.charAt(0) || 'U').toUpperCase();
  const photo = user.photoURL || '';
  const provider = user.providerData && user.providerData[0] ? user.providerData[0].providerId : 'email';
  const providerLabel = provider.includes('google') ? 'Google Authentication' : 'Email & Password';

  modal = document.createElement('div');
  modal.id = 'smart-user-profile-modal';
  modal.className =
    'fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-fadeIn';

  modal.innerHTML = `
    <div class="relative w-full max-w-[560px] rounded-3xl bg-[#0c1427] border border-cyan-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.2)] text-white overflow-hidden my-auto">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7 7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-bold tracking-tight text-white">Profil & Pengaturan Akun</h2>
            <p class="text-xs text-slate-400">Kelola identitas, foto profil kamera, dan sesi login</p>
          </div>
        </div>
        <button id="btn-close-profile-modal" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer">
          &times;
        </button>
      </div>

      <!-- Navigation Tabs (Segmented anti-pill) -->
      <div class="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-1 overflow-x-auto">
        <button id="ptab-details" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-cyan-400 text-cyan-300">
          Detail Akun
        </button>
        <button id="ptab-camera" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200">
          Foto & Kamera
        </button>
        <button id="ptab-session" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200">
          Preferensi Sesi
        </button>
        <button id="ptab-install" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200">
          Instalasi & APK
        </button>
        <button id="ptab-master" type="button" class="px-3.5 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 border-transparent text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" /></svg>
          Master Data Hub
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 max-h-[75vh] overflow-y-auto">
        
        <!-- Status Banner -->
        <div id="profile-feedback-box" class="hidden mb-4 p-3 rounded-xl text-xs flex items-center gap-2"></div>

        <!-- TAB 1: DETAIL AKUN -->
        <div id="psec-details" class="space-y-4">
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div id="profile-display-avatar" class="relative group cursor-pointer">
              ${
                photo
                  ? `<img src="${photo}" alt="${name}" class="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/60 shadow-lg" />`
                  : `<div class="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-cyan-300/60">${initial}</div>`
              }
              <div class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-white truncate">${name}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Aktif</span>
              </div>
              <p class="text-xs text-slate-400 truncate mt-0.5">${email}</p>
              <p class="text-[11px] text-cyan-400 mt-1">${providerLabel}</p>
            </div>
          </div>

          <form id="form-edit-profile" class="space-y-3.5">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Nama Tampilan</label>
              <input type="text" id="input-prof-name" value="${name}" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Peran / Jabatan</label>
                <input type="text" disabled value="Marketing & Taksasi Specialist" class="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Kantor Cabang</label>
                <select id="select-prof-cabang" class="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400">
                  <option value="Cabang Jakarta Pusat" selected>Cabang Jakarta Pusat</option>
                  <option value="Cabang Jakarta Barat">Cabang Jakarta Barat</option>
                  <option value="Cabang Bandung">Cabang Bandung</option>
                  <option value="Cabang Surabaya">Cabang Surabaya</option>
                  <option value="Cabang Medan">Cabang Medan</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">ID Pengguna (UID Firebase)</label>
              <input type="text" disabled value="${user.uid}" class="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-xs font-mono select-all" />
            </div>

            <div class="pt-2 flex justify-end">
              <button type="submit" id="btn-save-profile" class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        <!-- TAB 2: FOTO & KAMERA -->
        <div id="psec-camera" class="hidden space-y-4">
          <p class="text-xs text-slate-300">
            Ambil foto profil langsung menggunakan kamera perangkat Anda, atau pilih foto dari galeri/file.
          </p>

          <!-- Camera Stream Container -->
          <div id="camera-stream-wrapper" class="relative rounded-2xl bg-black border border-slate-800 overflow-hidden min-h-[220px] flex items-center justify-center">
            <video id="profile-cam-video" autoplay playsinline muted class="w-full max-h-[320px] object-cover hidden"></video>
            <canvas id="profile-cam-canvas" class="hidden"></canvas>
            
            <!-- Target Circle Overlay -->
            <div id="cam-overlay" class="absolute inset-0 pointer-events-none hidden items-center justify-center">
              <div class="w-44 h-44 rounded-full border-2 border-dashed border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
            </div>

            <!-- Standby Placeholder -->
            <div id="camera-standby-view" class="p-6 text-center">
              <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400 mb-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p class="text-xs font-semibold text-slate-200">Kamera Belum Aktif</p>
              <p class="text-[11px] text-slate-400 mt-1">Klik tombol di bawah untuk meminta akses kamera laptop atau smartphone Anda.</p>
            </div>

            <!-- Preview Captured Image View -->
            <div id="cam-captured-view" class="hidden p-4 text-center">
              <img id="cam-preview-img" src="" alt="Preview Foto" class="w-32 h-32 rounded-full object-cover border-2 border-emerald-400 mx-auto shadow-lg" />
              <p class="text-xs text-emerald-400 font-semibold mt-2">Foto Berhasil Diambil</p>
            </div>
          </div>

          <!-- Camera Action Controls -->
          <div class="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button id="btn-start-camera" type="button" class="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 flex items-center gap-2 transition-all cursor-pointer">
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Buka Kamera
            </button>

            <button id="btn-snap-camera" type="button" class="hidden px-5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" stroke-width="2"></circle>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              Jepret Foto
            </button>

            <button id="btn-save-photo" type="button" class="hidden px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer">
              Terapkan Foto Ini
            </button>

            <button id="btn-retake-photo" type="button" class="hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-all cursor-pointer">
              Ambil Ulang
            </button>

            <button id="btn-stop-camera" type="button" class="hidden px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer">
              Tutup Kamera
            </button>
          </div>

          <!-- File Upload Option as Alternative -->
          <div class="pt-3 border-t border-slate-800/80">
            <label class="block text-xs font-medium text-slate-400 mb-1.5">Atau Unggah dari File / Galeri:</label>
            <input type="file" id="input-upload-photo" accept="image/*" class="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer" />
          </div>
        </div>

        <!-- TAB 3: PREFERENSI SESI -->
        <div id="psec-session" class="hidden space-y-4">
          <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-cyan-400">Durasi Penyimpanan Sesi</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Tentukan bagaimana aplikasi mengingat sesi login Anda di perangkat ini:
            </p>
            <div class="space-y-2 text-xs">
              <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/50 cursor-pointer">
                <input type="radio" name="session-persistence" id="radio-persist-local" value="local" checked class="mt-0.5 text-cyan-400 focus:ring-cyan-400" />
                <div>
                  <span class="font-semibold text-white">Tetap Masuk di Perangkat Ini (Direkomendasikan)</span>
                  <p class="text-[11px] text-slate-400">Sesi disimpan secara aman di browser sehingga Anda tidak perlu login ulang setiap membuka aplikasi.</p>
                </div>
              </label>
              <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/50 cursor-pointer">
                <input type="radio" name="session-persistence" id="radio-persist-session" value="session" class="mt-0.5 text-cyan-400 focus:ring-cyan-400" />
                <div>
                  <span class="font-semibold text-white">Sesi Sementara (Komputer Publik / Bersama)</span>
                  <p class="text-[11px] text-slate-400">Sesi akan otomatis dihapus dan Anda diharuskan login kembali begitu tab atau jendela browser ditutup.</p>
                </div>
              </label>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-white">Tema Antarmuka</span>
              <p class="text-[11px] text-slate-400">WealthWave Dark Glassmorphism Neon</p>
            </div>
            <button id="btn-toggle-theme" type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-slate-700 cursor-pointer">
              Ganti Tema
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-rose-300">Keluar dari Akun</span>
              <p class="text-[11px] text-slate-400">Akhiri sesi aktif Anda di perangkat ini secara tuntas.</p>
            </div>
            <button id="btn-modal-logout" type="button" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all cursor-pointer">
              Keluar
            </button>
          </div>
        </div>

        <!-- TAB 4: INSTALASI & APK -->
        <div id="psec-install" class="hidden space-y-4">
          <div class="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30">
            <h3 class="text-sm font-bold text-white mb-1">Unduh File APK Android Langsung</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-3">
              Solusi terbaik jika muncul keterangan <em>"aplikasi tidak dapat dibuka"</em> pada saat instalasi PWA di smartphone Anda. Unduh dan pasang paket mandiri (.apk):
            </p>
            <a href="/SmartTaksasi.apk" download="SmartTaksasi-v2.1.3.apk" class="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Unduh SmartTaksasi-v2.1.3.apk (830 KB)
            </a>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h4 class="text-xs font-bold text-slate-200">Tips Pemasangan di Smartphone</h4>
            <ul class="text-[11px] text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong>Jika unduh APK:</strong> Buka file unduhan di notifikasi HP &rarr; Izinkan pemasangan sumber tidak dikenal &rarr; Pasang.</li>
              <li><strong>Jika pasang PWA (Browser):</strong> Selalu buka link di browser <strong>Google Chrome asli</strong>, bukan browser di dalam WhatsApp/Instagram.</li>
              <li><strong>Di iPhone / iPad (iOS):</strong> Buka Safari &rarr; Tombol Share &rarr; Pilih "Tambah ke Layar Utama".</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const closeBtn = document.getElementById('btn-close-profile-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      stopCameraStream();
      modal?.remove();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      stopCameraStream();
      modal?.remove();
    }
  });

  // Attach Tab Switchers
  attachProfileTabHandlers();

  // Attach Form Handlers
  attachProfileFormHandlers(user);

  // Attach Camera Handlers
  attachCameraHandlers(user);

  // Attach Session Preference Handlers
  attachSessionPrefHandlers(user);
}

function stopCameraStream() {
  if (activeCameraStream) {
    activeCameraStream.getTracks().forEach((track) => track.stop());
    activeCameraStream = null;
  }
}

function attachProfileTabHandlers() {
  const tabs = ['details', 'camera', 'session', 'install'];
  tabs.forEach((tab) => {
    const btn = document.getElementById(`ptab-${tab}`);
    if (btn) {
      btn.addEventListener('click', () => {
        if (tab !== 'camera') stopCameraStream();
        tabs.forEach((t) => {
          const b = document.getElementById(`ptab-${t}`);
          const s = document.getElementById(`psec-${t}`);
          if (b && s) {
            if (t === tab) {
              b.className = 'px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-cyan-400 text-cyan-300';
              s.classList.remove('hidden');
            } else {
              b.className = 'px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200';
              s.classList.add('hidden');
            }
          }
        });
      });
    }
  });

  const masterTabBtn = document.getElementById('ptab-master');
  if (masterTabBtn) {
    masterTabBtn.addEventListener('click', () => {
      stopCameraStream();
      const modal = document.getElementById('smart-user-profile-modal');
      if (modal) modal.remove();
      openMasterImportHub('excel');
    });
  }
}

function attachProfileFormHandlers(user: User) {
  const form = document.getElementById('form-edit-profile') as HTMLFormElement | null;
  const nameInput = document.getElementById('input-prof-name') as HTMLInputElement | null;
  const feedbackBox = document.getElementById('profile-feedback-box');

  if (form && nameInput) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newName = nameInput.value.trim();
      if (!newName) return;

      try {
        await updateProfile(user, { displayName: newName });
        // Sync to backend
        const token = await user.getIdToken();
        await fetch('/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name: newName })
        }).catch(() => {});

        setAppSession(token, user);
        renderUserBar(user);

        if (feedbackBox) {
          feedbackBox.className = 'mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300';
          feedbackBox.textContent = 'Nama profil berhasil diperbarui!';
          feedbackBox.classList.remove('hidden');
          setTimeout(() => feedbackBox.classList.add('hidden'), 3000);
        }
      } catch (err: any) {
        if (feedbackBox) {
          feedbackBox.className = 'mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300';
          feedbackBox.textContent = 'Gagal menyimpan perubahan: ' + (err.message || 'Error');
          feedbackBox.classList.remove('hidden');
        }
      }
    });
  }
}

function attachCameraHandlers(user: User) {
  const startBtn = document.getElementById('btn-start-camera');
  const snapBtn = document.getElementById('btn-snap-camera');
  const stopBtn = document.getElementById('btn-stop-camera');
  const saveBtn = document.getElementById('btn-save-photo');
  const retakeBtn = document.getElementById('btn-retake-photo');
  const video = document.getElementById('profile-cam-video') as HTMLVideoElement | null;
  const canvas = document.getElementById('profile-cam-canvas') as HTMLCanvasElement | null;
  const overlay = document.getElementById('cam-overlay');
  const standbyView = document.getElementById('camera-standby-view');
  const capturedView = document.getElementById('cam-captured-view');
  const previewImg = document.getElementById('cam-preview-img') as HTMLImageElement | null;
  const fileInput = document.getElementById('input-upload-photo') as HTMLInputElement | null;
  const feedbackBox = document.getElementById('profile-feedback-box');

  let currentCapturedDataUrl = '';

  // Start Camera
  if (startBtn && video) {
    startBtn.addEventListener('click', async () => {
      try {
        stopCameraStream();
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' },
          audio: false
        });
        activeCameraStream = stream;
        video.srcObject = stream;
        video.classList.remove('hidden');
        if (overlay) overlay.classList.remove('hidden');
        if (standbyView) standbyView.classList.add('hidden');
        if (capturedView) capturedView.classList.add('hidden');

        startBtn.classList.add('hidden');
        if (snapBtn) snapBtn.classList.remove('hidden');
        if (stopBtn) stopBtn.classList.remove('hidden');
        if (saveBtn) saveBtn.classList.add('hidden');
        if (retakeBtn) retakeBtn.classList.add('hidden');
      } catch (err: any) {
        console.warn('Camera access notice:', err);
        alert('Tidak dapat mengakses kamera: ' + (err.message || 'Periksa izin kamera browser Anda.'));
      }
    });
  }

  // Snap Photo
  if (snapBtn && video && canvas) {
    snapBtn.addEventListener('click', () => {
      const width = video.videoWidth || 480;
      const height = video.videoHeight || 480;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        currentCapturedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

        if (previewImg) previewImg.src = currentCapturedDataUrl;
        stopCameraStream();

        video.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
        if (capturedView) capturedView.classList.remove('hidden');

        snapBtn.classList.add('hidden');
        if (stopBtn) stopBtn.classList.add('hidden');
        if (saveBtn) saveBtn.classList.remove('hidden');
        if (retakeBtn) retakeBtn.classList.remove('hidden');
      }
    });
  }

  // Retake Photo
  if (retakeBtn && startBtn) {
    retakeBtn.addEventListener('click', () => {
      if (capturedView) capturedView.classList.add('hidden');
      if (saveBtn) saveBtn.classList.add('hidden');
      retakeBtn.classList.add('hidden');
      startBtn.click();
    });
  }

  // Stop Camera
  if (stopBtn && startBtn) {
    stopBtn.addEventListener('click', () => {
      stopCameraStream();
      if (video) video.classList.add('hidden');
      if (overlay) overlay.classList.add('hidden');
      if (standbyView) standbyView.classList.remove('hidden');
      if (snapBtn) snapBtn.classList.add('hidden');
      stopBtn.classList.add('hidden');
      startBtn.classList.remove('hidden');
    });
  }

  // Save Captured or Uploaded Photo
  const applyPhoto = async (dataUrl: string) => {
    try {
      if (saveBtn) (saveBtn as HTMLButtonElement).disabled = true;
      await updateProfile(user, { photoURL: dataUrl });

      const token = await user.getIdToken();
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ photo_url: dataUrl })
      }).catch(() => {});

      setAppSession(token, user);
      renderUserBar(user);

      // Update avatar inside modal
      const avatarContainer = document.getElementById('profile-display-avatar');
      if (avatarContainer) {
        avatarContainer.innerHTML = `<img src="${dataUrl}" alt="User" class="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-lg" />`;
      }

      if (feedbackBox) {
        feedbackBox.className = 'mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300';
        feedbackBox.textContent = 'Foto profil berhasil diperbarui!';
        feedbackBox.classList.remove('hidden');
        setTimeout(() => feedbackBox.classList.add('hidden'), 3000);
      }
    } catch (err: any) {
      alert('Gagal menerapkan foto: ' + (err.message || 'Error'));
    } finally {
      if (saveBtn) (saveBtn as HTMLButtonElement).disabled = false;
    }
  };

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (currentCapturedDataUrl) {
        applyPhoto(currentCapturedDataUrl);
      }
    });
  }

  // Upload Photo File
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          currentCapturedDataUrl = result;
          if (previewImg) previewImg.src = result;
          stopCameraStream();
          if (video) video.classList.add('hidden');
          if (overlay) overlay.classList.add('hidden');
          if (standbyView) standbyView.classList.add('hidden');
          if (capturedView) capturedView.classList.remove('hidden');

          if (startBtn) startBtn.classList.add('hidden');
          if (snapBtn) snapBtn.classList.add('hidden');
          if (stopBtn) stopBtn.classList.add('hidden');
          if (saveBtn) saveBtn.classList.remove('hidden');
          if (retakeBtn) retakeBtn.classList.remove('hidden');
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

function attachSessionPrefHandlers(user: User) {
  const radioLocal = document.getElementById('radio-persist-local') as HTMLInputElement | null;
  const radioSession = document.getElementById('radio-persist-session') as HTMLInputElement | null;
  const toggleThemeBtn = document.getElementById('btn-toggle-theme');
  const logoutBtn = document.getElementById('btn-modal-logout');
  const feedbackBox = document.getElementById('profile-feedback-box');

  if (radioLocal) {
    radioLocal.addEventListener('change', async () => {
      if (radioLocal.checked) {
        try {
          await setPersistence(auth, browserLocalPersistence);
          if (feedbackBox) {
            feedbackBox.className = 'mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300';
            feedbackBox.textContent = 'Preferensi sesi: Diatur tetap masuk di perangkat ini.';
            feedbackBox.classList.remove('hidden');
            setTimeout(() => feedbackBox.classList.add('hidden'), 3000);
          }
        } catch {}
      }
    });
  }

  if (radioSession) {
    radioSession.addEventListener('change', async () => {
      if (radioSession.checked) {
        try {
          await setPersistence(auth, browserSessionPersistence);
          if (feedbackBox) {
            feedbackBox.className = 'mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300';
            feedbackBox.textContent = 'Preferensi sesi: Diatur sesi sementara (keluar saat browser ditutup).';
            feedbackBox.classList.remove('hidden');
            setTimeout(() => feedbackBox.classList.add('hidden'), 3000);
          }
        } catch {}
      }
    });
  }

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', !isDark);
      document.documentElement.classList.toggle('light', isDark);
      localStorage.setItem('darkMode', String(!isDark));
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Yakin ingin keluar dari akun?')) {
        try {
          await signOut(auth);
          clearAppSession();
          await fetch('/api/apps/auth/logout', { method: 'POST' }).catch(() => {});
          window.location.reload();
        } catch (err) {
          window.location.reload();
        }
      }
    });
  }
}

// Expose modal trigger globally
if (typeof window !== 'undefined') {
  (window as any).openUserProfileModal = () => {
    if (currentUserInstance) {
      openUserProfileModal(currentUserInstance);
    }
  };
}

// ==========================================
// AUTH BARRIER & INITIAL SCREEN
// ==========================================
function setupAuthBarrier() {
  let barrier = document.getElementById('auth-gatekeeper');
  if (!barrier) {
    barrier = document.createElement('div');
    barrier.id = 'auth-gatekeeper';
    barrier.className =
      'fixed inset-0 z-[9999] flex items-center justify-center bg-[#070b14] overflow-y-auto px-4 py-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200';
    document.body.prepend(barrier);
  }

  barrier.innerHTML = `
    <!-- Background Ambient Glow Mesh -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,11,20,0.8)_100%)]"></div>
    </div>

    <!-- Center Card -->
    <div class="relative w-full max-w-[440px] rounded-3xl bg-[#0c1427]/90 border border-cyan-500/20 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] p-6 sm:p-8 text-white transition-all duration-300">
      
      <!-- Brand Header -->
      <div class="text-center mb-6">
        <div class="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-3">
          <img src="/logo.png" alt="Smart Taksasi" class="w-10 h-10 object-contain drop-shadow" onerror="this.src='/pwa-192x192.png'" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
          Smart Taksasi V2.1.3
        </h1>
        <p class="text-xs uppercase tracking-widest font-semibold text-cyan-400 mt-1">
          Portal Akses & Keamanan Sistem
        </p>
        <p class="text-xs text-slate-400 mt-2">
          Silakan masuk untuk mengakses modul taksasi, data prospek, dan perhitungan limit pinjaman.
        </p>
      </div>

      <!-- Google Provider Button -->
      <div class="space-y-3">
        <button id="btn-google-auth" type="button" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-white font-medium text-sm transition-all duration-200 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span id="google-btn-text">Lanjutkan dengan Google</span>
        </button>

        <!-- Fast Officer / Demo Access -->
        <button id="btn-fast-demo-auth" type="button" class="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 active:scale-[0.98] border border-cyan-500/30 text-cyan-300 font-medium text-xs transition-all duration-200 hover:border-cyan-400/60 shadow-sm cursor-pointer">
          <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Masuk Cepat Petugas (Bani Munggaran)</span>
        </button>

        <!-- Direct In-App Downloads (Instant Blob fallback) -->
        <div class="grid grid-cols-2 gap-2">
          <button id="btn-barrier-apk" type="button" class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all shadow-sm cursor-pointer">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh APK</span>
          </button>
          <button id="btn-barrier-zip" type="button" class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Backup ZIP</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="relative flex items-center justify-center my-4">
          <div class="border-t border-slate-800 w-full"></div>
          <span class="bg-[#0c1427] px-3 text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">
            atau lanjutkan dengan email
          </span>
          <div class="border-t border-slate-800 w-full"></div>
        </div>

        <!-- Mode Segmented Control Tabs (Clean anti-pill styling) -->
        <div class="flex items-center p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-4">
          <button id="tab-login" type="button" class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
            currentMode === 'login'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }">
            Masuk ke Akun
          </button>
          <button id="tab-register" type="button" class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
            currentMode === 'register'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }">
            Daftar Akun Baru
          </button>
        </div>

        <!-- Error Alert Container -->
        <div id="auth-error-box" class="hidden mb-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
          <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span id="auth-error-msg" class="leading-relaxed"></span>
        </div>

        <!-- Email/Password Form -->
        <form id="auth-email-form" class="space-y-3.5">
          <!-- Full Name (Only for registration) -->
          <div id="group-name" class="${currentMode === 'register' ? 'block' : 'hidden'} space-y-1">
            <label class="block text-xs font-medium text-slate-300">Nama Lengkap</label>
            <input
              type="text"
              id="input-name"
              placeholder="Contoh: Bani Munggaran"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <!-- Email Input -->
          <div class="space-y-1">
            <label class="block text-xs font-medium text-slate-300">Alamat Email</label>
            <input
              type="email"
              id="input-email"
              required
              placeholder="nama@perusahaan.com"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <!-- Password Input -->
          <div class="space-y-1">
            <label class="block text-xs font-medium text-slate-300">Kata Sandi</label>
            <div class="relative">
              <input
                type="password"
                id="input-password"
                required
                minlength="6"
                placeholder="Minimal 6 karakter"
                class="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              <button
                type="button"
                id="btn-toggle-password"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                title="Tampilkan / Sembunyikan Kata Sandi"
              >
                <svg id="eye-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            id="btn-submit-auth"
            class="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 active:scale-[0.98] shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span id="submit-text">${currentMode === 'login' ? 'Masuk ke Smart Taksasi' : 'Buat Akun & Masuk'}</span>
            <svg id="submit-spinner" class="hidden w-4 h-4 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </button>
        </form>

        <!-- Security footer note -->
        <div class="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Enkripsi Firebase Google</span>
          </div>
          <a href="/SmartTaksasi.apk" download="SmartTaksasi-v2.1.3.apk" class="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Unduh APK
          </a>
        </div>
      </div>
    </div>
  `;

  attachBarrierListeners();
}

function attachBarrierListeners() {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const groupName = document.getElementById('group-name');
  const submitText = document.getElementById('submit-text');
  const errorBox = document.getElementById('auth-error-box');

  const setMode = (mode: AuthMode) => {
    currentMode = mode;
    if (errorBox) errorBox.classList.add('hidden');
    if (groupName) {
      if (mode === 'register') {
        groupName.classList.remove('hidden');
      } else {
        groupName.classList.add('hidden');
      }
    }
    if (submitText) {
      submitText.textContent = mode === 'login' ? 'Masuk ke Smart Taksasi' : 'Buat Akun & Masuk';
    }
    if (tabLogin && tabRegister) {
      if (mode === 'login') {
        tabLogin.className =
          'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm';
        tabRegister.className =
          'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-slate-400 hover:text-slate-200';
      } else {
        tabRegister.className =
          'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm';
        tabLogin.className =
          'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-slate-400 hover:text-slate-200';
      }
    }
  };

  if (tabLogin) tabLogin.addEventListener('click', () => setMode('login'));
  if (tabRegister) tabRegister.addEventListener('click', () => setMode('register'));

  // Password visibility toggle
  const togglePassBtn = document.getElementById('btn-toggle-password');
  const passInput = document.getElementById('input-password') as HTMLInputElement | null;
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
    });
  }

  // Google Login
  const googleBtn = document.getElementById('btn-google-auth');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      if (isSubmitting) return;
      showError(null);
      setSubmittingState(true, 'Menghubungkan ke Google...');
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        setAppSession(token, result.user);
        await syncSessionWithBackend(token, result.user);
        unlockApp(result.user);
      } catch (err: any) {
        const code = err?.code || '';
        if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
          console.info('Google Sign-In popup closed by user.');
          showError('Jendela masuk Google ditutup. Silakan coba lagi atau gunakan tombol Masuk Cepat Petugas.');
        } else if (code === 'auth/popup-blocked') {
          console.warn('Google Sign-In popup blocked by browser.');
          showError('Popup Google diblokir browser. Izinkan popup atau gunakan Masuk Cepat Petugas.');
        } else {
          console.warn('Google Sign-In notice:', err?.message || err);
          showError(getErrorMessage(err));
        }
      } finally {
        setSubmittingState(false);
      }
    });
  }

  // Fast Officer Demo Click Handler
  const fastDemoBtn = document.getElementById('btn-fast-demo-auth');
    const barrierApkBtn = document.getElementById('btn-barrier-apk');
  if (barrierApkBtn) {
    barrierApkBtn.addEventListener('click', () => {
      downloadFileViaBlob('/SmartTaksasi.apk', 'SmartTaksasi-v2.1.3.apk', barrierApkBtn);
    });
  }

  const barrierZipBtn = document.getElementById('btn-barrier-zip');
  if (barrierZipBtn) {
    barrierZipBtn.addEventListener('click', () => {
      downloadFileViaBlob('/download-zip', 'smart-taksasi-complete.zip', barrierZipBtn);
    });
  }

  if (fastDemoBtn) {
    fastDemoBtn.addEventListener('click', async () => {
      if (isSubmitting) return;
      showError(null);
      setSubmittingState(true, 'Menyiapkan sesi petugas...');
      try {
        const demoUser = {
          uid: 'user_bani',
          email: 'bani.munggaran07@gmail.com',
          displayName: 'Bani Munggaran',
          photoURL: null
        };
        const demoToken = 'session_' + Math.random().toString(36).substring(2) + Date.now();
        setAppSession(demoToken, demoUser as any);
        await syncSessionWithBackend(demoToken, demoUser as any);
        unlockApp(demoUser as any);
      } catch (e: any) {
        console.warn('Demo session notice:', e);
      } finally {
        setSubmittingState(false);
      }
    });
  }

  // Email/Password submit
  const form = document.getElementById('auth-email-form') as HTMLFormElement | null;
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      const emailInput = document.getElementById('input-email') as HTMLInputElement | null;
      const passInput = document.getElementById('input-password') as HTMLInputElement | null;
      const nameInput = document.getElementById('input-name') as HTMLInputElement | null;

      const email = emailInput?.value?.trim() || '';
      const password = passInput?.value || '';
      const name = nameInput?.value?.trim() || '';

      if (!email || !password) {
        showError('Harap isi alamat email dan kata sandi.');
        return;
      }

      showError(null);
      setSubmittingState(true, currentMode === 'login' ? 'Memverifikasi akun...' : 'Membuat akun baru...');

      try {
        let user: User;
        if (currentMode === 'login') {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          user = cred.user;
        } else {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          user = cred.user;
          if (name) {
            try {
              await updateProfile(user, { displayName: name });
            } catch {}
          }
        }

        const token = await user.getIdToken();
        setAppSession(token, user);
        await syncSessionWithBackend(token, user);
        unlockApp(user);
      } catch (err: any) {
        console.warn('Email auth notice:', err?.message || err);
        showError(getErrorMessage(err));
      } finally {
        setSubmittingState(false);
      }
    });
  }
}

function showError(msg: string | null) {
  const box = document.getElementById('auth-error-box');
  const text = document.getElementById('auth-error-msg');
  if (!box || !text) return;
  if (msg) {
    text.textContent = msg;
    box.classList.remove('hidden');
  } else {
    box.classList.add('hidden');
    text.textContent = '';
  }
}

function setSubmittingState(submitting: boolean, label?: string) {
  isSubmitting = submitting;
  const submitBtn = document.getElementById('btn-submit-auth') as HTMLButtonElement | null;
  const submitText = document.getElementById('submit-text');
  const spinner = document.getElementById('submit-spinner');
  const googleBtn = document.getElementById('btn-google-auth') as HTMLButtonElement | null;

  if (submitBtn) submitBtn.disabled = submitting;
  if (googleBtn) googleBtn.disabled = submitting;

  if (submitting) {
    if (spinner) spinner.classList.remove('hidden');
    if (submitText && label) submitText.textContent = label;
  } else {
    if (spinner) spinner.classList.add('hidden');
    if (submitText) {
      submitText.textContent = currentMode === 'login' ? 'Masuk ke Smart Taksasi' : 'Buat Akun & Masuk';
    }
  }
}

// Unlock and transition into the application
function unlockApp(user: User) {
  const barrier = document.getElementById('auth-gatekeeper');
  if (barrier) {
    barrier.style.transition = 'opacity 250ms ease-out, transform 250ms ease-out';
    barrier.style.opacity = '0';
    barrier.style.transform = 'scale(0.98)';
    setTimeout(() => {
      barrier.remove();
    }, 260);
  }

  setAppAccessGranted(true);
  renderUserBar(user);
  
}

// Main Boot Gatekeeper Logic
export function startAuthGatekeeper() {
  const existingToken = localStorage.getItem('smart_access_token');
  const existingUserRaw = localStorage.getItem('smart_taksasi_user');

  if (existingToken && existingUserRaw) {
    try {
      const parsedUser = JSON.parse(existingUserRaw);
      if (parsedUser && parsedUser.email) {
        setAppAccessGranted(true);
        renderUserBar(parsedUser as any);
        
      } else {
        setAppAccessGranted(false);
        setupAuthBarrier();
      }
    } catch (_) {
      setAppAccessGranted(false);
      setupAuthBarrier();
    }
  } else {
    // Enforce access block before checking session
    setAppAccessGranted(false);
    setupAuthBarrier();
  }

  // Listen to Firebase auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        setAppSession(token, user);
        await syncSessionWithBackend(token, user);
        unlockApp(user);
      } catch (err) {
        console.warn('Token acquisition notice:', err);
        unlockApp(user);
      }
    } else {
      const token = localStorage.getItem('smart_access_token');
      const userRaw = localStorage.getItem('smart_taksasi_user');
      if (!token || !userRaw) {
        currentUserInstance = null;
        clearAppSession();
        removeUserBar();
        setAppAccessGranted(false);
        if (!document.getElementById('auth-gatekeeper')) {
          setupAuthBarrier();
        }
      }
    }
  });
}

// Auto-run if loaded in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => startAuthGatekeeper());
  } else {
    startAuthGatekeeper();
  }
}
