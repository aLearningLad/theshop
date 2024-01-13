"use client";

import { AdminEditUI } from "@/components/forAdmin";
import { Iparams } from "@/types";

const getEmployeeById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/allemployees/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch employee with id: ${id}`);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const IndividualEmployee = async ({ params }: { params: Iparams }) => {
  const { id } = params;
  const { singleEmployee } = await getEmployeeById(id);
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
