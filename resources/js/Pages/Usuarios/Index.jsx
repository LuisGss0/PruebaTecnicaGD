import React, { useEffect } from "react";

import { useForm, Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { UsersTable } from "@/Components/UsersTable";
import ButtonAdd from "@/Components/ButtonAdd";
import CreateUserModal from "@/Components/CreateUserModal";
import EditUserModal from "@/Components/EditUserModal";
import ConfirmModal from "@/Components/ConfirmModal";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import UploadCsvModal from "@/Components/UploadCsvModal";
import PrimaryButton from "@/Components/PrimaryButton";

function Index({ auth, usuarios, role, permissions }) {

    const [openModalCreateUsers, setOpenModalCreateUsers] =
        React.useState(false);
    const [openModalEditUsers, setOpenModalEditUsers] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState(null);
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
    const [openUploadCsvModal, setOpenUploadCsvModal] = React.useState(false);

    const handleEdit = (id) => {
        // Lógica para editar el usuario con el id proporcionado
        setSelectedUserId(id);
        setOpenModalEditUsers(true);
    };

    const handleDelete = (id) => {
        // Lógica para eliminar el usuario con el id proporcionado
        setOpenConfirmModal(true);
        setSelectedUserId(id);
    };

    const confirmDelete = () => {
        axios
            .delete(route("usuarios.destroy", selectedUserId))
            .then(() => {
                // Cerrar el modal de confirmación
                setOpenConfirmModal(false);
                setSelectedUserId(null);
                // Mostrar un mensaje de éxito
                Swal.fire({
                    icon: "success",
                    title: "Usuario eliminado",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // actualizar la lista de usuarios
                Inertia.reload({ only: ["usuarios"] });
            })
            .catch((error) => {
                // Mostrar un mensaje de error
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.error,
                });
            });
    };

    const onClickAddUserBtn = () => {
        setOpenModalCreateUsers(true);
    };

    const onClickUploadCsvBtn = () => {
        setOpenUploadCsvModal(true);
    };

    const handleUploadCsv = (file) => {
        const formData = new FormData();
        formData.append("csvFile", file);

        axios
            .post(route("usuarios.uploadCsv"), formData)
            .then(() => {
                // Mostrar un mensaje de éxito
                Swal.fire({
                    icon: "success",
                    title: "Usuarios registrados",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setOpenUploadCsvModal(false);
                    // actualizar la lista de usuarios
                    router.reload();                
                }); 

            })
            .catch((error) => {
                // Mostrar un mensaje de error
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                });
            });
    };

        Pusher.logToConsole = true;
        const pusher = new Pusher("6c47e43617cca521775a", {
            cluster: "us2",
        });

        const channel = pusher.subscribe("send-order");

        channel.bind("order", function (data) {
            console.log(data);
            alert(data.message);
        });

    return (
        <AuthenticatedLayout auth={auth}>
            <CreateUserModal
                isOpen={openModalCreateUsers}
                onClose={() => {
                    setTimeout(() => {
                        setOpenModalCreateUsers(false);
                    }, 100); //El componente se desmonta despues de 100ms evita warnings
                }}
            />
            <EditUserModal
                isOpen={openModalEditUsers}
                userId={selectedUserId}
                onClose={() => {
                    setTimeout(() => {
                        setOpenModalEditUsers(false);
                        setSelectedUserId(null);
                    }, 100);
                }}
            />

            <UploadCsvModal
                isOpen={openUploadCsvModal}
                onClose={() => setOpenUploadCsvModal(false)}
                onUpload={handleUploadCsv}
            />

            <ConfirmModal
                isOpen={openConfirmModal}
                onClose={() => setOpenConfirmModal(false)}
                onConfirm={confirmDelete}
                message="¿Estás seguro de que deseas eliminar este usuario?"
            />

            <Head title="Usuarios" />
            <div className="max-w-7xl mx-auto p-2 sm:p-6 lg:p-8">
                <div className="mt-4">
                    <p>
                        Bienvenido, {auth.user.name} {auth.user.lastname}
                    </p>
                    <p>Role: {role}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6">
                    <ButtonAdd onClickAddUserBtn={onClickAddUserBtn} onClickUploadCsvBtn={onClickUploadCsvBtn} />
                    <UsersTable
                        usuarios={usuarios}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        permissions={permissions}
                        role={role}
                    />
                </div>
            </div>

            <PrimaryButton onClick={() => {
                //Enviar notificacion
                axios.get(route("sendNotification")).then((response) => {
                    console.log(response);
                });
            }}>
                Hola Mundo
            </PrimaryButton>
        </AuthenticatedLayout>
    );
}

export default Index;
