import { Link } from "@inertiajs/react";
import React from "react";

export const UsersTable = ({ usuarios, onEdit, onDelete, permissions, role }) => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-r">
                                Nombre
                            </th>
                            <th className="px-4 py-2 border-b border-r">
                                Email
                            </th>
                            <th className="px-4 py-2 border-b border-r">
                                Telefono
                            </th>
                            {role && role === 'Admin' && <th className="px-1 py-2 border-b border-r">
                                Acciones
                            </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.data.map((usuario) => (
                            <tr key={usuario.id}>
                                <td className="px-4 py-2 border-b border-r">
                                    {usuario.name}
                                </td>
                                <td className="px-4 py-2 border-b border-r">
                                    {usuario.email}
                                </td>
                                <td className="px-4 py-2 border-b border-r">
                                    {usuario.phone}
                                </td>
                               {role && role === 'Admin' && <td className="flex items-center justify-center px-1 py-2 border-b border-r">
                                    {permissions && permissions.find(permission => permission.name === 'edit user')  && <button
                                        onClick={() => onEdit(usuario.id)}
                                        className="bg-yellow-500 text-white text-sm font-bold py-1 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 mr-2"
                                    >
                                        <i className="fas fa-edit mr-1"></i>
                                        Editar
                                    </button>}
                                    {permissions && permissions.find(permission => permission.name === 'delete user') && <button
                                        onClick={() => onDelete(usuario.id)}
                                        className="bg-red-500 text-white text-sm py-1 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                    >
                                        <i className="fas fa-trash mr-1"></i>
                                        Eliminar
                                    </button>}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                {usuarios.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className={`mx-1 px-3 py-1 border rounded ${
                            link.active
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </>
    );
};
