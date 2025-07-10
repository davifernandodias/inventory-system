<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'name_role' => 'Admin',
                'number_role' => 1,
                'created_at' => Carbon::now('America/Sao_Paulo'),
            ],
            [
                'name_role' => 'Employee',
                'number_role' => 2,
                'created_at' => Carbon::now('America/Sao_Paulo'),
            ],
            [
                'name_role' => 'Owner',
                'number_role' => 3,
                'created_at' => Carbon::now('America/Sao_Paulo'),
            ],
        ]);
    }
}
