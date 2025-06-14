<?php
namespace App\Exceptions;

use Exception;

class RouteDataException extends Exception
{

    public function __construct($message = "Error passing route data to controller", $code = 400, $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function getDetailedMessage()
    {
        return "Route failure: {$this->getMessage()} (Code: {$this->getCode()})";
    }
}
