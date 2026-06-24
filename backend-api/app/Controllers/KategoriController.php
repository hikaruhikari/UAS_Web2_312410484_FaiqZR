<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class KategoriController extends ResourceController
{
    protected $modelName = 'App\Models\KategoriModel';
    protected $format    = 'json';

    // 1. Ambil Semua Data Kategori (GET /api/kategori)
    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => 'Sukses mengambil data kategori',
            'data'     => $data
        ], 200);
    }

    // 2. Tambah Kategori Baru (POST /api/kategori) - Wajib Token
    public function create()
    {
        $rules = [
            'nama_kategori' => 'required',
            'deskripsi'     => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = [
            'nama_kategori' => $this->request->getVar('nama_kategori'),
            'deskripsi'     => $this->request->getVar('deskripsi'),
        ];

        $this->model->insert($data);

        return $this->respondCreated([
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Kategori baru berhasil ditambahkan.'
            ]
        ]);
    }

    // 3. Edit Kategori (PUT /api/kategori/(:segment)) - Wajib Token
    public function update($id = null)
    {
        $kategori = $this->model->find($id);
        if (!$kategori) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $data = $this->request->getRawInput();
        $this->model->update($id, $data);

        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Kategori berhasil diperbarui.'
            ]
        ], 200);
    }

    // 4. Hapus Kategori (DELETE /api/kategori/(:segment)) - Wajib Token
    public function delete($id = null)
    {
        $kategori = $this->model->find($id);
        if (!$kategori) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Kategori berhasil dihapus.'
            ]
        ], 200);
    }
}