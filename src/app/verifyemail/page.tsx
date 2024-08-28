"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/ui/moving-border';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/login");
    } catch (error:any) {
      console.error(error);
      setError(true);
      toast.error(error.response?.data?.error || "An error occurred during verification", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);



  return (
    <>
      <ToastContainer />
      <div className='h-screen w-full rounded-md flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900'>
        <div className='p-4 relative z-10 w-full text-center'>
          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
                WELCOME TO Our Apna School
              </h1>
              <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
                To complete the verification process, please click the button below to confirm your email address and activate your account.
              </p>
              <div className='mt-20'>
                <Button
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  onClick={verifyUserEmail}
                >
                  Verify your Email
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
