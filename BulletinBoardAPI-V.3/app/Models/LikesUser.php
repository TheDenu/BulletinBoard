<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LikesUser extends Model
{
    protected $fillable = [
        'user_id',
        'advertisement_id',
    ];
}
