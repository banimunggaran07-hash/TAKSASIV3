# Tab Menu Import & Master Data Hub (Excel Multi-Sheet & Input Manual)

Rencana implementasi tab menu baru "Master Data & Import Hub" di Smart Taksasi yang menyediakan fasilitas impor file Excel otomatis membaca seluruh sheet, preview tabel interaktif, serta form input manual satu per satu dengan validasi instan untuk 6 jenis master data operasional.

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan klarifikasi yang telah disepakati pada tahap sebelumnya:
> - **Cakupan Master Data**: Mendukung 6 jenis data utama: **Master OTR**, **Master CLOP HO**, **Master BQ (Booking Quality)**, **Master Follow Up Gform**, **Master PriceList**, dan **Master Bahan Prospek**.
> - **Alur Import Excel**: Alur 4 langkah terstruktur: Unggah file Excel (.xlsx / .xls / .csv) ➔ Deteksi & pemilihan sheet otomatis ➔ Preview data tabel interaktif & pemetaan kolom ➔ Simpan massal ke database dengan progress bar.
> - **Input Manual Satu per Satu**: Formulir entri mandiri per entitas dengan validasi kolom wajib (required field validation), format angka otomatis (Rupiah/tahun/nomor kontrak), dan tombol simpan langsung disertai notifikasi sukses.
> - **Integrasi Navigasi**: Tab baru disematkan secara mulus pada bilah navigasi utama Smart Taksasi tanpa merusak fitur 17 halaman yang telah berjalan, serta dapat diakses langsung oleh user yang telah terotentikasi.

---

## 1. Overview & Core Concept

- **What It Does**: Memberikan pusat kendali data master terpadu (Master Data Hub) bagi tim marketing dan supervisor. Pengguna dapat memperbarui ribuan baris data harga OTR, kontrak CLOP, status BQ, daftar prospek, atau price list sekaligus dari file Excel dengan multi-sheet reader otomatis, atau menginputkan satu data baru secara cepat melalui form tanpa harus membuka file spreadsheet eksternal.
- **Target Audience / Persona**: Marketing staff, analis taksasi, dan branch admin yang rutin menerima update harga pasar motor, data tarikan kantor pusat (CLOP HO), dan prospek harian dari Google Form/Excel.
- **Key Value**: Mengeliminasi kesalahan pengetikan manual pada data massal, memangkas waktu input data hingga 90%, serta menjamin keakuratan referensi taksasi pinjaman gadai kendaraan.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Akses Tab Menu Master**:
   - Pengguna mengklik tab menu **"Master & Import"** (ikon database/spreadsheet) pada bilah navigasi aplikasi.
   - Tampilan menyajikan mode segmented switch: **"Import Excel Otomatis"** dan **"Input Data Manual"**, serta pemilih tipe entitas (OTR, CLOP, BQ, Follow Up, PriceList, Prospek).

2. **Alur Import Excel Multi-Sheet**:
   - **Step 1 - Upload**: Pengguna melakukan drag-and-drop atau memilih file `.xlsx` / `.xls`.
   - **Step 2 - Auto Sheet Detection**: Sistem membaca seluruh nama sheet dalam workbook secara instan (menggunakan engine `xlsx`) dan menampilkan tab sheet beserta estimasi baris (misal: `Sheet1 (1,240 baris)`, `PriceList_2026 (450 baris)`).
   - **Step 3 - Preview & Column Mapping**: Tabel preview interaktif menampilkan 5-10 baris pertama data sampel, dengan auto-detect kolom (misal: kolom harga, tahun, nama, kontrak) dan opsi pemetaan kolom fleksibel.
   - **Step 4 - Eksekusi Simpan**: Tombol "Simpan ke Database" memproses import ke Cloud SQL / Firebase / API backend secara berjenjang dengan indikator progress bar dan counter keberhasilan.

3. **Alur Input Manual Satu per Satu**:
   - Pengguna memilih sub-menu "Input Manual" dan kategori master yang dituju.
   - Formulir dinamis muncul sesuai skema entitas terpilih dengan placeholder intuitif, auto-formatting mata uang (Rp), dan validasi field.
   - Pengguna menekan tombol "Simpan Data" ➔ Data divalidasi ➔ Tersimpan ke server secara real-time ➔ Form ter-reset siap untuk data berikutnya ➔ Tabel "5 Data Terakhir Ditambahkan" di bawah form langsung ter-update.

### Visual Identity & Theme

- **Aesthetic Direction**: High-density financial dark theme (WealthWave futuristic glassmorphism) konsisten dengan tema utama Smart Taksasi.
- **Color Palette & Mood**:
  - Background: Deep Obsidian Navy (`#070b14` / `#0c1427`).
  - Card & Surface: Glass container `#0d172c` dengan hairline border cyan-500/20 (`rgba(6, 182, 212, 0.2)`).
  - Primary Accent: Neon Cyan (`#06b6d4`) dan Vivid Emerald (`#10b981`) untuk aksi sukses/simpan.
  - Text: Slate-100 untuk label utama, Slate-400 untuk helper text, dan Monospace Cyan untuk nominal Rupiah & angka.
- **Typography & Tabular Figures**:
  - Header & Action: Sans-serif modern berbobot medium/semibold.
  - Data Numerik: Strict `tabular-nums` / `font-mono` untuk angka harga pasar OTR, plafon, nomor telepon, dan nomor kontrak agar rapi sejajar.
- **Anti-Slop Discipline**:
  - Tanpa badge/pill statis bertumpuk; menggunakan segment switch fungsional dengan feedback visual aktif yang tegas.
  - Label tombol aksi lugas: *"Upload File"*, *"Pilih Sheet"*, *"Proses Import"*, *"Simpan Data"*, *"Reset Form"*.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Excel Parsing dengan SheetJS (`xlsx`)**:
  - *Chosen Approach*: File Excel dibaca langsung di sisi peramban terlebih dahulu menggunakan engine `xlsx` untuk mengekstrak daftar sheet dan sampel baris sebelum pengiriman payload massal ke backend.
  - *Why*: Respon pemilihan sheet seketika (sub-100ms tanpa beban upload file bolak-balik ke server) dan pengguna bisa memverifikasi kecocokan kolom di preview sebelum data masuk ke database.
  - *Alternatives Considered*: Mengunggah file mentah ke server terlebih dahulu (lebih lambat dan pengguna tidak bisa melihat sheet preview interaktif).

- **Decision 2: Dual-Mode Persistence (Cloud SQL & Firestore Fallback)**:
  - *Chosen Approach*: Endpoint `/api/apps/:appId/entities/:entity/bulk` dan `/api/apps/:appId/entities/:entity` menyimpan data ke Cloud SQL PostgreSQL dan sinkronisasi fallback ke in-memory store / Firestore.
  - *Why*: Memastikan data master langsung tersedia untuk fitur taksasi kalkulator, pencarian OTR, dan monitoring target tanpa dependensi tunggal yang rentan.
  - *Alternatives Considered*: Hanya menyimpan di localStorage (tidak sinkron antar perangkat atau saat ganti browser).

- **Decision 3: Skema Khusus untuk 6 Entitas Master**:
  - *Chosen Approach*: Menyediakan adapter normalisasi field khusus untuk 6 entitas:
    1. `OtrPrice`: Brand, Model, Object Description, Group Unit, Year, Harga Pasar.
    2. `ClopContract`: Nomor Kontrak, Nosin, Office Code, Buss Unit, Trend Cycle, Nama Nasabah.
    3. `BookingQuality`: Nomor Kontrak, Nama Nasabah, Status Account, Jatuh Tempo, Angsuran, Marketing.
    4. `FollowUpBahan`: Nama Nasabah, No Telepon, Unit Motor, Status, Catatan, Marketing.
    5. `PriceList`: Brand, Tipe Unit, OTR, Tenor, Angsuran, DP, Bunga.
    6. `Prospect`: Nama Nasabah, No Telepon, Unit Motor, Plafond, Marketing, Status.
  - *Why*: Kolom Excel operasional di lapangan seringkali memiliki nama header yang sedikit berbeda (misal: "NO KONTRAK" vs "contract_no"); parser akan memiliki auto-aliasing cerdas.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SMART TAKSASI - MASTER DATA HUB                      │
└────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     MODE A: IMPORT EXCEL      │               │     MODE B: INPUT MANUAL      │
│  - Drag & Drop Dropzone       │               │  - Selector 6 Jenis Master    │
│  - Multi-Sheet Extractor      │               │  - Validated Dynamic Form     │
│  - Auto-Column Aliasing       │               │  - Currency & Masking Engine  │
│  - High-Density Preview Grid  │               │  - Recent Entries Live List   │
└───────────────┬───────────────┘               └───────────────┬───────────────┘
                │                                               │
                └───────────────────────┬───────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      DATA NORMALIZATION LAYER                          │
│  - Trim & Sanitasi Tipe Data (Number / String / Date)                  │
│  - UUID / Timestamp Auto-Generation                                    │
│  - Deduping & Key Conflict Checking                                    │
└───────────────────────────────────────┬────────────────────────────────┘
                                        │
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  SERVER API & PERSISTENCE ENGINE                       │
│  - POST /api/apps/:appId/entities/:entity (Single Record)              │
│  - POST /api/apps/:appId/entities/:entity/bulk (Batch Insert)          │
│  - POST /api/apps/:appId/entities/:entity/import (Direct File Stream)  │
│  - Drizzle ORM -> Cloud SQL PostgreSQL & Local Fallback Store          │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Entities & Schema Mapping

| Entity Target | UI Master Name | Primary Keys / Required Fields | Auto-Aliased Excel Headers |
|---|---|---|---|
| `OtrPrice` | Master OTR | `brand`, `model`, `year`, `harga_pasar` | BRAND, MERK, MODEL, TAHUN, OTR, HARGA PASAR, DESKRIPSI |
| `ClopContract` | Master CLOP HO | `contract_no`, `customer_name` | NO KONTRAK, CONTRACT_NO, NOSIN, CABANG, NAMA NASABAH |
| `BookingQuality` | Master BQ | `contract_no`, `customer_name`, `status_account` | NO KONTRAK, NAMA, STATUS, JATUH TEMPO, ANGSURAN |
| `FollowUpBahan` | Master Follow Up Gform | `customer_name`, `phone`, `motor` | NAMA, NO HP, TELEPON, MOTOR, CATATAN, STATUS |
| `PriceList` | Master PriceList | `brand`, `model`, `otr`, `angsuran` | MERK, TIPE, OTR, TENOR, ANGSURAN, DP |
| `Prospect` | Master Bahan Prospek | `customer_name`, `phone`, `plafond` | NAMA, TELP, PLAFON, MOTOR, MARKETING |

### Verification & Test Plan

1. **Excel Multi-Sheet Verification**:
   - Buat workbook pengujian berisi minimal 2 sheet (`Sheet_OTR` dan `Sheet_CLOP`).
   - Verifikasi bahwa dropdown sheet dapat mendeteksi seluruh nama sheet, berganti tampilan data seketika, dan membaca baris tanpa error.
2. **Preview & Mapping Verification**:
   - Periksa bahwa tabel preview menampilkan data dari sheet terpilih dengan formatting angka yang sesuai.
   - Uji coba tombol "Simpan Data Hasil Import" dan verifikasi data tersimpan ke endpoint `/api/apps/:appId/entities/:entity/bulk`.
3. **Manual Single-Entry Verification**:
   - Pilih form input manual untuk salah satu master (misal: Master OTR).
   - Isi form dengan data uji (misal: Brand: YAMAHA, Model: NMAX, Tahun: 2025, Harga: 32.500.000).
   - Tekan "Simpan Data", verifikasi validasi kolom wajib, toast alert sukses, dan kemunculan record pada daftar data terkini.
4. **Build & Bundler Verification**:
   - Jalankan `npm run build` dan `compile_applet` untuk memastikan TypeScript bundle terkompilasi bersih tanpa regresi pada gatekeeper login Firebase maupun fitur aplikasi lainnya.
