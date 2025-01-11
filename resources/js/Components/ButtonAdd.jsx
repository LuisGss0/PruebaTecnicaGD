import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

function ButtonAdd({ onClickAddUserBtn, onClickUploadCsvBtn }) {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Lista de Usuarios</h2>
                <div>
                    <PrimaryButton
                        className="bg-green-500 hover:bg-green-600 focus:bg-green-400 focus:ring-green-400 active:bg-green-600"
                        onClick={onClickAddUserBtn}
                    >
                        <i className="fas fa-plus mr-2"></i> Añadir Usuario
                    </PrimaryButton>
                    <PrimaryButton
                        className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-400 focus:ring-blue-400 active:bg-blue-600 ml-2"
                        onClick={onClickUploadCsvBtn}
                    >
                        Subir mediante csv
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
}

export default ButtonAdd;
