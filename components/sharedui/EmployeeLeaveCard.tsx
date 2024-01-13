import { Idevleavedata } from "@/types";
import { GrUserManager } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { SiCodechef } from "react-icons/si";
import { FaClockRotateLeft } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { ApproveLeaveBtn } from ".";
import { RevokeLeaveBtn } from "../forAdmin";
import DenyLeaveBtn from "./DenyLeaveBtn";

const EmployeeLeaveCard: React.FC<Idevleavedata> = ({
  fromDay,
  fromMonth,
  id,
  leaveStatus,
  name,
  surname,
  untilDay,
  untilMonth,
  role,
  whom,
}) => {
  return (
    <div
      className={`w-full ${
        whom === "manager" && role === "Manager" ? "hidden" : "flex"
      } relative h-[80vh] sm:h-[75vh] md:h-[60vh] flex-col items-center justify-center text-center bg-white rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl p-2 md:p-4 lg:p-6`}
    >
      <h3 className=" text-3xl lg:text-2xl font-semibold flex gap-2">
        {name} {surname}
      </h3>
      <div className="w-full h-[30%] flex justify-center items-center">
        {(role === "General Worker" && <SiCodechef size={80} />) ||
          (role === "Manager" && <GrUserManager size={80} />) ||
          (role === "Admin" && <RiAdminFill size={80} />)}
      </div>
      <h3 className="text-lg md:text-[14px] text-neutral-500">{role}</h3>
      {leaveStatus ? (
        <p className=" flex items-center gap-[2px]">
          <TiTick color="green" size={24} />
          Approved
        </p>
      ) : (
        <p className=" flex items-center gap-[8px]">
          <FaClockRotateLeft color="red" size={16} />
          Pending...
        </p>
      )}
      <div className="w-full flex justify-center items-center gap-1 mt-2 md:mt-3">
        <p className="text-lg font-semibold">
          {fromDay} {fromMonth}
        </p>
        <p>to</p>
        <p className="text-lg font-semibold">
          {untilDay} {untilMonth}
        </p>
      </div>
      {leaveStatus ? (
        whom === "admin" ? (
          <div className="absolute h-[15%] px-2 md:px-5 gap-2 bottom-3 w-full flex lg:flex-row flex-col items-center lg:items-center justify-center">
            <RevokeLeaveBtn id={id} name={name} key={id} />
          </div>
        ) : (
          <div className="absolute h-[20%] text-xl px-2 md:px-5 gap-2 bottom-3 w-full flex lg:flex-row flex-col items-center lg:items-end justify-center">
            You approved this
          </div>
        )
      ) : (
        <div className=" absolute h-[20%] px-2 md:px-5 gap-2 bottom-3 w-full flex lg:flex-row flex-col items-center lg:items-end justify-center">
          <ApproveLeaveBtn id={id} name={name} />
          <DenyLeaveBtn id={id} />
        </div>
      )}
    </div>
  );
};

export default EmployeeLeaveCard;
