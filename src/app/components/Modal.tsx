
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: any) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newCourse, setNewCourse] = React.useState({
    title: '',
    description: '',
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddCourse = () => {
    onAdd(newCourse);
    setNewCourse({
      title: '',
      description: '',
      price: 0,
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-white text-center">Add New Course</h2>
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={handleInputChange}
              className="block w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              placeholder="Course Description"
              value={newCourse.description}
              onChange={handleInputChange}
              className="block w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Course Price"
              value={newCourse.price}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddCourse}
                className="px-4 py-2 bg-teal-500 text-white font-bold rounded hover:bg-teal-600"
              >
                Add Course
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
