import { IoReturnUpBackSharp } from "react-icons/io5";
import Link from "next/link";
import { devemployeedata } from "@/data/devemployeedata";
import { AdminEmployeeCard } from "@/components/forAdmin";

const fetchAllWorkers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/allemployees", {
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

const SeeAll = async () => {
  const res = await fetchAllWorkers();

  if (!res) {
    return <div>Error fetching leave applications</div>;
  }

  const { employeedata } = res;

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col py-2 md:py-4 lg:py-5 px-5 md:px-7 lg:px-12 bg-black">
      <header className="w-full h-[10%] flex justify-start items-end px-2 md:px-5">
        <Link href="/admindash">
          <IoReturnUpBackSharp size={50} color="white" />
        </Link>
      </header>
      <div className="w-full overflow-auto p-2 md:p-5 lg:p-7 h-[80%] gap-3 md:gap-5 bg-neutral-400/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employeedata.map((item: any, index: number) => (
          <AdminEmployeeCard
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

export default SeeAll;
