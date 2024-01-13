"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    signOut();
    toast.success("Signing out...");
    router.push("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
