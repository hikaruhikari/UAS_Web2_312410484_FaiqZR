# Sistem Pengaduan Masyarakat E-Report

Aplikasi ini merupakan platform berbasis web yang memisahkan antara Backend (RESTful API) dan Frontend (Single Page Application) agar sistem berjalan dengan aman. Berfungsi untuk mendokumentasikan serta mengelola status aduan masyarakat secara real-time.

## 🛠️ Petunjuk Instalasi & Cara Menjalankan Proyek

Aplikasi ini menggunakan **Decoupled Architecture**, sehingga proses instalasi dan penjalisannya dibagi menjadi dua sisi: Sisi Backend (API Server) dan Sisi Frontend (Single Page Application).

### 1. Persiapan Basis Data (Database)
1. Aktifkan modul **Apache** dan **MySQL** pada panel kontrol XAMPP kamu.
2. Buka browser dan akses halaman **phpMyAdmin** (`http://localhost/phpmyadmin`).
3. Buat database baru dengan nama `ereport`.
4. Pilih database `ereport`, klik tab **Import**, lalu pilih file database `.sql` proyek ini (kamu bisa menyertakan file SQL hasil ekspor basis datamu di dalam repositori). Klik **Go/Kirim**.

---

### 2. Konfigurasi & Menjalankan Backend API (CodeIgniter 4)
Server Backend murni berfungsi sebagai penyedia layanan RESTful API data pengaduan masyarakat.

1. Buka terminal atau command prompt, lalu masuk ke dalam folder backend proyek:
   ```bash
   cd backend-api
