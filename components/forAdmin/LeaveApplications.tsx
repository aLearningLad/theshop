"use client";

import { EmployeeLeaveCard } from "@/components/sharedui";
import { IoReturnUpBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";

const LeaveApplications = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | any | null>();

  useEffect(() => {
    const fetchAllLeaveApplications = async () => {
      try {
        const res = await fetch("/api/getallleave", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Something went wrong. Status: ${res.status}`);
        }

        const data = await res.json();
        setLeaveApplications(data.leaveapplications);
      } catch (error: Error | any) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeaveApplications();
  }, []);

  if (error) {
    return (
      <div>
        Error: {error}
        <Link href="/admindash">Return</Link>
      </div>
    );
  }

  return (
    <div className=" h-fit w-full">
      {loading ? (
        <div className=" h-screen w-full bg-black text-white flex flex-col gap-3 lg:gap-7 justify-center items-center">
          <h3>Just a minute...</h3>
        </div>
      ) : (
        <div className="w-full h-screen bg-black flex flex-col items-center p-2 md:p-5">
          {leaveApplications.length > 0 ? (
            <div className="w-full h-full bg-black p-2 md:p-5 flex flex-col">
              <header className="w-full h-[10%] flex justify-start items-end">
                <Link href="/admindash">
                  <IoReturnUpBackSharp color="white" size={50} />
                </Link>
              </header>
              <div className="w-full overflow-auto p-2 md:p-5 lg:p-7 h-[85%] gap-3 md:gap-5 bg-neutral-400/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {leaveApplications.map((item: any) => (
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
                    whom="admin"
                    leaveLength={item.leaveLength}
                    email={item.email}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <header className="w-full h-[10%] flex justify-start items-end pl-3 md:pl-5">
                <Link href="/admindash">
                  <IoReturnUpBackSharp color="white" size={50} />
                </Link>
              </header>
              <div className="h-[80%] w-full flex flex-col justify-center items-center text-2xl text-white">
                No pending leave applications...
                <Link
                  className="w-full h-fit py-3 text-lg bg-white text-black mt-4 md:mt-9 lg:mt-14 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex justify-center items-center rounded-md md:rounded-lg"
                  href="/admindash"
                >
                  Return
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaveApplications;
