"use client";

import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeregisterBtnProps {
  name: string;
  surname: string;
  id: string;
}

const DeregisterBtn: React.FC<DeregisterBtnProps> = ({ name, surname, id }) => {
  const [isSure, setIsSure] = useState(false);
  const router = useRouter();

  const handleMakeSure = () => {
    setIsSure((prev) => !prev);
    toast.success(
      `You are about to delete ${name} ${surname} from the employee database `
    );
  };

  const handleDeregister = async () => {
    try {
      if (isSure) {
        const res = await fetch(
          `http://localhost:3000/api/allemployees?id=${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          toast.success(`Deleting ${name} from database...`);
          router.refresh();
        }
      }
    } catch (error) {
      console.log(`Unable to delete employee: ${error}`);
    }
  };

  return (
    <div className="w-full overflow-clip text-white rounded-md md:rounded-lg lg:w-1/2 flex justify-center items-center gap-1 h-1/2 lg:h-[60%]">
      {isSure ? (
        <button
          className="w-full h-full flex justify-center items-center bg-red-600 active:bg-red-600/50 transition duration-500 ease-in-out"
          onClick={handleDeregister}
        >
          Are you sure?
        </button>
      ) : (
        <button
          onClick={handleMakeSure}
          className="w-full h-full flex justify-center items-center bg-cyan-600  active:bg-red-600/50 transition duration-500 ease-in-out"
        >
          <MdDeleteForever color="white" />
          Deregister
        </button>
      )}
    </div>
  );
};

export default DeregisterBtn;
