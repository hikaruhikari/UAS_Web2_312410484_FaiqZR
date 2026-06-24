<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class AuthController extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $rules = [
            'useremail'    => 'required|valid_email',
            'userpassword' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $model = new UserModel();
        $user  = $model->where('useremail', $this->request->getVar('useremail'))->first();

        if (!$user) {
            return $this->failNotFound('Email tidak terdaftar.');
        }

        // Catatan: Demi kemudahan testing UAS, kamu bisa menggunakan password_verify jika di-hash,
        // atau pencocokan string langsung jika input database masih teks biasa.
        // Di sini kita pakai pencocokan langsung. Sesuaikan jika kamu memakai password_hash().
        if ($this->request->getVar('userpassword') !== $user['userpassword']) {
            return $this->fail('Password salah.', 401);
        }

        // Jika sukses login, kirimkan response data user beserta token statisnya
        return $this->respond([
            'status'   => 200,
            'message'  => 'Login berhasil',
            'token'    => 'ereport-token-secret', // Token statis yang divalidasi oleh AuthFilter
            'user'     => [
                'id'       => $user['id'],
                'username' => $user['username'],
                'role'     => $user['role']
            ]
        ], 200);
    }
}