import { ManagerEditUI } from "@/components/forManager";
import { Iparams } from "@/types";

const getEmployeeById = async (id: string) => {
  try {
    const res = await fetch(`/api/allemployees/${id}`, {
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

const ManagerEditInvdividual = async ({ params }: { params: Iparams }) => {
  const { id } = params;
  const { singleEmployee } = await getEmployeeById(id);
  const { name, surname, email, passport } = singleEmployee;

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

export default ManagerEditInvdividual;
