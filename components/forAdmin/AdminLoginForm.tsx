"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLoginForm = () => {
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
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
          router.push("/admindash");
          toast.success("Signing in...");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(`Unable to sign in: ${error}`);
      }
    } else {
      toast.error("Please check your admin credentials");
    }
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <form className=" w-10/12 h-full flex flex-col items-center justify-center gap-7">
      <input
        type="email"
        placeholder="Email"
        className="w-full h-fit text-white bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full h-fit bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px] focus:bg-white text-black "
        value={password}
        onChange={handlePasswordInput}
      />

      <button
        onClick={handleLogin}
        className=" text-2xl md:text-xl w-full sm:w-10/12 md:w-6/12 py-4 rounded-md md:rounded-lg text-white bg-green-600"
      >
        Sign In
      </button>
    </form>
  );
};

export default AdminLoginForm;
