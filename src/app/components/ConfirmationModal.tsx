import React from 'react';
import { Button } from './ui/moving-border'; // Adjust the path as needed

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg text-white font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4 text-white ">Are you sure you want to delete this course?</p>
        <div className="flex justify-end gap-2">
          <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white">
            Yes, delete
          </Button>
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
