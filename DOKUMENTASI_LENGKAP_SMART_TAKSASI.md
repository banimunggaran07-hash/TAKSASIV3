# DOKUMENTASI LENGKAP SISTEM SMART TAKSASI (V2.1.3 / V2.2)
### Product Requirement Document (PRD), Struktur Kerangka Aplikasi, dan Alur Kerja End-to-End

---

## DAFTAR ISI
1. [BAB I: PRODUCT REQUIREMENT DOCUMENT (PRD)](#bab-i-product-requirement-document-prd)
   - 1.1 [Ringkasan Eksekutif & Latar Belakang Masalah](#11-ringkasan-eksekutif--latar-belakang-masalah)
   - 1.2 [Visi, Nilai Bisnis, & Target Audiens](#12-visi-nilai-bisnis--target-audiens)
   - 1.3 [Matriks Persona Pengguna & Hak Akses (RBAC)](#13-matriks-persona-pengguna--hak-akses-rbac)
   - 1.4 [Spesifikasi Rinci 17+ Modul Fungsional](#14-spesifikasi-rinci-17-modul-fungsional)
   - 1.5 [Logika Matematis & Formula Engine Taksasi](#15-logika-matematis--formula-engine-taksasi)
   - 1.6 [Spesifikasi Standarisasi Integrasi Template WhatsApp](#16-spesifikasi-standarisasi-integrasi-template-whatsapp)
   - 1.7 [Arsitektur Master Data & Import Hub ("1 Tab 1 Master")](#17-arsitektur-master-data--import-hub-1-tab-1-master)
   - 1.8 [Persyaratan Non-Fungsional (NFR)](#18-persyaratan-non-fungsional-nfr)
2. [BAB II: STRUKTUR KERANGKA APLIKASI (APPLICATION ARCHITECTURE)](#bab-ii-struktur-kerangka-aplikasi-application-architecture)
   - 2.1 [Diagram Arsitektur Sistem End-to-End](#21-diagram-arsitektur-sistem-end-to-end)
   - 2.2 [Pohon Struktur Direktori & File Project](#22-pohon-struktur-direktori--file-project)
   - 2.3 [Skema Database & Model Data (Drizzle ORM & JSON Store)](#23-skema-database--model-data-drizzle-orm--json-store)
   - 2.4 [Katalog Endpoint REST API Backend](#24-katalog-endpoint-rest-api-backend)
   - 2.5 [Arsitektur Komponen Frontend & Auth Gatekeeper](#25-arsitektur-komponen-frontend--auth-gatekeeper)
3. [BAB III: ALUR KERJA SISTEM (END-TO-END WORKFLOWS)](#bab-iii-alur-kerja-sistem-end-to-end-workflows)
   - 3.1 [Alur Autentikasi, Registrasi, & Barrier Akses](#31-alur-autentikasi-registrasi--barrier-akses)
   - 3.2 [Alur Operasional Perhitungan Taksasi & Simulasi Plafond](#32-alur-operasional-perhitungan-taksasi--simulasi-plafond)
   - 3.3 [Alur Pengecekan Kontrak & Verifikasi Nasabah Existing (CLOP HO)](#33-alur-pengecekan-kontrak--verifikasi-nasabah-existing-clop-ho)
   - 3.4 [Alur Tindak Lanjut Follow Up Bahan Gform ke WhatsApp](#34-alur-tindak-lanjut-follow-up-bahan-gform-ke-whatsapp)
   - 3.5 [Alur Penagihan & Monitoring Booking Quality (BQ)](#35-alur-penagihan--monitoring-booking-quality-bq)
   - 3.6 [Alur Import Data Excel Cerdas (Smart Header & Batch Upload)](#36-alur-import-data-excel-cerdas-smart-header--batch-upload)
   - 3.7 [Alur Supervisi, Rekap Harian, & Evaluasi Kinerja Tim](#37-alur-supervisi-rekap-harian--evaluasi-kinerja-tim)
   - 3.8 [Alur Distribusi APK Android & Offline Caching (PWA)](#38-alur-distribusi-apk-android--offline-caching-pwa)
4. [BAB IV: PANDUAN DEPLOYMENT & MAINTENANCE](#bab-iv-panduan-deployment--maintenance)
   - 4.1 [Spesifikasi Lingkungan & Instalasi](#41-spesifikasi-lingkungan--instalasi)
   - 4.2 [Strategi Pencadangan (Backup) & Factory Reset](#42-strategi-pencadangan-backup--factory-reset)

---

# BAB I: PRODUCT REQUIREMENT DOCUMENT (PRD)

## 1.1 Ringkasan Eksekutif & Latar Belakang Masalah
**Smart Taksasi** adalah platform operasional finansial terintegrasi (full-stack standalone application) yang dibangun secara khusus untuk mendukung tenaga pemasar (*Marketing Credit Executive* / *Sales Force*), analis kredit, dan kepala unit (*Unit Head* / *Supervisor*) dalam ekosistem pembiayaan multiguna kendaraan bermotor (khususnya pembiayaan dana tunai agunan BPKB motor FIFGROUP / Multifinance).

Sebelum hadirnya Smart Taksasi, operasional cabang menghadapi berbagai tantangan krusial:
1. **Inefisiensi & Risiko Salah Hitung Lapangan**: Penentuan nilai taksasi, potongan pajak mati tahunan, potongan kaleng/TNKB 5 tahunan, kehilangan faktur, hingga perhitungan sisa pokok pelunasan top-up dilakukan manual menggunakan tabel kertas atau kalkulator biasa, rentan menghasilkan penawaran plafond yang melebihi batas risiko (*over-financing*).
2. **Data Kontrak & Debitur yang Terfragmentasi**: Pengecekan riwayat kontrak nasabah lama (CLOP HO) dan penagihan angsuran kritis (Booking Quality) terpisah dalam puluhan file spreadsheet yang berat dan tidak responsif di perangkat seluler.
3. **Kegagalan Massal Import Excel**: File spreadsheet dari kantor pusat sering kali memiliki baris kosong, judul banner di baris pertama, nama kolom berbeda (misal: "No Mesin" vs "Nosin"), atau karakter mata uang (`Rp`, titik, koma) yang menyebabkan modul import database konvensional mengalami error atau timeout.
4. **Tidak Adanya Standarisasi Pesan WhatsApp**: Komunikasi penawaran ke calon konsumen dilakukan secara manual, memakan waktu lama untuk mengetik ulang nama dan nomor kontrak, serta rentan salah ketik rincian promo pembiayaan.

Smart Taksasi V2.1.3 / V2.2 menyelesaikan seluruh permasalahan di atas dalam satu sistem aplikasi mandiri yang cepat, offline-ready (PWA & APK Android), dan dilengkapi mekanisme perlindungan data berbasis hybrid database.

---

## 1.2 Visi, Nilai Bisnis, & Target Audiens
* **Visi**: Menjadi asisten digital operasional nomor satu bagi sales force multifinance di Indonesia yang mempercepat siklus taksasi dari 20 menit menjadi kurang dari 15 detik.
* **Nilai Bisnis**:
  - **Akurasi 100%**: Menghilangkan selisih perhitungan plafond dan denda pelunasan top-up.
  - **Efisiensi Follow Up Naik 300%**: Fitur WhatsApp 1-klik dengan pesan dinamis mempercepat kontak ke calon debitur baru dan existing.
  - **Kualitas Portofolio Terjaga**: Monitoring real-time Booking Quality (BQ) mencegah naiknya rasio Non-Performing Loan (NPL).
* **Target Audiens**:
  - *Sales Force / Marketing Credit Executive (MCE)*.
  - *Supervisor Marketing / Unit Head Cabang*.
  - *Credit Analyst / Collection Officer*.
  - *Administrator Sistem Multifinance Cabang*.

---

## 1.3 Matriks Persona Pengguna & Hak Akses (RBAC)

Sistem membedakan izin akses melalui Firebase Authentication dan database lokal:

| Fitur / Modul Operasional | Marketing (Sales Force) | Supervisor / Unit Head | Administrator |
| :--- | :---: | :---: | :---: |
| **Kalkulator Taksasi & Hitung Bersih** | Full Akses | Full Akses | Full Akses |
| **Pencarian OTR & Pricelist** | Full Akses | Full Akses | Full Akses |
| **Pengecekan Kontrak CLOP HO** | Pencarian & Validasi | Pencarian & Audit | Full Akses |
| **Follow Up Bahan Gform** | Bahan Milik Sendiri (Deal/Reject) | Pantau Seluruh Tim Cabang | Full Akses |
| **WhatsApp Template Generator 1-Klik** | Full Akses | Full Akses | Full Akses |
| **Tagihan Booking Quality (BQ)** | Akun Milik Sendiri (Update Bayar) | Monitoring Portofolio | Full Akses |
| **Riwayat Pengerjaan** | Data Pribadi | Data Seluruh Anggota | Full Akses |
| **Distribusi Prospek (Bagi Bahan)** | Hanya Baca | Upload & Bagi Tim | Full Akses |
| **Rekap Harian & Dasbor Kinerja** | Terbatas (Statistik Sendiri) | Lengkap (Semua Tim/Cabang) | Full Akses |
| **Target Pencapaian Sales** | Lihat Target Sendiri | Atur & Evaluasi KPI | Full Akses |
| **Log Audit Aktivitas** | Tidak Diizinkan | Full Akses | Full Akses |
| **Kelola User (CS ID & Otorisasi)** | Tidak Diizinkan | Full Akses | Full Akses |
| **Master Data & Import Hub** | Baca & Input Manual | Upload, Batch, Export, Clear | Full Akses |

---

## 1.4 Spesifikasi Rinci 17+ Modul Fungsional

### Modul 1: Dashboard Operasional (`/Dashboard`)
* **Widget KPI Utama**: Total Bahan Siap Follow Up, Kalkulasi Hari Ini, Rasio Deal/Closing, dan Total Tagihan BQ Jatuh Tempo.
* **Shortcut Quick Actions**: Tombol cepat menuju Kalkulator Taksasi, Daftar Bahan, Download APK Android, dan Import Hub.
* **Live Feed Aktivitas**: Menampilkan histori pencatatan transaksi terkini dari tim.

### Modul 2: Pencarian OTR Motor (`/PencarianOtr`)
* **Katalog Harga Pasar Multi-Brand**: Honda, Yamaha, Suzuki, Kawasaki, Vespa, dan brand lainnya.
* **Pencarian Real-Time**: Multi-parameter berdasarkan merk, model (Beat, Vario, NMAX, Aerox, Scoopy, PCX, dll.), dan tahun perakitan.
* **Tombol "Hitung Taksasi"**: Mentransfer data merk, tipe, tahun, dan OTR langsung ke modul Kalkulator tanpa perlu input manual ulang.

### Modul 3: Engine Kalkulator Taksasi Multiguna (`/Kalkulator`)
* **Parameter Fisik & Unit**: Merk, Model, Tahun, Nilai OTR Pasar, Odometer (KM).
* **Legalitas & Dokumen**:
  - Kepemilikan BPKB: *Segaris* (Atas Nama Sendiri/Keluarga Inti 1 KK) vs *Beda Nama* (Different).
  - Kelengkapan Faktur: Ada vs Tidak Ada (Otomatis memotong nilai plafond sebesar Rp 500.000 jika faktur tidak ada).
  - Pajak Mati: Input durasi tahun pajak terlewat (otomatis menghitung denda dan pokok potongan pajak).
  - Plat Kaleng 5 Tahunan Mati: Checkbox otomatis menerapkan penalti potongan kaleng mati.
* **Scoring Karakter & Risiko**:
  - Status Konsumen: *New Customer* vs *Repeat Order (RO)*.
  - Skor Riwayat CORI: *Good*, *Fair*, atau *Poor*.
* **Opsi Pembiayaan & Tenor**: Pilihan tenor 11, 12, 17, 23, 24, 29, 35, 36 bulan dengan skema Angsuran Reguler atau Promo.
* **Kalkulasi Skema Top Up Pinjaman**:
  - Nilai sisa pokok angsuran berjalan dari kontrak sebelumnya.
  - Nilai denda berjalan & denda terbayar (menghasilkan *denda nett*).
  - Collection fee berjalan & terbayar (menghasilkan *coll fee nett*).
  - Perhitungan otomatis nilai **Terima Bersih (Net Disbursement)** yang langsung cair ke rekening nasabah.
* **Output Struk Digital (JPG Canvas Card)**: Generate gambar kartu hasil taksasi yang siap diunduh dan dibagikan langsung ke chat WhatsApp nasabah atau grup komite kredit.

### Modul 4: Pricelist Angsuran (`/PricelistAngsuran`)
* Matriks simulasi angsuran komprehensif berdasarkan rentang nominal plafond dan uang muka (DP).
* Filter cepat berdasarkan tenor pembiayaan untuk mempermudah marketing memberikan alternatif simulasi cicilan kepada konsumen di lapangan.

### Modul 5: Cek Kontrak Nasabah CLOP HO (`/CekKontrak`)
* Pencarian cepat basis data kontrak pembiayaan nasabah pusat (*CLOP HO*).
* Menampilkan rincian: Nomor Kontrak, Nama Konsumen, Nomor Mesin (Nosin), Kode Cabang/Kantor, Unit Bisnis, dan Trend Cycle pembayaran.
* Mencegah pembiayaan ganda (*double pledge*) dan memverifikasi kelayakan pembiayaan ulang.

### Modul 6: Rekap Taksasi (`/RekapTaksasi`)
* Basis data seluruh riwayat penaksiran unit kendaraan yang pernah dihitung oleh marketing.
* Pengelompokan status pengerjaan: *Draft*, *Diajukan*, *Disetujui*, *Cair*, dan *Batal*.

### Modul 7: Distribusi Prospek (`/DistribusiProspek`)
* Khusus level Supervisor / Unit Head untuk membagi data prospek baru yang didapat dari kegiatan pameran, kanvasing, atau pendaftaran web.
* Mekanisme pembagian bahan: Berdasarkan CS ID tertentu atau pembagian merata (*Round-Robin*).

### Modul 8: Follow Up Bahan Gform (`/FollowUpBahan`)
* Pusat pengerjaan bahan prospek online Google Form.
* **Indikator Keterlambatan (Aging Badge)**: Alert khusus berwarna merah/oranye apabila bahan belum dikerjakan lebih dari 2 hari (`Belum dikerjakan N hari`).
* **Integrasi WhatsApp 1-Klik**: Tombol *"Hubungi WhatsApp"* yang secara otomatis menginjeksi nama konsumen, nomor kontrak, nomor HP, dan nama marketing ke template pesan resmi penawaran pinjaman FIFGROUP.
* **Perubahan Status Bahan**:
  - `Mulai Kerjakan` -> Mengubah status menjadi `follow_up`.
  - `Deal` -> Menandai kesepakatan pengajuan pinjaman.
  - `Reject` -> Menampilkan form wajib alasan penolakan (misal: "Konsumen tidak berminat", "Pajak mati terlalu lama", "Unit sudah dijual").

### Modul 9: Tagihan Booking Quality / BQ (`/TagihanBookingQuality`)
* Monitoring portofolio kualitas angsuran nasabah berdasarkan tanggal jatuh tempo bulanan.
* Klasifikasi kolektibilitas: `Lancar`, `DPK` (Dalam Perhatian Khusus), `NPL` (Menunggak Berat), `Lunas`.
* Fitur pengiriman kartu pengingat pembayaran ke WhatsApp nasabah sebelum jatuh tempo.

### Modul 10: Riwayat Pengerjaan (`/RiwayatPengerjaan`)
* Tempat berkumpulnya seluruh bahan follow-up yang telah diselesaikan (`follow_up`, `deal`, `reject`) serta tagihan BQ yang berstatus `BAYAR` atau `ROLLING`.
* Menyediakan laporan rekapitulasi efektivitas penagihan dan rasio deal per marketing.

### Modul 11: Rekap Harian (`/RekapHarian`)
* Laporan ringkasan harian performa cabang: jumlah unit masuk, total taksasi rupiah, jumlah aplikasi deal, dan tingkat penolakan harian.

### Modul 12: Dasbor Kinerja (`/DasborKinerja`)
* Grafik visualisasi tren pencapaian bulanan, performa tim marketing, dan kontribusi pembiayaan cabang.

### Modul 13: Target Pencapaian Sales (`/TargetPencapaian`)
* Monitoring real-time capaian sales terhadap target KPI bulanan (Target Nominal Plafond Rupiah & Target Jumlah Unit).

### Modul 14: Log Aktivitas Sistem (`/LogAktivitas`)
* Audit trail pencatatan audit: waktu aksi, tipe aksi (hitung taksasi, update bahan, import data), dan identitas pelaksana.

### Modul 15: Kelola User & Penugasan CS ID (`/KelolaUser`)
* Manajemen akun staf cabang: pengaturan Nama Lengkap, Email, Peran (*Marketing*, *Supervisor*, *Admin*), penetapan CS ID unik, dan penentuan kantor cabang.

### Modul 16: Pengaturan & Panduan Operasional (`/Pengaturan` & `/Panduan`)
* Petunjuk pelaksanaan teknis, aturan persentase depresiasi unit, dan kriteria scoring kredit.

### Modul 17: Master Data & Import Hub ("1 Tab 1 Master")
* Manajemen dan import terpadu untuk 7 entitas master:
  1. `Master OTR` (Harga Pasar Motor)
  2. `Master CLOP HO` (Database Kontrak Debitur)
  3. `Master BQ` (Monitoring Angsuran & Kualitas Akun)
  4. `Master Follow Up Gform` (Leads Online & Kontak)
  5. `Master PriceList` (Skema DP, Tenor, & Angsuran)
  6. `Master Bahan Prospek` (Pipeline Kerja Sales)
  7. `Master Target Sales` (Target KPI Bulanan Marketing)

---

## 1.5 Logika Matematis & Formula Engine Taksasi

Fungsi inti `HSe()` pada file bundle mengimplementasikan logika kredit multifinance berikut:

```
[OTR Pasar Motor] ───x [% Taksasi (Kondisi/KM)] ───► [Harga Taksasi Unit]
                                                             │
                                                             ▼
                                                [Dikurangi Potongan Dokumen]:
                                                - Potongan Pajak Mati (per tahun)
                                                - Potongan Plat Kaleng Mati (5 thn)
                                                - Potongan Faktur Tidak Ada (Rp 500.000)
                                                             │
                                                             ▼
                                                    [OTR Efektif Unit]
                                                             │
                                                             ▼
                                                [Evaluasi Rasio Plafond]:
                                                Rasio = f(Tipe Konsumen, CORI, BPKB)
                                                             │
                                                             ▼
                                                [Rekomendasi Plafond Disetujui]:
                                                Plafond = Floor(OTR Efektif * Rasio / 250.000) * 250.000
                                                (Minimal Plafond = Rp 3.250.000)
                                                             │
                                                             ▼
                                                [Kalkulasi Terima Bersih Top Up]:
                                                Terima Bersih = Plafond
                                                              - Sisa Pokok Angsuran Lama
                                                              - Denda Nett (Denda - Terbayar)
                                                              - Coll Fee Nett (Fee - Terbayar)
                                                              - Biaya Meterai
                                                              - Biaya Administrasi & TopUp
```

---

## 1.6 Spesifikasi Standarisasi Integrasi Template WhatsApp

Pada menu **Follow Up Bahan**, ketika marketing menekan tombol *"Hubungi WhatsApp"*, sistem secara otomatis mengeksekusi normalisasi data:
1. **Sanitasi Nomor**: Nomor `081234567890` diubah menjadi `6281234567890`.
2. **Penyusunan Teks Pesan Otomatis**:
```text
HALLO FIFFERS💸 
PELANGGAN YTH 
NAMA : [NAMA KONSUMEN]
NO KONTRAK : [NOMOR KONTRAK]
Butuh dana?? ke FIFGROUP aja jaminan *BPKB MOTOR* Anda 
Syarat mudah dan aman 
- Bisa ajukan Top up 
- Take Over 
- Proses cepat 
-potongan angsuran 15rb sampai 30rb

Full Tanpa Potongan Apapun 
Ajukan Hari Ini Dapatkan uangnya juga hari ini 
☎ Hub : Tlp/Wa : [NAMA MARKETING]
Gratis souvernir menarik 
Mau tanya-tanya dulu juga boleh😊 
Terimakasih🙏
```
3. **URL Encoding**: Teks dienkripsi dengan `encodeURIComponent()` dan dibuka via `https://wa.me/[NOMOR_HP]?text=[ENCODED_MESSAGE]`.

---

## 1.7 Arsitektur Master Data & Import Hub ("1 Tab 1 Master")

Setiap entitas master memiliki tab tersendiri di dalam modal dengan fitur:
1. **Smart Header Auto-Finder**: Memindai hingga baris ke-12 untuk menemukan header kolom yang tepat meskipun ada banner baris judul di atasnya.
2. **Kamus Alias Kolom Fleksibel**:
   - `customer_name`: mengenali alias *nama*, *nama debitur*, *nama konsumen*, *customer*.
   - `contract_no`: mengenali alias *no kontrak*, *nomor kontrak*, *kontrak*, *contract no*.
   - `phone`: mengenali alias *no hp*, *telepon*, *whatsapp*, *kontak*, *wa*.
   - `harga_pasar`: mengenali alias *otr*, *harga otr*, *harga pasar*, *nilai pasar*.
3. **Pembersihan Nilai**: Otomatis membuang teks `Rp`, titik ribuan, atau spasi agar tersimpan murni sebagai angka desimal/integer.
4. **Multi-Sheet Selector**: Menyediakan menu dropdown pemilih sheet aktif bila file Excel memiliki banyak lembar kerja.
5. **Batch Processing**: Menghindari HTTP timeout dengan memecah data menjadi batch 50-75 baris dengan animasi progress bar (0% s/d 100%).
6. **Unduh Template Resmi (.xlsx)**: 1-klik unduh template Excel bawaan yang sudah terisi baris data sampel yang valid.
7. **Input Manual & Manajemen Tabel**: Menyediakan form tambah 1 data secara manual, pencarian kata kunci, serta tombol ekspor kembali ke Excel atau hapus baris data.

---

## 1.8 Persyaratan Non-Fungsional (NFR)
* **Ketersediaan & Kemandirian (High Availability & Zero Lock-in)**: Backend Express mandiri tanpa ketergantungan pada runtime cloud berbayar.
* **Performa**: Waktu respon API CRUD di bawah 50 milidetik; pemrosesan parse 1.000 baris Excel di bawah 1 detik.
* **Responsivitas**: Desain antarmuka mobile-first neumorphism yang nyaman dioperasikan satu tangan oleh marketing di lapangan.
* **Dukungan Offline**: Berfungsi sebagai PWA (Progressive Web App) dengan service worker caching.

---

# BAB II: STRUKTUR KERANGKA APLIKASI (APPLICATION ARCHITECTURE)

## 2.1 Diagram Arsitektur Sistem End-to-End

```
+-----------------------------------------------------------------------------------------+
|                                      FRONTEND LAYER                                     |
|                                                                                         |
|  [Browser Desktop / Android Mobile PWA / Standalone Webview]                            |
|    │                                                                                    |
|    ├─► index.html (SPA Root & Shell Wrapper)                                            |
|    ├─► public/assets/auth-gatekeeper.bundle.js (Auth Gatekeeper & Modal Hub Controller) |
|    ├─► public/assets/index-r5o_qhl4.js (React 19 Core SPA Component Engine)             |
|    ├─► public/xlsx.full.min.js (SheetJS Client-side Parser Engine)                      |
|    └─► public/sw.js (Service Worker Caching & Offline Support)                          |
+--------------------------------------------┬--------------------------------------------+
                                             │ HTTP REST / WebSocket JSON
                                             ▼
+-----------------------------------------------------------------------------------------+
|                                      BACKEND LAYER                                      |
|                                                                                         |
|  [Node.js Express Server - server.ts (Port 3000)]                                       |
|    │                                                                                    |
|    ├─► Global Middleware: CORS, 50MB Body Parser, Route Aliases                         |
|    ├─► Excel Engine: Multer In-Memory Storage & /api/excel/inspect                      |
|    ├─► Entity Router: /api/entities/:entity (CRUD, Bulk, Count, Delete-Many)            |
|    ├─► APK Downloader: /download-apk Stream Buffer Dispatcher                           |
|    └─► WebSocket Broadcast Engine: /socket.io/* Heartbeat Tracker                       |
+--------------------------------------------┬--------------------------------------------+
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      ▼                                             ▼
+-------------------------------------------+ +-------------------------------------------+
|             PRIMARY STORAGE               | |            FALLBACK STORAGE               |
|                                           | |                                           |
|  Cloud SQL PostgreSQL                     | |  data_store.json                          |
|  - Drizzle ORM (src/db/schema.ts)         | |  - Atomic Read & Write Engine             |
|  - Connection Pool (src/db/index.ts)      | |  - Zero Configuration Immediate Operation |
|  - Data Access Repository (src/db/repo.ts)| |  - Automatic Seed Initialization          |
+-------------------------------------------+ +-------------------------------------------+
```

---

## 2.2 Pohon Struktur Direktori & File Project

```
smart-taksasi/
├── server.ts                   # Backend Express, REST API, WebSocket, Multer Upload, & APK Stream
├── seed_data.ts                # Generator database awal (Katalog OTR, Kontrak CLOP, User Default)
├── data_store.json             # Penyimpanan database lokal format JSON (Zero-setup persistence)
├── index.html                  # Dokumen HTML utama, PWA header meta, & pemanggilan bundle JS
├── package.json                # Daftar pustaka: express, drizzle-orm, pg, multer, xlsx, esbuild
├── tsconfig.json               # Konfigurasi TypeScript Node.js & DOM
├── metadata.json               # Manifest identitas aplikasi di AI Studio
├── firebase-applet-config.json # Kunci konfigurasi client Firebase Authentication & Firestore
├── firebase-blueprint.json     # Blueprint skema Firestore
├── firestore.rules             # Aturan keamanan akses Firestore
│
├── public/                     # Aset publik statis (disajikan langsung oleh Express)
│   ├── assets/
│   │   ├── auth-gatekeeper.bundle.js   # Script auth barrier, session, profile, & Master Hub
│   │   ├── index-DaVsu51e.css          # CSS styles terkompilasi
│   │   └── index-r5o_qhl4.js           # Bundle aplikasi utama (React 19, 17 Halaman, Taksasi)
│   ├── manifest.json           # PWA Manifest (Konfigurasi icon, nama aplikasi, warna tema)
│   ├── sw.js                   # Service Worker untuk caching asset dan operasi offline
│   ├── xlsx.full.min.js        # Engine parser spreadsheet Excel SheetJS
│   ├── wealthwave-theme.css    # Palet warna neumorphism, dark-mode, dan gradien
│   ├── SmartTaksasi.apk        # File installer biner aplikasi Android (Direct Download)
│   ├── logo.png                # Logo resmi aplikasi Smart Taksasi
│   └── pwa-*.png               # Ikon aplikasi resolusi 192x192, 512x512, dan maskable
│
└── src/                        # Kode sumber TypeScript aplikasi
    ├── client/
    │   ├── auth-gatekeeper.ts  # Implementasi gerbang otentikasi, profile webcam, & topbar bar
    │   └── master-import-hub.ts# Engine "1 Tab 1 Master", template generator, & multi-sheet parser
    ├── db/
    │   ├── drizzle.config.ts   # Konfigurasi ORM Drizzle
    │   ├── index.ts            # Manajemen pool koneksi PostgreSQL
    │   ├── repo.ts             # Layer abstraksi CRUD database (Cloud SQL + JSON fallback)
    │   └── schema.ts           # Definisi skema tabel PostgreSQL
    ├── lib/
    │   ├── firebase.ts         # Inisialisasi Firebase Client SDK
    │   └── firebase-admin.ts   # Inisialisasi Firebase Admin SDK
    └── middleware/
        └── auth.ts             # Verifikasi token Bearer pada request API
```

---

## 2.3 Skema Database & Model Data (Drizzle ORM & JSON Store)

Berikut adalah 7 entitas data utama yang dikelola oleh sistem:

### 1. Entitas Pengguna (`users`)
* `id`: Primary key (Serial / String)
* `uid`: Unique ID dari Firebase Auth
* `email`: Alamat email login
* `name` / `fullName`: Nama lengkap pengguna
* `role`: Peran otorisasi (`marketing`, `supervisor`, `admin`)
* `cabang`: Nama kantor cabang penugasan (contoh: "Cabang Jakarta Pusat")
* `phone`: Nomor telepon / WhatsApp staf

### 2. Entitas Harga Pasar OTR (`otr_prices`)
* `id`: Primary key teks (contoh: `otr_1730000000_123`)
* `brand`: Merk motor (`HONDA`, `YAMAHA`, `SUZUKI`, `KAWASAKI`, `VESPA`)
* `model`: Model motor (`BEAT`, `VARIO 160`, `NMAX 155`, dll.)
* `object_description`: Rincian tipe dan varian spesifik (misal: "BEAT SPORTY CBS FI 110")
* `group_type_unit`: Kategori transmisi/segmen (`MATIC`, `BEBEK`, `SPORT`, `TRAIL`)
* `year`: Tahun perakitan motor (Integer)
* `harga_pasar`: Nilai pasar OTR dalam Rupiah (Double precision)
* `search_text`: Indeks pencarian gabungan merk, model, dan tahun

### 3. Entitas Kontrak CLOP HO (`clop_contracts`)
* `id`: Primary key teks
* `contract_no`: Nomor kontrak nasabah (Unique)
* `customer_name`: Nama lengkap nasabah / debitur
* `nosin`: Nomor mesin kendaraan
* `office_code`: Kode kantor cabang penerbit kontrak
* `buss_unit`: Unit bisnis pembiayaan
* `trend_cycle`: Siklus kelancaran pembayaran cicilan nasabah

### 4. Entitas Taksasi (`taksasi`)
* `id`: Primary key kalkulasi
* `customer_name`: Nama konsumen
* `contract_no`: Nomor kontrak (jika top up)
* `brand`, `model`, `year`: Spesifikasi kendaraan
* `otr`: Harga pasar acuan
* `km`: Angka odometer kendaraan
* `nama_bpkb`: Status kesesuaian BPKB (`Same` / `Different`)
* `persen_taksasi`: Persentase kondisi taksasi yang diperoleh
* `harga_taksasi`: Nilai hasil penaksiran fisik
* `plafond`: Rekomendasi nominal pinjaman yang disetujui
* `status`: Status pengerjaan (`proses`, `deal`, `reject`)

### 5. Entitas Tagihan Booking Quality (`booking_quality`)
* `id`: Primary key record
* `contract_no`: Nomor kontrak pembiayaan
* `customer_name`: Nama debitur
* `status_account`: Status akun (`Lancar`, `DPK`, `NPL`, `Menunggak`, `Lunas`)
* `jatuh_tempo`: Tanggal batas pembayaran angsuran (YYYY-MM-DD)
* `angsuran`: Nilai angsuran per bulan
* `marketing_name`: Nama marketing penanggung jawab

### 6. Entitas Bahan Follow Up Gform (`follow_up_bahan`)
* `id`: Primary key leads
* `customer_name`: Nama calon nasabah pendaftar
* `no_kontrak`: Nomor kontrak nasabah (relasi data)
* `phone`: Nomor WhatsApp calon nasabah
* `motor`: Kendaraan yang diajukan
* `status`: Tahapan tindak lanjut (`bahan`, `follow_up`, `deal`, `reject`)
* `notes`: Catatan kebutuhan dana atau pengajuan
* `marketing_name`: Marketing penangan (PIC)

### 7. Entitas Target Marketing (`targets`)
* `id`: Primary key target
* `marketing_name`: Nama sales force
* `month`: Periode bulan target (Format: `YYYY-MM`)
* `target_amount`: Target nominal pencairan plafond (Rupiah)
* `target_count`: Target jumlah unit booking

---

## 2.4 Katalog Endpoint REST API Backend

| Metode | Rute Endpoint | Parameter / Payload | Respon |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | - | Status server, versi sistem, dan timestamp |
| `GET` | `/api/entities/:entity` | Query: `?q={"brand":"HONDA"}` | Array JSON record data entitas |
| `GET` | `/api/entities/:entity/count` | - | Objek JSON: `{ "count": 1250 }` |
| `GET` | `/api/entities/:entity/:id` | Path param ID | Objek tunggal record yang dicari |
| `POST` | `/api/entities/:entity` | Objek JSON data baru | Objek data yang berhasil dibuat (HTTP 201) |
| `POST` | `/api/entities/:entity/bulk` | Array JSON records | Array record yang berhasil di-insert secara massal |
| `PUT` | `/api/entities/:entity/:id` | Objek JSON perubahan | Objek data setelah diperbarui |
| `DELETE` | `/api/entities/:entity/:id` | Path param ID | Konfirmasi penghapusan data |
| `POST` | `/api/entities/:entity/delete-many` | Body: `{ "ids": [...] }` | Konfirmasi hapus massal (atau reset total jika `ids: []`) |
| `POST` | `/api/excel/inspect` | Multipart file Excel | Struktur SheetNames, baris data, dan saran entitas |
| `GET` | `/download-apk` | - | File biner installer Android `SmartTaksasi.apk` |
| `GET` | `/api/download/backup-zip` | - | File arsip ZIP lengkap seluruh project dan database |

---

## 2.5 Arsitektur Komponen Frontend & Auth Gatekeeper

Aplikasi frontend dibangun dengan arsitektur terisolasi (*Self-Contained SPA*):
1. **Auth Gatekeeper (`src/client/auth-gatekeeper.ts`)**:
   - Berjalan sebelum aplikasi React dimuat untuk memastikan status login pengguna via Firebase Auth.
   - Mengontrol elemen Topbar User Bar yang memuat avatar profil, nama pengguna, email, tombol download APK, dan tombol akses cepat **Import Master**.
   - Menyediakan modal profil canggih untuk memperbarui nama, mengatur mode sesi (Local/Session Storage), mengambil foto profil via kamera HP/Webcam langsung melalui `MediaDevices.getUserMedia()`, hingga download installer APK.
2. **Layout Shell (`y5e`)**:
   - Membagi tata letak aplikasi menjadi Sidebar Kiri Desktop, Drawer Mobile, Header Sticky dengan tombol tema (Dark/Light), dan Area Konten Dinamis.
   - Pengelompokan menu navigasi rapi:
     * *Operasional Utama*: Dashboard, Pencarian OTR, Kalkulator, Pricelist, Cek Kontrak.
     * *Prospek & Taksasi*: Rekap Taksasi, Distribusi Prospek, Follow Up Bahan, Tagihan BQ, Riwayat Pengerjaan.
     * *Supervisor & Monitoring*: Dasbor Kinerja, Target Pencapaian, Rekap Harian, Log Aktivitas, Kelola User.
     * *Sistem*: Pengaturan, Panduan, Connect.

---

# BAB III: ALUR KERJA SISTEM (END-TO-END WORKFLOWS)

## 3.1 Alur Autentikasi, Registrasi, & Barrier Akses

```
                   [Pengguna Membuka URL Aplikasi]
                                  │
                                  ▼
               [Inisialisasi Firebase Client & Auth State]
                                  │
             ┌────────────────────┴────────────────────┐
             ▼                                         ▼
      [Sesi Ditemukan]                          [Sesi Tidak Ada]
             │                                         │
             ▼                                         ▼
  [Ambil Profil Pengguna]                   [Munculkan Modal Login / Daftar]
  - Validasi Email di Database              - Masuk dengan Akun Google
  - Deteksi Peran (Role)                    - Masuk dengan Email & Password
             │                                         │
             ├─────────────┐                           ▼
             ▼             ▼                 [Autentikasi Firebase Sukses]
      [Role Terdaftar]  [User Baru /                   │
             │           Belum Ada]                    ▼
             │             │                 [Simpan Profil ke Database]
             │             ▼                           │
             │      [Tampilkan Layar                   │
             │       Access Restricted]                │
             │      (Hubungi Unit Head)                │
             │                                         │
             └─────────────────┬───────────────────────┘
                               │
                               ▼
               [Buka Kunci Tampilan Aplikasi]
               - Render Shell Navigasi
               - Munculkan Topbar User Status Bar
               - Aktifkan Service Worker PWA
```

---

## 3.2 Alur Operasional Perhitungan Taksasi & Simulasi Plafond

```
[Marketing Membuka Modul /Kalkulator]
                 │
                 ├─► Dapat memilih unit dari katalog /PencarianOtr (Auto-fill)
                 │
                 ▼
[Input Spesifikasi & Legalitas Kendaraan]
  1. Merk, Model, dan Tahun Motor
  2. Jarak Tempuh Odometer (KM)
  3. Status BPKB (Segaris / Beda Nama)
  4. Durasi Pajak Mati (Tahun) & Status Plat Kaleng Mati
  5. Keberadaan Faktur Pembelian (Ada / Hilang)
                 │
                 ▼
[Pemilihan Profil Konsumen & Skema Angsuran]
  - Tipe Konsumen: New Customer / Repeat Order (RO)
  - Penilaian Scoring Karakter (CORI): Good / Fair / Poor
  - Pilihan Tenor Pinjaman: 11 s/d 35 Bulan
                 │
                 ▼
[Simulasi Top Up (Opsional)]
  - Masukkan Sisa Pokok Pinjaman Lama
  - Masukkan Denda Berjalan & Collection Fee
                 │
                 ▼
[Engine Menghasilkan Rincian Instan]:
  - Persentase Kondisi Taksasi
  - Harga Taksasi dan OTR Efektif (Setelah Potongan)
  - Rekomendasi Plafond Pinjaman Maksimal
  - Nilai Angsuran per Bulan
  - Dana Terima Bersih Pencairan
                 │
                 ├───────────────────────────────┐
                 ▼                               ▼
     [Simpan ke Database Rekap]      [Generate Struk Gambar JPG]
     (Tersimpan di /RekapTaksasi)                │
                                                 ▼
                                     [Kirim Kartu ke WhatsApp]
```

---

## 3.3 Alur Pengecekan Kontrak & Verifikasi Nasabah Existing (CLOP HO)

```
[Marketing Menerima Pengajuan dari Calon Nasabah]
                       │
                       ▼
          [Buka Menu /CekKontrak]
                       │
                       ▼
        [Masukkan Nomor Kontrak Nasabah]
                       │
                       ▼
       [Query ke Database Master CLOP HO]
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
  [Data Ditemukan]             [Data Tidak Ada]
         │                           │
         ▼                           ▼
  [Munculkan Rincian]:         [Indikasi Konsumen Baru]
  - Nama Konsumen Debitur      - Lanjutkan sebagai New Customer
  - Nomor Mesin (Nosin)
  - Unit Bisnis & Kode Kantor
  - Trend Cycle Pembayaran
         │
         ▼
  [Verifikasi Riwayat Pembayaran]
  - Jika lancar -> Prioritas Top Up
  - Jika buruk -> Analisis mitigasi risiko
```

---

## 3.4 Alur Tindak Lanjut Follow Up Bahan Gform ke WhatsApp

```
[Marketing Membuka Menu /FollowUpBahan]
                       │
                       ▼
[Sistem Menyortir Bahan Sesuai CS ID Marketing]
  - Kartu data menampilkan nama, motor, nomor kontrak, no HP
  - Indikator peringatan muncul jika bahan mengendap >= 2 hari
                       │
                       ▼
[Marketing Mengklik Tombol "Hubungi WhatsApp"]
                       │
                       ▼
[Algoritma Normalisasi & Template Injection]
  1. No HP: 081234567890 -> 6281234567890
  2. NAMA = item.nama_konsumen
  3. NO KONTRAK = item.no_kontrak
  4. MARKETING = currentUser.name
  5. Pesan disusun otomatis tanpa perlu diketik manual
                       │
                       ▼
[Aplikasi WhatsApp Otomatis Terbuka dengan Pesan Terisi]
                       │
                       ▼
[Pembaruan Status Penanganan Bahan]:
  ├──► [Mulai Dikerjakan] ──► Status berubah menjadi 'follow_up'
  ├──► [Deal] ─────────────► Status berubah menjadi 'deal' (Pindah ke Riwayat)
  └──► [Reject] ───────────► Buka Modal Alasan Penolakan:
                             Marketing wajib mengisi alasan reject
                             (Evaluasi kualitas leads untuk Unit Head)
```

---

## 3.5 Alur Penagihan & Monitoring Booking Quality (BQ)

```
[Membuka Menu /TagihanBookingQuality]
                 │
                 ▼
[Sistem Menampilkan Daftar Akun Jatuh Tempo]
  - Nama Konsumen, Nomor Kontrak, Nilai Angsuran, Tanggal Jatuh Tempo
  - Filter Status: Lancar, DPK, NPL, Menunggak
                 │
                 ▼
[Tindakan Pengingat / Penagihan]
  - Klik "Kirim WhatsApp + Kartu Tagihan"
  - Konsumen menerima rincian kewajiban angsuran sebelum denda berjalan
                 │
                 ▼
[Update Status Pembayaran]
  - Jika nasabah telah membayar -> Status diubah menjadi "BAYAR"
  - Data secara otomatis dipindahkan ke tab "Tagihan Selesai" di /RiwayatPengerjaan
```

---

## 3.6 Alur Import Data Excel Cerdas (Smart Header & Batch Upload)

```
[Klik Tombol "Import Master" di Topbar / Floating Action Button]
                             │
                             ▼
     [Terbuka Modal "Master Data & Import Hub V2.2"]
                             │
                             ▼
             [Pilih Tab Master yang Dituju]
(OTR, CLOP HO, BQ, FOLLOW UP GFORM, PRICELIST, PROSPEK, TARGET)
                             │
                             ▼
           [Drag & Drop File Excel (.xlsx / .xls / .csv)]
                             │
                             ▼
      [Mesin Smart Header Auto-Finder & Alias Scanner]
  - Scan baris 1 s/d 12 mencari baris label kolom yang sebenarnya
  - Deteksi padanan kata (misal: "no mesin" -> "nosin")
  - Sanitasi karakter (buang format "Rp", titik ribuan, spasi kosong)
                             │
                             ▼
            [Tampilkan Panel Pratinjau (Preview)]
  - Indikator badge kecocokan kolom
  - Pratinjau 8 baris data pertama
  - Pilihan Sheet kerja jika file multi-sheet
                             │
                             ▼
           [Klik Tombol "Simpan & Import ke Database"]
                             │
                             ▼
              [Batch Processing Engine (Chunk 50-75)]
  - Request dikirim bertahap ke /api/entities/:entity/bulk
  - Progress bar animasi berjalan dari 0% hingga 100%
  - Mencegah browser hang atau connection timeout
                             │
                             ▼
          [Notifikasi Sukses & Auto-Switch ke Tabel Data]
```

---

## 3.7 Alur Supervisi, Rekap Harian, & Evaluasi Kinerja Tim

```
[Unit Head / Supervisor Membuka Menu Supervisi]
                         │
                         ├─► [/DistribusiProspek] : Mengunggah file leads dan membagikan
                         │                          tugas ke masing-masing CS ID marketing.
                         │
                         ├─► [/RekapHarian]       : Evaluasi rekapitulasi aplikasi masuk,
                         │                          omset pencairan, dan rasio deal harian.
                         │
                         ├─► [/DasborKinerja]     : Membandingkan rasio produktivitas dan
                         │                          persentase closing antar marketing.
                         │
                         ├─► [/TargetPencapaian]  : Evaluasi target nominal vs realisasi
                         │                          bulan berjalan.
                         │
                         └─► [/KelolaUser]        : Manajemen CS ID staf, pengaturan role,
                                                    dan penugasan kantor cabang.
```

---

## 3.8 Alur Distribusi APK Android & Offline Caching (PWA)

```
[Pengguna Ingin Menginstal Aplikasi di Smartphone Android]
                             │
             ┌───────────────┴───────────────┐
             ▼                               ▼
    [Jalur Unduh APK Asli]           [Jalur PWA Web Install]
             │                               │
             ▼                               ▼
  [Klik Tombol "Unduh APK"]      [Klik Menu "Add to Home Screen"]
  - Request ke /download-apk     - Browser membaca manifest.json
  - Server streaming file biner  - Ikon aplikasi terpasang di HP
  - Pengguna memasang APK        - Service Worker (sw.js) aktif
             │                               │
             └───────────────┬───────────────┘
                             │
                             ▼
       [Aplikasi Berjalan Mandiri Layaknya Native App]
       - Tampilan full-screen tanpa address bar browser
       - Asset inti dicache secara offline
```

---

# BAB IV: PANDUAN DEPLOYMENT & MAINTENANCE

## 4.1 Spesifikasi Lingkungan & Instalasi
* **Runtime**: Node.js versi 18, 20, atau 22.
* **Port Standar**: Port `3000` (`0.0.0.0:3000`).
* **Langkah Menjalankan**:
  ```bash
  # 1. Masuk ke direktori project
  cd /app/applet

  # 2. Instalasi dependensi
  npm install

  # 3. Jalankan server aplikasi
  npm start
  # Atau untuk mode development:
  npm run dev
  ```

## 4.2 Strategi Pencadangan (Backup) & Factory Reset
* **Lokasi Data**: Seluruh basis data lokal disimpan di file `data_store.json`.
* **Download Backup 1-Klik**: Endpoint `/download-zip` atau `/api/download/backup-zip` menghasilkan file ZIP lengkap berisi seluruh source code, aset, dan database saat itu.
* **Factory Reset (Kembali ke Pengaturan Awal)**: Cukup hapus file `data_store.json` lalu restart server. Server akan secara otomatis meregenerasi data master pabrik dari file `seed_data.ts`.
