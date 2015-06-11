<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'title',
        'content',
        'location',
        'due_date'
    ];


    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id'
    ];
}
