<?php

namespace App\Http\Controllers\auth;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserHasRoles;
use App\Utils\Messages as UtilsMessages;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class SignUpController extends Controller
{
    public function SignUp(Request $data): JsonResponse
    {
        try {
            $messages = new UtilsMessages();

            $this->validate($data, [
                'username' => 'required|string|unique:users,username',
                'password' => 'required|string|min:8',
                'role' => ['required', 'integer', 'in:' . implode(',', array_column(RoleEnum::cases(), 'value'))],
            ], $messages->getValidationMessagesCreateUser());

            $user = User::create([
                'username' => $data->username,
                'password' => Hash::make($data->password),
                'is_active' => 'T',
            ]);

            UserHasRoles::create([
                'user_id' => $user->id,
                'role_id' => $data->role,
            ]);

            $messages->addSuccess('Usuário criado com sucesso!');

            return response()->json([
                'status' => 'success',
                'message' => $messages->get('success'),
            ]);

        } catch (ValidationException $e) {

            $messages->addValidationErrors($e->validator);

            return response()->json([
                'status' => 'error',
                'message' => $messages->get('error'),
            ], 422);

        } catch (QueryException $e) {

            if ($e->getCode() === '23000') {
                if (str_contains($e->getMessage(), 'users_username_unique')) {
                    $messages->addError('O username informado já está em uso. Escolha outro.');
                } elseif (str_contains($e->getMessage(), 'user_has_roles')) {
                    $messages->addError('Não foi possível associar o papel ao usuário. Verifique se o papel informado é válido.');
                } else {
                    $messages->addError('Erro de banco de dados ao criar o usuário.');
                }
            } else {
                $messages->addError('Erro inesperado ao acessar o banco de dados.');
            }

            return response()->json([
                'status' => 'error',
                'message' => $messages->get('error'),
            ], 500);

        } catch (\Exception $e) {

            $messages->addError('Ocorreu um erro inesperado ao criar o usuário. Tente novamente mais tarde.');

            return response()->json([
                'status' => 'error',
                'message' => $messages->get('error'),
            ], 500);
        }
    }
}
