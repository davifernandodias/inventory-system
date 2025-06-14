<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\DBAL\TimestampType;
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
                'role' => 'Admin',
                'type_number' => '1',
                'created_at' => Carbon::now('America/Sao_Paulo'),
            ],
            [
                'role' => 'Employee',
                'type_number' => '2',
                'created_at' => Carbon::now('America/Sao_Paulo'),
            ],
            [
                'role' => 'Owner',
                'type_number' => '3',
                'created_at' => Carbon::now('America/Sao_Paulo'),
            ],
        ]);
    }
}
