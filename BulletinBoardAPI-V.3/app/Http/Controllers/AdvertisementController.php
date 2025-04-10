<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AdvertisementController extends Controller
{
    public function getAdvertisements()
    {
        $ads = Advertisement::with('photos')
            ->get();

        $data = $ads->map(function ($ad) {
            return [
                'id' => $ad->id,
                'name' => $ad->name,
                'price' => $ad->price,
                'description' => $ad->description,
                'number_likes' => $ad->number_likes,
                'photos' => $ad->photos->map(function ($photo) {
                    return [
                        'photo_path' => asset('storage/' . $photo->photo_path),
                    ];
                }),
            ];
        });

        return response()->json($data, 200);
    }

    public function getYouAdvertisements()
    {
        $authId = auth()->id();

        $ads = Advertisement::where('user_id', '=', $authId)->with('photos')->get();

        $data = $ads->map(function ($ad) {
            return [
                'id' => $ad->id,
                'name' => $ad->name,
                'price' => $ad->price,
                'description' => $ad->description,
                'number_likes' => $ad->number_likes,
                'photos' => $ad->photos->map(function ($photo) {
                    return [
                        'image_path' => asset('storage/' . $photo->photo_path),
                    ];
                }),
            ];
        });

        return response()->json($data, 200);
    }

    public function postCreateAdvertisement(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'description' => 'required|string',
                'number_likes' => 'integer',
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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

        $ad = Advertisement::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'number_likes' => $validated['number_likes'] ?? 0,
            'user_id' => Auth::id()
        ]);

        foreach ($validated['images'] as $image) {
            $photoPath = $image->store('ads', 'public');

            Photo::create([
                'advertisement_id' => $ad->id,
                'photo_path' => $photoPath,
            ]);
        }

        return response()->json([
            'message' => 'Ad created successfully',
            'data' => [
                'ad' => [
                    'name' => $ad->name,
                    'price' => $ad->price,
                    'description' => $ad->description,
                    'number_likes' => $ad->number_likes,
                ],
                'photos' => $ad->photos,
            ],
        ], 201);
    }

    public function deleteAdvertisement($id)
    {
        $ad = Advertisement::find($id);

        if ($ad->user_id !== auth()->id()) {
            return response()->json([
                'error' => [
                    'message' => 'Forbidden',
                    'code' => 403,
                ]
            ], 403);
        }

        foreach ($ad->photos as $photo) {
            if ($photo->photo_path) {
                Storage::disk('public')->delete($photo->photo_path);
            }
            $photo->delete();
        }

        $ad->delete();
        return response()->noContent();
    }

    public function putUpdateAdvertisementTextInfo(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'description' => 'required|string',
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

        $ad = Advertisement::findOrFail($id);

        $ad->update([
            'name' => $request['name'],
            'price' => $request['price'],
            'description' => $request['description'],
        ]);

        return response()->json([
            'message' => 'Ad updated successfully',
            'data' => [
                'ad' => [
                    'name' => $ad->name,
                    'price' => $ad->price,
                    'description' => $ad->description,
                    'number_likes' => $ad->number_likes
                ]
            ]
        ], 201);
    }
}
