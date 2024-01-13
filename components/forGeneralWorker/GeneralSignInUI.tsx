import React from "react";
import { GeneralSignInInputs } from ".";
import { SignOutBtn } from "../sharedui";
import Link from "next/link";

const GeneralSignInUI = () => {
  return (
    <div className=" w-full h-screen bg-black p-2 md:p-5 flex flex-col items-center text-center">
      <header className="w-full h-[10%] flex justify-start px-3 lg:px-5 py-2">
        <Link
          href="/"
          className="text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
        >
          Return
        </Link>
      </header>
      <GeneralSignInInputs />
    </div>
  );
};

export default GeneralSignInUI;
