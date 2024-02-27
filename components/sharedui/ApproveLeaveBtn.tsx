"use client";

import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { error } from "console";

interface ApproveLeaveBtnProps {
  id: string;
  name?: string;
  leaveLength: number | undefined;
  email: string | undefined;
}

const ApproveLeaveBtn: React.FC<ApproveLeaveBtnProps> = ({
  id,
  name,
  leaveLength,
  email,
}) => {
  const [leaveStatus, setLeaveStatus] = useState<boolean>(true);
  const router = useRouter();

  const handleApproval = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/getallleave/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ leaveStatus, leaveLength, email }),
      });

      if (res.ok) {
        toast.success(`Leave application by ${name} has been approved`);
        router.refresh();
      } else {
        toast.error(
          `Something went wrong. Cannot approve leave request by ${name}`
        );

        router.refresh();
      }
    } catch (error) {
      console.log(
        `This error occured on clientside while approving leave: ${error}`
      );
    }
  };
  return (
    <button
      onClick={handleApproval}
      className="text-white rounded-md md:rounded-lg w-full lg:w-1/2 flex justify-center items-center gap-1 bg-green-600 h-1/2 lg:h-[60%] transition duration-500 ease-in-out active:bg-cyan-600/50"
    >
      <TiTick color="white" size={20} />
      Approve
    </button>
  );
};

export default ApproveLeaveBtn;
