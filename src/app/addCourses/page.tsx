"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import AddCourseModal from '../components/AddCourseModal';
import ConfirmationModal from '../components/ConfirmationModal';
import "react-toastify/dist/ReactToastify.css";
import { UserSideBar } from "../components/UserSideBar";
import { Button } from '../components/ui/moving-border';
import { Course } from '../components/interfaces';
import { FaUser } from 'react-icons/fa';

const Page: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Set this based on your authentication logic
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addCourseModalOpen, setAddCourseModalOpen] = useState<boolean>(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/course/getCourse');
      setCourses(response.data.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleOnClickLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const handleAddCourse = async (course: Course) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await axios.post('/api/course/createCourse', { ...course, instructor: userId });
        setAddCourseModalOpen(false);
        fetchCourses();
        toast.success('Course added successfully!');
      } catch (error) {
        console.error('Failed to add course', error);
        toast.error('Failed to add course');
      }
    } else {
      console.error('User ID not found in localStorage');
      toast.error('User ID not found');
    }
  };

  const handleUpdateCourse = async (course: Course) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await axios.put(`/api/course/updateCourse`,{ 
          ...course,
          id: course._id
        });
        setEditCourse(null);
        fetchCourses();
        toast.success('Course updated successfully!');
      } catch (error) {
        console.error('Failed to update course', error);
        toast.error('Failed to update course');
      }
    } else {
      console.error('User ID not found in localStorage');
      toast.error('User ID not found');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (deleteCourseId) {
      try {
        await axios.delete(`/api/course/deleteCourse`,{
          data: { courseId:id }
        });
        fetchCourses();
        toast.success('Course deleted successfully!');
        setConfirmationOpen(false);
        setDeleteCourseId(null);
      } catch (error) {
        console.error('Failed to delete course', error);
        toast.error('Failed to delete course');
      }
    }
  };

  const handleConfirmDelete = () => {
    if (deleteCourseId) {
      handleDeleteCourse(deleteCourseId);
    }
  };

  return (
    <div className="flex">
      <div className="w-30 min-h-screen bg-gray-800 flex flex-col items-center p-4 text-white">
        <UserSideBar />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <Button
          borderRadius="1.75rem"
          className="flex items-center gap-2 bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={handleOnClickLogout}
        >
          <FaUser className="text-lg" />
          Log out
        </Button>
      </div>

      <CourseList
        courses={courses}
        onEdit={(course) => {
          setEditCourse(course);
          setIsModalOpen(true);
        }}
        onDelete={(id) => {
          setDeleteCourseId(id);
          setConfirmationOpen(true);
        }}
        onAddCourse={() => setAddCourseModalOpen(true)}
      />

      <CourseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdateCourse}
        course={editCourse}
      />

      <AddCourseModal
        isOpen={addCourseModalOpen}
        onClose={() => setAddCourseModalOpen(false)}
        onAdd={handleAddCourse}
      />

      <ConfirmationModal
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <ToastContainer />
    </div>
  );
};

export default Page;
