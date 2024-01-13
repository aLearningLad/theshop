import { AdminLoginForm } from "@/components/forAdmin";
import { IoReturnUpBackSharp } from "react-icons/io5";
import Link from "next/link";

const AdminLoginPage = () => {
  return (
    <div className="flex px-3 py-8 sm:px-4 md:px-10 md:py-6 lg:px-20 lg:py-6 h-screen flex-col items-center justify-center bg-black text-white">
      <div className=" relative w-full h-full sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl gap-3 border-red-600 bg-white flex flex-col items-center justify-center text-center p-2 md:p-3 lg:px-5">
        <Link href="/" className=" absolute top-4 left-3 md:top-4 md:left-5">
          <IoReturnUpBackSharp size={40} color="black" />
        </Link>
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
