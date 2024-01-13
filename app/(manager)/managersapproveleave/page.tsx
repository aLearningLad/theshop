import { EmployeeLeaveCard } from "@/components/sharedui";
import { devleavedata } from "@/data/devleavedata";
import Link from "next/link";
import React from "react";
import { IoReturnUpBackSharp } from "react-icons/io5";

const fetchAllLeaveApplications = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/getallleave", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Something went wrong. Error status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ManagersApproveLeave = async () => {
  try {
    const res = await fetchAllLeaveApplications();

    if (!res) {
      return <div>Error fetching leave applications</div>;
    }

    const { leaveapplications } = res;

    return (
      <div className="w-full h-screen bg-black p-2 md:p-5 flex flex-col">
        <header className="w-full h-[10%] flex justify-start items-end">
          <Link href="/managerdash">
            <IoReturnUpBackSharp color="white" size={50} />
          </Link>
        </header>
        {leaveapplications.length > 0 ? (
          <div className="w-full overflow-auto p-2 md:p-5 lg:p-7 h-[85%] gap-3 md:gap-5 bg-neutral-400/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {leaveapplications.map((item: any) => (
              <EmployeeLeaveCard
                fromDay={item.startDay}
                fromMonth={item.startMonth}
                id={item._id}
                leaveStatus={item.leaveStatus}
                role={item.role}
                name={item.name}
                surname={item.surname}
                untilDay={item.untilDay}
                untilMonth={item.untilMonth}
                key={item.id}
                whom="manager"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-[85%] bg-black flex justify-center items-center text-center text-white text-2xl">
            No pending leave applications...
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className=" w-full h-screen flex-col bg-black text-white text-2xl flex justify-center items-center text-center">
        Error fetching leave applications
        <Link
          className=" w-full h-fit py-3 md:py-5 bg-white text-black sm:w-10/12 md:w-8/12 lg:w-fit lg:px-10 text-xl rounded-md md:rounded-xl mt-3"
          href="/managerdash"
        >
          Return
        </Link>
      </div>
    );
  }
};

export default ManagersApproveLeave;
