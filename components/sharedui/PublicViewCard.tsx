import { FaClockRotateLeft } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { SiCodechef } from "react-icons/si";
import { TiTick } from "react-icons/ti";

interface PublicViewCardProps {
  name: string;
  surname: string;
  role: string;
  leaveStatus: boolean;
  isApplied: boolean;
  fromMonth: string;
  fromDay: string;
  untilDay: string;
  untilMonth: string;
  id: string;
}

const PublicViewCard: React.FC<PublicViewCardProps> = ({
  isApplied,
  leaveStatus,
  name,
  role,
  surname,
  fromMonth,
  fromDay,
  untilDay,
  untilMonth,
}) => {
  return (
    <div
      className={`w-full ${
        leaveStatus === true ? "flex" : "hidden"
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
    </div>
  );
};

export default PublicViewCard;
