"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "../../utils/cn";
import { Boxes } from "@/app/components/ui/background-boxes";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignup = async (e: any) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match", {
       position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

        });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/singnup", user);
      console.log(response.data);
     
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

    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error, {
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
    setButtonDisabled(!(user.username && user.email && user.password && confirmPassword && (user.password === confirmPassword)));
  }, [user, confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: type === 'checkbox' ? checked : value }));
  };

  return (
    <>
      <ToastContainer/>
      <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg lg:pt-14 md:pt-5 pt-2">
        <div className="absolute inset-0 w-full h-full  z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">
          {loading ? (
            <span className="loader"></span>
          ) : (
            <form className="my-8 relative z-50 text-white" onSubmit={onSignup}>
              <h1 className="text-4xl md:text-7xl text-center font-sans font-bold mb-8">
                Sign Up
              </h1>
              <LabelInputContainer className="mb-4">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      placeholder="Ram"
                      type="text"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </LabelInputContainer>
                </div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  className="w-full"
                  value={user.email}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="w-full"
                  value={user.password}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  className="w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4 flex flex-row content-center items-center justify-start gap-2" >
                <Label htmlFor="isAdmin" className="text-white mt-2">Admin</Label>
                <Input
                  id="isAdmin"
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={handleChange}
                  className='w-4 h-4 '
                />

              </LabelInputContainer>
              <button
                className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={buttonDisabled}
              >
                Sign Up &rarr;
                <BottomGradient />
              </button>
              <div className="flex justify-center content-center items-center">
                <Link href="/login" className="my-8 text-center text-white">
                  Already have an account?
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
