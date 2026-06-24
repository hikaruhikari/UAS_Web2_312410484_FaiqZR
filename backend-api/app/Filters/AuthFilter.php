<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait;

class AuthFilter implements FilterInterface
{
    use ResponseTrait;

    public function before(RequestInterface $request, $arguments = null)
    {
        if ($request->getMethod() === 'options') {
            return;
        }
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        
        // Jika header Authorization tidak ada
        if (!$authHeader) {
            $response = service('response');
            return $response->setJSON([
                'status'   => 401,
                'error'    => 401,
                'messages' => ['error' => 'Akses ditolak. Token tidak ditemukan.']
            ])->setStatusCode(401);
        }

        // Ekstrak string token dari format "Bearer <token>"
        $token = str_replace('Bearer ', '', $authHeader);

        // Simulasi validasi token (UAS memperbolehkan token statis/sederhana yang dicocokkan)
        // Di sini kita cek apakah token sesuai dengan pola atau string rahasia tertentu, misal "ereport-token-XYZ"
        if ($token !== 'ereport-token-secret') {
            $response = service('response');
            return $response->setJSON([
                'status'   => 401,
                'error'    => 401,
                'messages' => ['error' => 'Sesi habis atau Token tidak valid.']
            ])->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak perlu diimplementasikan
    }
}