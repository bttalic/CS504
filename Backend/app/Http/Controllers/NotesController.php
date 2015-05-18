<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Note;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class NotesController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return response()->json(Note::where('user_id', Auth::user()->id)
                                    ->get());
	}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $note = Note::find($id);

        return $note ? response()->json($note, 200)
                     : response()->json(['message' => 'Resource not found'], 404);
    }

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
    {
		$note = new Note;
        $note->fill(Input::all());
        $note->user_id = Auth::user()->id;
        $note->save();

        return response()->json(['message' => 'Note saved',
                                 'note' => $note]);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        $note = new Note;

        if ($note)
        {
            $note->fill(Input::all());
            $note->user_id = Auth::user()->id;
            $note->save();

            return response()->json(['message', 'Resource saved'], 404);
        }

        else
            return response()->json(['message' => 'Resource not found'], 404);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        $note = Note::find($id);

        return $note ? response()->json($note->delete() ? 'Resource removed' : null, 200)
                     : response()->json(['message' => 'Resource not found'], 404);
	}

}
