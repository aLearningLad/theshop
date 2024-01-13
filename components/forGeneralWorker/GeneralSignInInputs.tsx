"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const GeneralSignInInputs = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleGeneralLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid credentials");
        return;
      } else {
        router.push("/generalprofile");
        toast.success("Signing in...");
      }
    } catch (error) {
      toast.error("Somethign went wrong");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80%] relative sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col items-center justify-center gap-4 lg:gap-6">
      <input
        type="email"
        placeholder="email"
        className="w-full md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg bg-white placeholder:text-neutral-500 px-3 py-4 text-[14px] text-black"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <input
        type="password"
        placeholder="password"
        className="w-full md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg bg-white placeholder:text-neutral-500 px-3 py-4 text-[14px] text-black"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={handleGeneralLogin}
        className="absolute bottom-3 w-full lg:w-6/12 h-fit py-3 lg:bottom-5 text-2xl text-white rounded-md md:rounded-lg active:bg-cyan-600/60 bg-cyan-600"
      >
        Submit
      </button>
    </div>
  );
};

export default GeneralSignInInputs;
