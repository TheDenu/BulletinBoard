<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function registration(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'string|regex:/^[A-Za-zА-ЯЁа-яё]+$/u',
                'email' => 'email|unique:users',
                'password' => 'string|min:8|regex:/^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@$!%*#?&])[A-ZА-ЯЁa-zа-яё\d@$!%*#?&]{8,}$/',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => [
                    'message' => 'validation error',
                    'code' => 422,
                    'errors' => $e->validator->errors()
                ]
            ], 422);
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
        ], 201);
    }
}
