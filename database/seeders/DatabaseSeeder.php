<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);

        //Creamos un usuario por defecto y contraseña encriptada hash
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        $roleAdmin = Role::create(['name' => 'Admin']); //Creamos un rol de administrador
        $adminUser->assignRole($roleAdmin); //Asignamos el rol de administrador al usuario



        $permissionAdmin = Permission::query()->pluck('name'); //Obtenemos todos los permisos
        $roleAdmin->syncPermissions($permissionAdmin); //Asignamos todos los permisos al rol de administrador


        //crear rol de usuario y asignar permisos
        $roleUser = Role::create(['name' => 'User']); //Creamos un rol de usuario
        $roleUser->syncPermissions(['create user']); //Asignamos permisos al rol de usuario
        
        //Creamos 10 usuarios con el rol de usuario
        User::factory(10)->create()->each(function ($user) use ($roleUser) {
            $user->assignRole($roleUser);
        });
    }
}
