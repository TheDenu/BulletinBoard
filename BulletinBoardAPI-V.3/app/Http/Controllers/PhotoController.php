<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function deleteImage($id)
    {
        $ad = Advertisement::findOrFail($id);

        foreach ($ad->photos as $photo) {
            if ($photo->photo_path) {
                Storage::disk('public')->delete($photo->photo_path);
            }
            $photo->delete();
        }

        return response()->noContent();
    }

    public function createImage(Request $request, $id){
        $ad = Advertisement::findOrFail($id);

        $photoPaths = [];
        foreach ($request['photos'] as $photo) {
            $photoPath = $photo->store('ads', 'public');
            Photo::create([
                'advertisement_id' => $ad->id,
                'photo_path' => $photoPath,
            ]);
            $photoPaths[] = $photoPath;
        }

        return response()->json([
            'message' => 'Image updated successfully',
            'data' => [
                'advertisement_id' => $ad->id,
                'photo_path' => $photoPath
            ]
        ]);
    }
}
