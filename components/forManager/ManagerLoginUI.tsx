"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const ManagerLoginUI = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [managerSecret, setManagerSecret] = useState<string>("");

  const handleManagerLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (
      managerSecret === process.env.NEXT_PUBLIC_MANAGER1KEY &&
      email === process.env.NEXT_PUBLIC_MANAGER1EMAIL &&
      password === process.env.NEXT_PUBLIC_MANAGERPASSWORD
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
          router.push("/managerdash");
          toast.success("Signing in...");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(`Unable to sign in: ${error}`);
      }
    } else {
      toast.error("Please check credentials");
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
      <input
        type="password"
        placeholder="manager's key"
        className="w-full md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg bg-white placeholder:text-neutral-500 px-3 py-4 text-[14px] text-black"
        value={managerSecret}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setManagerSecret(e.target.value)
        }
      />

      <button
        onClick={handleManagerLogin}
        className="absolute bottom-3 w-full lg:w-6/12 h-fit py-3 lg:bottom-5 text-2xl text-white rounded-md md:rounded-lg active:bg-cyan-600/60 bg-cyan-600"
      >
        Submit
      </button>
    </div>
  );
};

export default ManagerLoginUI;
