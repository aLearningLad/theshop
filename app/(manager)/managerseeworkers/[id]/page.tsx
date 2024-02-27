"use client";

import { ManagerEditUI } from "@/components/forManager";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Iparams } from "@/types";

const ManagerEditIndividual = ({ params }: { params: Iparams }) => {
  const { id } = params;
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const res = await fetch(`/api/allemployees/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch employee with id: ${id}`);
        }

        const data = await res.json();
        setEmployeeData(data.singleEmployee);
      } catch (error) {
        console.error(error);
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeById();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center text-2xl text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center text-2xl text-white">
        Error: {error}
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className=" w-full h-screen flex flex-col bg-black items-center justify-center gap-3 md:gap-5 lg:gap-7">
        <h2>No employee data found</h2>
        <Link href="/managerseeworkers">Return</Link>
      </div>
    );
  }

  const { name, surname, email, passport } = employeeData;

  return (
    <div className="w-full h-screen bg-black">
      <ManagerEditUI
        id={id}
        name={name}
        surname={surname}
        email={email}
        passport={passport}
      />
    </div>
  );
};

export default ManagerEditIndividual;
