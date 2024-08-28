"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../utils/cn";
import { FaPhoneAlt } from "react-icons/fa"; 

export function UserSideBar() {
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false); // Declare open state

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `/api/users/aboutme`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserDetails(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "contact us",
      href: "/Contact",
      icon: (
        <FaPhoneAlt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> // Use the new icon here
      ),
    },
    {
      label: "Logout",
      href: "/login",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // Full height
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <SidebarLink
              link={{
                label: userDetails?.username || "Loading...",
                href: "#",
                icon: (
                  <Image
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            {userDetails?.courses.length > 0 && (
              <div className="max-h-40 overflow-y-auto">
                <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200">
                  Courses
                </h3>
                <ul className="list-disc ml-5 mt-2">
                  {userDetails.courses.map((course) => (
                    <li
                      key={course._id}
                      className="text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      {course.courseName}
                      {course.subjects.length > 0 && (
                        <ul className="ml-5">
                          {course.subjects.map((subject) => (
                            <li
                              key={subject._id}
                              className="text-sm text-neutral-600 dark:text-neutral-400"
                            >
                              {subject.subjectName} - Mock Score:{" "}
                              {subject.mockTestScore}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Apna School
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
