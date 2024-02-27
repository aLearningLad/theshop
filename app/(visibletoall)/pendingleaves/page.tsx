"use client";

import { PublicViewCard, ReturnBtn, SignOutBtn } from "@/components/sharedui";
import { Ipublicviewcard } from "@/types";
import Link from "next/link";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const PendingLeaves = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch("/api/getallleave", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Something went wrong. Error status: ${res.status}`);
        }

        const data = await res.json();
        setLeaveApplications(data.leaveapplications);
      } catch (error) {
        console.error(error);
        setError("Error fetching leave applications");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex-col bg-black text-white text-2xl flex justify-center items-center text-center">
        Error fetching leave applications...
        <SignOutBtn />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black p-2 md:p-5 flex flex-col">
      <header className="w-full h-[10%] flex justify-start items-end">
        <ReturnBtn />
      </header>
      {leaveApplications.length > 0 ? (
        <div className="w-full overflow-auto p-2 md:p-5 lg:p-7 h-[85%] gap-3 md:gap-5 bg-neutral-400/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {leaveApplications.map((item: Ipublicviewcard) => (
            <PublicViewCard
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
              isApplied={item.isApplied}
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
};

export default PendingLeaves;
