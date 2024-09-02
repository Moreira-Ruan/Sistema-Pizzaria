<?php

namespace App\Http\Controllers;

use App\Http\Requests\PizzaRequest;
use App\Models\Product;
use Illuminate\Http\Request;

/**
 * Class PizzaController
 *
 * @package App\Http\Controllers
 * @author Ruan Moreira
 * @link https://github.com/Moreira-Ruan
 * @date 2024-08-23 21:48:54
 * @copyright UniEVANGÉLICA
 */
class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::select('nome', 'descricao', 'tamanho', 'forma')->paginate('10');

        return [
            'status' => 200,
            'menssagem' => 'Pizza encontrada!!',
            'product' => $product
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(PizzaRequest $request)
    {
        $data = $request->all();

        $user = Product::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return [
            'status' => 200,
            'menssagem' => 'Usuário cadastrado com sucesso!!',
            'user' => $user
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Product::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'mensagem' => 'Usuário não encontrado!'
            ], 404);
        }

        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password') ? bcrypt($request->input('password')) : $user->password,
        ]);

        return response()->json([
            'status' => 200,
            'mensagem' => 'Usuário atualizado com sucesso!',
            'user' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Product::find($id);

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
    }
}
