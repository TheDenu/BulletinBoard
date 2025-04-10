<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = [
        'advertisement_id',
        'photo_path',
    ];

    public function ads(){
        return $this->belongsTo(Advertisement::class, 'advertisement_id');
    }
}
