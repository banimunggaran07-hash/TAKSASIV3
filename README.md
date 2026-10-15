# Smart Taksasi V2.1.3 - Standalone Full-Stack System

Aplikasi web modern mandiri (standalone) untuk kalkulasi taksasi kendaraan, manajemen OTR, analisis booking quality, prospek marketing, dan import data Excel secara real-time.

---

## 🚀 Fitur Utama

1. **Independent Server Architecture**
   - Backend mandiri berbasis Node.js & Express (`server.ts`).
   - Tidak bergantung pada platform pihak ketiga (100% self-hosted & standalone).
   - Mendukung REST API entities lengkap (`/api/entities/:entity` dan kompatibilitas API apps).
   - Real-time WebSocket server untuk sinkronisasi live data dan updates.

2. **Kalkulator & Engine Taksasi Kendaraan**
   - Perhitungan harga pasar, OTR, plafon pembiayaan, angsuran, dan tenor.
   - Master data harga pasar motor & mobil (Honda, Yamaha, Suzuki, Kawasaki, dll.).
   - Kontrak Clop, prospek, follow-up bahan, dan monitoring target marketing.

3. **Master Import Hub & Excel Engine**
   - Mendukung upload dan inspeksi file Excel (`.xlsx`, `.xls`).
   - Preview multi-sheet otomatis dengan mapping kolom fleksibel.
   - Bulk insert data OTR dan data kontrak secara instan.

4. **Zero-Setup Data Persistence**
   - Dilengkapi penyimpanan otomatis `data_store.json` (siap pakai tanpa konfigurasi database tambahan).
   - Mendukung integrasi opsional ke PostgreSQL / Cloud SQL via Drizzle ORM (`DATABASE_URL`).

5. **PWA & Progressive Web App**
   - Dukungan offline cache, Service Worker, manifest app, dan installable di perangkat desktop maupun Android/iOS.

---

## 🛠️ Cara Menjalankan Proyek

### 1. Prasyarat
- **Node.js** versi 18 atau lebih baru (direkomendasikan Node.js 20 atau 22).
- **npm** (atau bun / yarn / pnpm).

### 2. Instalasi Dependensi
Ekstrak file zip ini ke folder pilihan Anda, lalu buka terminal di folder tersebut:

```bash
npm install
```

### 3. Menjalankan Server Aplikasi
Untuk menjalankan server secara langsung dalam mode development:

```bash
npm run dev
```

Atau jalankan:
```bash
npm start
```

Aplikasi akan berjalan di:
👉 **http://localhost:3000**

Buka tautan di atas melalui browser (Google Chrome, Edge, Safari, dll.).

---

## 📁 Struktur Direktori Proyek

```
smart-taksasi/
├── server.ts                  # Server backend mandiri (Express, WebSocket, REST API, Excel upload)
├── seed_data.ts               # Generator data awal & master data bawaan
├── data_store.json            # Database lokal siap pakai (OTR, Taksasi, Users, Logs, dll.)
├── index.html                 # Entrypoint frontend Single Page Application (SPA)
├── package.json               # Daftar pustaka & skrip eksekusi
├── tsconfig.json              # Konfigurasi TypeScript
├── public/                    # Aset statis frontend
│   ├── assets/                # Bundle frontend JavaScript, CSS, dan auth gatekeeper
│   ├── manifest.json          # Manifest PWA
│   ├── sw.js                  # Service Worker untuk caching offline
│   ├── xlsx.full.min.js       # Pustaka parser Excel di browser
│   ├── logo.png               # Logo aplikasi
│   └── pwa-*.png              # Ikon aplikasi multi-resolusi
├── src/
│   ├── client/                # Skrip klien (auth-gatekeeper, master import)
│   ├── db/                    # Skema database & repo persistence (Drizzle / Postgres)
│   ├── lib/                   # Integrasi utilitas
│   └── middleware/            # Middleware autentikasi & sesi
└── README.md                  # Dokumentasi proyek ini
```

---

## 💾 Manajemen Data & Backup

- Semua data transaksi, OTR, dan log tersimpan di file `data_store.json`.
- Anda dapat menyalin atau mencadangkan file `data_store.json` kapan saja sebagai cadangan database.
- Untuk mengembalikan ke data awal pabrik (factory reset), Anda cukup menghapus `data_store.json` dan merestart server. Server akan otomatis melakukan inisialisasi ulang melalui `seed_data.ts`.

---

## 🌐 Endpoint API Utama

- `GET /health` : Cek status kesehatan server backend
- `GET /api/entities/:entity` : Ambil daftar data entitas (contoh: `/api/entities/OtrPrice`, `/api/entities/Taksasi`)
- `POST /api/entities/:entity` : Tambah data entitas baru
- `PUT /api/entities/:entity/:id` : Perbarui data entitas
- `DELETE /api/entities/:entity/:id` : Hapus data entitas
- `POST /api/excel/inspect` : Inspeksi sheet dan baris file Excel yang diunggah
- `POST /api/excel/upload` : Upload dan parse file Excel
- `GET /api/download/backup-zip` : Download file zip lengkap sistem