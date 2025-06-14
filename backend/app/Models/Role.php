<?php
namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    protected $casts = [
        'roles' => RoleEnum::class,
    ];

    protected $fillable = ['roles'];

    public function userHasRole(): HasMany
    {
        return $this->hasMany(UserHasRole::class);
    }
}
