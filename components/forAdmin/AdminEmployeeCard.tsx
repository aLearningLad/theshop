import { Idevemployeedata } from "@/types";
import { GrUserManager } from "react-icons/gr";
import { MdDeleteForever, MdEmail } from "react-icons/md";
import { RiAdminFill, RiAmazonFill } from "react-icons/ri";
import { SiCodechef } from "react-icons/si";
import Link from "next/link";
import { BiSolidEditAlt } from "react-icons/bi";
import { DeregisterBtn } from ".";

const AdminEmployeeCard: React.FC<Idevemployeedata> = ({
  email,
  leaveStatus,
  name,
  passport,
  role,
  surname,
  id,
  index,
}) => {
  return (
    <div className="w-full relative h-[80vh] sm:h-[75vh] md:h-[60vh] flex flex-col items-center justify-center text-center bg-white rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl p-2 md:p-4 lg:p-6">
      <h3 className=" text-3xl lg:text-2xl font-semibold flex gap-2">
        {name} {surname}
      </h3>
      <p className=" text-[12px] flex gap-[2px] items-center">
        <MdEmail size={12} />
        {email}
      </p>
      <div className="w-full h-[30%] flex justify-center items-center">
        {(role === "General Worker" && <SiCodechef size={80} />) ||
          (role === "Manager" && <GrUserManager size={80} />) ||
          (role === "Admin" && <RiAdminFill size={80} />)}
      </div>
      <h3 className="text-lg md:text-[14px] text-neutral-500">{role}</h3>
      {leaveStatus ? (
        <p className=" flex items-center gap-[2px]">
          On leave
          <div className=" w-[8px] h-[8px] rounded-full bg-red-600" />
        </p>
      ) : (
        <p className=" flex items-center gap-[2px]">
          At work
          <div className="w-[8px] h-[8px] rounded-full bg-green-500" />
        </p>
      )}
      <div className=" absolute h-[20%] px-2 md:px-5 gap-2 bottom-3 w-full flex lg:flex-row flex-col items-center lg:items-end justify-center">
        <Link
          className="text-white rounded-md md:rounded-lg w-full lg:w-1/2 flex justify-center items-center gap-1 bg-green-600 h-1/2 lg:h-[60%] transition duration-500 ease-in-out active:bg-cyan-600/50"
          href={`/all/${id}`}
        >
          <BiSolidEditAlt />
          Edit Details
        </Link>
        <DeregisterBtn name={name} surname={surname} key={name} id={id} />
      </div>
    </div>
  );
};

export default AdminEmployeeCard;
