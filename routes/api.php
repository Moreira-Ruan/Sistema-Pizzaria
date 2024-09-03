<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PizzaController;

// Rotas de usuário

Route::prefix('/user')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/cadastrar', [UserController::class, 'store']);
    Route::put('/atualizar/{id}', [UserController::class, 'update']);
    Route::delete('/deletar/{id}', [UserController::class, 'destroy']);
    Route::get('/visualizar/{id}', [UserController::class, 'show']);
});

Route::prefix('/pizza')->group(function () {
    Route::get('/', [PizzaController::class, 'index']);
    Route::post('/cadastrar', [PizzaController::class, 'store']);
    Route::put('/atualizar/{id}', [PizzaController::class, 'update']);
    Route::delete('/deletar/{id}', [PizzaController::class, 'destroy']);
    Route::get('/visualizar/{id}', [PizzaController::class, 'show']);
});