import { admindashlinks } from "@/data/admindashlinks";
import React from "react";
import { LinkButton, SignOutBtn } from "../sharedui";
import { SafeDash } from ".";

const AdminDashUI = () => {
  return (
    <div className=" w-full h-full flex flex-col gap-2 items-center">
      <header className="w-full h-[10%] flex justify-start px-3 py-2">
        <SignOutBtn />
      </header>
      <SafeDash />
    </div>
  );
};

export default AdminDashUI;
