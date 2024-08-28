'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Spotlight } from './ui/Spotlight';
import { Button } from "./ui/moving-border";
import { FaUser } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [routerName, setRouterName] = useState('Login'); // Initialize with a default value
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setRouterName('Login');
    } else {
      setRouterName('Logout');
    }
  }, []); // Dependency array is empty to run only once after initial render

  const handleOnClick = () => {
    console.log("Button clicked"); // Debugging log
    if (routerName === 'Logout') {
      localStorage.clear(); // Clear local storage
      router.push('/login'); // Redirect to login page
    } else {
      router.push('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className='h-auto md:h-[40rem] w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900'>
      
      {/* Login/Logout Button with Icon */}
      <div className='absolute top-4 right-4 z-20'>
        <Button
          borderRadius="1.75rem"
          className="flex items-center gap-2 bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={handleOnClick} // Correct prop name and function reference
        >
          <FaUser className="text-lg" /> {/* Icon */}
          {routerName}
        </Button>
      </div>
      
      {/* Main Content */}
      <div className='p-4 relative z-10 w-full text-center'>
        <Spotlight
          className="-top-40 lg:left-1/3 left-10 md:left-60 md:-top-20"
          fill="white"
        />
        <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
          Apna School
        </h1>
        <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
          Dive into the art of music courses and transform your musical journey today. Whether you're joining us to unlock your true potential.
        </p>
        <div className='mt-20'>
          <Link href="/courses">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Explore Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
