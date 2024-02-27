"use client";

import { AdminEditUI } from "@/components/forAdmin";
import { useEffect, useState } from "react";
import { Iparams } from "@/types";

const IndividualEmployee = ({ params }: { params: Iparams }) => {
  const { id } = params;
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getEmployeeById = async (id: string | number) => {
      try {
        const res = await fetch(`/api/allemployees/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch employee with id: ${id}`);
        }
        const data = await res.json();
        setSingleEmployee(data.singleEmployee);
      } catch (error) {
        console.log(error);
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getEmployeeById(id);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleEmployee) {
    return <div>No employee found</div>;
  }

  const { name, surname, email, passport } = singleEmployee;

  return (
    <div className=" bg-black h-screen w-full text-white">
      <AdminEditUI
        id={id}
        name={name}
        surname={surname}
        email={email}
        passport={passport}
      />
    </div>
  );
};

export default IndividualEmployee;
