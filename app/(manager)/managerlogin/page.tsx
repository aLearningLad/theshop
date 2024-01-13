import { ManagerLoginUI } from "@/components/forManager";
import Link from "next/link";

const ManagerDashboard = () => {
  return (
    <div className="h-screen p-3 md:p-5 w-full bg-black flex flex-col items-center">
      <header className="w-full h-[10%] flex justify-start px-3 lg:px-5 py-2">
        <Link
          className="text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
          href="/"
        >
          Return
        </Link>
      </header>

      <ManagerLoginUI />
    </div>
  );
};

export default ManagerDashboard;
