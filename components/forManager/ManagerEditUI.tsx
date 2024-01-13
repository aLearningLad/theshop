"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { Idevemployeedata, Irealemployee } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ManagerEditUI: React.FC<Irealemployee> = ({
  name,
  surname,
  email,
  password,
  day,
  month,
  role,
  moreInfo,
  leaveStatus,
  passport,
  id,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/allemployees/${id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newSurname, newPassport, newEmail }),
      });

      if (res.ok) {
        toast.success(`Changes saved`);
        router.push("/managerseeworkers");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [newName, setNewName] = useState<string>(name);
  const [newSurname, setNewSurname] = useState<string>(surname);
  const [newPassport, setNewPassport] = useState<string>(passport);
  const [newEmail, setNewEmail] = useState<string>(email);

  return (
    <div className="w-full h-full bg-black flex flex-col p-2 md:p-5">
      <header className=" w-full h-[5%] flex justify-start items-center">
        <Link
          className="text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
          href="/managerdash"
        >
          Return
        </Link>
      </header>
      <div className="w-full h-[90%] flex justify-center items-center p-4">
        <div className="relative w-full gap-3 md:gap-5 h-full flex flex-col items-center justify-center text-center bg-neutral-600/40 rounded-md md:rounded-lg lg:rounded-xl p-4">
          <input
            type="text"
            className="px-3 w-full h-fit py-5 md:py-4 lg:py-2 rounded-md md:rounded-lg bg-white sm:w-10/12 text-black placeholder:text-neutral-500 md:w-8/12 lg:w-6/12"
            value={newName}
            placeholder="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewName(e.target.value)
            }
          />
          <input
            type="text"
            className="px-3 w-full h-fit py-5 md:py-4 lg:py-2 rounded-md md:rounded-lg bg-white sm:w-10/12 text-black placeholder:text-neutral-500 md:w-8/12 lg:w-6/12"
            value={newSurname}
            placeholder="surname"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewSurname(e.target.value)
            }
          />
          <input
            type="text"
            className="px-3 w-full h-fit py-5 md:py-4 lg:py-2 rounded-md md:rounded-lg bg-white sm:w-10/12 text-black placeholder:text-neutral-500 md:w-8/12 lg:w-6/12"
            value={newPassport}
            placeholder="passport/ID no."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassport(e.target.value)
            }
          />
          <input
            type="email"
            className="px-3 w-full h-fit py-5 md:py-4 lg:py-2 rounded-md md:rounded-lg bg-white sm:w-10/12 text-black placeholder:text-neutral-500 md:w-8/12 lg:w-6/12"
            value={newEmail}
            placeholder="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewEmail(e.target.value)
            }
          />
          <button
            onClick={handleSubmit}
            className="absolute bottom-4 rounded-lg active:bg-white/50 w-full h-fit py-3 md:py-5 bg-white text-black sm:w-10/12 md:w-8/12 lg:w-6/12"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerEditUI;
