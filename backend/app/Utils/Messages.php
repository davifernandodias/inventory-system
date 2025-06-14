<?php

namespace App\Utils;

class Messages
{
    protected $messages = [
        'success' => [],
        'error' => [],
    ];

    public function getValidationMessages(): array
    {
        return [
            'username.required' => 'O campo username é obrigatório.',
            'username.unique' => 'O username informado já está em uso. Escolha outro.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'role.required' => 'O campo role é obrigatório.',
            'role.in' => 'O role informado é inválido.',
        ];
    }

    public function addValidationErrors($validator): void
    {
        $this->messages['error'] = $validator->errors()->all();
    }

    public function addSuccess(string $message): void
    {
        $this->messages['success'][] = $message;
    }

    public function addError(string $message): void
    {
        $this->messages['error'][] = $message;
    }

    public function get(string $type): array
    {
        return $this->messages[$type] ?? [];
    }
}
