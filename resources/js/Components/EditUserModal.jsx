import React from "react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const EditUserModal = ({ isOpen, onClose, userId }) => {
    const [user, setUser] = React.useState(null);
    const { data, setData, put, processing, reset, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [validationErrors, setValidationErrors] = React.useState({});

    React.useEffect(() => {
        if (userId) {
            // Fetch user data by ID
            axios.get(route("usuarios.show", userId)).then((response) => {
                setUser(response.data.usuario);
                setData({
                    name: response.data.usuario.name || "",
                    email: response.data.usuario.email || "",
                    phone: response.data.usuario.phone || "",
                    role: response.data.role || "User",
                    currentPassword: "",
                    password: "",
                    confirmPassword: "",
                });
            });
        }
        //Cuando se desmonte el componente se limpia el formulario
        return () => {
            reset();
        };
    }, [userId]);

    const validate = () => {
        const errors = {};

        if (!data.name) {
            errors.name = "El nombre es obligatorio.";
        }

        if (!data.email) {
            errors.email = "El email es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "El email no es válido.";
        }

        if (data.phone && !/^\d{10}$/.test(data.phone)) {
            errors.phone = "El teléfono debe tener 10 dígitos.";
        }

        if (!data.currentPassword) {
            errors.currentPassword = "La contraseña actual es obligatoria.";
        }

        if (!data.password) {
            errors.password = "La contraseña es obligatoria.";
        } else if (data.password.length < 8) {
            errors.password = "La contraseña debe tener al menos 8 caracteres.";
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden.";
        }

        if (!data.role) {
            errors.role = "El rol es obligatorio.";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    if (!isOpen || !user) return null; // Si el modal no está abierto, no se muestra nada.

    const submit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        put(route("usuarios.update", userId), {
            onSuccess: () => {
                reset();
                //Abre un sweetalert con el mensaje de éxito
                Swal.fire({
                    icon: "success",
                    title: "Usuario actualizado",
                    showConfirmButton: false,
                    timer: 1500,
                });
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white max-h-80 overflow-y-auto rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-auto">
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Editar Usuario</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={submit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <InputLabel for="name" value="Nombre" />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={validationErrors.name ||errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel for="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={validationErrors.email ||errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel for="phone" value="Teléfono" />
                            <TextInput
                                id="phone"
                                type="text"
                                value={data.phone}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            <InputError
                                message={validationErrors.phone ||errors.phone}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                for="currentPassword"
                                value="Contraseña Actual"
                            />
                            <TextInput
                                id="currentPassword"
                                type="password"
                                value={data.currentPassword}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("currentPassword", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={validationErrors.currentPassword ||errors.currentPassword}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel for="password" value="Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={validationErrors.password || errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                for="confirmPassword"
                                value="Confirmar Nueva Contraseña"
                            />
                            <TextInput
                                id="confirmPassword"
                                type="password"
                                value={data.confirmPassword}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("confirmPassword", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={validationErrors.confirmPassword ||errors.confirmPassword}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <InputLabel for="role" value="Rol" />
                            <select
                                id="role"
                                value={data.role}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                required
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <InputError
                                message={validationErrors.role ||errors.role}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <PrimaryButton
                            className="bg-red-500 hover:bg-red-600 focus:bg-red-400 focus:ring-red-400 active:bg-red-600"
                            onClick={onClose}
                            processing={processing}
                            disabled={processing}
                        >
                            Cancelar
                        </PrimaryButton>
                        <PrimaryButton
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 focus:bg-green-400 focus:ring-green-400 active:bg-green-600 ml-2"
                            processing={processing}
                            disabled={processing}
                        >
                            Guardar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
