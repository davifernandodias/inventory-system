<?php

namespace App\Enums;

enum RoleEnum: int
{
    case Admin = 1;
    case Employee = 2;
    case Owner = 3;
}
