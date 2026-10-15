/**
 * Smart Taksasi V2.1.3 - Master Data & Excel Multi-File Importer (1 Tab 1 File)
 * Standardized Centralized Excel Reader & Database Hub
 * Supports: Master OTR, Master CLOP HO, Master BQ, Master Follow Up Gform, Master PriceList, Master Bahan Prospek
 */

declare global {
  interface Window {
    XLSX?: any;
    openMasterImportHub?: (defaultTab?: 'excel' | 'view' | 'manual', defaultEntity?: string) => void;
    closeMasterImportHub?: () => void;
    mountPengaturanMasterHub?: (target?: HTMLElement | string) => void;
  }
}

export interface EntityField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'currency' | 'select' | 'date';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  excelAliases: string[];
}

export interface MasterEntityConfig {
  key: string;
  name: string;
  code: string;
  badge: string;
  description: string;
  sheetKeywords: string[];
  idPrefix: string;
  fields: EntityField[];
}

export const MASTER_ENTITIES: MasterEntityConfig[] = [
  {
    key: 'OtrPrice',
    name: 'Master OTR (Harga Pasar)',
    code: 'OTR',
    badge: 'Harga Pasar',
    description: 'Daftar harga pasar & taksasi unit motor per merk, model, dan tahun pembuatan.',
    sheetKeywords: ['OTR', 'HARGA', 'PRICE', 'MOTOR', 'TAKSASI', 'PASAR'],
    idPrefix: 'otr_',
    fields: [
      { key: 'brand', label: 'Merk Motor', type: 'select', required: true, options: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Vespa', 'Lainnya'], excelAliases: ['merk', 'brand', 'merk motor', 'pabrikan'] },
      { key: 'model', label: 'Model / Tipe Motor', type: 'text', required: true, placeholder: 'misal Beat CBS, NMAX 155, Vario 160', excelAliases: ['model', 'tipe', 'type', 'nama motor', 'unit motor', 'model motor'] },
      { key: 'year', label: 'Tahun Pembuatan', type: 'number', required: true, placeholder: '2023', excelAliases: ['tahun', 'year', 'thn', 'tahun motor', 'tahun pembuatan'] },
      { key: 'harga_pasar', label: 'Harga Pasar (OTR)', type: 'currency', required: true, placeholder: '18500000', excelAliases: ['harga pasar', 'harga', 'otr', 'harga otr', 'nilai pasar', 'taksasi'] },
      { key: 'object_description', label: 'Deskripsi / Varian Unit', type: 'text', placeholder: 'misal ISS Deluxe, ABS Connected', excelAliases: ['deskripsi', 'description', 'object_description', 'varian', 'keterangan'] },
      { key: 'group_type_unit', label: 'Group Tipe Unit', type: 'select', options: ['Matic', 'Bebek', 'Sport', 'Trail', 'Listrik', 'Lainnya'], excelAliases: ['group', 'group type', 'group_type_unit', 'kategori', 'segmen'] }
    ]
  },
  {
    key: 'BookingQuality',
    name: 'Master BQ (Booking Quality)',
    code: 'BQ',
    badge: 'Kualitas Booking',
    description: 'Data monitoring Booking Quality, jatuh tempo angsuran, dan pembagian tugas penagihan.',
    sheetKeywords: ['BQ', 'BOOKING', 'QUALITY', 'ANGSURAN', 'JATUH TEMPO', 'TAGIHAN', 'DEBITUR'],
    idPrefix: 'bq_',
    fields: [
      { key: 'contract_no', label: 'Nomor Kontrak', type: 'text', required: true, placeholder: '0123456789', excelAliases: ['contract_no', 'no kontrak', 'nomor kontrak', 'kontrak', 'no_kontrak'] },
      { key: 'customer_name', label: 'Nama Konsumen / Debitur', type: 'text', required: true, placeholder: 'Nama konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama nasabah', 'customer', 'nama debitur', 'nama'] },
      { key: 'status_account', label: 'Status Account', type: 'select', required: true, options: ['Lancar', 'DPK', 'NPL', 'Menunggak', 'Lunas'], excelAliases: ['status_account', 'status account', 'status', 'kolektibilitas'] },
      { key: 'jatuh_tempo', label: 'Tanggal Jatuh Tempo', type: 'date', required: true, excelAliases: ['jatuh_tempo', 'jatuh tempo', 'tgl jatuh tempo', 'due date', 'tgl'] },
      { key: 'angsuran', label: 'Nilai Angsuran per Bulan', type: 'currency', placeholder: '850000', excelAliases: ['angsuran', 'installment', 'cicilan', 'nilai angsuran', 'angsuran per bulan'] },
      { key: 'marketing_name', label: 'Nama Marketing / Sales', type: 'text', placeholder: 'Nama marketing penanggung jawab', excelAliases: ['marketing_name', 'nama marketing', 'marketing', 'sales', 'pic'] }
    ]
  },
  {
    key: 'ClopContract',
    name: 'Master CLOP HO',
    code: 'CLOP',
    badge: 'Kontrak HO',
    description: 'Data referensi kontrak CLOP HO untuk verifikasi riwayat pembiayaan dan nasabah.',
    sheetKeywords: ['CLOP', 'KONTRAK', 'CONTRACT', 'HO'],
    idPrefix: 'clop_',
    fields: [
      { key: 'contract_no', label: 'Nomor Kontrak', type: 'text', required: true, placeholder: '0123456789', excelAliases: ['contract_no', 'no kontrak', 'nomor kontrak', 'contract no', 'kontrak'] },
      { key: 'customer_name', label: 'Nama Konsumen / Debitur', type: 'text', required: true, placeholder: 'Nama lengkap konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama debitur', 'nama nasabah', 'customer', 'nama'] },
      { key: 'nosin', label: 'Nomor Mesin (Nosin)', type: 'text', placeholder: 'JF51E...', excelAliases: ['nosin', 'nomor mesin', 'no mesin', 'engine no'] },
      { key: 'office_code', label: 'Kode Kantor / Cabang', type: 'text', placeholder: 'JKT01', excelAliases: ['office_code', 'kode kantor', 'cabang', 'office code', 'kode cabang'] },
      { key: 'buss_unit', label: 'Unit Bisnis', type: 'text', placeholder: 'R2 Regular', excelAliases: ['buss_unit', 'unit bisnis', 'business unit', 'bu'] },
      { key: 'trend_cycle', label: 'Trend Cycle / Siklus', type: 'text', placeholder: 'Cycle 1', excelAliases: ['trend_cycle', 'trend cycle', 'siklus', 'cycle'] }
    ]
  },
  {
    key: 'Prospect',
    name: 'Master Bahan Prospek',
    code: 'PROSPEK',
    badge: 'Database Pipeline',
    description: 'Kumpulan data calon debitur dan pipeline prospek kerja harian sales force.',
    sheetKeywords: ['PROSPEK', 'PROSPECT', 'PIPELINE', 'SALES', 'BAHAN PROSPEK', 'CALON'],
    idPrefix: 'pro_',
    fields: [
      { key: 'customer_name', label: 'Nama Konsumen Prospek', type: 'text', required: true, placeholder: 'Nama konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama', 'nama prospek', 'debitur'] },
      { key: 'phone', label: 'Nomor WhatsApp / HP', type: 'text', required: true, placeholder: '081234567890', excelAliases: ['phone', 'no hp', 'telepon', 'whatsapp', 'no wa'] },
      { key: 'motor', label: 'Unit Motor Taksasi', type: 'text', required: true, placeholder: 'Honda Scoopy 2022', excelAliases: ['motor', 'unit motor', 'unit', 'tipe motor', 'kendaraan'] },
      { key: 'plafond', label: 'Pengajuan Plafond', type: 'currency', placeholder: '12000000', excelAliases: ['plafond', 'plafon', 'pengajuan', 'kebutuhan pinjaman'] },
      { key: 'status', label: 'Status Pipeline', type: 'select', options: ['baru', 'proses', 'taksasi', 'deal', 'batal'], excelAliases: ['status', 'tahap', 'stage'] },
      { key: 'marketing_name', label: 'Nama Marketing', type: 'text', placeholder: 'Nama marketing', excelAliases: ['marketing_name', 'nama marketing', 'marketing'] }
    ]
  },
  {
    key: 'PriceList',
    name: 'Master PriceList',
    code: 'PL',
    badge: 'Skema Angsuran',
    description: 'Daftar simulasi uang muka (DP), tenor bulan, dan plafon angsuran pembiayaan.',
    sheetKeywords: ['PRICE', 'PRICELIST', 'ANGSURAN', 'SKEMA', 'TENOR', 'SIMULASI'],
    idPrefix: 'pl_',
    fields: [
      { key: 'brand', label: 'Merk Motor', type: 'select', required: true, options: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Vespa', 'Lainnya'], excelAliases: ['brand', 'merk', 'merk motor'] },
      { key: 'model', label: 'Model / Tipe Motor', type: 'text', required: true, placeholder: 'Beat CBS / NMAX 155', excelAliases: ['model', 'tipe', 'type', 'nama motor', 'unit'] },
      { key: 'year', label: 'Tahun', type: 'number', placeholder: '2023', excelAliases: ['year', 'tahun', 'thn'] },
      { key: 'otr', label: 'Nilai OTR', type: 'currency', placeholder: '18500000', excelAliases: ['otr', 'harga otr', 'harga pasar'] },
      { key: 'dp', label: 'Uang Muka (DP)', type: 'currency', placeholder: '2000000', excelAliases: ['dp', 'uang muka', 'down payment'] },
      { key: 'tenor', label: 'Tenor (Bulan)', type: 'select', required: true, options: ['11', '17', '23', '29', '35'], excelAliases: ['tenor', 'jangka waktu', 'bulan', 'tenor bulan'] },
      { key: 'angsuran', label: 'Nilai Angsuran per Bulan', type: 'currency', required: true, placeholder: '785000', excelAliases: ['angsuran', 'cicilan', 'angsuran per bulan', 'installment'] },
      { key: 'plafond', label: 'Plafond Pinjaman', type: 'currency', placeholder: '16500000', excelAliases: ['plafond', 'plafon', 'nilai pinjaman', 'pinjaman'] }
    ]
  },
  {
    key: 'FollowUpBahan',
    name: 'Master Follow Up Gform',
    code: 'GFORM',
    badge: 'Leads Online',
    description: 'Data prospek dan leads yang masuk melalui Google Form atau saluran pendaftaran online.',
    sheetKeywords: ['GFORM', 'FOLLOW', 'BAHAN', 'GOOGLE FORM', 'FORM', 'LEADS'],
    idPrefix: 'fub_',
    fields: [
      { key: 'customer_name', label: 'Nama Calon Konsumen', type: 'text', required: true, placeholder: 'Nama lengkap pendaftar', excelAliases: ['customer_name', 'nama calon konsumen', 'nama pendaftar', 'nama', 'nama konsumen'] },
      { key: 'phone', label: 'Nomor WhatsApp / HP', type: 'text', required: true, placeholder: '081234567890', excelAliases: ['phone', 'no hp', 'nomor hp', 'telepon', 'whatsapp', 'no wa', 'kontak'] },
      { key: 'motor', label: 'Unit Motor yang Diminati', type: 'text', required: true, placeholder: 'Honda Beat / Vario 125', excelAliases: ['motor', 'unit motor', 'tipe motor', 'pilihan motor', 'kendaraan'] },
      { key: 'status', label: 'Status Tindak Lanjut', type: 'select', options: ['bahan', 'follow_up', 'proses_taksasi', 'deal', 'batal'], excelAliases: ['status', 'status tindak lanjut', 'tahap', 'stage'] },
      { key: 'notes', label: 'Catatan Kebutuhan / Dana', type: 'text', placeholder: 'misal butuh dana 15 juta untuk modal usaha', excelAliases: ['notes', 'catatan', 'keterangan', 'kebutuhan dana', 'pesan'] },
      { key: 'marketing_name', label: 'Marketing PIC', type: 'text', placeholder: 'Nama marketing penangan', excelAliases: ['marketing_name', 'nama marketing', 'marketing', 'pic'] }
    ]
  }
];

// Helper: Format Currency (IDR)
export function formatRupiah(num: number | string): string {
  const n = typeof num === 'string' ? parseFloat(num.replace(/[^0-9.-]+/g, '')) || 0 : num || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(n);
}

// Data structures for 1 Tab = 1 File Excel
export interface ExcelSheetData {
  name: string;
  rows: any[];
  headers: string[];
  suggestedEntityKey: string;
}

export interface ExcelFileTabItem {
  id: string;
  fileName: string;
  fileSize: string;
  sheets: ExcelSheetData[];
  activeSheetIndex: number;
  targetEntityKey: string;
  status: 'ready' | 'saving' | 'saved' | 'error';
  savedCount?: number;
  uploadedAt: string;
  searchTerm?: string;
  previewPage?: number;
}

interface HubState {
  activeTab: 'excel' | 'view' | 'manual';
  selectedEntityKey: string;
  uploadedFiles: ExcelFileTabItem[];
  activeFileIndex: number;
  isSaving: boolean;
  saveProgress: number;
  saveMessage: string;
  mountTargetId: string | null;
}

const state: HubState = {
  activeTab: 'excel',
  selectedEntityKey: 'OtrPrice',
  uploadedFiles: [],
  activeFileIndex: 0,
  isSaving: false,
  saveProgress: 0,
  saveMessage: '',
  mountTargetId: null
};

// Open Modal View
export function openMasterImportHub(defaultTab: 'excel' | 'view' | 'manual' = 'excel', defaultEntity = 'OtrPrice') {
  // If we are currently on /Pengaturan or page has #pengaturan-excel-mount, scroll to it
  const inlineMount = document.getElementById('pengaturan-excel-mount');
  if (inlineMount) {
    state.activeTab = defaultTab;
    state.selectedEntityKey = defaultEntity;
    renderMasterHubContent(inlineMount, false);
    inlineMount.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  state.activeTab = defaultTab;
  state.selectedEntityKey = defaultEntity;
  let hub = document.getElementById('smart-master-import-hub-modal');
  if (!hub) {
    hub = document.createElement('div');
    hub.id = 'smart-master-import-hub-modal';
    hub.className = 'fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fadeIn';
    document.body.appendChild(hub);
  }
  renderMasterHubContent(hub, true);
}

export function closeMasterImportHub() {
  const hub = document.getElementById('smart-master-import-hub-modal');
  if (hub) hub.remove();
}

window.openMasterImportHub = openMasterImportHub;
window.closeMasterImportHub = closeMasterImportHub;

// Helper: Format file size
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Smart Header / Field Matcher
function mapSheetRowToEntity(row: Record<string, any>, config: MasterEntityConfig): Record<string, any> {
  const item: Record<string, any> = {
    id: `${config.idPrefix}${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    created_date: new Date().toISOString()
  };

  const rowKeys = Object.keys(row);

  config.fields.forEach(field => {
    let foundVal: any = undefined;
    for (const rk of rowKeys) {
      const cleanRk = rk.trim().toLowerCase();
      if (cleanRk === field.key.toLowerCase()) {
        foundVal = row[rk];
        break;
      }
      if (field.excelAliases.some(alias => cleanRk.includes(alias.toLowerCase()) || alias.toLowerCase().includes(cleanRk))) {
        foundVal = row[rk];
        break;
      }
    }

    if (foundVal !== undefined && foundVal !== null && foundVal !== '') {
      if (field.type === 'number') {
        item[field.key] = parseInt(String(foundVal).replace(/[^0-9-]/g, ''), 10) || 0;
      } else if (field.type === 'currency') {
        item[field.key] = parseFloat(String(foundVal).replace(/[^0-9.-]/g, '')) || 0;
      } else if (field.type === 'date') {
        item[field.key] = String(foundVal).trim();
      } else {
        item[field.key] = String(foundVal).trim();
      }
    } else {
      if (field.type === 'number' || field.type === 'currency') item[field.key] = 0;
      else if (field.type === 'select' && field.options) item[field.key] = field.options[0];
      else item[field.key] = '';
    }
  });

  if (config.key === 'OtrPrice') {
    item.search_text = `${item.brand || ''} ${item.model || ''} ${item.year || ''} ${item.object_description || ''}`.trim();
  }

  return item;
}

// Detect best matching entity based on file name, sheet name, and headers
function detectMatchingEntity(fileName: string, sheetName: string, headers: string[]): string {
  const combined = `${fileName} ${sheetName}`.toUpperCase();

  // 1. Direct keywords in sheet name / file name
  if (combined.includes('BQ') || combined.includes('BOOKING QUALITY') || combined.includes('TAGIHAN') || combined.includes('JATUH TEMPO')) {
    return 'BookingQuality';
  }
  if (combined.includes('OTR') || combined.includes('HARGA PASAR') || combined.includes('TAKSASI')) {
    return 'OtrPrice';
  }
  if (combined.includes('CLOP') || combined.includes('KONTRAK') || combined.includes('CONTRACT')) {
    return 'ClopContract';
  }
  if (combined.includes('PROSPEK') || combined.includes('PROSPECT') || combined.includes('PIPELINE')) {
    return 'Prospect';
  }
  if (combined.includes('PRICE') || combined.includes('PRICELIST') || combined.includes('SKEMA')) {
    return 'PriceList';
  }
  if (combined.includes('GFORM') || combined.includes('FOLLOW UP') || combined.includes('LEADS')) {
    return 'FollowUpBahan';
  }

  // 2. Check headers
  const joinedHeaders = headers.join(' ').toLowerCase();
  if (joinedHeaders.includes('angsuran') && joinedHeaders.includes('jatuh tempo')) return 'BookingQuality';
  if (joinedHeaders.includes('kontrak') && (joinedHeaders.includes('nosin') || joinedHeaders.includes('trend'))) return 'ClopContract';
  if (joinedHeaders.includes('otr') || joinedHeaders.includes('harga pasar')) return 'OtrPrice';
  if (joinedHeaders.includes('prospek') || joinedHeaders.includes('pipeline') || joinedHeaders.includes('debitur')) return 'Prospect';
  if (joinedHeaders.includes('tenor') && joinedHeaders.includes('dp')) return 'PriceList';
  if (joinedHeaders.includes('gform') || joinedHeaders.includes('follow up')) return 'FollowUpBahan';

  return 'OtrPrice';
}

// Main Render Hub Component
function renderMasterHubContent(container: HTMLElement, isModal = false) {
  const activeEntity = MASTER_ENTITIES.find(e => e.key === state.selectedEntityKey) || MASTER_ENTITIES[0];
  const totalFiles = state.uploadedFiles.length;
  const currentFile = state.uploadedFiles[state.activeFileIndex] || null;

  const headerHtml = isModal
    ? `
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800/80 bg-[#0d1629]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white">Master Import Excel & Kelola Data</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">1 Tab = 1 File Excel</span>
            </div>
            <p class="text-xs text-slate-400">Pusat baca file Excel master, 1 tab per file, dan penyimpanan ke database Cloud SQL.</p>
          </div>
        </div>
        <button id="btn-close-master-hub" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-700/60" title="Tutup">
          &times;
        </button>
      </div>
    `
    : `
      <!-- Inline Header in Pengaturan -->
      <div class="p-5 sm:p-6 border-b border-slate-800/80 bg-gradient-to-r from-[#0c1527] to-[#070b14] flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-bold text-white tracking-tight">Master Import Excel (1 Tab 1 File)</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Multi-File Supported</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">Unggah file Excel master (OTR, BQ, CLOP HO, Prospek, PriceList, Gform). Setiap file akan dibuka dalam 1 Tab terpisah.</p>
          </div>
        </div>
      </div>
    `;

  const wrapperClass = isModal
    ? 'relative w-full max-w-6xl rounded-3xl bg-[#090f1d] border border-cyan-500/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(6,182,212,0.18)] text-slate-100 overflow-hidden my-auto flex flex-col max-h-[92vh]'
    : 'w-full rounded-2xl bg-[#090f1d] border border-slate-800 text-slate-100 overflow-hidden shadow-xl';

  container.innerHTML = `
    <div class="${wrapperClass}">
      ${headerHtml}

      <!-- Top Sub-Nav (Excel Multi-File vs Database Terkini vs Input Manual) -->
      <div class="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-5 sm:px-6 pt-2.5 gap-2">
        <div class="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
          <button id="hub-tab-excel" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            state.activeTab === 'excel' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>1. Baca & Import Excel (1 File 1 Tab)</span>
            ${totalFiles > 0 ? `<span class="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-400 text-slate-950 font-bold">${totalFiles}</span>` : ''}
          </button>

          <button id="hub-tab-view" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            state.activeTab === 'view' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }">
            <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
            </svg>
            <span>2. Data Master Tersimpan di Database</span>
          </button>

          <button id="hub-tab-manual" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            state.activeTab === 'manual' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>3. Input Manual Satu per Satu</span>
          </button>
        </div>

        <!-- Entity Switcher for View / Manual -->
        ${
          state.activeTab !== 'excel'
            ? `
          <div class="flex items-center gap-2 pb-2 sm:pb-0">
            <span class="text-xs text-slate-400">Pilih Master:</span>
            <select id="hub-entity-selector" class="px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold focus:outline-none cursor-pointer">
              ${MASTER_ENTITIES.map(e => `<option value="${e.key}" ${e.key === state.selectedEntityKey ? 'selected' : ''}>${e.name} (${e.code})</option>`).join('')}
            </select>
          </div>
        `
            : ''
        }
      </div>

      <!-- Main Body Container -->
      <div class="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 max-h-[75vh]">
        <!-- Alert / Feedback Notification -->
        <div id="hub-notification-box" class="hidden p-3.5 rounded-2xl border text-xs flex items-center justify-between animate-fadeIn"></div>

        <!-- Global Progress Bar -->
        ${
          state.isSaving
            ? `
          <div class="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-2 animate-fadeIn">
            <div class="flex items-center justify-between text-xs font-semibold">
              <span id="hub-progress-label" class="text-cyan-300">${state.saveMessage}</span>
              <span id="hub-progress-val" class="font-mono text-cyan-400">${state.saveProgress}%</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-cyan-500/30">
              <div id="hub-progress-bar" class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300" style="width: ${state.saveProgress}%"></div>
            </div>
          </div>
        `
            : ''
        }

        <!-- Active Section -->
        ${
          state.activeTab === 'excel'
            ? renderMultiFileExcelSection()
            : state.activeTab === 'view'
            ? renderDatabaseViewSection(activeEntity)
            : renderManualEntrySection(activeEntity)
        }
      </div>
    </div>
  `;

  attachHubEventHandlers(container, isModal);
}

// ----------------------------------------------------------------------------
// SECTION 1: MULTI-FILE EXCEL IMPORT (1 TAB 1 FILE EXCEL)
// ----------------------------------------------------------------------------
function renderMultiFileExcelSection(): string {
  const files = state.uploadedFiles;
  const currentFile = files[state.activeFileIndex] || null;

  return `
    <div class="space-y-6">
      <!-- Upload Drop Zone (Always visible or compact when files exist) -->
      <div id="excel-drop-zone" class="relative group border-2 border-dashed ${
        files.length > 0 ? 'border-slate-800 bg-slate-950/30 p-5' : 'border-cyan-500/40 hover:border-cyan-400 bg-slate-950/50 p-8 sm:p-10'
      } rounded-3xl text-center transition-all cursor-pointer">
        <input type="file" id="excel-file-input" multiple accept=".xlsx, .xls, .csv" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
        <div class="flex flex-col items-center justify-center space-y-2.5 pointer-events-none">
          <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">
              ${files.length > 0 ? 'Tarik atau Klik untuk Tambah File Excel Lain (.xlsx, .xls, .csv)' : 'Klik atau Tarik File Excel Master ke Sini (.xlsx, .xls, .csv)'}
            </h4>
            <p class="text-xs text-slate-400 mt-0.5">
              ${files.length > 0 ? 'Mendukung upload banyak file sekaligus — setiap file otomatis dibuatkan 1 Tab terpisah.' : 'Mendukung Master OTR, Master BQ, Master CLOP HO, Prospek, PriceList, dan Follow Up. 1 File = 1 Tab.'}
            </p>
          </div>
        </div>
      </div>

      ${
        files.length > 0
          ? `
        <!-- ============================================== -->
        <!-- 1 TAB 1 FILE EXCEL BAR                         -->
        <!-- ============================================== -->
        <div class="space-y-4">
          <!-- Top Action Bar for Multiple Files -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div class="flex items-center gap-2.5">
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              <span class="text-xs font-bold text-white">${files.length} File Excel Terbuka</span>
              <span class="text-xs text-slate-400">· Total ${files.reduce((acc, f) => acc + (f.sheets[f.activeSheetIndex]?.rows.length || 0), 0)} baris data</span>
            </div>

            <div class="flex items-center gap-2">
              <button id="btn-save-all-open-files" type="button" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Simpan Semua File (${files.length} File) ke Database</span>
              </button>

              <button id="btn-clear-all-file-tabs" type="button" class="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-300 bg-slate-950 border border-slate-800 hover:border-rose-500/30 transition-all cursor-pointer" title="Tutup semua file">
                Tutup Semua
              </button>
            </div>
          </div>

          <!-- FILE TABS BAR (1 Tab 1 File Excel) -->
          <div class="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
            ${files
              .map((file, idx) => {
                const isActive = idx === state.activeFileIndex;
                const activeSheet = file.sheets[file.activeSheetIndex] || file.sheets[0];
                const rowCount = activeSheet ? activeSheet.rows.length : 0;
                const ent = MASTER_ENTITIES.find(e => e.key === file.targetEntityKey);

                return `
                <div class="flex items-center rounded-xl border transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }">
                  <button type="button" data-file-index="${idx}" class="btn-select-file-tab flex items-center gap-2 px-3.5 py-2 text-xs font-semibold whitespace-nowrap cursor-pointer">
                    <svg class="w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="max-w-[160px] sm:max-w-[200px] truncate font-bold" title="${file.fileName}">${file.fileName}</span>
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-slate-300">${rowCount} baris</span>
                    ${ent ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/60 text-cyan-300 font-mono font-bold">${ent.code}</span>` : ''}
                    ${
                      file.status === 'saved'
                        ? `<span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" title="Tersimpan di Database"></span>`
                        : file.status === 'saving'
                        ? `<span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>`
                        : ''
                    }
                  </button>
                  <button type="button" data-remove-file-index="${idx}" class="btn-remove-file-tab px-2 py-2 text-slate-500 hover:text-rose-400 text-sm cursor-pointer rounded-r-xl" title="Tutup file ini">
                    &times;
                  </button>
                </div>
              `;
              })
              .join('')}

            <!-- Add File Tab Button -->
            <label class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 whitespace-nowrap cursor-pointer transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>+ Tambah File Excel</span>
              <input type="file" multiple accept=".xlsx, .xls, .csv" class="hidden btn-add-more-excel" />
            </label>
          </div>

          <!-- ACTIVE FILE TAB PREVIEW -->
          ${currentFile ? renderActiveFilePreview(currentFile) : ''}
        </div>
      `
          : `
        <!-- Empty State Explaining 6 Master Entities -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          ${MASTER_ENTITIES.map(ent => `
            <div class="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 transition-all space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">${ent.badge}</span>
                <span class="text-xs font-mono font-bold text-slate-500">${ent.code}</span>
              </div>
              <h4 class="text-sm font-bold text-white">${ent.name}</h4>
              <p class="text-xs text-slate-400 line-clamp-2">${ent.description}</p>
              <div class="text-[11px] text-slate-500 pt-1 font-mono truncate">
                Keyword: ${ent.sheetKeywords.join(', ')}
              </div>
            </div>
          `).join('')}
        </div>
      `
      }
    </div>
  `;
}

// Render the contents and table preview of the currently active file tab
function renderActiveFilePreview(file: ExcelFileTabItem): string {
  const activeSheet = file.sheets[file.activeSheetIndex] || file.sheets[0];
  if (!activeSheet) return '';

  const matchedEntity = MASTER_ENTITIES.find(e => e.key === file.targetEntityKey) || MASTER_ENTITIES[0];
  const query = (file.searchTerm || '').toLowerCase();
  const filteredRows = query
    ? activeSheet.rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(query)))
    : activeSheet.rows;

  const pageSize = 30;
  const page = file.previewPage || 1;
  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  // Check matching fields
  const missingRequired = matchedEntity.fields.filter(f => {
    if (!f.required) return false;
    return !activeSheet.headers.some(h => {
      const cleanH = h.trim().toLowerCase();
      return cleanH === f.key.toLowerCase() || f.excelAliases.some(alias => cleanH.includes(alias.toLowerCase()));
    });
  });

  return `
    <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-4">
      <!-- File Metadata & Target Selector -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <span>${file.fileName}</span>
              <span class="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">${file.fileSize}</span>
            </h3>
            <span class="text-xs text-slate-500 font-mono">Diunggah: ${file.uploadedAt}</span>
          </div>

          <!-- Target Entity Selector -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span class="text-slate-400 font-medium">Target Master Data:</span>
            <select id="select-file-target-entity" class="px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold focus:outline-none cursor-pointer">
              ${MASTER_ENTITIES.map(
                ent => `<option value="${ent.key}" ${ent.key === file.targetEntityKey ? 'selected' : ''}>${ent.name} (${ent.code})</option>`
              ).join('')}
            </select>

            ${
              missingRequired.length === 0
                ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Semua Kolom Wajib Terpetakan
                  </span>`
                : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Periksa Kolom: ${missingRequired.map(f => f.label).join(', ')}
                  </span>`
            }
          </div>
        </div>

        <!-- Action: Save this File -->
        <div class="flex items-center gap-2">
          <button id="btn-save-single-file" type="button" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Simpan File Ini ke ${matchedEntity.name}</span>
          </button>
        </div>
      </div>

      <!-- Multi-Sheet Sub-Tabs if File Has Multiple Sheets -->
      ${
        file.sheets.length > 1
          ? `
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          <span class="text-xs font-semibold text-slate-400 whitespace-nowrap">Pilih Sheet:</span>
          ${file.sheets
            .map((s, sIdx) => {
              const isSelectedSheet = sIdx === file.activeSheetIndex;
              return `
              <button type="button" data-sub-sheet-index="${sIdx}" class="btn-select-sub-sheet px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                isSelectedSheet
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
              }">
                <span>${s.name}</span>
                <span class="font-mono text-[10px] ml-1 opacity-70">(${s.rows.length})</span>
              </button>
            `;
            })
            .join('')}
        </div>
      `
          : ''
      }

      <!-- Search & Preview Stats Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <input
            type="text"
            id="input-search-sheet-preview"
            placeholder="Cari data dalam file ini..."
            value="${file.searchTerm || ''}"
            class="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 w-64"
          />
          <span class="text-xs font-mono text-slate-400">
            Menampilkan <strong class="text-white">${pagedRows.length}</strong> dari <strong class="text-white">${filteredRows.length}</strong> baris
          </span>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-2 text-xs">
          <button id="btn-prev-preview-page" ${page <= 1 ? 'disabled' : ''} class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 cursor-pointer">
            &larr; Prev
          </button>
          <span class="font-mono text-slate-400">${page} / ${totalPages}</span>
          <button id="btn-next-preview-page" ${page >= totalPages ? 'disabled' : ''} class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 cursor-pointer">
            Next &rarr;
          </button>
        </div>
      </div>

      <!-- Preview Table Container -->
      <div class="w-full overflow-x-auto max-h-[400px] rounded-xl border border-slate-800">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-900 text-slate-300 font-bold sticky top-0 border-b border-slate-800 z-10">
            <tr>
              <th class="p-2.5 w-10 text-center text-slate-500">No</th>
              ${activeSheet.headers.map(h => `<th class="p-2.5 whitespace-nowrap font-mono text-cyan-300/90">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 bg-slate-950/40">
            ${
              pagedRows.length > 0
                ? pagedRows
                    .map((row, idx) => {
                      const rowNum = (page - 1) * pageSize + idx + 1;
                      return `
                      <tr class="hover:bg-slate-900/60 transition-colors">
                        <td class="p-2.5 text-center font-mono text-slate-500">${rowNum}</td>
                        ${activeSheet.headers
                          .map(h => {
                            const val = row[h];
                            const isCurrency = typeof val === 'number' && val > 10000;
                            return `<td class="p-2.5 whitespace-nowrap text-slate-300 font-mono">${
                              isCurrency ? formatRupiah(val) : val !== undefined && val !== null ? String(val) : '-'
                            }</td>`;
                          })
                          .join('')}
                      </tr>
                    `;
                    })
                    .join('')
                : `
              <tr>
                <td colspan="${activeSheet.headers.length + 1}" class="p-8 text-center text-slate-500">
                  Tidak ada data yang cocok dengan pencarian.
                </td>
              </tr>
            `
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// SECTION 2: DATABASE VIEW & MANAGEMENT
// ----------------------------------------------------------------------------
function renderDatabaseViewSection(config: MasterEntityConfig): string {
  return `
    <div class="space-y-4">
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${config.badge}</span>
          <div>
            <h3 class="text-sm font-bold text-white">${config.name}</h3>
            <p class="text-xs text-slate-400">${config.description}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-export-current-entity-excel" type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Ekspor ke Excel</span>
          </button>

          <button id="btn-clear-entity-data" type="button" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/30 transition-all cursor-pointer">
            Kosongkan Tabel
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <input
            type="text"
            id="input-search-master-table"
            placeholder="Cari dalam database ${config.name}..."
            class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div id="master-records-count-badge" class="text-xs font-mono text-cyan-400 font-bold">
          Memuat data...
        </div>
      </div>

      <div id="master-live-table-container" class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 min-h-[220px]">
        <div class="py-12 text-center text-slate-500 text-xs">Memuat data dari database Cloud...</div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// SECTION 3: MANUAL SINGLE ENTRY
// ----------------------------------------------------------------------------
function renderManualEntrySection(config: MasterEntityConfig): string {
  return `
    <div class="space-y-5 max-w-3xl mx-auto">
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-white">Input Manual: ${config.name}</h3>
          <p class="text-xs text-slate-400">${config.description}</p>
        </div>
        <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 font-mono">${config.code}</span>
      </div>

      <form id="form-manual-master-entry" class="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${config.fields
            .map(f => {
              if (f.type === 'select' && f.options) {
                return `
                <div class="space-y-1">
                  <label class="block text-xs font-medium text-slate-300">${f.label} ${f.required ? '<span class="text-rose-400">*</span>' : ''}</label>
                  <select name="${f.key}" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400">
                    ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                  </select>
                </div>
              `;
              }
              return `
              <div class="space-y-1">
                <label class="block text-xs font-medium text-slate-300">${f.label} ${f.required ? '<span class="text-rose-400">*</span>' : ''}</label>
                <input
                  type="${f.type === 'number' || f.type === 'currency' ? 'number' : f.type === 'date' ? 'date' : 'text'}"
                  name="${f.key}"
                  ${f.required ? 'required' : ''}
                  placeholder="${f.placeholder || ''}"
                  class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            `;
            })
            .join('')}
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-3">
          <button type="reset" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer">
            Reset
          </button>
          <button type="submit" value="save_and_new" class="px-4 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-500/40 hover:bg-cyan-900/50 cursor-pointer">
            Simpan & Buat Lagi
          </button>
          <button type="submit" value="save" class="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 shadow-md shadow-cyan-500/30 cursor-pointer">
            Simpan ke Master
          </button>
        </div>
      </form>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// EVENT LISTENERS & LOGIC
// ----------------------------------------------------------------------------
function attachHubEventHandlers(container: HTMLElement, isModal: boolean) {
  // Close Modal
  const closeBtn = document.getElementById('btn-close-master-hub');
  if (closeBtn) closeBtn.onclick = () => closeMasterImportHub();

  // Tab switchers
  const tabExcel = document.getElementById('hub-tab-excel');
  const tabView = document.getElementById('hub-tab-view');
  const tabManual = document.getElementById('hub-tab-manual');

  if (tabExcel) {
    tabExcel.onclick = () => {
      state.activeTab = 'excel';
      renderMasterHubContent(container, isModal);
    };
  }
  if (tabView) {
    tabView.onclick = () => {
      state.activeTab = 'view';
      renderMasterHubContent(container, isModal);
      const ent = MASTER_ENTITIES.find(e => e.key === state.selectedEntityKey) || MASTER_ENTITIES[0];
      loadMasterTableData(ent);
    };
  }
  if (tabManual) {
    tabManual.onclick = () => {
      state.activeTab = 'manual';
      renderMasterHubContent(container, isModal);
    };
  }

  // Entity selector in header for view/manual
  const entitySelector = document.getElementById('hub-entity-selector') as HTMLSelectElement | null;
  if (entitySelector) {
    entitySelector.onchange = e => {
      state.selectedEntityKey = (e.target as HTMLSelectElement).value;
      renderMasterHubContent(container, isModal);
      if (state.activeTab === 'view') {
        const ent = MASTER_ENTITIES.find(x => x.key === state.selectedEntityKey) || MASTER_ENTITIES[0];
        loadMasterTableData(ent);
      }
    };
  }

  // File Upload Handling (Drop Zone)
  const fileInput = document.getElementById('excel-file-input') as HTMLInputElement | null;
  if (fileInput) {
    fileInput.onchange = async e => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        await processUploadedExcelFiles(files, container, isModal);
      }
    };
  }

  // Add More Excel Files (from Tab Bar)
  const addMoreInputs = document.querySelectorAll('.btn-add-more-excel');
  addMoreInputs.forEach(input => {
    (input as HTMLInputElement).onchange = async e => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        await processUploadedExcelFiles(files, container, isModal);
      }
    };
  });

  // Select File Tab Click
  const fileTabBtns = document.querySelectorAll('.btn-select-file-tab');
  fileTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-file-index') || '0', 10);
      state.activeFileIndex = idx;
      renderMasterHubContent(container, isModal);
    });
  });

  // Remove File Tab Click
  const removeFileBtns = document.querySelectorAll('.btn-remove-file-tab');
  removeFileBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-remove-file-index') || '0', 10);
      state.uploadedFiles.splice(idx, 1);
      if (state.activeFileIndex >= state.uploadedFiles.length) {
        state.activeFileIndex = Math.max(0, state.uploadedFiles.length - 1);
      }
      renderMasterHubContent(container, isModal);
    });
  });

  // Clear All File Tabs
  const clearAllTabsBtn = document.getElementById('btn-clear-all-file-tabs');
  if (clearAllTabsBtn) {
    clearAllTabsBtn.onclick = () => {
      if (confirm('Tutup semua tab file Excel yang terbuka?')) {
        state.uploadedFiles = [];
        state.activeFileIndex = 0;
        renderMasterHubContent(container, isModal);
      }
    };
  }

  // Sub-Sheet Selectors (Within active file)
  const subSheetBtns = document.querySelectorAll('.btn-select-sub-sheet');
  subSheetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sIdx = parseInt(btn.getAttribute('data-sub-sheet-index') || '0', 10);
      const activeFile = state.uploadedFiles[state.activeFileIndex];
      if (activeFile) {
        activeFile.activeSheetIndex = sIdx;
        activeFile.previewPage = 1;
        renderMasterHubContent(container, isModal);
      }
    });
  });

  // Target Entity Change for Active File
  const targetEntitySelect = document.getElementById('select-file-target-entity') as HTMLSelectElement | null;
  if (targetEntitySelect && state.uploadedFiles[state.activeFileIndex]) {
    targetEntitySelect.onchange = e => {
      const chosen = (e.target as HTMLSelectElement).value;
      state.uploadedFiles[state.activeFileIndex].targetEntityKey = chosen;
      renderMasterHubContent(container, isModal);
    };
  }

  // Preview Search Input
  const previewSearchInput = document.getElementById('input-search-sheet-preview') as HTMLInputElement | null;
  if (previewSearchInput && state.uploadedFiles[state.activeFileIndex]) {
    previewSearchInput.oninput = e => {
      const val = (e.target as HTMLInputElement).value;
      state.uploadedFiles[state.activeFileIndex].searchTerm = val;
      state.uploadedFiles[state.activeFileIndex].previewPage = 1;
      renderMasterHubContent(container, isModal);
    };
  }

  // Preview Pagination
  const prevBtn = document.getElementById('btn-prev-preview-page');
  const nextBtn = document.getElementById('btn-next-preview-page');
  const curFile = state.uploadedFiles[state.activeFileIndex];
  if (prevBtn && curFile) {
    prevBtn.onclick = () => {
      curFile.previewPage = Math.max(1, (curFile.previewPage || 1) - 1);
      renderMasterHubContent(container, isModal);
    };
  }
  if (nextBtn && curFile) {
    nextBtn.onclick = () => {
      curFile.previewPage = (curFile.previewPage || 1) + 1;
      renderMasterHubContent(container, isModal);
    };
  }

  // Save Single Active File
  const saveSingleFileBtn = document.getElementById('btn-save-single-file');
  if (saveSingleFileBtn && curFile) {
    saveSingleFileBtn.onclick = async () => {
      await saveFileToDatabase(curFile, container, isModal);
    };
  }

  // Save All Open Files
  const saveAllFilesBtn = document.getElementById('btn-save-all-open-files');
  if (saveAllFilesBtn) {
    saveAllFilesBtn.onclick = async () => {
      await saveAllOpenFiles(container, isModal);
    };
  }

  // Manual Form Submit
  const manualForm = document.getElementById('form-manual-master-entry') as HTMLFormElement | null;
  if (manualForm) {
    const actEnt = MASTER_ENTITIES.find(e => e.key === state.selectedEntityKey) || MASTER_ENTITIES[0];
    manualForm.onsubmit = async e => {
      e.preventDefault();
      const submitter = (e as any).submitter as HTMLButtonElement | undefined;
      const isSaveAndNew = submitter?.value === 'save_and_new';
      await handleManualFormSubmit(manualForm, actEnt, isSaveAndNew, container, isModal);
    };
  }

  // Load View tab table if on view tab
  if (state.activeTab === 'view') {
    const actEnt = MASTER_ENTITIES.find(e => e.key === state.selectedEntityKey) || MASTER_ENTITIES[0];
    loadMasterTableData(actEnt);
  }
}

// ----------------------------------------------------------------------------
// EXCEL PARSING: READ MULTI-FILES INTO 1 TAB PER FILE
// ----------------------------------------------------------------------------
async function processUploadedExcelFiles(files: FileList | File[], container: HTMLElement, isModal: boolean) {
  const XLSX = window.XLSX;
  if (!XLSX) {
    showHubNotification('Pustaka SheetJS belum dimuat. Periksa sambungan berkas.', 'error');
    return;
  }

  showHubNotification(`Sedang membaca ${files.length} file Excel master...`, 'info');

  for (let fIdx = 0; fIdx < files.length; fIdx++) {
    const file = files[fIdx];
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

      if (!workbook.SheetNames || workbook.SheetNames.length === 0) continue;

      const sheets: ExcelSheetData[] = [];
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        if (rows && rows.length > 0) {
          const headers = Object.keys(rows[0] || {});
          const suggested = detectMatchingEntity(file.name, sheetName, headers);
          sheets.push({
            name: sheetName,
            rows,
            headers,
            suggestedEntityKey: suggested
          });
        }
      }

      if (sheets.length > 0) {
        const initialEntity = sheets[0].suggestedEntityKey || 'OtrPrice';
        const fileTabItem: ExcelFileTabItem = {
          id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          fileName: file.name,
          fileSize: formatBytes(file.size),
          sheets,
          activeSheetIndex: 0,
          targetEntityKey: initialEntity,
          status: 'ready',
          uploadedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          previewPage: 1
        };

        state.uploadedFiles.push(fileTabItem);
        state.activeFileIndex = state.uploadedFiles.length - 1;
      }
    } catch (err: any) {
      console.warn(`Gagal membaca file ${file.name}:`, err);
      showHubNotification(`Peringatan: Gagal membaca "${file.name}": ${err.message}`, 'error');
    }
  }

  showHubNotification(`Berhasil memuat ${state.uploadedFiles.length} File Excel. Setiap file telah dibuatkan 1 Tab!`, 'success');
  renderMasterHubContent(container, isModal);
}

// Save Single File to Database
async function saveFileToDatabase(file: ExcelFileTabItem, container: HTMLElement, isModal: boolean) {
  const activeSheet = file.sheets[file.activeSheetIndex] || file.sheets[0];
  if (!activeSheet) return;

  const config = MASTER_ENTITIES.find(e => e.key === file.targetEntityKey) || MASTER_ENTITIES[0];
  state.isSaving = true;
  state.saveProgress = 10;
  state.saveMessage = `Menyiapkan ${activeSheet.rows.length} data dari "${file.fileName}" untuk ${config.name}...`;
  renderMasterHubContent(container, isModal);

  try {
    const formattedRecords = activeSheet.rows.map((row: any) => mapSheetRowToEntity(row, config));
    const BATCH_SIZE = 50;
    const total = formattedRecords.length;
    let savedCount = 0;

    for (let i = 0; i < total; i += BATCH_SIZE) {
      const chunk = formattedRecords.slice(i, i + BATCH_SIZE);
      const res = await fetch(`/api/entities/${config.key}/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk)
      });
      if (!res.ok) {
        throw new Error(`Gagal menyimpan batch data (status ${res.status})`);
      }
      savedCount += chunk.length;
      state.saveProgress = Math.min(95, Math.round((savedCount / total) * 100));
      state.saveMessage = `Menyimpan ${savedCount} dari ${total} data ke ${config.name}...`;
      updateProgressBar(state.saveProgress, state.saveMessage);
    }

    state.saveProgress = 100;
    state.saveMessage = `Selesai! Seluruh ${total} data berhasil disimpan ke ${config.name}.`;
    updateProgressBar(100, state.saveMessage);

    file.status = 'saved';
    file.savedCount = total;

    setTimeout(() => {
      state.isSaving = false;
      showHubNotification(`Sukses! ${total} data dari "${file.fileName}" telah disimpan ke ${config.name}.`, 'success');
      renderMasterHubContent(container, isModal);
    }, 600);
  } catch (err: any) {
    state.isSaving = false;
    file.status = 'error';
    showHubNotification(`Gagal simpan file: ${err.message}`, 'error');
    renderMasterHubContent(container, isModal);
  }
}

// Save All Open Files to Database
async function saveAllOpenFiles(container: HTMLElement, isModal: boolean) {
  if (state.uploadedFiles.length === 0) return;

  state.isSaving = true;
  state.saveProgress = 5;
  state.saveMessage = `Memulai penyimpanan seluruh ${state.uploadedFiles.length} file Excel...`;
  renderMasterHubContent(container, isModal);

  try {
    let grandTotal = 0;

    for (let fIdx = 0; fIdx < state.uploadedFiles.length; fIdx++) {
      const file = state.uploadedFiles[fIdx];
      const activeSheet = file.sheets[file.activeSheetIndex] || file.sheets[0];
      const config = MASTER_ENTITIES.find(e => e.key === file.targetEntityKey) || MASTER_ENTITIES[0];

      state.saveMessage = `Menyimpan File ${fIdx + 1}/${state.uploadedFiles.length} ("${file.fileName}" &rarr; ${config.name})...`;
      state.saveProgress = Math.round(((fIdx + 0.3) / state.uploadedFiles.length) * 100);
      updateProgressBar(state.saveProgress, state.saveMessage);

      const records = activeSheet.rows.map((row: any) => mapSheetRowToEntity(row, config));
      const BATCH_SIZE = 100;

      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const chunk = records.slice(i, i + BATCH_SIZE);
        await fetch(`/api/entities/${config.key}/bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(chunk)
        });
      }

      file.status = 'saved';
      file.savedCount = records.length;
      grandTotal += records.length;
    }

    state.saveProgress = 100;
    state.saveMessage = `Seluruh ${state.uploadedFiles.length} file berhasil disimpan! Total ${grandTotal} data tersimpan.`;
    updateProgressBar(100, state.saveMessage);

    setTimeout(() => {
      state.isSaving = false;
      showHubNotification(`Berhasil menyimpan seluruh ${state.uploadedFiles.length} File Excel (Total: ${grandTotal} data) ke Database!`, 'success');
      state.activeTab = 'view';
      renderMasterHubContent(container, isModal);
    }, 800);
  } catch (err: any) {
    state.isSaving = false;
    showHubNotification(`Gagal simpan semua file: ${err.message}`, 'error');
    renderMasterHubContent(container, isModal);
  }
}

function updateProgressBar(progress: number, label: string) {
  const bar = document.getElementById('hub-progress-bar');
  const val = document.getElementById('hub-progress-val');
  const lbl = document.getElementById('hub-progress-label');
  if (bar) bar.style.width = `${progress}%`;
  if (val) val.innerText = `${progress}%`;
  if (lbl) lbl.innerText = label;
}

// Manual Form Submit
async function handleManualFormSubmit(
  form: HTMLFormElement,
  config: MasterEntityConfig,
  isSaveAndNew: boolean,
  container: HTMLElement,
  isModal: boolean
) {
  const formData = new FormData(form);
  const data: Record<string, any> = {
    id: `${config.idPrefix}${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    created_date: new Date().toISOString()
  };

  for (const field of config.fields) {
    const rawVal = formData.get(field.key);
    if (field.required && (!rawVal || String(rawVal).trim() === '')) {
      showHubNotification(`Kolom "${field.label}" wajib diisi.`, 'error');
      const inputEl = form.querySelector(`[name="${field.key}"]`) as HTMLElement;
      if (inputEl) inputEl.focus();
      return;
    }
    if (field.type === 'number') {
      data[field.key] = parseInt(String(rawVal || 0).replace(/[^0-9-]/g, ''), 10) || 0;
    } else if (field.type === 'currency') {
      data[field.key] = parseFloat(String(rawVal || 0).replace(/[^0-9.-]/g, '')) || 0;
    } else {
      data[field.key] = String(rawVal || '').trim();
    }
  }

  if (config.key === 'OtrPrice') {
    data.search_text = `${data.brand || ''} ${data.model || ''} ${data.year || ''} ${data.object_description || ''}`.trim();
  }

  showHubNotification(`Menyimpan data baru ke ${config.name}...`, 'info');

  try {
    const res = await fetch(`/api/entities/${config.key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error(`Gagal menyimpan data (status ${res.status})`);
    }

    showHubNotification(`Data baru berhasil disimpan ke ${config.name}!`, 'success');

    if (isSaveAndNew) {
      form.reset();
      const firstInput = form.querySelector('input') as HTMLInputElement | null;
      if (firstInput) firstInput.focus();
    } else {
      state.activeTab = 'view';
      renderMasterHubContent(container, isModal);
      loadMasterTableData(config);
    }
  } catch (err: any) {
    showHubNotification(`Gagal menyimpan data: ${err.message}`, 'error');
  }
}

// ----------------------------------------------------------------------------
// VIEW AND MANAGE LIVE TABLE
// ----------------------------------------------------------------------------
async function loadMasterTableData(config: MasterEntityConfig) {
  const container = document.getElementById('master-live-table-container');
  const countBadge = document.getElementById('master-records-count-badge');
  if (!container) return;

  try {
    const res = await fetch(`/api/entities/${config.key}`);
    const rows: any[] = res.ok ? await res.json() : [];

    if (countBadge) {
      countBadge.innerText = `${rows.length} Data Tersimpan`;
    }

    if (rows.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-slate-300">Belum ada data untuk ${config.name}</p>
          <p class="text-xs text-slate-500">Gunakan tab 1. Baca & Import Excel untuk memasukkan data dari file Excel.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="w-full overflow-x-auto max-h-[480px]">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-900 text-slate-300 font-bold sticky top-0 border-b border-slate-800 z-10">
            <tr>
              <th class="p-3 w-12 text-center text-slate-500">No</th>
              ${config.fields.map(f => `<th class="p-3 whitespace-nowrap">${f.label}</th>`).join('')}
              <th class="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody id="master-table-tbody" class="divide-y divide-slate-800/60 bg-slate-950/40">
            ${renderTableRowsHtml(rows, config)}
          </tbody>
        </table>
      </div>
    `;

    attachTableSearch(rows, config);
    attachRowDeleteHandlers(config);
    attachExportExcelButton(rows, config);
    attachClearEntityButton(config);
  } catch (err: any) {
    container.innerHTML = `<div class="p-4 text-rose-400">Gagal memuat data: ${err.message}</div>`;
  }
}

function renderTableRowsHtml(rows: any[], config: MasterEntityConfig): string {
  return rows
    .map((row, idx) => {
      return `
      <tr class="hover:bg-slate-900/60 transition-colors" data-row-id="${row.id}">
        <td class="p-3 text-center font-mono text-slate-500">${idx + 1}</td>
        ${config.fields
          .map(f => {
            const val = row[f.key];
            if (f.type === 'currency') {
              return `<td class="p-3 whitespace-nowrap font-mono font-bold text-cyan-300">${formatRupiah(val)}</td>`;
            }
            if (f.type === 'number') {
              return `<td class="p-3 whitespace-nowrap font-mono text-slate-200">${val ?? 0}</td>`;
            }
            return `<td class="p-3 whitespace-nowrap text-slate-300">${val ?? '-'}</td>`;
          })
          .join('')}
        <td class="p-3 text-right whitespace-nowrap">
          <button type="button" data-del-id="${row.id}" class="btn-delete-row text-rose-400 hover:text-rose-200 p-1 rounded-lg hover:bg-rose-500/20 transition-all cursor-pointer" title="Hapus baris ini">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </td>
      </tr>
    `;
    })
    .join('');
}

function attachTableSearch(rows: any[], config: MasterEntityConfig) {
  const searchInput = document.getElementById('input-search-master-table') as HTMLInputElement | null;
  const tbody = document.getElementById('master-table-tbody');
  if (!searchInput || !tbody) return;

  searchInput.oninput = e => {
    const query = (e.target as HTMLInputElement).value.trim().toLowerCase();
    if (!query) {
      tbody.innerHTML = renderTableRowsHtml(rows, config);
      attachRowDeleteHandlers(config);
      return;
    }
    const filtered = rows.filter(r => {
      return Object.values(r).some(v => String(v).toLowerCase().includes(query));
    });
    tbody.innerHTML = renderTableRowsHtml(filtered, config);
    attachRowDeleteHandlers(config);
  };
}

function attachRowDeleteHandlers(config: MasterEntityConfig) {
  const delBtns = document.querySelectorAll('.btn-delete-row');
  delBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-del-id');
      if (!id) return;
      if (confirm(`Yakin ingin menghapus data dengan ID ${id}?`)) {
        try {
          await fetch(`/api/entities/${config.key}/${id}`, {
            method: 'DELETE'
          });
          const rowEl = document.querySelector(`tr[data-row-id="${id}"]`);
          if (rowEl) rowEl.remove();
          showHubNotification(`Data berhasil dihapus dari ${config.name}.`, 'success');
        } catch (err: any) {
          showHubNotification(`Gagal menghapus: ${err.message}`, 'error');
        }
      }
    });
  });
}

function attachExportExcelButton(rows: any[], config: MasterEntityConfig) {
  const exportBtn = document.getElementById('btn-export-current-entity-excel');
  if (!exportBtn) return;
  exportBtn.onclick = () => {
    try {
      const XLSX = window.XLSX;
      if (!XLSX) {
        alert('Fitur SheetJS belum tersedia.');
        return;
      }
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, config.code);
      XLSX.writeFile(wb, `${config.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (e: any) {
      alert('Export gagal: ' + e.message);
    }
  };
}

function attachClearEntityButton(config: MasterEntityConfig) {
  const clearBtn = document.getElementById('btn-clear-entity-data');
  if (!clearBtn) return;
  clearBtn.onclick = async () => {
    if (confirm(`PERINGATAN: Kosongkan seluruh data ${config.name}? Tindakan ini tidak dapat dibatalkan.`)) {
      try {
        await fetch(`/api/entities/${config.key}/delete-many`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: [] })
        });
        showHubNotification(`Seluruh data ${config.name} berhasil dikosongkan.`, 'success');
        loadMasterTableData(config);
      } catch (err: any) {
        showHubNotification(`Gagal mengosongkan data: ${err.message}`, 'error');
      }
    }
  };
}

// Hub Notification Helper
function showHubNotification(msg: string, type: 'success' | 'error' | 'info') {
  const box = document.getElementById('hub-notification-box');
  if (!box) return;
  box.classList.remove('hidden', 'bg-emerald-950/60', 'border-emerald-500/40', 'text-emerald-300', 'bg-rose-950/60', 'border-rose-500/40', 'text-rose-300', 'bg-cyan-950/60', 'border-cyan-500/40', 'text-cyan-300');
  if (type === 'success') {
    box.classList.add('bg-emerald-950/60', 'border-emerald-500/40', 'text-emerald-300');
  } else if (type === 'error') {
    box.classList.add('bg-rose-950/60', 'border-rose-500/40', 'text-rose-300');
  } else {
    box.classList.add('bg-cyan-950/60', 'border-cyan-500/40', 'text-cyan-300');
  }
  box.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : type === 'error' ? 'bg-rose-400' : 'bg-cyan-400'}"></span>
      <span class="font-medium">${msg}</span>
    </div>
    <button type="button" onclick="this.parentElement.classList.add('hidden')" class="text-slate-400 hover:text-white">&times;</button>
  `;
  if (type === 'success' || type === 'info') {
    setTimeout(() => {
      if (box) box.classList.add('hidden');
    }, 5000);
  }
}

// ----------------------------------------------------------------------------
// NATIVE MOUNT INTO PENGATURAN (NO FLOATING BUTTONS, SINGLE INTEGRATED MENU)
// ----------------------------------------------------------------------------
export function mountPengaturanMasterHub(target: HTMLElement | string) {
  const el = typeof target === 'string' ? document.getElementById(target) : target;
  if (!el) return;
  renderMasterHubContent(el, false);
}
window.mountPengaturanMasterHub = mountPengaturanMasterHub;

// Auto-check and mount into #pengaturan-excel-mount whenever user is on Pengaturan
export function initPengaturanAutoMount() {
  const checkMount = () => {
    const mountEl = document.getElementById('pengaturan-excel-mount');
    if (mountEl && !mountEl.hasAttribute('data-hub-mounted')) {
      mountEl.setAttribute('data-hub-mounted', 'true');
      mountPengaturanMasterHub(mountEl);
    }
  };

  // Run initial check and observer
  checkMount();
  setInterval(checkMount, 1000);

  // Watch for hashchange
  window.addEventListener('hashchange', () => {
    if (window.location.hash.toLowerCase().includes('pengaturan')) {
      setTimeout(checkMount, 200);
    }
  });
}

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPengaturanAutoMount());
  } else {
    initPengaturanAutoMount();
  }
}
