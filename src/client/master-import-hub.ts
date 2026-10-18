/**
 * Smart Taksasi - Master Data & Import Hub (V2.2)
 * "1 Tab 1 Pengimportan Master" Architecture
 * 
 * Provides dedicated tabs for each master entity:
 * 1. Master OTR (Harga Pasar Motor)
 * 2. Master CLOP HO (Kontrak Nasabah)
 * 3. Master BQ (Booking Quality & Angsuran)
 * 4. Master Follow Up Gform (Leads Online)
 * 5. Master PriceList (Skema Simulasi Angsuran)
 * 6. Master Bahan Prospek (Pipeline Sales)
 * 7. Master Target (Target Marketing & Sales)
 * 
 * Features:
 * - Resilient Multi-Format Excel & CSV Reader (.xlsx, .xls, .csv)
 * - Smart Header Auto-Detector (finds headers even if Row 1 has title banner)
 * - Multi-Sheet Navigator with Sheet Selector
 * - 1-Click Official Excel Template (.xlsx) Generator with sample data
 * - Live Data Preview with column mapping verification before import
 * - Safe Batch Upload with Animated Progress Bar
 * - Single-Entry Manual Form per Master
 * - Searchable Live Data Management Table with Export & Delete options
 */

declare global {
  interface Window {
    XLSX?: any;
    openMasterImportHub?: (defaultEntityOrTab?: string, defaultAction?: 'upload' | 'manual' | 'table') => void;
    closeMasterImportHub?: () => void;
    mountMasterImportHub?: () => void;
    downloadEntityExcelTemplate?: (entityKey: string) => void;
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
  icon: string;
  description: string;
  sheetKeywords: string[];
  idPrefix: string;
  fields: EntityField[];
  sampleData: Record<string, any>[];
}

export const MASTER_ENTITIES: MasterEntityConfig[] = [
  {
    key: 'OtrPrice',
    name: 'Master OTR',
    code: 'OTR',
    badge: 'Harga Pasar',
    icon: `<svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 8h4.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16h-2"/></svg>`,
    description: 'Daftar harga pasar & taksasi unit motor per merk, tipe, dan tahun pembuatan.',
    sheetKeywords: ['OTR', 'HARGA', 'PRICE', 'MOTOR', 'TAKSASI'],
    idPrefix: 'otr_',
    fields: [
      { key: 'brand', label: 'Merk Motor', type: 'select', required: true, options: ['HONDA', 'YAMAHA', 'SUZUKI', 'KAWASAKI', 'VESPA', 'LAINNYA'], excelAliases: ['merk', 'brand', 'merk motor', 'pabrikan', 'manufaktur'] },
      { key: 'model', label: 'Model / Tipe Motor', type: 'text', required: true, placeholder: 'misal BEAT SPORTY CBS, NMAX 155, VARIO 160', excelAliases: ['model', 'tipe', 'type', 'nama motor', 'unit motor', 'model motor', 'varian'] },
      { key: 'year', label: 'Tahun Pembuatan', type: 'number', required: true, placeholder: '2024', excelAliases: ['tahun', 'year', 'thn', 'tahun motor', 'tahun pembuatan'] },
      { key: 'harga_pasar', label: 'Harga Pasar (OTR)', type: 'currency', required: true, placeholder: '18500000', excelAliases: ['harga pasar', 'harga', 'otr', 'harga otr', 'nilai pasar', 'taksasi', 'nilai otr'] },
      { key: 'object_description', label: 'Deskripsi / Detail Unit', type: 'text', placeholder: 'misal ISS Deluxe, ABS Connected', excelAliases: ['deskripsi', 'description', 'object_description', 'varian', 'keterangan', 'detail'] },
      { key: 'group_type_unit', label: 'Group Tipe Unit', type: 'select', options: ['MATIC', 'BEBEK', 'SPORT', 'TRAIL', 'LISTRIK', 'LAINNYA'], excelAliases: ['group', 'group type', 'group_type_unit', 'kategori', 'segmen', 'jenis'] }
    ],
    sampleData: [
      { brand: 'HONDA', model: 'BEAT CBS', year: 2024, harga_pasar: 18500000, object_description: 'BEAT SPORTY CBS FI 110', group_type_unit: 'MATIC' },
      { brand: 'YAMAHA', model: 'NMAX 155', year: 2023, harga_pasar: 31500000, object_description: 'NMAX 155 CONNECTED ABS', group_type_unit: 'MATIC' },
      { brand: 'HONDA', model: 'VARIO 160', year: 2023, harga_pasar: 26800000, object_description: 'VARIO 160 CBS SPORTY', group_type_unit: 'MATIC' },
      { brand: 'KAWASAKI', model: 'KLX 150', year: 2022, harga_pasar: 34000000, object_description: 'KLX 150 BF SPECIAL EDITION', group_type_unit: 'TRAIL' }
    ]
  },
  {
    key: 'ClopContract',
    name: 'Master CLOP HO',
    code: 'CLOP',
    badge: 'Kontrak HO',
    icon: `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    description: 'Data referensi kontrak nasabah CLOP HO untuk verifikasi riwayat pembiayaan.',
    sheetKeywords: ['CLOP', 'KONTRAK', 'CONTRACT', 'HO', 'NASABAH'],
    idPrefix: 'clop_',
    fields: [
      { key: 'contract_no', label: 'Nomor Kontrak', type: 'text', required: true, placeholder: '0123456789', excelAliases: ['contract_no', 'no kontrak', 'nomor kontrak', 'contract no', 'kontrak', 'no. kontrak', 'id kontrak'] },
      { key: 'customer_name', label: 'Nama Konsumen / Debitur', type: 'text', required: true, placeholder: 'Nama lengkap konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama debitur', 'nama nasabah', 'customer', 'nama', 'nama lengkap'] },
      { key: 'nosin', label: 'Nomor Mesin (Nosin)', type: 'text', placeholder: 'JF51E1234567', excelAliases: ['nosin', 'nomor mesin', 'no mesin', 'engine no', 'no. mesin'] },
      { key: 'office_code', label: 'Kode Cabang / Kantor', type: 'text', placeholder: 'JKT01', excelAliases: ['office_code', 'kode kantor', 'cabang', 'office code', 'kode cabang', 'branch'] },
      { key: 'buss_unit', label: 'Unit Bisnis', type: 'text', placeholder: 'R2 Regular', excelAliases: ['buss_unit', 'unit bisnis', 'business unit', 'bu', 'tipe bisnis'] },
      { key: 'trend_cycle', label: 'Trend Cycle / Siklus', type: 'text', placeholder: 'Cycle 1', excelAliases: ['trend_cycle', 'trend cycle', 'siklus', 'cycle', 'bucket'] }
    ],
    sampleData: [
      { contract_no: '0123456789', customer_name: 'Budi Santoso', nosin: 'JF51E1234567', office_code: 'JKT01', buss_unit: 'R2 Regular', trend_cycle: 'Cycle 1' },
      { contract_no: '0123456790', customer_name: 'Siti Rahmawati', nosin: 'JM31E9876543', office_code: 'BDG02', buss_unit: 'R2 Premium', trend_cycle: 'Cycle 2' },
      { contract_no: '0123456791', customer_name: 'Agus Setiawan', nosin: 'MH1KC1123456', office_code: 'SBY01', buss_unit: 'R2 Regular', trend_cycle: 'Cycle 1' }
    ]
  },
  {
    key: 'BookingQuality',
    name: 'Master BQ',
    code: 'BQ',
    badge: 'Kualitas Booking',
    icon: `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    description: 'Data monitoring Booking Quality, jatuh tempo angsuran bulanan, dan status kolektibilitas.',
    sheetKeywords: ['BQ', 'BOOKING', 'QUALITY', 'ANGSURAN', 'JATUH TEMPO', 'KOLEK'],
    idPrefix: 'bq_',
    fields: [
      { key: 'contract_no', label: 'Nomor Kontrak', type: 'text', required: true, placeholder: '0123456789', excelAliases: ['contract_no', 'no kontrak', 'nomor kontrak', 'kontrak', 'no. kontrak'] },
      { key: 'customer_name', label: 'Nama Konsumen', type: 'text', required: true, placeholder: 'Nama konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama nasabah', 'customer', 'nama'] },
      { key: 'status_account', label: 'Status Account', type: 'select', required: true, options: ['Lancar', 'DPK', 'NPL', 'Menunggak', 'Lunas'], excelAliases: ['status_account', 'status account', 'status', 'kolektibilitas', 'kol', 'status bayar'] },
      { key: 'jatuh_tempo', label: 'Tanggal Jatuh Tempo', type: 'date', required: true, excelAliases: ['jatuh_tempo', 'jatuh tempo', 'tgl jatuh tempo', 'due date', 'tanggal tempo'] },
      { key: 'angsuran', label: 'Nilai Angsuran per Bulan', type: 'currency', placeholder: '850000', excelAliases: ['angsuran', 'installment', 'cicilan', 'nilai angsuran', 'angsuran per bulan', 'tagihan'] },
      { key: 'marketing_name', label: 'Nama Marketing / Sales', type: 'text', placeholder: 'Nama marketing penanggung jawab', excelAliases: ['marketing_name', 'nama marketing', 'marketing', 'sales', 'pic'] }
    ],
    sampleData: [
      { contract_no: '0123456789', customer_name: 'Budi Santoso', status_account: 'Lancar', jatuh_tempo: '2024-11-05', angsuran: 850000, marketing_name: 'Dani Pratama' },
      { contract_no: '0123456790', customer_name: 'Siti Rahmawati', status_account: 'DPK', jatuh_tempo: '2024-11-10', angsuran: 1150000, marketing_name: 'Rina Wulandari' },
      { contract_no: '0123456791', customer_name: 'Agus Setiawan', status_account: 'Menunggak', jatuh_tempo: '2024-10-25', angsuran: 920000, marketing_name: 'Dani Pratama' }
    ]
  },
  {
    key: 'FollowUpBahan',
    name: 'Master Follow Up Gform',
    code: 'GFORM',
    badge: 'Leads Online',
    icon: `<svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    description: 'Data leads calon konsumen yang masuk dari Google Form atau registrasi website.',
    sheetKeywords: ['GFORM', 'FOLLOW', 'BAHAN', 'GOOGLE FORM', 'FORM', 'LEADS'],
    idPrefix: 'fub_',
    fields: [
      { key: 'customer_name', label: 'Nama Calon Konsumen', type: 'text', required: true, placeholder: 'Nama calon konsumen', excelAliases: ['customer_name', 'nama calon konsumen', 'nama pendaftar', 'nama', 'nama konsumen', 'nama lengkap'] },
      { key: 'phone', label: 'Nomor WhatsApp / HP', type: 'text', required: true, placeholder: '081234567890', excelAliases: ['phone', 'no hp', 'nomor hp', 'telepon', 'whatsapp', 'no wa', 'kontak', 'telp'] },
      { key: 'motor', label: 'Unit Motor yang Diminati', type: 'text', required: true, placeholder: 'Honda Beat / Vario 125', excelAliases: ['motor', 'unit motor', 'tipe motor', 'pilihan motor', 'kendaraan', 'motor yang diminati'] },
      { key: 'status', label: 'Status Tindak Lanjut', type: 'select', options: ['bahan', 'follow_up', 'proses_taksasi', 'deal', 'batal'], excelAliases: ['status', 'status tindak lanjut', 'tahap', 'stage', 'progres'] },
      { key: 'notes', label: 'Catatan Kebutuhan / Dana', type: 'text', placeholder: 'misal butuh dana 15 juta untuk usaha', excelAliases: ['notes', 'catatan', 'keterangan', 'kebutuhan dana', 'pesan'] },
      { key: 'marketing_name', label: 'Marketing PIC', type: 'text', placeholder: 'Nama marketing penangan', excelAliases: ['marketing_name', 'nama marketing', 'marketing', 'pic'] }
    ],
    sampleData: [
      { customer_name: 'Hendra Gunawan', phone: '081234567890', motor: 'Honda Vario 125', status: 'follow_up', notes: 'Butuh dana 15 juta untuk modal toko', marketing_name: 'Dani Pratama' },
      { customer_name: 'Maya Anggraeni', phone: '081398765432', motor: 'Yamaha Fazzio', status: 'proses_taksasi', notes: 'Gadai BPKB motor an sendiri', marketing_name: 'Rina Wulandari' },
      { customer_name: 'Wahyu Tri', phone: '085712349988', motor: 'Honda Scoopy', status: 'bahan', notes: 'Tanya simulasi tenor 23 bulan', marketing_name: 'Dani Pratama' }
    ]
  },
  {
    key: 'PriceList',
    name: 'Master PriceList',
    code: 'PL',
    badge: 'Skema Angsuran',
    icon: `<svg class="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>`,
    description: 'Daftar simulasi uang muka (DP), tenor bulan, dan plafon angsuran pembiayaan.',
    sheetKeywords: ['PRICE', 'PRICELIST', 'ANGSURAN', 'SKEMA', 'TENOR', 'SIMULASI'],
    idPrefix: 'pl_',
    fields: [
      { key: 'brand', label: 'Merk Motor', type: 'select', required: true, options: ['HONDA', 'YAMAHA', 'SUZUKI', 'KAWASAKI', 'VESPA', 'LAINNYA'], excelAliases: ['brand', 'merk', 'merk motor'] },
      { key: 'model', label: 'Model / Tipe Motor', type: 'text', required: true, placeholder: 'Beat CBS / NMAX 155', excelAliases: ['model', 'tipe', 'type', 'nama motor', 'unit'] },
      { key: 'year', label: 'Tahun', type: 'number', placeholder: '2024', excelAliases: ['year', 'tahun', 'thn'] },
      { key: 'otr', label: 'Nilai OTR', type: 'currency', placeholder: '18500000', excelAliases: ['otr', 'harga otr', 'harga pasar'] },
      { key: 'dp', label: 'Uang Muka (DP)', type: 'currency', placeholder: '2000000', excelAliases: ['dp', 'uang muka', 'down payment'] },
      { key: 'tenor', label: 'Tenor (Bulan)', type: 'select', required: true, options: ['11', '17', '23', '29', '35'], excelAliases: ['tenor', 'jangka waktu', 'bulan', 'tenor bulan'] },
      { key: 'angsuran', label: 'Nilai Angsuran per Bulan', type: 'currency', required: true, placeholder: '795000', excelAliases: ['angsuran', 'cicilan', 'angsuran per bulan', 'installment'] },
      { key: 'plafond', label: 'Plafond Pinjaman', type: 'currency', placeholder: '16500000', excelAliases: ['plafond', 'plafon', 'nilai pinjaman', 'pinjaman'] }
    ],
    sampleData: [
      { brand: 'HONDA', model: 'Beat CBS', year: 2024, otr: 18500000, dp: 2000000, tenor: '23', angsuran: 795000, plafond: 16500000 },
      { brand: 'HONDA', model: 'Beat CBS', year: 2024, otr: 18500000, dp: 2000000, tenor: '35', angsuran: 620000, plafond: 16500000 },
      { brand: 'YAMAHA', model: 'NMAX 155', year: 2023, otr: 31500000, dp: 3500000, tenor: '23', angsuran: 1420000, plafond: 28000000 },
      { brand: 'YAMAHA', model: 'NMAX 155', year: 2023, otr: 31500000, dp: 3500000, tenor: '35', angsuran: 1110000, plafond: 28000000 }
    ]
  },
  {
    key: 'Prospect',
    name: 'Master Bahan Prospek',
    code: 'PROSPEK',
    badge: 'Database Pipeline',
    icon: `<svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    description: 'Kumpulan database prospek calon debitur dan pipeline harian marketing.',
    sheetKeywords: ['PROSPEK', 'PROSPECT', 'PIPELINE', 'SALES', 'BAHAN PROSPEK'],
    idPrefix: 'pro_',
    fields: [
      { key: 'customer_name', label: 'Nama Konsumen Prospek', type: 'text', required: true, placeholder: 'Nama konsumen', excelAliases: ['customer_name', 'nama konsumen', 'nama', 'nama prospek', 'debitur'] },
      { key: 'phone', label: 'Nomor WhatsApp / HP', type: 'text', required: true, placeholder: '081234567890', excelAliases: ['phone', 'no hp', 'telepon', 'whatsapp', 'no wa'] },
      { key: 'motor', label: 'Unit Motor Taksasi', type: 'text', required: true, placeholder: 'Honda Scoopy 2022', excelAliases: ['motor', 'unit motor', 'unit', 'tipe motor', 'kendaraan'] },
      { key: 'plafond', label: 'Pengajuan Plafond', type: 'currency', placeholder: '12000000', excelAliases: ['plafond', 'plafon', 'pengajuan', 'kebutuhan pinjaman'] },
      { key: 'status', label: 'Status Pipeline', type: 'select', options: ['baru', 'proses', 'taksasi', 'deal', 'batal'], excelAliases: ['status', 'tahap', 'stage'] },
      { key: 'marketing_name', label: 'Nama Marketing', type: 'text', placeholder: 'Nama marketing', excelAliases: ['marketing_name', 'nama marketing', 'marketing'] }
    ],
    sampleData: [
      { customer_name: 'Dedi Kurniawan', phone: '081288991122', motor: 'Honda PCX 160 2023', plafond: 20000000, status: 'proses', marketing_name: 'Dani Pratama' },
      { customer_name: 'Anisa Rahayu', phone: '081377889900', motor: 'Yamaha Aerox 155 2022', plafond: 14000000, status: 'baru', marketing_name: 'Rina Wulandari' },
      { customer_name: 'Rudi Hartono', phone: '085811223344', motor: 'Honda Beat Street 2021', plafond: 9000000, status: 'deal', marketing_name: 'Dani Pratama' }
    ]
  },
  {
    key: 'Target',
    name: 'Master Target Sales',
    code: 'TARGET',
    badge: 'Target Marketing',
    icon: `<svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    description: 'Target pencapaian nominal plafond & jumlah unit per marketing bulanan.',
    sheetKeywords: ['TARGET', 'GOAL', 'KPI', 'BULANAN', 'SALES TARGET'],
    idPrefix: 'tar_',
    fields: [
      { key: 'marketing_name', label: 'Nama Marketing', type: 'text', required: true, placeholder: 'Nama marketing', excelAliases: ['marketing_name', 'nama marketing', 'marketing', 'sales', 'pic'] },
      { key: 'cabang', label: 'Cabang / Kantor', type: 'text', placeholder: 'Cabang Jakarta Pusat', excelAliases: ['cabang', 'branch', 'kode cabang', 'kantor'] },
      { key: 'month', label: 'Bulan Periode', type: 'text', required: true, placeholder: '2024-10', excelAliases: ['month', 'bulan', 'periode', 'bulan target'] },
      { key: 'target_amount', label: 'Target Nominal Plafond', type: 'currency', required: true, placeholder: '150000000', excelAliases: ['target_amount', 'target nominal', 'target plafond', 'target rp'] },
      { key: 'target_count', label: 'Target Jumlah Unit', type: 'number', placeholder: '12', excelAliases: ['target_count', 'target unit', 'jumlah unit', 'target jumlah'] }
    ],
    sampleData: [
      { marketing_name: 'Dani Pratama', cabang: 'Cabang Jakarta Pusat', month: '2024-10', target_amount: 150000000, target_count: 12 },
      { marketing_name: 'Rina Wulandari', cabang: 'Cabang Jakarta Pusat', month: '2024-10', target_amount: 180000000, target_count: 15 },
      { marketing_name: 'Ahmad Fauzi', cabang: 'Cabang Bandung', month: '2024-10', target_amount: 120000000, target_count: 10 }
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
export interface ParsedSheet {
  name: string;
  rawRows: any[];
  headers: string[];
  mappedRecords: any[];
  matchedFields: { fieldKey: string; excelHeader: string; label: string }[];
}

export interface HubState {
  activeEntityKey: string; // which master tab is active (OtrPrice, ClopContract, etc.)
  activeSubView: 'upload' | 'manual' | 'table';
  workbook: {
    fileName: string;
    sheets: ParsedSheet[];
    activeSheetIndex: number;
  } | null;
  cachedCounts: Record<string, number>;
  tableRecords: Record<string, any[]>;
  searchQuery: string;
  isSaving: boolean;
  saveProgress: number;
  saveMessage: string;
  feedback: { message: string; type: 'info' | 'success' | 'error' } | null;
}

const state: HubState = {
  activeEntityKey: 'OtrPrice',
  activeSubView: 'upload',
  workbook: null,
  cachedCounts: {},
  tableRecords: {},
  searchQuery: '',
  isSaving: false,
  saveProgress: 0,
  saveMessage: '',
  feedback: null
};

// Ensure SheetJS is available
async function ensureSheetJS(): Promise<any> {
  if (typeof window !== 'undefined' && (window as any).XLSX) {
    return (window as any).XLSX;
  }
  // Try loading dynamic script
  return new Promise((resolve) => {
    const existing = document.getElementById('sheetjs-script');
    if (existing) {
      existing.addEventListener('load', () => resolve((window as any).XLSX));
      setTimeout(() => resolve((window as any).XLSX), 1000);
      return;
    }
    const script = document.createElement('script');
    script.id = 'sheetjs-script';
    script.src = '/xlsx.full.min.js';
    script.onload = () => resolve((window as any).XLSX);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

// Clean string for header comparison
function cleanHeaderString(str: any): string {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .trim();
}

// Find best header row in spreadsheet data
function findBestHeaderRow(matrix: any[][], config: MasterEntityConfig): { headerRowIndex: number; headers: string[] } {
  if (!matrix || matrix.length === 0) {
    return { headerRowIndex: 0, headers: [] };
  }

  let bestIndex = 0;
  let bestScore = -1;
  const maxScan = Math.min(12, matrix.length);

  for (let r = 0; r < maxScan; r++) {
    const row = matrix[r];
    if (!Array.isArray(row) || row.length === 0) continue;

    let score = 0;
    const cleanCells = row.map(cell => cleanHeaderString(cell));

    config.fields.forEach(field => {
      const aliases = [field.key.toLowerCase(), ...field.excelAliases.map(cleanHeaderString)];
      for (const cell of cleanCells) {
        if (!cell) continue;
        if (aliases.some(a => cell === a || cell.includes(a) || a.includes(cell))) {
          score += 2;
          break;
        }
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestIndex = r;
    }
  }

  const rawHeaders = Array.isArray(matrix[bestIndex]) ? matrix[bestIndex] : [];
  const headers = rawHeaders.map((h, i) => (h !== undefined && h !== null && String(h).trim() !== '' ? String(h).trim() : `Kolom_${i + 1}`));
  return { headerRowIndex: bestIndex, headers };
}

// Map parsed Excel row into entity object
function mapRowToEntity(rowObj: Record<string, any>, config: MasterEntityConfig): Record<string, any> {
  const item: Record<string, any> = {
    id: `${config.idPrefix}${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    created_date: new Date().toISOString()
  };

  const rowKeys = Object.keys(rowObj);

  config.fields.forEach(field => {
    let rawVal: any = undefined;
    const targetAliases = [field.key.toLowerCase(), ...field.excelAliases.map(cleanHeaderString)];

    for (const k of rowKeys) {
      const cleanK = cleanHeaderString(k);
      if (cleanK === field.key.toLowerCase()) {
        rawVal = rowObj[k];
        break;
      }
      if (targetAliases.some(a => cleanK === a || cleanK.includes(a) || a.includes(cleanK))) {
        rawVal = rowObj[k];
        break;
      }
    }

    if (rawVal !== undefined && rawVal !== null && String(rawVal).trim() !== '') {
      const strVal = String(rawVal).trim();
      if (field.type === 'number') {
        item[field.key] = parseInt(strVal.replace(/[^0-9-]/g, ''), 10) || 0;
      } else if (field.type === 'currency') {
        item[field.key] = parseFloat(strVal.replace(/[^0-9.-]/g, '')) || 0;
      } else if (field.type === 'date') {
        item[field.key] = strVal;
      } else {
        item[field.key] = strVal;
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

// Download Excel Template for Master
export async function downloadEntityExcelTemplate(entityKey: string) {
  const config = MASTER_ENTITIES.find(e => e.key === entityKey) || MASTER_ENTITIES[0];
  const XLSX = await ensureSheetJS();

  if (XLSX) {
    try {
      // Build sample rows with human labels or field keys
      const sampleRows = config.sampleData.map(sample => {
        const row: Record<string, any> = {};
        config.fields.forEach(f => {
          row[f.label] = sample[f.key] ?? '';
        });
        return row;
      });

      const ws = XLSX.utils.json_to_sheet(sampleRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, config.code);
      XLSX.writeFile(wb, `Template_${config.name.replace(/\s+/g, '_')}.xlsx`);
      return;
    } catch (e) {
      console.warn('XLSX write template fallback:', e);
    }
  }

  // CSV Fallback if SheetJS cannot write
  const headers = config.fields.map(f => `"${f.label.replace(/"/g, '""')}"`).join(',');
  const rows = config.sampleData.map(sample => {
    return config.fields.map(f => {
      const val = sample[f.key] ?? '';
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',');
  });
  const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Template_${config.name.replace(/\s+/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Open and Close Modal View
export function openMasterImportHub(defaultEntityOrTab?: string, defaultAction: 'upload' | 'manual' | 'table' = 'upload') {
  if (defaultEntityOrTab) {
    const matchedEntity = MASTER_ENTITIES.find(
      e => e.key.toLowerCase() === defaultEntityOrTab.toLowerCase() || e.code.toLowerCase() === defaultEntityOrTab.toLowerCase()
    );
    if (matchedEntity) {
      state.activeEntityKey = matchedEntity.key;
    }
  }
  state.activeSubView = defaultAction;
  state.workbook = null;
  state.feedback = null;

  let hub = document.getElementById('smart-master-import-hub-modal');
  if (!hub) {
    hub = document.createElement('div');
    hub.id = 'smart-master-import-hub-modal';
    hub.className = 'fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fadeIn';
    document.body.appendChild(hub);
  }
  renderHubView();
  loadEntityCount(state.activeEntityKey);
}

export function closeMasterImportHub() {
  const hub = document.getElementById('smart-master-import-hub-modal');
  if (hub) hub.remove();
}

// Mount a persistent trigger button in case it is missing from UI
export function mountMasterImportHub() {
  if (document.getElementById('smart-master-hub-trigger-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'smart-master-hub-trigger-btn';
  btn.type = 'button';
  btn.className = 'fixed bottom-5 right-5 z-[9000] flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs shadow-[0_10px_25px_rgba(6,182,212,0.4)] border border-cyan-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md';
  btn.innerHTML = `
    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
    </svg>
    <span>Master Import Hub</span>
  `;
  btn.onclick = () => openMasterImportHub();
  document.body.appendChild(btn);
}

// Attach globals
if (typeof window !== 'undefined') {
  window.openMasterImportHub = openMasterImportHub;
  window.closeMasterImportHub = closeMasterImportHub;
  window.mountMasterImportHub = mountMasterImportHub;
  window.downloadEntityExcelTemplate = downloadEntityExcelTemplate;
}

// Fetch total count of records
async function loadEntityCount(entityKey: string) {
  try {
    const res = await fetch(`/api/entities/${entityKey}/count`);
    if (res.ok) {
      const data = await res.json();
      state.cachedCounts[entityKey] = data.count || 0;
      const countEl = document.getElementById(`count-badge-${entityKey}`);
      if (countEl) countEl.innerText = `${data.count || 0} Data`;
      const headerCountEl = document.getElementById('hub-current-entity-count');
      if (headerCountEl && state.activeEntityKey === entityKey) {
        headerCountEl.innerText = `${data.count || 0} Tersimpan`;
      }
    }
  } catch {}
}

// Fetch data records for table view
async function loadEntityTableData(entityKey: string) {
  const container = document.getElementById('hub-table-content');
  if (container) {
    container.innerHTML = `
      <div class="flex items-center justify-center p-8 text-cyan-400 gap-3">
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span class="text-xs font-semibold">Memuat data dari database...</span>
      </div>
    `;
  }
  try {
    const res = await fetch(`/api/entities/${entityKey}`);
    if (res.ok) {
      const list = await res.json();
      state.tableRecords[entityKey] = Array.isArray(list) ? list : [];
      state.cachedCounts[entityKey] = state.tableRecords[entityKey].length;
      renderTableView(entityKey);
    } else {
      if (container) container.innerHTML = `<div class="p-4 text-xs text-rose-400 text-center">Gagal memuat data (status ${res.status})</div>`;
    }
  } catch (err: any) {
    if (container) container.innerHTML = `<div class="p-4 text-xs text-rose-400 text-center">Gagal koneksi: ${err.message}</div>`;
  }
}

// Export current records to Excel
async function exportCurrentEntityToExcel(entityKey: string) {
  const config = MASTER_ENTITIES.find(e => e.key === entityKey) || MASTER_ENTITIES[0];
  let records = state.tableRecords[entityKey];
  if (!records || records.length === 0) {
    try {
      const res = await fetch(`/api/entities/${entityKey}`);
      if (res.ok) records = await res.json();
    } catch {}
  }

  if (!records || records.length === 0) {
    showHubNotification(`Belum ada data ${config.name} untuk diekspor.`, 'info');
    return;
  }

  const XLSX = await ensureSheetJS();
  if (XLSX) {
    try {
      const exportRows = records.map((rec: any) => {
        const row: Record<string, any> = {};
        config.fields.forEach(f => {
          row[f.label] = rec[f.key] ?? '';
        });
        return row;
      });
      const ws = XLSX.utils.json_to_sheet(exportRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, config.code);
      XLSX.writeFile(wb, `${config.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`);
      showHubNotification(`Berhasil mengekspor ${records.length} data ke Excel.`, 'success');
      return;
    } catch (e) {
      console.warn('Export XLSX error:', e);
    }
  }

  // CSV Fallback
  const headers = config.fields.map(f => `"${f.label.replace(/"/g, '""')}"`).join(',');
  const rows = records.map((rec: any) => {
    return config.fields.map(f => `"${String(rec[f.key] ?? '').replace(/"/g, '""')}"`).join(',');
  });
  const blob = new Blob(['\uFEFF' + [headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${config.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Delete all records of an entity
async function clearAllEntityRecords(entityKey: string) {
  const config = MASTER_ENTITIES.find(e => e.key === entityKey) || MASTER_ENTITIES[0];
  if (!confirm(`APAKAH ANDA YAKIN?\n\nSemua data ${config.name} akan dihapus bersih dari database.`)) {
    return;
  }
  try {
    const res = await fetch(`/api/entities/${entityKey}/delete-many`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [] })
    });
    if (res.ok) {
      state.cachedCounts[entityKey] = 0;
      state.tableRecords[entityKey] = [];
      showHubNotification(`Seluruh data ${config.name} berhasil dibersihkan.`, 'success');
      renderHubView();
      if (state.activeSubView === 'table') renderTableView(entityKey);
    } else {
      showHubNotification(`Gagal menghapus data (status ${res.status})`, 'error');
    }
  } catch (err: any) {
    showHubNotification(`Gagal reset data: ${err.message}`, 'error');
  }
}

// Process Uploaded File specifically for the active Master entity
async function processUploadedExcelFile(file: File, config: MasterEntityConfig) {
  showHubNotification(`Membaca file "${file.name}" untuk ${config.name}...`, 'info');

  try {
    const XLSX = await ensureSheetJS();

    if (!XLSX) {
      // Server-side fallback via /api/excel/inspect
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/excel/inspect', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Gagal memeriksa file di server.');
      const inspectData = await res.json();
      if (!inspectData.sheets || inspectData.sheets.length === 0) {
        throw new Error('Tidak ada Sheet yang terbaca dari file ini.');
      }

      const parsedSheets: ParsedSheet[] = inspectData.sheets.map((s: any) => {
        const mapped = (s.sample || []).map((row: any) => mapRowToEntity(row, config));
        return {
          name: s.name,
          rawRows: s.sample || [],
          headers: s.headers || [],
          mappedRecords: mapped,
          matchedFields: []
        };
      });

      state.workbook = {
        fileName: file.name,
        sheets: parsedSheets,
        activeSheetIndex: 0
      };
      showHubNotification(`Berhasil memuat file "${file.name}". Periksa tabel pratinjau di bawah.`, 'success');
      renderHubView();
      return;
    }

    // Client-side SheetJS Parsing
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array', cellDates: true, cellNF: false });

    if (!wb.SheetNames || wb.SheetNames.length === 0) {
      throw new Error('File Excel tidak memiliki Sheet.');
    }

    const parsedSheets: ParsedSheet[] = [];

    for (const sheetName of wb.SheetNames) {
      const sheet = wb.Sheets[sheetName];
      if (!sheet) continue;

      // Extract raw matrix (array of arrays)
      const matrix: any[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        blankrows: false,
        defval: ''
      });

      if (!matrix || matrix.length === 0) continue;

      // Auto-detect best header row
      const { headerRowIndex, headers } = findBestHeaderRow(matrix, config);
      const dataRows = matrix.slice(headerRowIndex + 1);

      // Convert rows to object array
      const rawRows: Record<string, any>[] = [];
      dataRows.forEach(row => {
        if (!Array.isArray(row)) return;
        // Check if row has at least one non-empty value
        const hasContent = row.some(cell => cell !== undefined && cell !== null && String(cell).trim() !== '');
        if (!hasContent) return;

        const obj: Record<string, any> = {};
        headers.forEach((h, colIdx) => {
          obj[h] = row[colIdx] ?? '';
        });
        rawRows.push(obj);
      });

      if (rawRows.length > 0) {
        // Map to entity
        const mappedRecords = rawRows.map(r => mapRowToEntity(r, config));

        // Identify matched fields
        const matchedFields: { fieldKey: string; excelHeader: string; label: string }[] = [];
        config.fields.forEach(field => {
          const aliases = [field.key.toLowerCase(), ...field.excelAliases.map(cleanHeaderString)];
          for (const h of headers) {
            const cleanH = cleanHeaderString(h);
            if (aliases.some(a => cleanH === a || cleanH.includes(a) || a.includes(cleanH))) {
              matchedFields.push({ fieldKey: field.key, excelHeader: h, label: field.label });
              break;
            }
          }
        });

        parsedSheets.push({
          name: sheetName,
          rawRows,
          headers,
          mappedRecords,
          matchedFields
        });
      }
    }

    if (parsedSheets.length === 0) {
      throw new Error(`File Excel "${file.name}" tidak memiliki data baris yang dapat dibaca.`);
    }

    // Auto-select sheet matching keywords if any
    let selectedSheetIdx = 0;
    const matchIdx = parsedSheets.findIndex(s => {
      const up = s.name.toUpperCase();
      return config.sheetKeywords.some(kw => up.includes(kw));
    });
    if (matchIdx >= 0) selectedSheetIdx = matchIdx;

    state.workbook = {
      fileName: file.name,
      sheets: parsedSheets,
      activeSheetIndex: selectedSheetIdx
    };

    const currentSheet = parsedSheets[selectedSheetIdx];
    showHubNotification(
      `Berhasil membaca "${file.name}" (${currentSheet.mappedRecords.length} data pada Sheet "${currentSheet.name}").`,
      'success'
    );
    renderHubView();
  } catch (err: any) {
    console.error('Process Excel error:', err);
    showHubNotification(`Gagal membaca file: ${err.message}`, 'error');
  }
}

// Save active parsed sheet to backend database
async function saveActiveSheetToDatabase(config: MasterEntityConfig) {
  if (!state.workbook || !state.workbook.sheets[state.workbook.activeSheetIndex]) {
    showHubNotification('Belum ada data Excel yang siap disimpan.', 'error');
    return;
  }

  const sheet = state.workbook.sheets[state.workbook.activeSheetIndex];
  const records = sheet.mappedRecords;

  if (!records || records.length === 0) {
    showHubNotification('Tidak ada baris data untuk diimport.', 'error');
    return;
  }

  state.isSaving = true;
  state.saveProgress = 5;
  state.saveMessage = `Menyiapkan ${records.length} data untuk ${config.name}...`;
  renderHubView();

  try {
    const BATCH_SIZE = 75;
    const total = records.length;
    let savedCount = 0;

    for (let i = 0; i < total; i += BATCH_SIZE) {
      const chunk = records.slice(i, i + BATCH_SIZE);
      const res = await fetch(`/api/entities/${config.key}/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk)
      });

      if (!res.ok) {
        throw new Error(`Gagal menyimpan batch data (HTTP ${res.status})`);
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
      state.workbook = null; // Clear dropzone preview
      state.cachedCounts[config.key] = (state.cachedCounts[config.key] || 0) + total;
      showHubNotification(
        `🎉 SUKSES! ${total} data berhasil diimport ke ${config.name}.`,
        'success'
      );
      state.activeSubView = 'table';
      renderHubView();
      loadEntityTableData(config.key);
    }, 500);
  } catch (err: any) {
    state.isSaving = false;
    showHubNotification(`Gagal simpan data: ${err.message}`, 'error');
    renderHubView();
  }
}

// Update UI progress bar
function updateProgressBar(progress: number, message: string) {
  const bar = document.getElementById('hub-save-progress-bar');
  const label = document.getElementById('hub-save-progress-label');
  if (bar) bar.style.width = `${progress}%`;
  if (label) label.innerText = message;
}

// Show toast / status message
function showHubNotification(message: string, type: 'info' | 'success' | 'error' = 'info') {
  state.feedback = { message, type };
  const box = document.getElementById('hub-notification-box');
  if (!box) return;

  const bg =
    type === 'success'
      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
      : type === 'error'
      ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
      : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300';

  box.className = `p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 shadow-lg backdrop-blur-md animate-fadeIn ${bg}`;
  box.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span>${message}</span>
    </div>
    <button type="button" class="text-slate-400 hover:text-white text-xs px-2 cursor-pointer" onclick="this.parentElement.remove()">&times;</button>
  `;
}

// Main Render Function
export function renderHubView() {
  const container = document.getElementById('smart-master-import-hub-modal');
  if (!container) return;

  const activeEntity = MASTER_ENTITIES.find(e => e.key === state.activeEntityKey) || MASTER_ENTITIES[0];
  const count = state.cachedCounts[activeEntity.key] ?? '...';

  container.innerHTML = `
    <div class="relative w-full max-w-6xl rounded-3xl bg-[#080d1a] border border-cyan-500/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.18)] text-slate-100 overflow-hidden my-auto flex flex-col max-h-[94vh]">
      
      <!-- Top Header & Modal Title -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-[#0d1629]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white">Master Data & Import Hub</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                1 Tab 1 Pengimportan
              </span>
            </div>
            <p class="text-[11px] sm:text-xs text-slate-400">Pilih tab master di bawah untuk import Excel khusus, input manual, dan manajemen data.</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-close-master-hub" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-700/60" title="Tutup Modal">
            &times;
          </button>
        </div>
      </div>

      <!-- MAIN TABS: 1 TAB UNTUK SETIAP PENGIMPORTAN MASTER -->
      <div class="border-b border-slate-800/90 bg-slate-950/70 px-3 sm:px-6 pt-2">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          ${MASTER_ENTITIES.map(ent => {
            const isActive = ent.key === state.activeEntityKey;
            const entCount = state.cachedCounts[ent.key];
            return `
              <button 
                type="button" 
                data-entity="${ent.key}"
                class="hub-master-tab flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-cyan-400/80 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }"
              >
                ${ent.icon}
                <span>${ent.name}</span>
                <span id="count-badge-${ent.key}" class="px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }">
                  ${entCount !== undefined ? `${entCount}` : ''}
                </span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Sub-Bar: Active Master Context & Toolbar -->
      <div class="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#0a1120] border-b border-slate-800/70">
        <div class="flex items-center gap-2.5">
          <span class="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            ${activeEntity.code}
          </span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-white">${activeEntity.name}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700 font-medium" id="hub-current-entity-count">
                ${count !== '...' ? `${count} Tersimpan` : 'Memuat data...'}
              </span>
            </div>
            <p class="text-[11px] text-slate-400 hidden sm:block">${activeEntity.description}</p>
          </div>
        </div>

        <!-- Master Actions: Template Download, Refresh, Clear, Export -->
        <div class="flex items-center gap-2">
          <button id="btn-download-template" type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer shadow-sm" title="Unduh format file Excel resmi">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh Template Excel</span>
          </button>

          <button id="btn-export-excel" type="button" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer" title="Ekspor data saat ini ke Excel">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Ekspor</span>
          </button>

          <button id="btn-clear-entity" type="button" class="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 transition-all cursor-pointer" title="Hapus semua data master ini">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Hapus</span>
          </button>
        </div>
      </div>

      <!-- Section Switcher (Sub-Views for this Master) -->
      <div class="px-4 sm:px-6 pt-3 bg-slate-900/40 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button id="subtab-upload" type="button" class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${
            state.activeSubView === 'upload' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200'
          }">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Upload File Excel</span>
          </button>

          <button id="subtab-manual" type="button" class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${
            state.activeSubView === 'manual' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200'
          }">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Input Manual 1 Data</span>
          </button>

          <button id="subtab-table" type="button" class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${
            state.activeSubView === 'table' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' : 'border-transparent text-slate-400 hover:text-slate-200'
          }">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Data Tersimpan</span>
          </button>
        </div>
      </div>

      <!-- Notification Toast Area -->
      <div id="hub-notification-box" class="px-4 sm:px-6 pt-3 empty:hidden"></div>

      <!-- Modal Body Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        ${
          state.isSaving
            ? `
          <!-- Saving Progress Card -->
          <div class="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/40 text-center space-y-4 shadow-xl">
            <div class="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto"></div>
            <div class="space-y-1">
              <h3 class="text-base font-bold text-white">Menyimpan Data ke Database...</h3>
              <p id="hub-save-progress-label" class="text-xs text-slate-300">${state.saveMessage}</p>
            </div>
            <div class="w-full max-w-md bg-slate-800 rounded-full h-3 mx-auto overflow-hidden border border-slate-700">
              <div id="hub-save-progress-bar" class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300 rounded-full" style="width: ${state.saveProgress}%"></div>
            </div>
            <p class="text-[11px] text-slate-400">Harap jangan menutup halaman selama proses penyimpanan berlangsung.</p>
          </div>
        `
            : state.activeSubView === 'upload'
            ? renderUploadSubView(activeEntity)
            : state.activeSubView === 'manual'
            ? renderManualSubView(activeEntity)
            : renderTableSubView(activeEntity)
        }

      </div>
    </div>
  `;

  attachHubEventHandlers(activeEntity);
}

// Render SubView: Upload Excel
function renderUploadSubView(config: MasterEntityConfig): string {
  const currentSheet = state.workbook?.sheets[state.workbook.activeSheetIndex];

  return `
    <div class="space-y-6">
      <!-- 1. Dedicated Drop Zone for this Master -->
      <div id="excel-drop-zone" class="relative group border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-3xl p-6 sm:p-8 text-center transition-all bg-gradient-to-b from-slate-900/60 to-slate-950/80 hover:bg-slate-900/80 cursor-pointer shadow-inner">
        <input type="file" id="excel-file-input" accept=".xlsx, .xls, .csv" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
        
        <div class="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div class="w-14 h-14 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-white">
              Tarik & Lepas File Excel <span class="text-cyan-400">${config.name}</span> di Sini
            </h3>
            <p class="text-xs text-slate-400 mt-1">Mendukung format file <span class="text-slate-300 font-mono">.xlsx</span>, <span class="text-slate-300 font-mono">.xls</span>, atau <span class="text-slate-300 font-mono">.csv</span></p>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/40">
            <span>Pilih File dari Komputer / HP</span>
          </div>
        </div>
      </div>

      <!-- Expected Columns Guidance Chips -->
      <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Kolom yang Dikenali Otomatis untuk ${config.name}:
          </span>
          <button type="button" onclick="window.downloadEntityExcelTemplate('${config.key}')" class="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer">
            Unduh Contoh Format (.xlsx)
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${config.fields.map(f => `
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1">
              <span>${f.label}</span>
              ${f.required ? '<span class="text-rose-400 font-bold" title="Wajib">*</span>' : ''}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- 2. Preview & Import Section (Rendered when file is parsed) -->
      ${
        state.workbook && currentSheet
          ? `
        <div class="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/30 space-y-5 shadow-xl animate-fadeIn">
          
          <!-- Sheet Bar & Summary -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-white">File: ${state.workbook.fileName}</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ${currentSheet.mappedRecords.length} Baris Data Ditemukan
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Periksa data di bawah. Jika sudah sesuai, klik tombol simpan di sebelah kanan.</p>
            </div>

            <!-- Multi-Sheet Selector if more than 1 sheet -->
            ${
              state.workbook.sheets.length > 1
                ? `
              <div class="flex items-center gap-2">
                <label class="text-xs text-slate-400">Pilih Sheet:</label>
                <select id="select-active-sheet" class="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer">
                  ${state.workbook.sheets.map(
                    (s, idx) => `
                    <option value="${idx}" ${idx === state.workbook!.activeSheetIndex ? 'selected' : ''}>
                      Sheet: ${s.name} (${s.mappedRecords.length} data)
                    </option>
                  `
                  ).join('')}
                </select>
              </div>
            `
                : ''
            }
          </div>

          <!-- Matched Columns Pill Indicators -->
          <div class="space-y-1.5">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status Pemetaan Kolom:</span>
            <div class="flex flex-wrap gap-2">
              ${config.fields.map(f => {
                const isMatched = currentSheet.matchedFields?.some(m => m.fieldKey === f.key);
                return `
                  <span class="px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
                    isMatched
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : f.required
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                  }">
                    <span>${isMatched ? '✓' : f.required ? '!' : '○'}</span>
                    <span>${f.label}</span>
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Live Preview Table (First 8 Rows) -->
          <div class="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            <div class="overflow-x-auto max-h-72">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/90 text-slate-400 font-bold border-b border-slate-800 sticky top-0">
                  <tr>
                    <th class="p-3 w-10 text-center">#</th>
                    ${config.fields.map(f => `<th class="p-3 whitespace-nowrap">${f.label}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-mono text-slate-300 text-[11px]">
                  ${currentSheet.mappedRecords.slice(0, 8).map((rec, rIdx) => `
                    <tr class="hover:bg-slate-900/40 transition-colors">
                      <td class="p-3 text-center text-slate-500 font-bold">${rIdx + 1}</td>
                      ${config.fields.map(f => {
                        const val = rec[f.key];
                        const display = f.type === 'currency' ? formatRupiah(val) : String(val ?? '-');
                        return `<td class="p-3 whitespace-nowrap">${display || '<span class="text-slate-600 italic">(kosong)</span>'}</td>`;
                      }).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            ${
              currentSheet.mappedRecords.length > 8
                ? `<div class="p-2.5 text-center text-[11px] text-slate-400 bg-slate-900/80 border-t border-slate-800">
                    Menampilkan 8 dari total ${currentSheet.mappedRecords.length} baris data yang siap diimport.
                  </div>`
                : ''
            }
          </div>

          <!-- Big Action Button -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button id="btn-cancel-preview" type="button" class="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer">
              Batal
            </button>
            <button id="btn-execute-import" type="button" class="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer font-bold transform active:scale-95">
              <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan & Import ${currentSheet.mappedRecords.length} Data ke ${config.name}</span>
            </button>
          </div>

        </div>
      `
          : ''
      }
    </div>
  `;
}

// Render SubView: Manual Form
function renderManualSubView(config: MasterEntityConfig): string {
  return `
    <div class="max-w-2xl mx-auto p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5 shadow-xl animate-fadeIn">
      <div class="border-b border-slate-800 pb-3">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          ${config.icon}
          <span>Form Tambah Data Manual: ${config.name}</span>
        </h3>
        <p class="text-xs text-slate-400 mt-0.5">Input data satuan satu per satu langsung ke database.</p>
      </div>

      <form id="form-manual-entity-entry" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${config.fields.map(field => `
            <div class="${field.type === 'text' && field.key === 'object_description' ? 'sm:col-span-2' : ''}">
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                ${field.label} ${field.required ? '<span class="text-rose-400">*</span>' : ''}
              </label>

              ${
                field.type === 'select' && field.options
                  ? `
                <select name="${field.key}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 cursor-pointer">
                  ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
              `
                  : field.type === 'currency'
                  ? `
                <div class="relative">
                  <span class="absolute left-3 top-2 text-xs text-slate-500 font-bold">Rp</span>
                  <input type="number" name="${field.key}" placeholder="${field.placeholder || '0'}" ${field.required ? 'required' : ''} class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
                </div>
              `
                  : field.type === 'number'
                  ? `
                <input type="number" name="${field.key}" placeholder="${field.placeholder || '0'}" ${field.required ? 'required' : ''} class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
              `
                  : field.type === 'date'
                  ? `
                <input type="date" name="${field.key}" ${field.required ? 'required' : ''} class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
              `
                  : `
                <input type="text" name="${field.key}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''} class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
              `
              }
            </div>
          `).join('')}
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button type="reset" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">
            Reset Form
          </button>
          <button type="submit" id="btn-submit-manual-entry" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all cursor-pointer">
            Simpan ke Database
          </button>
        </div>
      </form>
    </div>
  `;
}

// Render SubView: Table View Container
function renderTableSubView(config: MasterEntityConfig): string {
  setTimeout(() => loadEntityTableData(config.key), 50);

  return `
    <div class="space-y-4 animate-fadeIn">
      <!-- Search & Action Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <input 
            type="text" 
            id="hub-table-search-input" 
            placeholder="Cari data ${config.name}..." 
            value="${state.searchQuery}"
            class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-refresh-table" type="button" class="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <!-- Table Body Container -->
      <div id="hub-table-content" class="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/70">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;
}

// Render dynamic table rows
function renderTableView(entityKey: string) {
  const container = document.getElementById('hub-table-content');
  if (!container) return;

  const config = MASTER_ENTITIES.find(e => e.key === entityKey) || MASTER_ENTITIES[0];
  let records = state.tableRecords[entityKey] || [];

  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    records = records.filter(r => {
      return Object.values(r).some(val => String(val || '').toLowerCase().includes(q));
    });
  }

  if (records.length === 0) {
    container.innerHTML = `
      <div class="p-10 text-center space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p class="text-xs text-slate-400 font-medium">Belum ada data untuk ${config.name}.</p>
        <button type="button" onclick="window.openMasterImportHub('${config.key}', 'upload')" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 cursor-pointer">
          Upload File Excel Sekarang
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="overflow-x-auto max-h-[60vh]">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 sticky top-0">
          <tr>
            <th class="p-3 w-10 text-center">#</th>
            ${config.fields.map(f => `<th class="p-3 whitespace-nowrap">${f.label}</th>`).join('')}
            <th class="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60 font-mono text-slate-300 text-[11px]">
          ${records.map((rec, idx) => `
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="p-3 text-center text-slate-500 font-bold">${idx + 1}</td>
              ${config.fields.map(f => {
                const val = rec[f.key];
                const display = f.type === 'currency' ? formatRupiah(val) : String(val ?? '-');
                return `<td class="p-3 whitespace-nowrap">${display}</td>`;
              }).join('')}
              <td class="p-3 text-right whitespace-nowrap">
                <button type="button" class="btn-delete-record text-rose-400 hover:text-rose-300 p-1 cursor-pointer" data-id="${rec.id}" title="Hapus record">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="p-3 bg-slate-900 border-t border-slate-800 text-slate-400 text-[11px] flex items-center justify-between">
      <span>Total: <strong class="text-white">${records.length}</strong> data tersimpan</span>
      <span>${config.name} (${config.code})</span>
    </div>
  `;

  // Attach delete button handler
  container.querySelectorAll('.btn-delete-record').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (!id) return;
      if (!confirm('Hapus baris data ini?')) return;
      try {
        const res = await fetch(`/api/entities/${entityKey}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          state.tableRecords[entityKey] = (state.tableRecords[entityKey] || []).filter(r => String(r.id) !== String(id));
          state.cachedCounts[entityKey] = state.tableRecords[entityKey].length;
          renderTableView(entityKey);
          loadEntityCount(entityKey);
        }
      } catch (err: any) {
        alert('Gagal menghapus: ' + err.message);
      }
    });
  });
}

// Attach Event Handlers
function attachHubEventHandlers(config: MasterEntityConfig) {
  // Close Button
  const closeBtn = document.getElementById('btn-close-master-hub');
  if (closeBtn) closeBtn.onclick = closeMasterImportHub;

  // Master Tabs (1 Tab 1 Pengimportan)
  document.querySelectorAll('.hub-master-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', e => {
      const entityKey = (e.currentTarget as HTMLElement).getAttribute('data-entity');
      if (entityKey && entityKey !== state.activeEntityKey) {
        state.activeEntityKey = entityKey;
        state.workbook = null;
        state.feedback = null;
        renderHubView();
        loadEntityCount(entityKey);
      }
    });
  });

  // SubTab Switcher (Upload / Manual / Table)
  const subUpload = document.getElementById('subtab-upload');
  if (subUpload) {
    subUpload.onclick = () => {
      state.activeSubView = 'upload';
      renderHubView();
    };
  }

  const subManual = document.getElementById('subtab-manual');
  if (subManual) {
    subManual.onclick = () => {
      state.activeSubView = 'manual';
      renderHubView();
    };
  }

  const subTable = document.getElementById('subtab-table');
  if (subTable) {
    subTable.onclick = () => {
      state.activeSubView = 'table';
      renderHubView();
    };
  }

  // Download Template
  const dlBtn = document.getElementById('btn-download-template');
  if (dlBtn) dlBtn.onclick = () => downloadEntityExcelTemplate(config.key);

  // Export Excel
  const expBtn = document.getElementById('btn-export-excel');
  if (expBtn) expBtn.onclick = () => exportCurrentEntityToExcel(config.key);

  // Clear Entity
  const clrBtn = document.getElementById('btn-clear-entity');
  if (clrBtn) clrBtn.onclick = () => clearAllEntityRecords(config.key);

  // Excel File Input & Drop Zone
  const fileInput = document.getElementById('excel-file-input') as HTMLInputElement | null;
  if (fileInput) {
    fileInput.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      await processUploadedExcelFile(file, config);
    };
  }

  // Cancel Preview
  const cancelBtn = document.getElementById('btn-cancel-preview');
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      state.workbook = null;
      renderHubView();
    };
  }

  // Execute Import
  const importBtn = document.getElementById('btn-execute-import');
  if (importBtn) {
    importBtn.onclick = () => saveActiveSheetToDatabase(config);
  }

  // Sheet Select Change
  const sheetSelect = document.getElementById('select-active-sheet') as HTMLSelectElement | null;
  if (sheetSelect && state.workbook) {
    sheetSelect.onchange = e => {
      const idx = parseInt((e.target as HTMLSelectElement).value, 10);
      if (!isNaN(idx) && state.workbook && state.workbook.sheets[idx]) {
        state.workbook.activeSheetIndex = idx;
        renderHubView();
      }
    };
  }

  // Manual Form Submission
  const manualForm = document.getElementById('form-manual-entity-entry') as HTMLFormElement | null;
  if (manualForm) {
    manualForm.onsubmit = async e => {
      e.preventDefault();
      const formData = new FormData(manualForm);
      const data: Record<string, any> = {};

      config.fields.forEach(f => {
        const val = formData.get(f.key);
        if (f.type === 'number') data[f.key] = parseInt(String(val || 0), 10) || 0;
        else if (f.type === 'currency') data[f.key] = parseFloat(String(val || 0)) || 0;
        else data[f.key] = String(val || '').trim();
      });

      if (config.key === 'OtrPrice') {
        data.search_text = `${data.brand || ''} ${data.model || ''} ${data.year || ''} ${data.object_description || ''}`.trim();
      }

      try {
        const res = await fetch(`/api/entities/${config.key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          showHubNotification(`Data berhasil disimpan ke ${config.name}!`, 'success');
          manualForm.reset();
          loadEntityCount(config.key);
        } else {
          showHubNotification(`Gagal menyimpan data (status ${res.status})`, 'error');
        }
      } catch (err: any) {
        showHubNotification(`Gagal simpan data: ${err.message}`, 'error');
      }
    };
  }

  // Search input in table view
  const searchInput = document.getElementById('hub-table-search-input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.oninput = e => {
      state.searchQuery = (e.target as HTMLInputElement).value;
      renderTableView(config.key);
    };
  }

  // Table refresh button
  const refreshTableBtn = document.getElementById('btn-refresh-table');
  if (refreshTableBtn) {
    refreshTableBtn.onclick = () => loadEntityTableData(config.key);
  }
}
