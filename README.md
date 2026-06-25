# Sistem Pengaduan Masyarakat E-Report

Aplikasi ini merupakan platform berbasis web yang memisahkan antara Backend (RESTful API) dan Frontend (Single Page Application) agar sistem berjalan dengan aman. Berfungsi untuk mendokumentasikan serta mengelola status aduan masyarakat secara real-time.

## Dokumentesi database

<img width="1090" height="754" alt="Screenshot (1402)" src="https://github.com/user-attachments/assets/94d429a3-747f-495f-8aeb-64958c2c1a9b" />

foto ini menampilkan relasi antar tabel dalam database

## Dokumentasi Postman

<img width="1920" height="1080" alt="Screenshot (1403)" src="https://github.com/user-attachments/assets/1b900aca-e689-4f8a-b598-798308511f44" />

dengan menggunakan link di atas Postman tidak bisa mendapatkan akses ke aplikasi e-Report

## Dokumentasi Tampilan Aplikasi

<img width="1920" height="1080" alt="Screenshot (1404)" src="https://github.com/user-attachments/assets/b9401601-039f-4d86-9af5-05afbb13081f" />

ini halaman utama saat belum login

<img width="1920" height="1080" alt="Screenshot (1405)" src="https://github.com/user-attachments/assets/6cbe180d-f46b-4701-9b56-579d57749b53" />

<img width="1920" height="1080" alt="Screenshot (1406)" src="https://github.com/user-attachments/assets/4090ef70-aa75-4ced-961f-0984201160a2" />

ini halaman login dan pesan saat login berhasil

<img width="1920" height="1080" alt="Screenshot (1409)" src="https://github.com/user-attachments/assets/a8705e4d-a4c8-4c4e-acdc-96d476d52ce1" />

<img width="1920" height="1080" alt="Screenshot (1410)" src="https://github.com/user-attachments/assets/7500f055-8405-4757-a4f5-4dd7882a5e5e" />

ini halaman dashboard dengan sistem tambah pangaduan dan pesan sukses menyimpan

<img width="1920" height="1080" alt="Screenshot (1412)" src="https://github.com/user-attachments/assets/47ecf29a-c5af-445b-9da7-1fd7b0807bd4" />

<img width="1920" height="1080" alt="Screenshot (1413)" src="https://github.com/user-attachments/assets/e6924d1e-ac73-46e5-93af-4212acd5fb06" />

ini halaman dashboard dan utama saat proses input berhasil, disitu menampilkan data aduan

## Proses Menjalankan frontend dan backend

### Backend

Backend menggunakan codeigniter 4 versi 4.7.3, ada beberapa penambahan sistem agar aplikasi bisa berjalan:

1. Menjalankan XAMPP
2. Menambahkan database baru beserta tabelnya
3. Mengubah beberapa kode env dan menggantinya namanya menjadi .env
4. Menambahkan folder uploads di folder public
5. Menambah dan mengubah beberapa kode dari file yang sudah ada seperti Routes dan Filters
6. membuat beberapa file agar aplikasi bisa berjalan dengan baik

Agar backend bisa berjalan, ada langkah untuk melakukannya

1. Buka folder backend-api di komputer/laptop
2. Klik direktori dan ketik cmd yang akan membuka command prompt beserta direktori backend-api
3. ketik "php spark serve" pada cmd agar backend mulai berjalan

### Frontend

Frontend menggunakan VueJS 3 & TailwindCSS, berikut penjelasannya

1. Membuat file index.html sebagai sistem utama saat membuka web
2. Membuat beberapa file .js untuk berbagai halaman
3. Bisa diakses dengan localhost atau langsung di index.html (klik 2 kali

## link youtube

Video Youtube tata cara penggunaan aplikasi: https://youtu.be/sVhLWNIh1a0

## Penutup

Cukup penjelasannya terima kasih
