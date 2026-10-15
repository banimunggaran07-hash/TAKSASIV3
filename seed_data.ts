export interface OtrItem {
  id: string;
  brand: string;
  model: string;
  object_description: string;
  group_type_unit: string;
  year: number;
  harga_pasar: number;
  search_text: string;
  created_date?: string;
}

export interface ClopItem {
  id: string;
  contract_no: string;
  nosin: string;
  office_code: string;
  buss_unit: string;
  trend_cycle: string;
  customer_name: string;
  created_date: string;
}

export interface TaksasiItem {
  id: string;
  customer_name: string;
  contract_no: string;
  brand: string;
  model: string;
  year?: number;
  otr: number;
  km?: number;
  tahun_motor?: number;
  nama_bpkb?: string;
  persen_taksasi?: number;
  harga_taksasi?: number;
  risk?: string;
  tipe_customer?: string;
  cori?: string;
  merk_motor?: string;
  plafond?: number;
  status: "deal" | "proses" | "tolak";
  created_date: string;
}

export interface TargetItem {
  id: string;
  marketing_name: string;
  cabang: string;
  month: string;
  target_amount: number;
  target_count: number;
  created_date?: string;
}

export interface BookingQualityItem {
  id: string;
  contract_no: string;
  customer_name: string;
  status_account: "BAYAR" | "BELUM BAYAR";
  jatuh_tempo: string;
  angsuran?: number;
  marketing_name?: string;
  created_date?: string;
}

export interface ProspectItem {
  id: string;
  customer_name: string;
  phone: string;
  status: "baru" | "follow_up" | "deal" | "batal";
  motor: string;
  plafond: number;
  marketing_name: string;
  created_date: string;
}

export interface FollowUpBahanItem {
  id: string;
  customer_name: string;
  phone: string;
  motor: string;
  status: "bahan" | "follow_up" | "closing";
  notes?: string;
  marketing_name?: string;
  created_date: string;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  detail: string;
  marketing_name: string;
  created_date: string;
}

export interface UserItem {
  id: string;
  name: string;
  full_name: string;
  email: string;
  role: "admin" | "marketing" | "supervisor" | "user";
  cabang: string;
  phone: string;
  created_at: string;
}

export function getInitialSeedData() {
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-10"

  const otrList: OtrItem[] = [
    // HONDA BEAT
    { id: "otr_1", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY CBS FI 110", group_type_unit: "MATIC", year: 2024, harga_pasar: 18450000, search_text: "HONDA BEAT SPORTY CBS FI 110 MATIC 2024" },
    { id: "otr_2", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY DELUXE CBS ISS 110", group_type_unit: "MATIC", year: 2024, harga_pasar: 19300000, search_text: "HONDA BEAT SPORTY DELUXE CBS ISS 110 MATIC 2024" },
    { id: "otr_3", brand: "HONDA", model: "BEAT", object_description: "BEAT STREET CBS 110", group_type_unit: "MATIC", year: 2024, harga_pasar: 19300000, search_text: "HONDA BEAT STREET CBS 110 MATIC 2024" },
    { id: "otr_4", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY CBS FI 110", group_type_unit: "MATIC", year: 2023, harga_pasar: 16800000, search_text: "HONDA BEAT SPORTY CBS FI 110 MATIC 2023" },
    { id: "otr_5", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY DELUXE CBS ISS 110", group_type_unit: "MATIC", year: 2023, harga_pasar: 17500000, search_text: "HONDA BEAT SPORTY DELUXE CBS ISS 110 MATIC 2023" },
    { id: "otr_6", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY CBS FI 110", group_type_unit: "MATIC", year: 2022, harga_pasar: 15200000, search_text: "HONDA BEAT SPORTY CBS FI 110 MATIC 2022" },
    { id: "otr_7", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY CBS FI 110", group_type_unit: "MATIC", year: 2021, harga_pasar: 13900000, search_text: "HONDA BEAT SPORTY CBS FI 110 MATIC 2021" },
    { id: "otr_8", brand: "HONDA", model: "BEAT", object_description: "BEAT SPORTY CBS FI 110", group_type_unit: "MATIC", year: 2020, harga_pasar: 12800000, search_text: "HONDA BEAT SPORTY CBS FI 110 MATIC 2020" },

    // HONDA VARIO
    { id: "otr_9", brand: "HONDA", model: "VARIO 125", object_description: "VARIO 125 CBS NEW", group_type_unit: "MATIC", year: 2024, harga_pasar: 23150000, search_text: "HONDA VARIO 125 CBS NEW MATIC 2024" },
    { id: "otr_10", brand: "HONDA", model: "VARIO 125", object_description: "VARIO 125 CBS ISS SPECIAL NEW", group_type_unit: "MATIC", year: 2024, harga_pasar: 24800000, search_text: "HONDA VARIO 125 CBS ISS SPECIAL NEW MATIC 2024" },
    { id: "otr_11", brand: "HONDA", model: "VARIO 125", object_description: "VARIO 125 CBS", group_type_unit: "MATIC", year: 2023, harga_pasar: 21500000, search_text: "HONDA VARIO 125 CBS MATIC 2023" },
    { id: "otr_12", brand: "HONDA", model: "VARIO 125", object_description: "VARIO 125 CBS ISS", group_type_unit: "MATIC", year: 2022, harga_pasar: 19800000, search_text: "HONDA VARIO 125 CBS ISS MATIC 2022" },
    { id: "otr_13", brand: "HONDA", model: "VARIO 160", object_description: "VARIO 160 CBS", group_type_unit: "MATIC", year: 2024, harga_pasar: 27350000, search_text: "HONDA VARIO 160 CBS MATIC 2024" },
    { id: "otr_14", brand: "HONDA", model: "VARIO 160", object_description: "VARIO 160 ABS", group_type_unit: "MATIC", year: 2024, harga_pasar: 30250000, search_text: "HONDA VARIO 160 ABS MATIC 2024" },
    { id: "otr_15", brand: "HONDA", model: "VARIO 160", object_description: "VARIO 160 CBS", group_type_unit: "MATIC", year: 2023, harga_pasar: 25000000, search_text: "HONDA VARIO 160 CBS MATIC 2023" },
    { id: "otr_16", brand: "HONDA", model: "VARIO 160", object_description: "VARIO 160 ABS", group_type_unit: "MATIC", year: 2022, harga_pasar: 26500000, search_text: "HONDA VARIO 160 ABS MATIC 2022" },

    // HONDA SCOOPY
    { id: "otr_17", brand: "HONDA", model: "SCOOPY", object_description: "SCOOPY SPORTY / FASHION", group_type_unit: "MATIC", year: 2024, harga_pasar: 22425000, search_text: "HONDA SCOOPY SPORTY FASHION MATIC 2024" },
    { id: "otr_18", brand: "HONDA", model: "SCOOPY", object_description: "SCOOPY PRESTIGE / STYLISH KEYLESS", group_type_unit: "MATIC", year: 2024, harga_pasar: 23230000, search_text: "HONDA SCOOPY PRESTIGE STYLISH KEYLESS MATIC 2024" },
    { id: "otr_19", brand: "HONDA", model: "SCOOPY", object_description: "SCOOPY PRESTIGE KEYLESS", group_type_unit: "MATIC", year: 2023, harga_pasar: 21100000, search_text: "HONDA SCOOPY PRESTIGE KEYLESS MATIC 2023" },
    { id: "otr_20", brand: "HONDA", model: "SCOOPY", object_description: "SCOOPY STYLISH KEYLESS", group_type_unit: "MATIC", year: 2022, harga_pasar: 19500000, search_text: "HONDA SCOOPY STYLISH KEYLESS MATIC 2022" },
    { id: "otr_21", brand: "HONDA", model: "SCOOPY", object_description: "SCOOPY SPORTY", group_type_unit: "MATIC", year: 2021, harga_pasar: 17800000, search_text: "HONDA SCOOPY SPORTY MATIC 2021" },

    // HONDA PCX & ADV
    { id: "otr_22", brand: "HONDA", model: "PCX 160", object_description: "PCX 160 CBS", group_type_unit: "MATIC", year: 2024, harga_pasar: 33300000, search_text: "HONDA PCX 160 CBS MATIC 2024" },
    { id: "otr_23", brand: "HONDA", model: "PCX 160", object_description: "PCX 160 ABS", group_type_unit: "MATIC", year: 2024, harga_pasar: 36800000, search_text: "HONDA PCX 160 ABS MATIC 2024" },
    { id: "otr_24", brand: "HONDA", model: "PCX 160", object_description: "PCX 160 CBS", group_type_unit: "MATIC", year: 2023, harga_pasar: 30800000, search_text: "HONDA PCX 160 CBS MATIC 2023" },
    { id: "otr_25", brand: "HONDA", model: "ADV 160", object_description: "ADV 160 CBS", group_type_unit: "MATIC", year: 2024, harga_pasar: 36900000, search_text: "HONDA ADV 160 CBS MATIC 2024" },
    { id: "otr_26", brand: "HONDA", model: "ADV 160", object_description: "ADV 160 ABS", group_type_unit: "MATIC", year: 2024, harga_pasar: 40100000, search_text: "HONDA ADV 160 ABS MATIC 2024" },
    { id: "otr_27", brand: "HONDA", model: "ADV 160", object_description: "ADV 160 CBS", group_type_unit: "MATIC", year: 2023, harga_pasar: 34200000, search_text: "HONDA ADV 160 CBS MATIC 2023" },

    // YAMAHA NMAX & AEROX
    { id: "otr_28", brand: "YAMAHA", model: "NMAX 155", object_description: "NMAX 155 CONNECTED ABS", group_type_unit: "MATIC", year: 2024, harga_pasar: 36300000, search_text: "YAMAHA NMAX 155 CONNECTED ABS MATIC 2024" },
    { id: "otr_29", brand: "YAMAHA", model: "NMAX 155", object_description: "NMAX 155 STANDARD", group_type_unit: "MATIC", year: 2024, harga_pasar: 32175000, search_text: "YAMAHA NMAX 155 STANDARD MATIC 2024" },
    { id: "otr_30", brand: "YAMAHA", model: "NMAX 155", object_description: "NMAX 155 CONNECTED", group_type_unit: "MATIC", year: 2023, harga_pasar: 29500000, search_text: "YAMAHA NMAX 155 CONNECTED MATIC 2023" },
    { id: "otr_31", brand: "YAMAHA", model: "NMAX 155", object_description: "NMAX 155 NON ABS", group_type_unit: "MATIC", year: 2022, harga_pasar: 27000000, search_text: "YAMAHA NMAX 155 NON ABS MATIC 2022" },
    { id: "otr_32", brand: "YAMAHA", model: "AEROX 155", object_description: "AEROX 155 CONNECTED CYBERCITY", group_type_unit: "MATIC", year: 2024, harga_pasar: 28330000, search_text: "YAMAHA AEROX 155 CONNECTED CYBERCITY MATIC 2024" },
    { id: "otr_33", brand: "YAMAHA", model: "AEROX 155", object_description: "AEROX 155 CONNECTED ABS", group_type_unit: "MATIC", year: 2024, harga_pasar: 31560000, search_text: "YAMAHA AEROX 155 CONNECTED ABS MATIC 2024" },
    { id: "otr_34", brand: "YAMAHA", model: "AEROX 155", object_description: "AEROX 155 CONNECTED", group_type_unit: "MATIC", year: 2023, harga_pasar: 25800000, search_text: "YAMAHA AEROX 155 CONNECTED MATIC 2023" },
    { id: "otr_35", brand: "YAMAHA", model: "AEROX 155", object_description: "AEROX 155 STANDARD", group_type_unit: "MATIC", year: 2022, harga_pasar: 23900000, search_text: "YAMAHA AEROX 155 STANDARD MATIC 2022" },

    // YAMAHA CLASSIC & DAILY
    { id: "otr_36", brand: "YAMAHA", model: "FAZZIO", object_description: "FAZZIO HYBRID CONNECTED NEO", group_type_unit: "MATIC", year: 2024, harga_pasar: 22800000, search_text: "YAMAHA FAZZIO HYBRID CONNECTED NEO MATIC 2024" },
    { id: "otr_37", brand: "YAMAHA", model: "FAZZIO", object_description: "FAZZIO HYBRID LUX", group_type_unit: "MATIC", year: 2024, harga_pasar: 23450000, search_text: "YAMAHA FAZZIO HYBRID LUX MATIC 2024" },
    { id: "otr_38", brand: "YAMAHA", model: "GRAND FILANO", object_description: "GRAND FILANO HYBRID CONNECTED NEO", group_type_unit: "MATIC", year: 2024, harga_pasar: 27150000, search_text: "YAMAHA GRAND FILANO HYBRID CONNECTED NEO MATIC 2024" },
    { id: "otr_39", brand: "YAMAHA", model: "MIO M3", object_description: "MIO M3 125 CW", group_type_unit: "MATIC", year: 2024, harga_pasar: 17750000, search_text: "YAMAHA MIO M3 125 CW MATIC 2024" },
    { id: "otr_40", brand: "YAMAHA", model: "GEAR 125", object_description: "GEAR 125 S VERSION", group_type_unit: "MATIC", year: 2024, harga_pasar: 19220000, search_text: "YAMAHA GEAR 125 S VERSION MATIC 2024" },

    // SPORT & TRAIL
    { id: "otr_41", brand: "HONDA", model: "CRF 150L", object_description: "CRF 150L EXTREME BLACK", group_type_unit: "SPORT", year: 2024, harga_pasar: 36700000, search_text: "HONDA CRF 150L EXTREME BLACK SPORT 2024" },
    { id: "otr_42", brand: "HONDA", model: "CRF 150L", object_description: "CRF 150L RED ON/OFF ROAD", group_type_unit: "SPORT", year: 2023, harga_pasar: 33500000, search_text: "HONDA CRF 150L SPORT 2023" },
    { id: "otr_43", brand: "KAWASAKI", model: "KLX 150", object_description: "KLX 150 BF SE", group_type_unit: "SPORT", year: 2024, harga_pasar: 39800000, search_text: "KAWASAKI KLX 150 BF SE SPORT 2024" },
    { id: "otr_44", brand: "KAWASAKI", model: "KLX 150", object_description: "KLX 150 S STANDARD", group_type_unit: "SPORT", year: 2023, harga_pasar: 33000000, search_text: "KAWASAKI KLX 150 S STANDARD SPORT 2023" },
    { id: "otr_45", brand: "YAMAHA", model: "WR 155 R", object_description: "WR 155 R DUAL PURPOSE", group_type_unit: "SPORT", year: 2024, harga_pasar: 39045000, search_text: "YAMAHA WR 155 R DUAL PURPOSE SPORT 2024" },
    { id: "otr_46", brand: "HONDA", model: "CBR 150R", object_description: "CBR 150R ABS MOTOGP EDITION", group_type_unit: "SPORT", year: 2024, harga_pasar: 42100000, search_text: "HONDA CBR 150R ABS MOTOGP SPORT 2024" },
    { id: "otr_47", brand: "YAMAHA", model: "XSR 155", object_description: "XSR 155 HERITAGE", group_type_unit: "SPORT", year: 2024, harga_pasar: 38305000, search_text: "YAMAHA XSR 155 HERITAGE SPORT 2024" }
  ];

  const clopList: ClopItem[] = [
    { id: "clop_1", contract_no: "820124001923", nosin: "JF51E1928374", office_code: "JKT-01", buss_unit: "MOTORCYCLE", trend_cycle: "CURRENT", customer_name: "Bambang Sugiono", created_date: "2026-09-15" },
    { id: "clop_2", contract_no: "820124002841", nosin: "MH1JF1239821", office_code: "JKT-02", buss_unit: "MOTORCYCLE", trend_cycle: "CYCLE-2", customer_name: "Dedi Prasetyo", created_date: "2026-09-20" },
    { id: "clop_3", contract_no: "820124003419", nosin: "KF12E4829103", office_code: "BDG-01", buss_unit: "MOTORCYCLE", trend_cycle: "CURRENT", customer_name: "Rina Marlina", created_date: "2026-09-28" },
    { id: "clop_4", contract_no: "820124004112", nosin: "G3E1E9028145", office_code: "SBY-01", buss_unit: "MOTORCYCLE", trend_cycle: "CURRENT", customer_name: "Agus Setiawan", created_date: "2026-10-02" },
    { id: "clop_5", contract_no: "820124005520", nosin: "JM01E8371920", office_code: "JKT-01", buss_unit: "MOTORCYCLE", trend_cycle: "CYCLE-1", customer_name: "Siti Rahayu", created_date: "2026-10-05" },
    { id: "clop_6", contract_no: "820124006283", nosin: "JF61E2819034", office_code: "TGR-01", buss_unit: "MOTORCYCLE", trend_cycle: "CURRENT", customer_name: "Hendri Kurniawan", created_date: "2026-10-06" }
  ];

  const taksasiList: TaksasiItem[] = [
    {
      id: "tak_1",
      customer_name: "Ahmad Gunawan",
      contract_no: "820124001923",
      brand: "HONDA",
      model: "BEAT SPORTY DELUXE CBS ISS 110",
      year: 2023,
      otr: 17500000,
      km: 12000,
      tahun_motor: 2023,
      nama_bpkb: "Same",
      persen_taksasi: 85,
      harga_taksasi: 14875000,
      risk: "Low",
      tipe_customer: "RO",
      cori: "GREEN",
      merk_motor: "HONDA",
      plafond: 14500000,
      status: "deal",
      created_date: `${currentMonth}-02`
    },
    {
      id: "tak_2",
      customer_name: "Nurul Hidayah",
      contract_no: "820124003419",
      brand: "HONDA",
      model: "SCOOPY PRESTIGE KEYLESS",
      year: 2023,
      otr: 21100000,
      km: 8500,
      tahun_motor: 2023,
      nama_bpkb: "Same",
      persen_taksasi: 85,
      harga_taksasi: 17935000,
      risk: "Low",
      tipe_customer: "New",
      cori: "GREEN",
      merk_motor: "HONDA",
      plafond: 17500000,
      status: "deal",
      created_date: `${currentMonth}-05`
    },
    {
      id: "tak_3",
      customer_name: "Rizki Pratama",
      contract_no: "820124004112",
      brand: "YAMAHA",
      model: "NMAX 155 CONNECTED ABS",
      year: 2024,
      otr: 36300000,
      km: 4000,
      tahun_motor: 2024,
      nama_bpkb: "Same",
      persen_taksasi: 90,
      harga_taksasi: 32670000,
      risk: "Low",
      tipe_customer: "RO",
      cori: "GREEN",
      merk_motor: "YAMAHA",
      plafond: 32000000,
      status: "deal",
      created_date: `${currentMonth}-07`
    },
    {
      id: "tak_4",
      customer_name: "Indra Wijaya",
      contract_no: "820124005520",
      brand: "HONDA",
      model: "VARIO 160 ABS",
      year: 2023,
      otr: 26500000,
      km: 19000,
      tahun_motor: 2023,
      nama_bpkb: "Different",
      persen_taksasi: 75,
      harga_taksasi: 19875000,
      risk: "Medium",
      tipe_customer: "New",
      cori: "YELLOW",
      merk_motor: "HONDA",
      plafond: 19000000,
      status: "proses",
      created_date: `${currentMonth}-08`
    }
  ];

  const targetList: TargetItem[] = [
    { id: "tgt_1", marketing_name: "Semua", cabang: "Cabang Jakarta Pusat", month: currentMonth, target_amount: 300000000, target_count: 20, created_date: `${currentMonth}-01` },
    { id: "tgt_2", marketing_name: "Bani Munggaran", cabang: "Cabang Jakarta Pusat", month: currentMonth, target_amount: 120000000, target_count: 8, created_date: `${currentMonth}-01` },
    { id: "tgt_3", marketing_name: "Siti Rahma", cabang: "Cabang Jakarta Pusat", month: currentMonth, target_amount: 90000000, target_count: 6, created_date: `${currentMonth}-01` },
    { id: "tgt_4", marketing_name: "Budi Santoso", cabang: "Cabang Jakarta Pusat", month: currentMonth, target_amount: 90000000, target_count: 6, created_date: `${currentMonth}-01` }
  ];

  const bookingQualityList: BookingQualityItem[] = [
    { id: "bq_1", contract_no: "820124001923", customer_name: "Bambang Sugiono", status_account: "BAYAR", jatuh_tempo: `${currentMonth}-10`, angsuran: 825000, marketing_name: "Bani Munggaran" },
    { id: "bq_2", contract_no: "820124002841", customer_name: "Dedi Prasetyo", status_account: "BAYAR", jatuh_tempo: `${currentMonth}-12`, angsuran: 940000, marketing_name: "Bani Munggaran" },
    { id: "bq_3", contract_no: "820124003419", customer_name: "Rina Marlina", status_account: "BELUM BAYAR", jatuh_tempo: `${currentMonth}-18`, angsuran: 1150000, marketing_name: "Siti Rahma" },
    { id: "bq_4", contract_no: "820124004112", customer_name: "Agus Setiawan", status_account: "BAYAR", jatuh_tempo: `${currentMonth}-05`, angsuran: 1420000, marketing_name: "Budi Santoso" },
    { id: "bq_5", contract_no: "820124005520", customer_name: "Siti Rahayu", status_account: "BELUM BAYAR", jatuh_tempo: `${currentMonth}-08`, angsuran: 890000, marketing_name: "Bani Munggaran" }
  ];

  const prospectList: ProspectItem[] = [
    { id: "pros_1", customer_name: "Wawan Hermawan", phone: "081298765432", status: "deal", motor: "Honda Beat Deluxe 2024", plafond: 16000000, marketing_name: "Bani Munggaran", created_date: `${currentMonth}-03` },
    { id: "pros_2", customer_name: "Fitri Handayani", phone: "085712345678", status: "follow_up", motor: "Yamaha Fazzio 2024", plafond: 19000000, marketing_name: "Bani Munggaran", created_date: `${currentMonth}-04` },
    { id: "pros_3", customer_name: "Surya Kencana", phone: "081399887766", status: "baru", motor: "Honda PCX 160 2023", plafond: 28000000, marketing_name: "Siti Rahma", created_date: `${currentMonth}-06` },
    { id: "pros_4", customer_name: "Maya Anggraini", phone: "087811223344", status: "deal", motor: "Honda Scoopy 2023", plafond: 17500000, marketing_name: "Bani Munggaran", created_date: `${currentMonth}-07` }
  ];

  const followUpBahanList: FollowUpBahanItem[] = [
    { id: "fub_1", customer_name: "Teguh Riyadi", phone: "081987654321", motor: "Vario 160 2023", status: "bahan", notes: "Minat dana tunai 15jt, butuh BPKB ready", marketing_name: "Bani Munggaran", created_date: `${currentMonth}-02` },
    { id: "fub_2", customer_name: "Dewi Lestari", phone: "082155443322", motor: "Aerox 155 2022", status: "follow_up", notes: "Sudah disimulasikan tenor 24 bln", marketing_name: "Bani Munggaran", created_date: `${currentMonth}-05` },
    { id: "fub_3", customer_name: "Ilham Habibie", phone: "085611223344", motor: "CRF 150L 2023", status: "closing", notes: "Deal plafond 28jt survey hari ini", marketing_name: "Budi Santoso", created_date: `${currentMonth}-06` }
  ];

  const activityLogList: ActivityLogItem[] = [
    { id: "act_1", action: "hitung_taksasi", detail: "Kalkulasi taksasi Honda Beat Deluxe 2023 - Nilai Plafond Rp 14.500.000", marketing_name: "Bani Munggaran", created_date: `${currentMonth}-02 09:15` },
    { id: "act_2", action: "search_otr", detail: "Pencarian OTR: Honda Scoopy Prestige 2023 - Rp 21.100.000", marketing_name: "Bani Munggaran", created_date: `${currentMonth}-05 11:20` },
    { id: "act_3", action: "cek_kontrak", detail: "Cek Kontrak No: 820124003419", marketing_name: "Bani Munggaran", created_date: `${currentMonth}-05 14:02` },
    { id: "act_4", action: "tambah_prospek", detail: "Input prospek baru: Fitri Handayani (Yamaha Fazzio)", marketing_name: "Bani Munggaran", created_date: `${currentMonth}-06 10:45` }
  ];

  const userList: UserItem[] = [
    { id: "user_bani", name: "Bani Munggaran", full_name: "Bani Munggaran", email: "bani.munggaran07@gmail.com", role: "admin", cabang: "Cabang Jakarta Pusat", phone: "081234567890", created_at: "2026-01-01T00:00:00.000Z" },
    { id: "user_siti", name: "Siti Rahma", full_name: "Siti Rahma", email: "siti.rahma@smart-taksasi.co.id", role: "marketing", cabang: "Cabang Jakarta Pusat", phone: "081298765431", created_at: "2026-01-10T00:00:00.000Z" },
    { id: "user_budi", name: "Budi Santoso", full_name: "Budi Santoso", email: "budi.santoso@smart-taksasi.co.id", role: "marketing", cabang: "Cabang Jakarta Pusat", phone: "081298765432", created_at: "2026-01-15T00:00:00.000Z" }
  ];

  return {
    OtrPrice: otrList,
    ClopContract: clopList,
    Taksasi: taksasiList,
    Target: targetList,
    BookingQuality: bookingQualityList,
    Prospect: prospectList,
    FollowUpBahan: followUpBahanList,
    ActivityLog: activityLogList,
    User: userList,
    Notification: []
  };
}
