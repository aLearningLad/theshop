"use client";

import { Ipayslip } from "@/types";
import { Dispatch, MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";

interface UploadPayslipUIProps {
  handleModal: (prev: any) => void;
  handleChange: (prev: any) => void;
  newPayslip: any; //COME BACK TO THIS
}

const UploadPayslipUI: React.FC<UploadPayslipUIProps> = ({
  handleModal,
  handleChange,
  newPayslip,
}) => {
  const handleUpload = async () => {
    toast.success("Yup yup, uploaded!");
  };

  return (
    <div className="absolute top-0 p-2 md:p-3 z-10 bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white flex justify-center items-center text-2xl">
      <div className="w-full gap-5 md:gap-3 relative h-full sm:w-11/12 md:w-10/12 lg:w-6/12 xl:w-4/12 flex flex-col items-center justify-center">
        <input
          type="text"
          className="rounded-md w-full p-2 lg:p-3 placeholder:text-neutral-400 text-black bg-white lg:placeholder:text-[16px]"
          name="drivelink"
          onChange={handleChange}
          placeholder="Google Drive Link"
          value={newPayslip.drivelink}
        />
        <input
          type="text"
          className="rounded-md w-full p-2 lg:p-3 placeholder:text-neutral-400 text-black bg-white lg:placeholder:text-[16px]"
          name="forMonth"
          onChange={handleChange}
          placeholder="Month eg. June"
          value={newPayslip.forMonth}
        />
        <button
          onClick={handleModal}
          className="md:bottom-3 w-8/12 bg-cyan-600 active:bg-pink-600 transition-colors duration-500 ease-in-out rounded-md md:rounded-lg text-white py-3"
        >
          Save & exit
        </button>
        <button
          className="absolute bottom-2 md:bottom-3 w-full bg-white rounded-md md:rounded-lg text-black py-3"
          onClick={handleModal}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default UploadPayslipUI;
