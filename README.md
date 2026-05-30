# Tugas-Web-p12

## Informasi Mahasiswa
- **Nama**  : Muhammad Zhofran
- **NIM**   : 2410501068
- **Kelas** : A

## Deskripsi
Aplikasi web fullstack **TokoDash** dashboard manajemen toko sederhana yang mengintegrasikan dua database sekaligus: **MySQL** untuk data transaksional (barang & pembelian) dan **MongoDB** untuk pencatatan activity log. Frontend dibangun dengan HTML, CSS, dan JavaScript vanilla tanpa framework, sementara backend menggunakan Node.js dengan Express.

## Struktur Project
```
Tugas-Web-p12/
├── backend/
│   ├── server.js        
│   ├── mysql.js         
│   ├── mongo.js         
│   └── package.json
└── frontend/
    ├── index.html       
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js       
        ├── app.js       
        ├── barang.js    
        ├── pembelian.js 
        └── logs.js      
```

## Dependencies Utama
- express
- cors
- mysql2
- mongoose

## Fitur yang Dikembangkan
- **Manajemen Barang** : menampilkan daftar barang dari MySQL, tambah barang baru via modal form
- **Manajemen Pembelian** : mencatat transaksi pembelian barang yang tersedia
- **Activity Logs** : setiap aksi tambah barang/pembelian otomatis tercatat ke MongoDB
- **Dual Database** : MySQL untuk data utama, MongoDB untuk logging aktivitas
- **Navigasi SPA** : sidebar navigasi tanpa reload halaman (Single Page Application style)
- **Format Rupiah** : harga tampil otomatis dalam format IDR (Rp)
- **Format Tanggal** : timestamp log tampil dalam format lokal Indonesia
- **Refresh Data** : tombol refresh untuk memuat ulang semua data dari API

## Cara Menjalankan

### Prasyarat
- Node.js (v18+)
- MySQL Server
- MongoDB (lokal, port default 27017)

### 1. Clone Repository
```bash
git clone https://github.com/Zhofran27/Tugas-Web-p12.git
```

### 2. Masuk Ke Folder Project
```bash
cd Tugas-Web-p12
```

### 3. Siapkan Database MySQL
Buat database dan tabel yang dibutuhkan:
```sql
CREATE DATABASE db_p12;
USE db_p12;

CREATE TABLE barang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100),
  harga INT
);

CREATE TABLE pembelian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_barang INT,
  jumlah INT
);
```

### 4. Install Dependencies Backend
```bash
cd backend
npm install
```

### 5. Jalankan Backend Server
```bash
node server.js
```
Server berjalan di `http://localhost:3000`

### 6. Jalankan Frontend
Buka file `frontend/index.html` di browser, atau gunakan ekstensi **Live Server** di VS Code.

> **Catatan:** Pastikan MySQL dan MongoDB sudah berjalan sebelum menjalankan backend.

## API Endpoints
| Method | Endpoint     | Deskripsi                        |
|--------|-------------|----------------------------------|
| GET    | /barang     | Ambil semua data barang          |
| POST   | /barang     | Tambah barang baru               |
| GET    | /pembelian  | Ambil semua data pembelian       |
| POST   | /pembelian  | Tambah transaksi pembelian baru  |
| GET    | /logs       | Ambil semua activity log         |


