<?php

namespace App\Enums;

enum RoleEnum: int
{
    case Admin = 0;
    case Employee = 1;
    case Owner = 2;
}
