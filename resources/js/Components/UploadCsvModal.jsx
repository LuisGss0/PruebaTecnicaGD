import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

const UploadCsvModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setError("Por favor, seleccione un archivo CSV.");
            return;
        }
        onUpload(file);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white max-h-80 overflow-y-auto rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-auto">
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Subir Archivo CSV</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
                <div className="pl-6 pt-2">
                    <p>Seleccione un archivo CSV para subirlo al sistema.</p>
                    <p>
                        El archivo debe contener las columnas
                        <strong>"name, email, password y phone."</strong>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <InputLabel for="csvFile" value="Archivo CSV" />
                        <input
                            id="csvFile"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="mt-1 block w-full"
                        />
                        {error && (
                            <InputError message={error} className="mt-2" />
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <PrimaryButton
                            className="bg-red-500 hover:bg-red-600 focus:bg-red-400 focus:ring-red-400 active:bg-red-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </PrimaryButton>
                        <PrimaryButton
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 focus:bg-green-400 focus:ring-green-400 active:bg-green-600 ml-2"
                        >
                            Subir
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadCsvModal;
