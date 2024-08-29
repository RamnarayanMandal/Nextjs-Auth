"use client";
import React from 'react';
import { Course } from './interfaces';
import {BackgroundGradient} from './ui/background-gradient';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { IoAddCircle } from 'react-icons/io5';
import { Button as MuiButton } from '@mui/material';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onAddCourse: () => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEdit, onDelete, onAddCourse }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900">
      <div className="absolute lg:top-4 md:top-4 top-10 lg:left-52 md:left-24 left-4 z-20">
        <MuiButton
          variant="contained"
          color="primary"
          onClick={onAddCourse}
          className="mt-4"
        >
          <IoAddCircle />
          <span className="lg:block md:block hidden">Add Course</span>
        </MuiButton>
      </div>

      <div className="w-full p-4">
        <h2 className="text-4xl text-center my-6 text-teal-600 font-semibold tracking-wide uppercase">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {courses.map(course => (
            <div key={course._id} className="flex justify-center px-5">
              <BackgroundGradient className="rounded-[22px] max-w-sm bg-white dark:bg-zinc-900">
                <div className="p-4 sm:p-6 flex flex-col items-center flex-grow text-center">
                  <Image
                    src="https://cdn.pixabay.com/photo/2014/04/03/11/08/tea-311845_1280.png"
                    alt={course.title}
                    height={400}
                    width={400}
                    className="object-contain"
                  />
                  <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {course.title}
                  </p>
                  <p className="text-sm text-neutral-200 dark:text-neutral-400 flex-grow mb-4">
                    {course.description}
                  </p>
                  <p className="text-sm text-neutral-50 dark:text-neutral-400 flex-grow mb-4">
                   Price : ₹ {course.price}
                  </p>
                  <div className='flex gap-5'>
                    <button
                      onClick={() => onEdit(course)}
                      className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(course._id)}
                      className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
