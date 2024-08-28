'use client'; // Ensure 'use client' is at the top

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BackgroundGradient } from './ui/background-gradient';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Course {
  id: string; // Adjusted to string if ObjectId is used
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string; // Assuming instructor is a string, if it's ObjectId you might need additional handling
  isFeatured: boolean;
}

const FeaturedCourse = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const[userId, setUserId] = useState()
  const router = useRouter();



  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    userDetails();
    fetchCourses();
  }, []);

  const userDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/api/users/aboutme', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(response.data.data.isAdmin);
      setUserId(response.data.data._id);
      console.log(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  }

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const resp = await axios.get('/api/course/getCourse');
      setFeaturedCourses(resp.data.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string, courseName: string, userId: string) => {
    try {
      await axios.put('/api/users/enroll', {
        courseId,
        courseName,
        userId
      });
      toast.success("Enrollment successful!");
    } catch (error) {
      toast.error("Failed to enroll in course.");
      console.error('Failed to enroll in course:', error);
    }
  }

  const handleOnClick = (courseId: string, courseName: string) => {
    if (!token) {
      toast.error("Please log in first", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (isAdmin) {
      router.push(`/editcourse/${courseId}`);
    } else {
      if (userId) {
        enrollInCourse(courseId, courseName, userId);
        router.push(`/courses/${courseId}`);
      } else {
        toast.error("User ID not found");
      }
    }
  };

  return (
    <div className='py-12 bg-gray-900 relative'>
      {loading && (
        <span className="loader"></span>
      )}
      <div>
        <div className='text-center'>
          <h2 className='text-base text-teal-600 font-semibold tracking-wide uppercase'>
            COURSES
          </h2>
          <p className='my-10 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl'>
            Learn with the Best
          </p>
        </div>
      </div>
      <div className='mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
          {featuredCourses.map((course: Course) => (
            <div key={course.id} className='flex justify-center px-5'>
              <BackgroundGradient className='rounded-[22px] max-w-sm bg-white dark:bg-zinc-900'>
                <div className='p-4 sm:p-6 flex flex-col items-center flex-grow text-center'>
                  <Image
                    src="https://cdn.pixabay.com/photo/2014/04/03/11/08/tea-311845_1280.png"
                    alt={course.title}
                    height={400}
                    width={400}
                    className='object-contain'
                  />
                  <p className='text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200'>
                    {course.title}
                  </p>
                  <p className='text-sm text-neutral-200 dark:text-neutral-400 flex-grow mb-4'>
                    {course.description}
                  </p>
                  {
                    isAdmin ? (
                      <button
                        onClick={() => handleOnClick(course._id, course.title)}
                        className='px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500'
                      >
                        Update Course
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOnClick(course._id, course.title)}
                        className='px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500'
                      >
                        Enroll Now
                      </button>
                    )
                  }
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-10 text-center'>
        <Link href="/courses">
          <button className='p-[3px] relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
            <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent'>
              <p className='font-semibold text-lg'>View All Courses</p>
            </div>
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FeaturedCourse;
