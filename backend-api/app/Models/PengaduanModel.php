<?php
namespace App\Models;
use CodeIgniter\Model;

class PengaduanModel extends Model
{
    protected $table = 'pengaduan';
    protected $primaryKey = 'id_pengaduan';
    protected $allowedFields = ['id_user', 'id_kategori', 'judul_laporan', 'isi_laporan', 'foto_bukti', 'status'];
}