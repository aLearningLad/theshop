import { Ipayslip } from "@/types";
import Link from "next/link";

const PayslipCard = ({ drivelink, forMonth }: Ipayslip) => {
  return (
    <Link
      href={drivelink}
      target="_blank"
      className="w-full lg:hover:bg-cyan-600 lg:hover:text-white transition duration-500 active:bg-cyan-600/40 lg:active:bg-current h-[60vh] bg-white flex justify-center items-center flex-col rounded-lg md:rounded-xl lg:rounded-2xl"
    >
      <h1 className="text-6xl lg:text-[50px] font-bold mb-3 lg:mb-5">
        {forMonth}
      </h1>
      <h3 className=" bg-black text-white text-2xl p-3 rounded-lg lg:text-[30px]">
        Tap to open
      </h3>
    </Link>
  );
};

export default PayslipCard;
