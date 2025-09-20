import React from "react";

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-slate-100 p-6 rounded-xl shadow-lg w-96 max-w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-400 text-white  hover:bg-red-500 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
