'use client';
import React from 'react'
import { StickyScroll } from "./ui/sticky-scroll-reveal";



const softwareSchoolContent = [
  {
    title: 'Master Your Coding Skills: A Personalized Journey in Software Excellence',
    description:
      'Embark on a coding journey tailored to your unique needs. Our personalized instruction adapts to your individual learning style, setting the stage for exceptional growth and innovation. At our software school, your coding aspirations meet our expert guidance, paving a clear path to mastery.',
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        {/* You can add specific content or components here related to software learning */}
      </div>
    ),
  },
  {
    title: 'Hands-On Learning Experience: Build Real-World Software Projects',
    description:
      'Dive into practical coding challenges and real-world projects that enhance your programming skills. Our hands-on approach ensures you gain practical experience and build a robust portfolio that showcases your abilities in real-world scenarios.',
  },
  {
    title: 'Expert Guidance and Support',
    description:
      'Learn from industry experts who bring their real-world experience into the classroom. Our dedicated instructors provide personalized support, helping you tackle complex problems and refine your skills for a successful software career.',
  },
  {
    title: 'Live Coding Sessions & Interactive Workshops',
    description:
      'Participate in live coding sessions and interactive workshops where you can apply your skills in real-time. This engaging format allows you to receive immediate feedback and deepen your understanding of software development concepts.',
  },
  {
    title: 'Cutting-Edge Curriculum',
    description:
      'Our curriculum is continuously updated to reflect the latest in software development trends and technologies. Stay ahead of the curve with up-to-date materials and methodologies that ensure you’re learning the most current practices in the industry.',
  },
  {
    title: 'Endless Learning Resources and Opportunities',
    description:
      'Explore our extensive library of resources and diverse course offerings. With endless opportunities for learning and skill advancement, you’ll find plenty of ways to continue growing and mastering new technologies and programming languages.',
  },
];



const WhyChooseUs = () => {
  return (
    <div className='text-white'>
      <StickyScroll content={softwareSchoolContent} />
    </div>
  )
}

export default WhyChooseUs
