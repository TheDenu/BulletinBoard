<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function authorization(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'email',
                'password' => 'string',
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

        if (Auth::attempt([
            'email' => $validated['email'],
            'password' => $validated['password'],
        ])) {
            $user = Auth::user();
            $token = $request->user()->createToken('BulletinBoard');

            return response()->json([
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email,
                ],
                'token' => $token->plainTextToken
            ], 200);
        }

        return response()->json(['message' => 'Login failed'], 403);
    }

    public function logout()
    {
        $user = Auth::user();

        if ($user) {
            $user->tokens()->delete();

            return response()->noContent();
        }

        return response()->json(404);
    }
}
