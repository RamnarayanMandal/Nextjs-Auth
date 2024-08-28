import Image from "next/image";
import HeroSection from "./components/HeroSection";
import FeaturedCourse from "./components/FuturedCourse";
import { Footer } from "./components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialCards from "./components/TestimonialCards";

export default function Home() {
  return (
    <>
  <HeroSection/>
  <FeaturedCourse/>
  <WhyChooseUs/>
  <TestimonialCards/>
  <Footer/>
  </>
  );
}
