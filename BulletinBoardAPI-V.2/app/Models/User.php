<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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
        return $this->hasMany(Ad::class, 'user_id');
    }

    public function likedAds()
    {
        return $this->belongsToMany(Ad::class, 'likes_users', 'user_id', 'ad_id');
    }
}
