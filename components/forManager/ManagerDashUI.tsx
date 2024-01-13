"use client";

import { managerdashlinks } from "@/data/managerdashlinks";
import { LinkButton, SignOutBtn } from "../sharedui";
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { IoMdTimer } from "react-icons/io";

const ManagerDashUI = () => {
  return (
    <div className=" w-full h-full flex flex-col gap-2 items-center">
      <header className="w-full h-[10%] flex justify-between px-3 py-2">
        <SignOutBtn />
        <div className="h-full flex items-center gap-2">
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
      <div className="w-full h-full sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl gap-5 md:gap-7 lg:gap-9 bg-white flex flex-col items-center justify-center text-center p-2 md:p-3 lg:py-3 lg:px-5">
        {managerdashlinks.map((item) => (
          <LinkButton
            icon={item.img}
            link={item.uniqueLink}
            title={item.title}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerDashUI;
