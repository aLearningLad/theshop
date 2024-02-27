"use client";

import { FormEvent, useState } from "react";
import { FaRedo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface RevokeLeaveBtnProps {
  id: string;
  name?: string;
  email: string | undefined;
  leaveLength: number | undefined;
}

const RevokeLeaveBtn: React.FC<RevokeLeaveBtnProps> = ({
  id,
  name,
  email,
  leaveLength,
}) => {
  const [leaveStatus, setLeaveStatus] = useState<boolean>(false);
  const router = useRouter();

  const handleRevocation = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/revokeleave/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ leaveStatus, email, leaveLength }),
      });

      if (res.ok) {
        toast.success(`Leave application by ${name} has been revoked`);
        location.reload();

        router.refresh();
      } else {
        toast.error(
          `Something went wrong. Cannot revoke leave request by ${id}`,
          { id }
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
      onClick={handleRevocation}
      className="w-6/12 text-white h-4/6 bg-black rounded-md flex justify-center items-center gap-1"
    >
      <FaRedo size={22} color="red" /> Revoke
    </button>
  );
};

export default RevokeLeaveBtn;
