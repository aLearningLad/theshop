import { AdminDashUI } from "@/components/forAdmin";
import { LinkButton } from "@/components/sharedui";
import { admindashlinks } from "@/data/admindashlinks";
import React from "react";

const AdminDash = () => {
  return (
    <div className="flex px-3 py-8 sm:px-4 md:px-10 md:py-6 lg:px-20 lg:py-6 h-screen flex-col items-center justify-center bg-black text-white">
      <AdminDashUI />
    </div>
  );
};

export default AdminDash;
