"use client";

import { ManagerEmployeeCard } from "@/components/forManager";
import { IoReturnUpBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManagerViewWorkers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllWorkers = async () => {
      try {
        const res = await fetch("/api/allemployees", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Something went wrong. Error status: ${res.status}`);
        }

        const data = await res.json();
        setEmployees(data.employeedata);
      } catch (error) {
        console.error(error);
        setError("Error fetching workers");
      } finally {
        setLoading(false);
      }
    };

    fetchAllWorkers();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className=" w-full h-screen bg-black flex justify-center items-center">
        <Link
          className="bg-white text-black w-full md:w-10/12 lg:w-8/12 xl:w-6/12 text-2xl rounded-lg lg:rounded-xl"
          href="/managerdash"
        >
          Return
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col py-2 md:py-4 lg:py-5 px-5 md:px-7 lg:px-12 bg-black">
      <header className="w-full h-[10%] flex justify-start items-end px-2 md:px-5">
        <Link href="/managerdash">
          <IoReturnUpBackSharp size={50} color="white" />
        </Link>
      </header>
      <div className="w-full overflow-auto p-2 md:p-5 lg:p-7 h-[80%] gap-3 md:gap-5 bg-neutral-400/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employees.map((item: any, index) => (
          <ManagerEmployeeCard
            key={item._id}
            email={item.email}
            leaveStatus={item.leaveStatus}
            name={item.name}
            surname={item.surname}
            passport={item.passport}
            role={item.role}
            id={item._id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerViewWorkers;
