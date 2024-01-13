"use client";

import { admindashlinks } from "@/data/admindashlinks";
import React from "react";
import { LinkButton } from "../sharedui";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SafeDash = () => {
  const router = useRouter();

  const handleUnauthorizedUser = async () => {
    await signOut();
    toast.success("Signing out...");
    router.push("/");
  };

  const { data: session } = useSession();

  return (
    <div className="w-full h-full bg-black flex justify-center">
      {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
        <div className="w-full h-full sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl gap-5 md:gap-7 lg:gap-9 bg-white flex flex-col items-center justify-center text-center p-2 md:p-3 lg:py-3 lg:px-5">
          {admindashlinks.map((item) => (
            <LinkButton
              icon={item.icon}
              link={item.link}
              title={item.title}
              key={item.link}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-5 sm:gap-7 md:gap-10 lg:gap-14">
          <h3 className=" text-center text-2xl">
            {"You're"} not authorized to be here, {session?.user?.name}
          </h3>
          <button
            className="text-lg active:bg-white/60 bg-white rounded-md md:rounded-lg text-black w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-fit xl:px-9 py-3 md:py-5"
            onClick={handleUnauthorizedUser}
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
};

export default SafeDash;
