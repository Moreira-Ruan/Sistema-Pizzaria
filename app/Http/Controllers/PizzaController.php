<?php

namespace App\Http\Controllers;

use App\Http\Requests\PizzaRequest;
use App\Models\Pizza;
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
        $pizza = Pizza::select('name', 'description', 'size', 'format', 'price')->paginate('10');

        return [
            'status' => 200,
            'menssagem' => 'Pizzas encontradas!!',
            'pizza' => $pizza
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PizzaRequest $request)
    {
    
        $data = $request->all();

        $pizza = Pizza::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'size' => $data['size'],
            'format' => $data['format'],
            'price' => $data['price'],
        ]);
        /*
        $validateData = $request->validated();

        $pizza = Pizza::create($validateData);
        */
        return [
            'status' => 200,
            'menssagem' => 'Pizza cadastrada com sucesso!!',
            'pizza' => $pizza
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
