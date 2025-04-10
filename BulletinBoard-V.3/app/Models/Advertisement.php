<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'number_likes',
        'user_id',
    ];

    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function photos(){
        return $this->hasMany(Photo::class, 'advertisement_id');
    }

    public function usersWhoLiked(){
        return $this->belongsToMany(User::class, 'likes_users', 'advertisement_id', 'user_id');
    }
}
