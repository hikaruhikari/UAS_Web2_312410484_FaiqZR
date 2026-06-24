<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PengaduanModel;

class PengaduanController extends ResourceController
{
    protected $modelName = 'App\Models\PengaduanModel';
    protected $format    = 'json';

    // 1. Ambil Semua Data Pengaduan + Join Table (GET /api/pengaduan)
    public function index()
    {
        // Melakukan join untuk mengambil username dari tabel users dan nama_kategori dari tabel kategori
        $data = $this->model->table('pengaduan')
            ->select('pengaduan.*, users.username, kategori.nama_kategori')
            ->join('users', 'users.id = pengaduan.id_user')
            ->join('kategori', 'kategori.id_kategori = pengaduan.id_kategori')
            ->orderBy('pengaduan.id_pengaduan', 'DESC')
            ->findAll();

        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => 'Sukses mengambil data pengaduan',
            'data'     => $data
        ], 200);
    }

    // 2. Tambah Pengaduan Baru (POST /api/pengaduan) - Wajib Token
    public function create()
    {
        $rules = [
            'id_user'        => 'required',
            'id_kategori'    => 'required',
            'judul_laporan'  => 'required',
            'isi_laporan'    => 'required',
            'foto_bukti'     => 'uploaded[foto_bukti]|max_size[foto_bukti,2048]|is_image[foto_bukti]|mime_in[foto_bukti,image/jpg,image/jpeg,image/png]'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Ambil file foto_bukti
        $file = $this->request->getFile('foto_bukti');
        $namaFoto = null;

        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Generate nama acak agar tidak bentrok
            $namaFoto = $file->getRandomName();
            // Pindahkan ke folder public/uploads
            $file->move(ROOTPATH . 'public/uploads', $namaFoto);
        }

        $data = [
            'id_user'       => $this->request->getVar('id_user'),
            'id_kategori'   => $this->request->getVar('id_kategori'),
            'judul_laporan' => $this->request->getVar('judul_laporan'),
            'isi_laporan'   => $this->request->getVar('isi_laporan'),
            'foto_bukti'    => $namaFoto,
            'status'        => 'Pending' // default awal
        ];

        $this->model->insert($data);

        return $this->respondCreated([
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Laporan pengaduan berhasil dikirim.'
            ]
        ]);
    }

    // 3. Update Status Pengaduan oleh Admin (PUT /api/pengaduan/(:segment)) - Wajib Token
    public function update($id = null)
    {
        $pengaduan = $this->model->find($id);
        if (!$pengaduan) {
            return $this->failNotFound('Data pengaduan tidak ditemukan.');
        }

        // Pada arsitektur REST API dengan PUT, data biasanya dikirim lewat raw input json/x-www-form-urlencoded
        $data = $this->request->getRawInput();

        // Di aplikasi ini, Admin utamanya melakukan update status (Pending -> Diproses -> Selesai)
        $this->model->update($id, $data);

        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Status pengaduan berhasil diperbarui.'
            ]
        ], 200);
    }

    // 4. Hapus Pengaduan (DELETE /api/pengaduan/(:segment)) - Wajib Token
    public function delete($id = null)
    {
        $pengaduan = $this->model->find($id);
        if (!$pengaduan) {
            return $this->failNotFound('Data pengaduan tidak ditemukan.');
        }

        // Hapus file fisik gambar jika ada di server sebelum menghapus datanya
        if (!empty($pengaduan['foto_bukti'])) {
            $pathFoto = ROOTPATH . 'public/uploads/' . $pengaduan['foto_bukti'];
            if (file_exists($pathFoto)) {
                unlink($pathFoto);
            }
        }

        $this->model->delete($id);

        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Data pengaduan berhasil dihapus.'
            ]
        ], 200);
    }
}