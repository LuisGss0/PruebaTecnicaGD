import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto">
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Confirmar Acción</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    <p>{message}</p>
                    <div className="flex justify-end mt-4">
                        <PrimaryButton
                            className="bg-gray-500 hover:bg-gray-600 focus:bg-gray-400 focus:ring-gray-400 active:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </PrimaryButton>
                        <PrimaryButton
                            className="bg-red-500 hover:bg-red-600 focus:bg-red-400 focus:ring-red-400 active:bg-red-600 ml-2"
                            onClick={onConfirm}
                        >
                            Confirmar
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
