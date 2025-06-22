<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\Messages as UtilsMessages;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;


class SignInController extends Controller
{
    public function SignIn(Request $data): JsonResponse
    {
        try {
            $messages = new UtilsMessages();

            $this->validate($data, [
                'username' => 'required|string',
                'password' => 'required|string|min:8',
            ], $messages->getValidationMessagesLoginUser());

            $user = User::where('username', $data->username)->first();

            if (!$user || !Hash::check($data->password, $user->password)) {
                $messages->addError('Usuário ou senha incorretos.');
                return response()->json([
                    'status' => 'error',
                    'message' => $messages->get('error'),
                ], 401);
            }


            $token = JWTAuth::fromUser($user);
            $messages->addSuccess('Login realizado com sucesso!');

            return response()->json([
                'status' => 'success',
                'message' => $messages->get('success'),
            ], 200);

        } catch (ValidationException $e) {
            $messages->addValidationErrors($e->validator);

            return response()->json([
                'status' => 'error',
                'message' => $messages->get('error'),
            ], 422);

        } catch (\Exception $e) {
            $messages->addError('Ocorreu um erro inesperado ao realizar o login. Tente novamente mais tarde.');

            return response()->json([
                'status' => 'error',
                'message' => $messages->get('error'),
            ], 500);
        }
    }
}
