/**
 * Master Data & Import Hub
 * Multi-Sheet Excel Auto-Reader & Single-Entry Manual Form for Smart Taksasi
 * Handles: Master OTR, Master CLOP HO, Master BQ, Master Follow Up Gform, Master PriceList, Master Bahan Prospek
 */

declare global {
  interface Window {
    XLSX?: any;
    openMasterImportHub?: (defaultTab?: 'excel' | 'manual' | 'view', defaultEntity?: string) => void;
    closeMasterImportHub?: () => void;
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
    name: 'Master OTR',
    code: 'OTR',
    badge: 'Harga Pasar',
    description: 'Daftar harga pasar & taksasi unit motor per merk, model, dan tahun pembuatan.',
    sheetKeywords: ['OTR', 'HARGA', 'PRICE', 'MOTOR', 'TAKSASI'],
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
    key: 'BookingQuality',
    name: 'Master BQ',
    code: 'BQ',
    badge: 'Kualitas Booking',
    description: 'Data monitoring Booking Quality, jatuh tempo angsuran, dan status account nasabah.',
    sheetKeywords: ['BQ', 'BOOKING', 'QUALITY', 'ANGSURAN', 'JATUH TEMPO'],
    idPrefix: 'bq_',
    fields: [
      { key: 'contract_no', label: 'Nomor Kontrak', type: 'text', required: true, placeholder: '0123456789', excelAliases: ['contract_no', 'no kontrak', 'nomor kontrak', 'kontrak'] },
      { key: 'customer_name', label: 'Nama Konsumen', type: 'text', required: true, placeholder: 'Nama konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama nasabah', 'customer'] },
      { key: 'status_account', label: 'Status Account', type: 'select', required: true, options: ['Lancar', 'DPK', 'NPL', 'Menunggak', 'Lunas'], excelAliases: ['status_account', 'status account', 'status', 'kolektibilitas'] },
      { key: 'jatuh_tempo', label: 'Tanggal Jatuh Tempo', type: 'date', required: true, excelAliases: ['jatuh_tempo', 'jatuh tempo', 'tgl jatuh tempo', 'due date'] },
      { key: 'angsuran', label: 'Nilai Angsuran per Bulan', type: 'currency', placeholder: '850000', excelAliases: ['angsuran', 'installment', 'cicilan', 'nilai angsuran', 'angsuran per bulan'] },
      { key: 'marketing_name', label: 'Nama Marketing / Sales', type: 'text', placeholder: 'Nama marketing penanggung jawab', excelAliases: ['marketing_name', 'nama marketing', 'marketing', 'sales', 'pic'] }
    ]
  },
  {
    key: 'FollowUpBahan',
    name: 'Master Follow Up Gform',
    code: 'GFORM',
    badge: 'Leads Form',
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
    key: 'Prospect',
    name: 'Master Bahan Prospek',
    code: 'PROSPEK',
    badge: 'Database Pipeline',
    description: 'Kumpulan data calon debitur dan pipeline prospek kerja harian sales force.',
    sheetKeywords: ['PROSPEK', 'PROSPECT', 'PIPELINE', 'SALES', 'BAHAN PROSPEK'],
    idPrefix: 'pro_',
    fields: [
      { key: 'customer_name', label: 'Nama Konsumen Prospek', type: 'text', required: true, placeholder: 'Nama konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama', 'nama prospek', 'debitur'] },
      { key: 'phone', label: 'Nomor WhatsApp / HP', type: 'text', required: true, placeholder: '081234567890', excelAliases: ['phone', 'no hp', 'telepon', 'whatsapp', 'no wa'] },
      { key: 'motor', label: 'Unit Motor Taksasi', type: 'text', required: true, placeholder: 'Honda Scoopy 2022', excelAliases: ['motor', 'unit motor', 'unit', 'tipe motor', 'kendaraan'] },
      { key: 'plafond', label: 'Pengajuan Plafond', type: 'currency', placeholder: '12000000', excelAliases: ['plafond', 'plafon', 'pengajuan', 'kebutuhan pinjaman'] },
      { key: 'status', label: 'Status Pipeline', type: 'select', options: ['baru', 'proses', 'taksasi', 'deal', 'batal'], excelAliases: ['status', 'tahap', 'stage'] },
      { key: 'marketing_name', label: 'Nama Marketing', type: 'text', placeholder: 'Nama marketing', excelAliases: ['marketing_name', 'nama marketing', 'marketing'] }
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

// Active State in Hub
interface HubState {
  activeTab: 'excel' | 'manual' | 'view';
  selectedEntityKey: string;
  workbookData: {
    fileName: string;
    sheets: {
      name: string;
      rows: any[];
      headers: string[];
      suggestedEntityKey: string;
      mappedRecords: any[];
    }[];
  } | null;
  activeSheetIndex: number;
  isSaving: boolean;
  saveProgress: number;
  saveMessage: string;
}

const state: HubState = {
  activeTab: 'excel',
  selectedEntityKey: 'OtrPrice',
  workbookData: null,
  activeSheetIndex: 0,
  isSaving: false,
  saveProgress: 0,
  saveMessage: ''
};

// Open and Close Modal View
export function openMasterImportHub(defaultTab: 'excel' | 'manual' | 'view' = 'excel', defaultEntity = 'OtrPrice') {
  state.activeTab = defaultTab;
  state.selectedEntityKey = defaultEntity;
  let hub = document.getElementById('smart-master-import-hub-modal');
  if (!hub) {
    hub = document.createElement('div');
    hub.id = 'smart-master-import-hub-modal';
    hub.className = 'fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fadeIn';
    document.body.appendChild(hub);
  }
  renderHubView();
}

export function closeMasterImportHub() {
  const hub = document.getElementById('smart-master-import-hub-modal');
  if (hub) hub.remove();
}

window.openMasterImportHub = openMasterImportHub;
window.closeMasterImportHub = closeMasterImportHub;

// Smart Header / Field Matcher
function mapSheetRowToEntity(row: Record<string, any>, config: MasterEntityConfig): Record<string, any> {
  const item: Record<string, any> = {
    id: `${config.idPrefix}${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    created_date: new Date().toISOString()
  };

  const rowKeys = Object.keys(row);

  config.fields.forEach(field => {
    // Try exact or alias match
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
      // Default values
      if (field.type === 'number' || field.type === 'currency') item[field.key] = 0;
      else if (field.type === 'select' && field.options) item[field.key] = field.options[0];
      else item[field.key] = '';
    }
  });

  // Additional entity-specific logic
  if (config.key === 'OtrPrice') {
    item.search_text = `${item.brand || ''} ${item.model || ''} ${item.year || ''} ${item.object_description || ''}`.trim();
  }

  return item;
}

// Detect best matching entity for a sheet
function detectMatchingEntity(sheetName: string, headers: string[]): string {
  const cleanName = sheetName.toUpperCase();
  for (const ent of MASTER_ENTITIES) {
    if (ent.sheetKeywords.some(kw => cleanName.includes(kw))) {
      return ent.key;
    }
  }
  // Check headers
  const joinedHeaders = headers.join(' ').toLowerCase();
  if (joinedHeaders.includes('kontrak') && (joinedHeaders.includes('nosin') || joinedHeaders.includes('trend'))) return 'ClopContract';
  if (joinedHeaders.includes('angsuran') && joinedHeaders.includes('jatuh tempo')) return 'BookingQuality';
  if (joinedHeaders.includes('gform') || joinedHeaders.includes('follow up')) return 'FollowUpBahan';
  if (joinedHeaders.includes('tenor') && joinedHeaders.includes('dp')) return 'PriceList';
  if (joinedHeaders.includes('otr') || joinedHeaders.includes('harga pasar')) return 'OtrPrice';
  if (joinedHeaders.includes('prospek') || joinedHeaders.includes('pipeline')) return 'Prospect';

  return 'OtrPrice';
}

// Main Render Function
function renderHubView() {
  const container = document.getElementById('smart-master-import-hub-modal');
  if (!container) return;

  const activeEntity = MASTER_ENTITIES.find(e => e.key === state.selectedEntityKey) || MASTER_ENTITIES[0];

  container.innerHTML = `
    <div class="relative w-full max-w-6xl rounded-3xl bg-[#090f1d] border border-cyan-500/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(6,182,212,0.18)] text-slate-100 overflow-hidden my-auto flex flex-col max-h-[92vh]">
      
      <!-- Top Hub Header -->
      <div class="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800/80 bg-[#0d1629]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white">Master Data & Import Hub</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">Multi-Sheet Excel & Manual</span>
            </div>
            <p class="text-xs text-slate-400">Pusat import otomatis Excel semua sheet, input data manual satu per satu, dan kelola 6 master data</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button id="btn-refresh-hub-data" type="button" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer" title="Refresh data">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button id="btn-close-master-hub" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-700/60" title="Tutup Modal Hub">
            &times;
          </button>
        </div>
      </div>

      <!-- Segmented Main Tabs Bar -->
      <div class="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-5 sm:px-7 pt-2.5 gap-2">
        <div class="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
          <button id="hub-tab-excel" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            state.activeTab === 'excel' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>1. Import File Excel (Multi-Sheet)</span>
          </button>
          <button id="hub-tab-manual" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            state.activeTab === 'manual' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>2. Input Manual Satu-per-Satu</span>
          </button>
          <button id="hub-tab-view" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
            state.activeTab === 'view' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
          }">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>3. Kelola & Riwayat Master Data</span>
          </button>
        </div>

        <!-- Master Entity Selector Pill/Dropdown -->
        <div class="flex items-center gap-2 pb-2">
          <label class="text-[11px] text-slate-400 font-medium hidden sm:inline">Pilih Master:</label>
          <select id="hub-entity-select" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer">
            ${MASTER_ENTITIES.map(
              ent => `<option value="${ent.key}" ${ent.key === state.selectedEntityKey ? 'selected' : ''}>${ent.name} (${ent.code})</option>`
            ).join('')}
          </select>
        </div>
      </div>

      <!-- Hub Content Area -->
      <div class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
        
        <!-- Status Notification Box -->
        <div id="hub-notification-box" class="hidden p-3.5 rounded-2xl text-xs flex items-center justify-between border"></div>

        <!-- Progress Indicator Bar (if saving) -->
        <div id="hub-progress-container" class="${state.isSaving ? 'block' : 'hidden'} p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-cyan-300 font-semibold" id="hub-progress-label">${state.saveMessage || 'Sedang memproses...'}</span>
            <span class="font-mono text-cyan-400 font-bold" id="hub-progress-val">${state.saveProgress}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div id="hub-progress-bar" class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300" style="width: ${state.saveProgress}%;"></div>
          </div>
        </div>

        ${
          state.activeTab === 'excel'
            ? renderExcelImportSection(activeEntity)
            : state.activeTab === 'manual'
            ? renderManualInputSection(activeEntity)
            : renderDataViewSection(activeEntity)
        }

      </div>

      <!-- Hub Footer -->
      <div class="px-5 sm:px-7 py-3.5 border-t border-slate-800/80 bg-[#0d1629] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Database Terkoneksi: Cloud SQL PostgreSQL & Local Fallback Store</span>
        </div>
        <div class="flex items-center gap-3 font-mono text-[11px]">
          <span>App: Smart Taksasi V2.1.3</span>
          <span class="text-slate-600">|</span>
          <span class="text-cyan-400">SheetJS v0.18.5 Active</span>
        </div>
      </div>

    </div>
  `;

  attachHubEventListeners(activeEntity);
}

// ----------------------------------------------------------------------------
// SECTION 1: EXCEL MULTI-SHEET IMPORT
// ----------------------------------------------------------------------------
function renderExcelImportSection(activeEntity: MasterEntityConfig): string {
  const wb = state.workbookData;

  return `
    <div class="space-y-6">
      
      <!-- Entity Banner -->
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${activeEntity.badge}</span>
          <div>
            <h3 class="text-sm font-bold text-white">${activeEntity.name}</h3>
            <p class="text-xs text-slate-400">${activeEntity.description}</p>
          </div>
        </div>
        <div class="text-xs text-slate-400">
          Kolom wajib: <span class="font-mono text-cyan-300">${activeEntity.fields.filter(f => f.required).map(f => f.label).join(', ')}</span>
        </div>
      </div>

      <!-- Step 1: Upload Excel File Box -->
      <div id="excel-drop-zone" class="relative group border-2 border-dashed border-slate-700 hover:border-cyan-400/80 rounded-3xl p-6 sm:p-8 text-center transition-all bg-slate-950/40 hover:bg-slate-900/50 cursor-pointer">
        <input type="file" id="excel-file-input" accept=".xlsx, .xls, .csv" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
        <div class="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/10">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">Klik atau Tarik File Excel ke Sini (.xlsx, .xls, .csv)</h4>
            <p class="text-xs text-slate-400 mt-1">Sistem otomatis membaca seluruh Sheet dalam file Excel (Master OTR, CLOP HO, BQ, Follow Up Gform, PriceList, Prospek)</p>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-cyan-300 font-mono">
            <span>Mendukung file multi-sheet tak terbatas</span>
          </div>
        </div>
      </div>

      ${
        wb
          ? `
        <!-- Step 2: Multi-Sheet Inspector & Selector -->
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">File Terbaca: <span class="text-white font-mono">${wb.fileName}</span> (${wb.sheets.length} Sheet Ditemukan)</h4>
              <p class="text-xs text-slate-500">Pilih sheet di bawah ini untuk melihat pratinjau tabel dan menentukan target master data.</p>
            </div>
            
            <button id="btn-save-all-matching-sheets" type="button" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan Semua Sheet ke Database</span>
            </button>
          </div>

          <!-- Sheet Tabs Bar -->
          <div class="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            ${wb.sheets
              .map((sheet, idx) => {
                const isSelected = idx === state.activeSheetIndex;
                const ent = MASTER_ENTITIES.find(e => e.key === sheet.suggestedEntityKey);
                return `
                <button type="button" data-sheet-index="${idx}" class="btn-select-sheet flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-800'
                }">
                  <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-slate-600'}"></span>
                  <span class="font-bold">${sheet.name}</span>
                  <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300">${sheet.rows.length} baris</span>
                  ${ent ? `<span class="text-[10px] px-1 rounded bg-cyan-900/50 text-cyan-300 font-mono">${ent.code}</span>` : ''}
                </button>
              `;
              })
              .join('')}
          </div>

          <!-- Sheet Preview Details & Table -->
          ${renderActiveSheetPreview(wb.sheets[state.activeSheetIndex] || wb.sheets[0], activeEntity)}

        </div>
      `
          : ''
      }

    </div>
  `;
}

// Active Sheet Table Preview
function renderActiveSheetPreview(sheet: any, activeEntity: MasterEntityConfig): string {
  if (!sheet) return '';

  const matchedEntity = MASTER_ENTITIES.find(e => e.key === sheet.suggestedEntityKey) || activeEntity;
  const sampleRows = sheet.rows.slice(0, 30);

  return `
    <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-4">
      
      <!-- Sheet Action Controls -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div class="flex flex-wrap items-center gap-3">
          <div>
            <span class="text-xs text-slate-400">Target Simpan Master:</span>
            <select id="sheet-target-entity-select" class="ml-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold focus:outline-none">
              ${MASTER_ENTITIES.map(
                ent => `<option value="${ent.key}" ${ent.key === sheet.suggestedEntityKey ? 'selected' : ''}>${ent.name} (${ent.code})</option>`
              ).join('')}
            </select>
          </div>
          <div class="text-xs font-mono text-slate-400">
            Total: <span class="text-white font-bold">${sheet.rows.length}</span> baris data
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-save-current-sheet" type="button" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Simpan Sheet "${sheet.name}" ke ${matchedEntity.name}</span>
          </button>
        </div>
      </div>

      <!-- Columns Detected Badge List -->
      <div class="space-y-1.5">
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pemetaan Kolom Excel yang Terdeteksi:</div>
        <div class="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          ${sheet.headers
            .map((h: string) => {
              // check which field it matched
              const matchedField = matchedEntity.fields.find(f => {
                const cleanH = h.toLowerCase().trim();
                return cleanH === f.key.toLowerCase() || f.excelAliases.some(a => cleanH.includes(a.toLowerCase()));
              });
              return `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-900 border ${
                matchedField ? 'border-cyan-500/50 text-cyan-300' : 'border-slate-800 text-slate-400'
              }">
                <span class="font-medium">${h}</span>
                ${
                  matchedField
                    ? `<span class="text-[10px] text-emerald-400 font-mono">→ ${matchedField.label}</span>`
                    : '<span class="text-[10px] text-slate-500">(ekstra)</span>'
                }
              </span>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Preview Table -->
      <div class="overflow-x-auto rounded-xl border border-slate-800 max-h-[350px]">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-900 text-slate-300 font-bold sticky top-0 border-b border-slate-800">
            <tr>
              <th class="p-2.5 w-12 text-center text-slate-500">No</th>
              ${sheet.headers.map((h: string) => `<th class="p-2.5 whitespace-nowrap text-slate-200">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 bg-slate-950/40">
            ${
              sampleRows.length === 0
                ? `<tr><td colspan="${sheet.headers.length + 1}" class="p-4 text-center text-slate-500">Sheet kosong atau tidak ada data baris.</td></tr>`
                : sampleRows
                    .map((row: any, rIdx: number) => {
                      return `
                  <tr class="hover:bg-slate-900/50 transition-colors">
                    <td class="p-2.5 text-center font-mono text-slate-500">${rIdx + 1}</td>
                    ${sheet.headers
                      .map((h: string) => {
                        const val = row[h];
                        const displayVal = val !== undefined && val !== null ? String(val) : '';
                        const isNum = !isNaN(Number(displayVal)) && displayVal.trim() !== '';
                        return `<td class="p-2.5 whitespace-nowrap ${isNum ? 'font-mono text-cyan-200' : 'text-slate-300'}">${displayVal}</td>`;
                      })
                      .join('')}
                  </tr>
                `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between text-[11px] text-slate-500">
        <span>Menampilkan pratinjau ${sampleRows.length} dari total ${sheet.rows.length} baris.</span>
        <span>Seluruh baris akan diproses saat Anda menekan tombol simpan.</span>
      </div>

    </div>
  `;
}

// ----------------------------------------------------------------------------
// SECTION 2: MANUAL SINGLE-ENTRY FORM
// ----------------------------------------------------------------------------
function renderManualInputSection(activeEntity: MasterEntityConfig): string {
  return `
    <div class="space-y-6">
      
      <!-- Entity Banner -->
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${activeEntity.badge}</span>
          <div>
            <h3 class="text-sm font-bold text-white">Formulir Input Langsung: ${activeEntity.name}</h3>
            <p class="text-xs text-slate-400">Masukkan data satu per satu dengan validasi kolom otomatis sebelum disimpan ke database</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-emerald-400 flex items-center gap-1 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            Siap Input
          </span>
        </div>
      </div>

      <!-- Main Input Form -->
      <form id="form-manual-master-entry" class="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 sm:p-7 space-y-6">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          ${activeEntity.fields
            .map(field => {
              const reqBadge = field.required ? '<span class="text-rose-400 font-bold ml-1">*</span>' : '<span class="text-slate-500 text-[10px] ml-1">(opsional)</span>';

              if (field.type === 'select' && field.options) {
                return `
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-300">${field.label}${reqBadge}</label>
                  <select name="${field.key}" ${field.required ? 'required' : ''} class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer">
                    ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                  </select>
                </div>
              `;
              }

              if (field.type === 'currency') {
                return `
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-300">${field.label}${reqBadge}</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-2.5 text-xs text-cyan-400 font-bold">Rp</span>
                    <input type="number" step="any" name="${field.key}" placeholder="${field.placeholder || '0'}" ${
                  field.required ? 'required' : ''
                } class="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                  </div>
                </div>
              `;
              }

              if (field.type === 'date') {
                const today = new Date().toISOString().slice(0, 10);
                return `
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-300">${field.label}${reqBadge}</label>
                  <input type="date" name="${field.key}" value="${today}" ${
                  field.required ? 'required' : ''
                } class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                </div>
              `;
              }

              return `
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-300">${field.label}${reqBadge}</label>
                <input type="${field.type}" name="${field.key}" placeholder="${field.placeholder || ''}" ${
                field.required ? 'required' : ''
              } class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
              </div>
            `;
            })
            .join('')}
        </div>

        <!-- Form Actions -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div class="text-[11px] text-slate-400">
            Kolom dengan tanda <span class="text-rose-400 font-bold">*</span> wajib diisi sebelum menyimpan.
          </div>
          
          <div class="flex items-center gap-2">
            <button type="reset" id="btn-reset-manual-form" class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer">
              Reset Form
            </button>
            <button type="submit" name="action" value="save_and_new" class="px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 transition-all active:scale-95 cursor-pointer">
              Simpan & Buat Baru
            </button>
            <button type="submit" name="action" value="save" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan ke ${activeEntity.name}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  `;
}

// ----------------------------------------------------------------------------
// SECTION 3: VIEW & MANAGE STORED MASTER DATA
// ----------------------------------------------------------------------------
function renderDataViewSection(activeEntity: MasterEntityConfig): string {
  return `
    <div class="space-y-4">
      
      <!-- Top Explorer Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="flex items-center gap-3">
          <div class="relative w-64 sm:w-80">
            <input type="text" id="input-search-master-table" placeholder="Cari data ${activeEntity.name}..." class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400" />
            <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span id="master-records-count-badge" class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 text-cyan-300 border border-cyan-500/30">
            Memuat...
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-export-current-entity-excel" type="button" class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer" title="Download Excel">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Excel
          </button>
          <button id="btn-clear-entity-data" type="button" class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all cursor-pointer" title="Hapus seluruh data entity ini">
            Kosongkan
          </button>
        </div>
      </div>

      <!-- Live Master Data Table Container -->
      <div id="master-live-table-container" class="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden min-h-[250px] p-4 flex items-center justify-center text-slate-500 text-xs">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-cyan-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Memuat data ${activeEntity.name}...</span>
        </div>
      </div>

    </div>
  `;
}

// ----------------------------------------------------------------------------
// EVENT LISTENERS & LOGIC
// ----------------------------------------------------------------------------
function attachHubEventListeners(activeEntity: MasterEntityConfig) {
  // Close Button
  const closeBtn = document.getElementById('btn-close-master-hub');
  if (closeBtn) closeBtn.onclick = closeMasterImportHub;

  // Refresh Button
  const refreshBtn = document.getElementById('btn-refresh-hub-data');
  if (refreshBtn) refreshBtn.onclick = () => renderHubView();

  // Tab navigation
  const tabExcel = document.getElementById('hub-tab-excel');
  const tabManual = document.getElementById('hub-tab-manual');
  const tabView = document.getElementById('hub-tab-view');

  if (tabExcel)
    tabExcel.onclick = () => {
      state.activeTab = 'excel';
      renderHubView();
    };
  if (tabManual)
    tabManual.onclick = () => {
      state.activeTab = 'manual';
      renderHubView();
    };
  if (tabView)
    tabView.onclick = () => {
      state.activeTab = 'view';
      renderHubView();
      loadMasterTableData(activeEntity);
    };

  // Entity Select Dropdown
  const entitySelect = document.getElementById('hub-entity-select') as HTMLSelectElement | null;
  if (entitySelect) {
    entitySelect.onchange = e => {
      state.selectedEntityKey = (e.target as HTMLSelectElement).value;
      renderHubView();
      if (state.activeTab === 'view') {
        const ent = MASTER_ENTITIES.find(x => x.key === state.selectedEntityKey) || activeEntity;
        loadMasterTableData(ent);
      }
    };
  }

  // File Upload Handling
  const fileInput = document.getElementById('excel-file-input') as HTMLInputElement | null;
  if (fileInput) {
    fileInput.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      await processUploadedExcelFile(file, activeEntity);
    };
  }

  // Sheet Select Buttons
  const sheetBtns = document.querySelectorAll('.btn-select-sheet');
  sheetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-sheet-index') || '0', 10);
      state.activeSheetIndex = idx;
      renderHubView();
    });
  });

  // Sheet Target Entity Change
  const sheetTargetSelect = document.getElementById('sheet-target-entity-select') as HTMLSelectElement | null;
  if (sheetTargetSelect && state.workbookData && state.workbookData.sheets[state.activeSheetIndex]) {
    sheetTargetSelect.onchange = e => {
      const chosen = (e.target as HTMLSelectElement).value;
      if (state.workbookData) {
        state.workbookData.sheets[state.activeSheetIndex].suggestedEntityKey = chosen;
      }
      renderHubView();
    };
  }

  // Save Current Sheet Button
  const saveSheetBtn = document.getElementById('btn-save-current-sheet');
  if (saveSheetBtn && state.workbookData && state.workbookData.sheets[state.activeSheetIndex]) {
    saveSheetBtn.onclick = async () => {
      const currentSheet = state.workbookData!.sheets[state.activeSheetIndex];
      const targetKey = currentSheet.suggestedEntityKey || activeEntity.key;
      await saveSheetToDatabase(currentSheet, targetKey);
    };
  }

  // Save All Matching Sheets Button
  const saveAllBtn = document.getElementById('btn-save-all-matching-sheets');
  if (saveAllBtn && state.workbookData) {
    saveAllBtn.onclick = async () => {
      await saveAllWorkbookSheets(state.workbookData!);
    };
  }

  // Manual Form Submit
  const manualForm = document.getElementById('form-manual-master-entry') as HTMLFormElement | null;
  if (manualForm) {
    manualForm.onsubmit = async e => {
      e.preventDefault();
      const submitter = (e as any).submitter as HTMLButtonElement | undefined;
      const isSaveAndNew = submitter?.value === 'save_and_new';
      await handleManualFormSubmit(manualForm, activeEntity, isSaveAndNew);
    };
  }

  // Load View tab data if already on view tab
  if (state.activeTab === 'view') {
    loadMasterTableData(activeEntity);
  }
}

// ----------------------------------------------------------------------------
// EXCEL PARSING LOGIC VIA SHEETJS
// ----------------------------------------------------------------------------
async function processUploadedExcelFile(file: File, activeEntity: MasterEntityConfig) {
  showHubNotification(`Membaca file "${file.name}"...`, 'info');
  try {
    const arrayBuffer = await file.arrayBuffer();
    const XLSX = window.XLSX;

    if (!XLSX) {
      throw new Error('Pustaka SheetJS belum dimuat. Periksa koneksi lokal.');
    }

    const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error('File Excel tidak memiliki Sheet.');
    }

    const sheetList: any[] = [];

    for (const name of workbook.SheetNames) {
      const sheet = workbook.Sheets[name];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      if (rows && rows.length > 0) {
        const headers = Object.keys(rows[0] || {});
        const suggested = detectMatchingEntity(name, headers);
        sheetList.push({
          name,
          rows,
          headers,
          suggestedEntityKey: suggested
        });
      }
    }

    if (sheetList.length === 0) {
      throw new Error('Tidak ada data baris yang ditemukan dalam file Excel ini.');
    }

    state.workbookData = {
      fileName: file.name,
      sheets: sheetList
    };
    state.activeSheetIndex = 0;

    showHubNotification(`Berhasil membaca ${sheetList.length} Sheet dari "${file.name}". Pilih sheet dan periksa tabel pratinjau.`, 'success');
    renderHubView();
  } catch (err: any) {
    console.error('Excel parse error:', err);
    showHubNotification(`Gagal membaca Excel: ${err.message}`, 'error');
  }
}

// Save Single Sheet to Backend
async function saveSheetToDatabase(sheet: any, targetEntityKey: string) {
  const config = MASTER_ENTITIES.find(e => e.key === targetEntityKey) || MASTER_ENTITIES[0];
  state.isSaving = true;
  state.saveProgress = 10;
  state.saveMessage = `Menyiapkan ${sheet.rows.length} data untuk ${config.name}...`;
  renderHubView();

  try {
    const formattedRecords = sheet.rows.map((row: any) => mapSheetRowToEntity(row, config));

    const BATCH_SIZE = 50;
    const total = formattedRecords.length;
    let savedCount = 0;

    for (let i = 0; i < total; i += BATCH_SIZE) {
      const chunk = formattedRecords.slice(i, i + BATCH_SIZE);
      const res = await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${config.key}/bulk`, {
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

    setTimeout(() => {
      state.isSaving = false;
      showHubNotification(`Sukses! ${total} data dari Sheet "${sheet.name}" telah disimpan ke ${config.name}.`, 'success');
      state.activeTab = 'view';
      state.selectedEntityKey = config.key;
      renderHubView();
      loadMasterTableData(config);
    }, 600);
  } catch (err: any) {
    state.isSaving = false;
    showHubNotification(`Gagal simpan sheet: ${err.message}`, 'error');
    renderHubView();
  }
}

// Save All Workbook Sheets
async function saveAllWorkbookSheets(wbData: NonNullable<HubState['workbookData']>) {
  state.isSaving = true;
  state.saveProgress = 5;
  state.saveMessage = `Memulai penyimpanan multi-sheet (${wbData.sheets.length} sheet)...`;
  renderHubView();

  try {
    let grandTotal = 0;
    for (let sIdx = 0; sIdx < wbData.sheets.length; sIdx++) {
      const sheet = wbData.sheets[sIdx];
      const config = MASTER_ENTITIES.find(e => e.key === sheet.suggestedEntityKey) || MASTER_ENTITIES[0];
      const records = sheet.rows.map((row: any) => mapSheetRowToEntity(row, config));

      state.saveMessage = `Menyimpan Sheet ${sIdx + 1}/${wbData.sheets.length} ("${sheet.name}" -> ${config.name})...`;
      state.saveProgress = Math.round(((sIdx + 0.3) / wbData.sheets.length) * 100);
      updateProgressBar(state.saveProgress, state.saveMessage);

      // Bulk post
      const BATCH_SIZE = 100;
      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const chunk = records.slice(i, i + BATCH_SIZE);
        await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${config.key}/bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(chunk)
        });
      }
      grandTotal += records.length;
    }

    state.saveProgress = 100;
    state.saveMessage = `Semua sheet berhasil disimpan! Total ${grandTotal} data ditambahkan.`;
    updateProgressBar(100, state.saveMessage);

    setTimeout(() => {
      state.isSaving = false;
      showHubNotification(`Berhasil mengimpor seluruh ${wbData.sheets.length} Sheet (Total: ${grandTotal} data) ke Database!`, 'success');
      state.activeTab = 'view';
      renderHubView();
    }, 800);
  } catch (err: any) {
    state.isSaving = false;
    showHubNotification(`Gagal simpan semua sheet: ${err.message}`, 'error');
    renderHubView();
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

// ----------------------------------------------------------------------------
// MANUAL SINGLE ENTRY SUBMIT
// ----------------------------------------------------------------------------
async function handleManualFormSubmit(form: HTMLFormElement, config: MasterEntityConfig, isSaveAndNew: boolean) {
  const formData = new FormData(form);
  const data: Record<string, any> = {
    id: `${config.idPrefix}${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    created_date: new Date().toISOString()
  };

  // Validate required fields
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
    const res = await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${config.key}`, {
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
      renderHubView();
      loadMasterTableData(config);
    }
  } catch (err: any) {
    console.error('Manual save error:', err);
    showHubNotification(`Gagal menyimpan data: ${err.message}`, 'error');
  }
}

// ----------------------------------------------------------------------------
// VIEW AND MANAGE TABLE
// ----------------------------------------------------------------------------
async function loadMasterTableData(config: MasterEntityConfig) {
  const container = document.getElementById('master-live-table-container');
  const countBadge = document.getElementById('master-records-count-badge');
  if (!container) return;

  try {
    const res = await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${config.key}`);
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
          <p class="text-xs text-slate-500">Gunakan tab Import Excel atau Input Manual untuk memasukkan data master.</p>
        </div>
      `;
      return;
    }

    // Render Table
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

    // Attach Row Delete and Search
    attachTableSearch(rows, config);
    attachRowDeleteHandlers(config);
    attachExportExcelButton(rows, config);
    attachClearEntityButton(config);
  } catch (err: any) {
    console.error('Load master table error:', err);
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

  searchInput.oninput = () => {
    const query = searchInput.value.toLowerCase().trim();
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
          await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${config.key}/${id}`, {
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
        await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${config.key}/delete-many`, {
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
// INJECT TAB MENU INTO MAIN APP UI
// ----------------------------------------------------------------------------
export function injectMasterHubNavTab() {
  // 1. In top navigation bar next to user status
  let topBtn = document.getElementById('btn-top-master-hub-tab');
  if (!topBtn) {
    topBtn = document.createElement('button');
    topBtn.id = 'btn-top-master-hub-tab';
    topBtn.className =
      'fixed top-3 right-[180px] sm:top-4 sm:right-[230px] z-[9988] hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c1527]/90 hover:bg-[#13223f] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-bold shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all active:scale-95 cursor-pointer backdrop-blur-md';
    topBtn.innerHTML = `
      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
      </svg>
      <span>Master Data Hub</span>
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
    `;
    topBtn.onclick = () => openMasterImportHub('excel');
    document.body.appendChild(topBtn);
  }

  // 2. Add floating quick button for mobile view
  let mobileFloatingBtn = document.getElementById('btn-mobile-master-hub-tab');
  if (!mobileFloatingBtn) {
    mobileFloatingBtn = document.createElement('button');
    mobileFloatingBtn.id = 'btn-mobile-master-hub-tab';
    mobileFloatingBtn.className =
      'sm:hidden fixed bottom-20 right-4 z-[9988] flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-[0_10px_25px_rgba(6,182,212,0.4)] active:scale-95 transition-all cursor-pointer';
    mobileFloatingBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Import Hub</span>
    `;
    mobileFloatingBtn.onclick = () => openMasterImportHub('excel');
    document.body.appendChild(mobileFloatingBtn);
  }

  // 3. Inject into Sidebar / Navigation DOM dynamically
  // Sidebar mutation removed to preserve React Fiber stability and avoid duplicate import menus

  // 4. Hash change listener
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#master-hub' || window.location.hash === '#master-data') {
      openMasterImportHub('excel');
    }
  });
  if (window.location.hash === '#master-hub' || window.location.hash === '#master-data') {
    openMasterImportHub('excel');
  }
}
