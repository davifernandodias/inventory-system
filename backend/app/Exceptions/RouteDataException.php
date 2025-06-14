<?php
namespace App\Exceptions;

use Exception;

class RouteDataException extends Exception
{
    // Construtor personalizado para definir mensagem padrão e código de erro
    public function __construct($message = "Erro na passagem de dados da rota para o controller", $code = 400, $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    // Método para fornecer uma mensagem formatada
    public function getDetailedMessage()
    {
        return "Falha na rota: {$this->getMessage()} (Código: {$this->getCode()})";
    }
}
