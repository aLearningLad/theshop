"use client";

import { IoReturnUpBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ReturnBtn = () => {
  const router = useRouter();

  const handleGoback = () => {
    router.back();
  };

  return (
    <button onClick={handleGoback}>
      <IoReturnUpBackSharp color="white" size={50} />
    </button>
  );
};

export default ReturnBtn;
