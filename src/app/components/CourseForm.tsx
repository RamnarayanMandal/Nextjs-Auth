"use client";
import React, { useState, useEffect } from 'react';
import { Course } from './interfaces'; // Adjust the path as needed
import { Button } from './ui/moving-border'; // Adjust the path as needed

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  course?: Course;
}

const CourseForm: React.FC<CourseFormProps> = ({ isOpen, onClose, onSave, course }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price);
    } else {
      // Reset fields if no course is provided
      setTitle('');
      setDescription('');
      setPrice(0);
    }
  }, [course]);

  const handleSubmit = () => {
    if (title && description && price >= 0) {
      onSave({ ...course, title, description, price } as Course);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md z-10">
        <h2 className="text-xl font-bold mb-4 text-white text-center">{course ? 'Update Course' : 'Add Course'}</h2>
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
            {course ? 'Update' : 'Add'}
          </Button>
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
