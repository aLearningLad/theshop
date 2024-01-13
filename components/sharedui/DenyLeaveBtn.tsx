"use client";

import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface DenyLeaveBtnProps {
  id: string;
}

const DenyLeaveBtn: React.FC<DenyLeaveBtnProps> = ({ id }) => {
  const router = useRouter();

  const handleDeny = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/getallleave?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Leave denied");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDeny}
      className="w-full text-white rounded-md md:rounded-lg lg:w-1/2 flex justify-center items-center gap-1 h-1/2 lg:h-[60%] bg-red-600 active:bg-red-600/50 transition duration-500 ease-in-out"
    >
      <MdDeleteForever color="white" />
      Deny
    </button>
  );
};

export default DenyLeaveBtn;
