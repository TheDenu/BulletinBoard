<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikesUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'advertisement_id',
    ];
}
