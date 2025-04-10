<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function ads()
    {
        return $this->hasMany(Advertisement::class, 'user_id');
    }

    public function likedAds()
    {
        return $this->belongsToMany(Advertisement::class, 'likes_users', 'user_id', 'advertisement_id');}
}
