<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\LikesUser;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function likeAds($id)
    {
        $ad = Advertisement::find($id);

        if (!$ad) {
            return response()->json(['message' => 'Advertisement not found.'], 404);
        }

        $userId = auth()->id();
        $existingLike = LikesUser::where('user_id', $userId)->where('ad_id', $ad->id)->first();

        if ($existingLike) {
            return response()->json(['message' => 'You have already liked this advertisement.'], 409);
        }

        LikesUser::create([
            'user_id' => $userId,
            'ad_id' => $ad->id,
        ]);

        $ad->increment('number_likes');

        return response()->json(['message' => 'Advertisement liked successfully.', 'likes_count' => $ad->number_likes], 200);
    }

    public function getLikes()
    {
        $user = auth()->user();

        $likedAds = $user->likedAds()->with('photos')->get();

        $data = $likedAds->map(function ($ad) {
            return [
                'id' => $ad->id,
                'name' => $ad->name,
                'type' => $ad->type,
                'description' => $ad->description,
                'number_likes' => $ad->number_likes,
                'photos' => $ad->photos->map(function ($photo) {
                    return [
                        'image_path' => asset('storage/app/public/' . $photo->image_path),
                    ];
                }),
            ];
        });

        return response()->json($data, 200);
    }
}
