<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id', 'user_id'];

}