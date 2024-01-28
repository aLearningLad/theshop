"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { SignOutBtn } from "@/components/sharedui";
import { IoMdTimer } from "react-icons/io";
import { FcApproval } from "react-icons/fc";

const GeneralWorkerProfile = () => {
  const { data: session } = useSession();

  const id = session?.user?.email;
  console.log(session);
  return (
    <div className="h-screen w-full bg-black p-2 md:p-5 items-center flex flex-col">
      <header className="w-full h-[10%] flex justify-between px-3 lg:px-5 py-2 gap-1 lg:gap-0">
        <SignOutBtn />
        <div className="h-full flex items-center gap-1 lg:gap-2">
          <Link
            className="bg-white text-black text-[14px] px-2 gap-2 flex items-center h-full rounded-md md:rounded-lg"
            href="/grantedleaves"
          >
            {" "}
            <FcApproval size={30} />
            Approved Leaves
          </Link>
          <Link
            className="bg-white text-black text-[14px] px-2 gap-2 flex items-center h-full rounded-md md:rounded-lg"
            href="/pendingleaves"
          >
            <IoMdTimer size={30} /> Pending Leaves
          </Link>
        </div>
      </header>
      <div className="w-full h-[80%] relative sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col items-center justify-center gap-4 lg:gap-6">
        <p className="text-white text-[18px] font-semibold">
          {session?.user?.name}
        </p>
        <div className=" w-8/12 h-[50%] relative overflow-clip rounded-md md:rounded-lg">
          <Image
            src="/assets/avatar.png"
            fill
            objectFit="cover"
            alt="avatar"
            className=""
          />
        </div>
        <div className="w-full h-[30%] flex flex-col gap-4 items-center">
          <Link
            className="active:bg-white/60 transition duration-500 ease-in-out w-full sm:w-10/12 md:w-8/12 flex justify-center items-center text-2xl rounded-md md:rounded-lg lg:rounded-xl h-1/2 bg-white text-black"
            href="/generalapplyleave"
          >
            Apply for leave
          </Link>
          <Link
            className="active:bg-white/60 transition duration-500 ease-in-out w-full sm:w-10/12 md:w-8/12 flex justify-center items-center text-2xl rounded-md md:rounded-lg lg:rounded-xl h-1/2 bg-white text-black"
            href={`/mypayslips/${id}`}
          >
            See payslips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GeneralWorkerProfile;
