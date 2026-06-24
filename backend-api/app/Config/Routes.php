<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
// Route Group untuk API
$routes->group('api', function($routes) {
    $routes->options('(:any)', function() {
        $response = response();
        return $response->setStatusCode(200);
    });
    // Endpoint Login (Bebas diakses publik)
    $routes->post('login', 'AuthController::login');
    
    // Endpoint Kategori (Bisa di-GET publik, tapi POST/PUT/DELETE wajib token)
    $routes->get('kategori', 'KategoriController::index');
    $routes->post('kategori', 'KategoriController::create', ['filter' => 'authAPI']);
    $routes->put('kategori/(:segment)', 'KategoriController::update/$1', ['filter' => 'authAPI']);
    $routes->delete('kategori/(:segment)', 'KategoriController::delete/$1', ['filter' => 'authAPI']);

    // Endpoint Pengaduan (Bisa di-GET publik, POST/PUT/DELETE wajib token)
    $routes->get('pengaduan', 'PengaduanController::index');
    $routes->post('pengaduan', 'PengaduanController::create', ['filter' => 'authAPI']);
    $routes->put('pengaduan/(:segment)', 'PengaduanController::update/$1', ['filter' => 'authAPI']);
    $routes->delete('pengaduan/(:segment)', 'PengaduanController::delete/$1', ['filter' => 'authAPI']);
});