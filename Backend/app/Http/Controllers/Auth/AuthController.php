<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Http\Request;

class AuthController extends Controller {

    protected $auth;

    protected $registrar;

	public function __construct(Guard $auth, Registrar $registrar)
	{
		$this->auth = $auth;
		$this->registrar = $registrar;

		$this->middleware('guest', ['except' => ['getLogout', 'getToken']]);
	}

    public function postRegister(Request $request)
    {
        $validator = $this->registrar->validator($request->all());

        if ($validator->fails())
            return response()->json(['message' => $validator->getMessageBag()->jsonSerialize()], 400);

        $this->auth->login($this->registrar->create($request->all()));

        return response()->json(['message' => 'Registration successful, you have been logged in']);
    }

    public function getLogout()
    {
        $this->auth->logout();

        return response()->json(['message' => 'You have been logged out']);
    }

    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email', 'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if ($this->auth->attempt($credentials, $request->has('remember')))
            return response()->json(['message' => 'You have been successfully logged in']);


        return response()->json(['message' => 'Invalid credentials'], 400);
    }

    public function getToken ()
    {
        return response()->json(['token' => csrf_token()]);
    }
}
