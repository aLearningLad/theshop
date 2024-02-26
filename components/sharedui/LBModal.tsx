"use client";

import { Dispatch, SetStateAction } from "react";

interface LBModalProps {
  remainingDays: number;
  setBalanceModal: Dispatch<SetStateAction<boolean>>;
}

const LBModal: React.FC<LBModalProps> = ({
  remainingDays,
  setBalanceModal,
}) => {
  return (
    <div className="absolute p-1 z-[100] top-0 bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md">
      <div className="w-full h-full px-3 lg:p-7 py-1 lg:py-12 bg-white/60 rounded-lg md:rounded-xl flex flex-col items-center text-center justify-center relative">
        <h3 className=" text-2xl">Remaining Leave Days:</h3>
        <span className=" ">
          <h1 className="text-5xl text-black font-extrabold">
            {remainingDays > 0 ? remainingDays : 0}
          </h1>
          <p>days</p>
        </span>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setBalanceModal((prev) => !prev)
          }
          className=" text-xl lg:text-2xl absolute bottom-0 lg:bottom-4 w-full h-[10%] py-1 md:w-8/12 lg:w-6/12 rounded-lg lg:rounded-xl bg-cyan-500 text-white"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default LBModal;
