<?php
// UserController.php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        Log::info('Entrou no método index do UserController');
        try {
            $user = User::select('id', 'name', 'email')->paginate(10);
            return [
                'status' => 200,
                'menssagem' => 'Usuários encontrados!!',
                'user' => $user
            ];
        } catch (\Exception $e) {
            Log::error('Erro no método index do UserController: ' . $e->getMessage());
            return response()->json(['status' => 500, 'mensagem' => 'Erro interno do servidor']);
        }
    }

    public function store(UserCreateRequest $request)
    {
        Log::info('Entrou no método store do UserController');
        try {
            $data = $request->all();
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
            return [
                'status' => 200,
                'menssagem' => 'Usuário cadastrado com sucesso!!',
                'user' => $user
            ];
        } catch (\Exception $e) {
            Log::error('Erro no método store do UserController: ' . $e->getMessage());
            return response()->json(['status' => 500, 'mensagem' => 'Erro interno do servidor']);
        }
    }

    public function show(string $id)
    {
        Log::info('Entrou no método show do UserController');
        try {
            $user = User::find($id);
            if (!$user) {
                return [
                    'status' => 404,
                    'message' => 'Usuário não encontrado! Que triste!',
                    'user' => $user
                ];
            }
            return [
                'status' => 200,
                'message' => 'Usuário encontrado com sucesso!!',
                'user' => $user
            ];
        } catch (\Exception $e) {
            Log::error('Erro no método show do UserController: ' . $e->getMessage());
            return response()->json(['status' => 500, 'mensagem' => 'Erro interno do servidor']);
        }
    }

    public function update(UserUpdateRequest $request, string $id)
    {
        Log::info('Entrou no método update do UserController');
        try {
            $data = $request->all();
            $user = User::find($id);
            if (!$user) {
                return [
                    'status' => 404,
                    'message' => 'Usuário não encontrado!',
                    'user' => $user
                ];
            }
            $user->update($data);
            return [
                'status' => 200,
                'message' => 'Usuário atualizado com sucesso!!',
                'user' => $user
            ];
        } catch (\Exception $e) {
            Log::error('Erro no método update do UserController: ' . $e->getMessage());
            return response()->json(['status' => 500, 'mensagem' => 'Erro interno do servidor']);
        }
    }

    public function destroy(string $id)
    {
        Log::info('Entrou no método destroy do UserController');
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'status' => 404,
                    'mensagem' => 'Usuário não encontrado!'
                ], 404);
            }
            $user->delete();
            return response()->json([
                'status' => 200,
                'mensagem' => 'Usuário deletado com sucesso!'
            ]);
        } catch (\Exception $e) {
            Log::error('Erro no método destroy do UserController: ' . $e->getMessage());
            return response()->json(['status' => 500, 'mensagem' => 'Erro interno do servidor']);
        }
    }
}