 "use client";
import React, { useState } from 'react';
import { Course } from './interfaces'; // Adjust the path as needed
import { Button } from './ui/moving-border'; // Adjust the path as needed

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: Course) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    if (title && description && price >= 0) {
      onAdd({ title, description, price } as Course);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md z-10">
        <h2 className="text-xl font-bold mb-4 text-white text-center">Add Course</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-2">
          <Button onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
