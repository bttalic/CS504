<?php namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler {

	/**
	 * A list of the exception types that should not be reported.
	 *
	 * @var array
	 */
	protected $dontReport = [
		'Symfony\Component\HttpKernel\Exception\HttpException'
	];

	/**
	 * Report or log an exception.
	 *
	 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
	 *
	 * @param  \Exception  $e
	 * @return void
	 */
	public function report(Exception $e)
	{
		return parent::report($e);
	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Exception  $e
	 * @return \Illuminate\Http\Response
	 */
	public function render($request, Exception $e)
	{
        $class = get_class($e);

        switch ($class)
        {
            case 'Illuminate\Session\TokenMismatchException':
                return response()->json(['message' => 'CSRF token mismatch'], 400);
            break;
            case 'Symfony\Component\HttpKernel\Exception\NotFoundHttpException':
                return response()->json(['message' => 'Page not found'], 404);
            default:
                return parent::render($request, $e);
        }

	}

}
