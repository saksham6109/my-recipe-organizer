import React from 'react';

const ConfirmPopUp = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 ">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full text-center">
        <p className="text-gray-800 text-lg font-medium mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes,delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
           cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
