import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { Button } from "./ui/moving-border";

const HeroSection = () => {
  return (
    <div className='h-auto md:h-[40rem] w-full rounded-md flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900'>
     <div className='p-4 relative z-10 w-full text-center'>
     <Spotlight
        className="-top-40 lg:left-1/3 left-10 md:left-60 md:-top-20 "
        fill="white"
      />
        <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
            Master the arts of Music
        </h1>
       <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
        dive into art of Music courses and transfor
        your musical journey today. Whether you're join us to unclock your true potential.
       </p>
       <div className='mt-20'>
        <Link href={"/courses"}>
            
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
  )
}

export default HeroSection