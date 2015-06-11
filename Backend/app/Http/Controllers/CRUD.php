<?php namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;

abstract class CRUD extends Controller {

    protected static $MODEL_NAMESPACE = 'App\\';

    protected $resource;
    protected $model;
    protected $instance;

    public function __construct ()
    {
        $this->middleware('auth');

        $this->resource = explode('.', Route::currentRouteName())[0];
        $model = self::$MODEL_NAMESPACE . $this->resource;
        $this->model = $model;
        $this->instance = new $model;
    }

    public function index()
    {
        $records = $this->instance
            ->where('user_id', '=', Auth::user()->id)
            ->get();

        return response()->json([
            str_plural($this->resource) => $records
        ]);
    }

    public function show($id)
    {
        $record = $this->instance
            ->where('id', $id)
            ->where('user_id', '=', Auth::user()->id)
            ->first();

        return $record ? response()->json([$this->resource => $record])
                       : response()->json(['message' => ucfirst($this->resource) . ' not found'], 404);
    }

    public function store()
    {
        $this->instance->fill(Input::all());

        $this->instance->user_id = Auth::user()->id;

        $this->instance->save();

        return response()->json(['message' => ucfirst($this->resource) . ' saved',
                                 $this->resource => $this->instance]);
    }

    public function update($id)
    {
        $record = $this->instance
            ->where('id', $id)
            ->where('user_id', '=', Auth::user()->id)
            ->first();

        if ($record)
        {
            $record->fill(Input::all());
            $record->save();

            return response()->json(['message' => ucfirst($this->resource) . ' saved',
                                     $this->resource => $record]);
        }

        else
            return response()->json(['message' => ucfirst($this->resource) . ' not found'], 404);
    }

    public function destroy($id)
    {
        $record = $this->instance
            ->where('id', $id)
            ->where('user_id', '=', Auth::user()->id)
            ->first();

        return $record ? response()->json(['message' => $record->delete() ? ucfirst($this->resource) . ' removed' : null], 200)
                       : response()->json(['message' => ucfirst($this->resource) . ' not found'], 404);
    }

}