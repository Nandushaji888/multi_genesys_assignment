import React from 'react';

const DeleteConfirmation = ({ onDelete, onCancel }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <p>Are you sure you want to delete this employee?</p>
      <div className="flex justify-end mt-4">
        <button onClick={onDelete} className="bg-red-500 text-white p-2 mr-2">Yes</button>
        <button onClick={onCancel} className="bg-gray-500 text-white p-2">No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
