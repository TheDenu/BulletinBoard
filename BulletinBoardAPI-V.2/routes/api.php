<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PhotoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::group([], function () {
    Route::post('/registration', [UserController::class, 'registration']);
    Route::post('/authorization', [AuthController::class, 'authorization']);
    Route::middleware('auth:sanctum')->get('/logout', [AuthController::class, 'logout']);
});

Route::group([], function () {
    Route::get('/advertisements', [AdvertisementController::class, 'getAdvertisements']);
    Route::middleware('auth:sanctum')->get('/advertisements/youAdvertisements', [AdvertisementController::class, 'getYouAdvertisements']);
    Route::middleware('auth:sanctum')->post('/advertisements', [AdvertisementController::class, 'postCreateAdvertisement']);
    Route::middleware('auth:sanctum')->delete('/advertisements/{id}', [AdvertisementController::class, 'deleteAdvertisement']);
    Route::middleware('auth:sanctum')->put('/advertisements/{id}', [AdvertisementController::class, 'putUpdateAdvertisementTextInfo']);
});

Route::group([], function () {
    Route::middleware('auth:sanctum')->delete('/advertisements/photo/{id}', [PhotoController::class, 'deleteImage']);
    Route::middleware('auth:sanctum')->post('/advertisements/photo/{id}', [PhotoController::class, 'createImage']);
});

Route::group([], function () {
    Route::middleware('auth:sanctum')->post('/like/{id}', [LikesController::class, 'likeAds']);
    Route::middleware('auth:sanctum')->get('/like', [LikesController::class, 'getLikes']);
});
