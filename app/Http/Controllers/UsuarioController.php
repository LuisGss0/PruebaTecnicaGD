<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //obtener el usuario en sesion
        $user = Auth::user();

        $role = $user->getRoleNames()->first();
        $permissions = $user->getAllPermissions();

        //obtener todos los usuarios primero el mas actual y paginado 5        
        $usuarios = User::latest()->paginate(5);
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::pluck('name', 'name')->all();
        return view('usuarios.crear', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => 'nullable|numeric|digits:10',
                'password' => 'required|string|min:8|same:confirmPassword',
                'role' => 'required|string|exists:roles,name'
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
                'password' => Hash::make($validatedData['password']),
            ]);

            //asignar rol al usuario de User
            $user->assignRole($validatedData['role']);


            return Inertia::render('Usuarios/Index', [
                'usuarios' => User::latest()->paginate(5)
            ])->with('success', 'Usuario creado correctamente');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Error al crear el usuario: ' . $e->getMessage()])->withInput();
        }
    }

    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csvFile' => 'required|file|mimes:csv,txt'
        ]);

        $path = $request->file('csvFile')->getRealPath();
        $data = array_map('str_getcsv', file($path));

        $header = Arr::first($data);

        if (count($header) !== 4) { //Si no tiene 4 columnas retorna error
            return redirect()->back()->withErrors(['error' => 'El archivo CSV debe tener 4 columnas'])->withInput();
        }

        $header = array_map('strtolower', $header);

        if (!in_array('name', $header) || !in_array('email', $header) || !in_array('phone', $header) || !in_array('password', $header)) { //Si no tiene las columnas name, email, phone y password retorna error
            return redirect()->back()->withErrors(['error' => 'El archivo CSV debe tener las columnas name, email, phone y password'])->withInput();
        }

        //Eliminar la fila de encabezado
        $data = array_slice($data, 1);

        //Asignar el encabezado a cada fila
        $data = array_map(function ($row) use ($header) {
            return array_combine($header, $row);
        }, $data);

        // Validar los datos de cada fila
        $errors = [];
        foreach ($data as $index => $row) {            
            $validator = Validator::make($row, [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'phone' => 'nullable|numeric|digits:10',
                'password' => 'required|string|min:8',
            ]);
    
            if ($validator->fails()) {
                $errors[$index + 2] = $validator->errors()->all(); // +2 para ajustar el índice a la fila real en el archivo CSV
            }
        }

        if (!empty($errors)) {
            return redirect()->back()->withErrors(['error' => 'Errores de validación en el archivo CSV', 'details' => $errors])->withInput();
        }

        //Iniciar la transaccion para guardar los usuarios
        DB::beginTransaction();

        try {
            //Crear los usuarios y asignarles el rol de User
            foreach ($data as $row) {
                $user = User::create([
                    'name' => $row['name'],
                    'email' => $row['email'],
                    'phone' => $row['phone'],
                    'password' => Hash::make($row['password']),
                ]);

                $user->assignRole('User');
            }

            //Commit de la transaccion si no hay errores 
            DB::commit();

            //Retornar la vista de usuarios con mensaje de exito
            return Inertia::render('Usuarios/Index', [
                'usuarios' => User::latest()->paginate(5)
            ])->with('success', 'Usuarios creados correctamente');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Error al crear los usuarios: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $usuario = User::find($id);
        //busca el role del usuario
        $role = $usuario->getRoleNames()->first();

        $response = [
            'usuario' => $usuario,
            'role' => $role
        ];

        //retornar el usuario y el rol
        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $usuario = User::find($id);
        $roles = Role::pluck('name', 'name')->all();
        $usuarioRole = $usuario->roles->pluck('name', 'name')->all();

        return view('usuarios.editar', compact('usuario', 'roles', 'usuarioRole'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $id,
                'phone' => 'nullable|numeric|digits:10',
                'currentPassword' => 'required|string',
                'password' => 'nullable|string|min:8|same:confirmPassword',
                'role' => 'required|string|exists:roles,name'
            ]);

            $usuario = User::findOrFail($id);

            if (!Hash::check($validatedData['currentPassword'], $usuario->password)) {
                return redirect()->back()->withErrors(['currentPassword' => 'La contraseña actual no es correcta'])->withInput();
            }

            $usuario->name = $validatedData['name'];
            $usuario->email = $validatedData['email'];
            $usuario->phone = $validatedData['phone'];

            if (!empty($validatedData['password'])) {
                $usuario->password = Hash::make($validatedData['password']);
            }

            $usuario->syncRoles([$validatedData['role']]);

            $usuario->save();

            return Inertia::render('Usuarios/Index', [
                'usuarios' => User::latest()->paginate(5)
            ])->with('success', 'Usuario actualizado correctamente');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Error al actualizar el usuario: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $usuario = User::find($id);

            if (!$usuario) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            $usuario->delete();

            return response()->json(['success' => 'Usuario eliminado correctamente']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al eliminar el usuario: ' . $e->getMessage()], 500);
        }
    }
}
