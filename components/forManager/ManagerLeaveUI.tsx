"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ManagerLeaveUI = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [role, setRole] = useState<string>("Manager");
  const [email, setEmail] = useState(session?.user?.email);
  const [startDay, setStartDay] = useState<string>("");
  const [startMonth, setStartMonth] = useState<string>("");
  const [untilDay, setUntilDay] = useState<string>("");
  const [untilMonth, setUntilMonth] = useState<string>("");
  const [leaveType, setLeaveType] = useState<string>("");
  const [leaveStatus, setLeaveStatus] = useState<boolean>(false);
  const [sickNote, setSickNote] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(true);

  const handleLeaveType = (e: ChangeEvent<HTMLSelectElement>) => {
    setLeaveType(e.target.value);
  };

  const handleApplication = async () => {
    if (
      name !== " " &&
      surname !== "" &&
      role !== "" &&
      email !== "" &&
      startDay !== "" &&
      startMonth !== "" &&
      untilDay !== "" &&
      untilMonth !== "" &&
      leaveType !== "" &&
      leaveStatus !== true
    ) {
      try {
        const res = await fetch("http://localhost:3000/api/applyforleave", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            surname,
            role,
            email,
            startDay,
            startMonth,
            untilDay,
            untilMonth,
            leaveType,
            leaveStatus,
            sickNote,
            isApplied,
          }),
        });

        if (res.ok) {
          toast.success(`Leave application by ${name} submitted`);
          router.push("/managerdash");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please complete all data input fields");
    }
  };

  return (
    <div className="flex items-center justify-center text-center flex-col h-full w-full bg-black text-white">
      <header className="w-full h-[5%] px-3 md:px-5 flex justify-start items-end py-1">
        <Link className=" text-white" href="/managerdash">
          Return
        </Link>
      </header>
      <div className="flex flex-col p-2 md:p-3 text-center items-center w-full h-[95%] sm:w-10/12 md:w-8/12 lg:w-6/12 bg-neutral-600/30 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
        <h3 className="text-xl font-semibold text-white mb-3">
          {session?.user?.name} leave application
        </h3>
        <form
          className=" w-full h-full flex flex-col items-center text-center"
          action=""
        >
          <input
            type="text"
            className="w-full md:w-8/12 lg:w-6/12 mb-2 h-fit text-black bg-white py-5 lg:py-2 rounded-md md:rounded-lg px-3 placeholder:text-neutral-600/70 text-[16px]"
            placeholder="Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <input
            type="text"
            className="w-full md:w-8/12 lg:w-6/12 h-fit text-black bg-white py-5 lg:py-2 rounded-md md:rounded-lg px-3 placeholder:text-neutral-600/70 text-[16px]"
            placeholder="Surname"
            value={surname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSurname(e.target.value)
            }
          />
          <div className=" w-full flex flex-col items-center">
            <label htmlFor="">Leave type</label>
            <select
              onChange={handleLeaveType}
              name="month"
              id="month"
              className="py-2 w-full md:w-8/12 lg:w-6/12 px-3 text-black rounded-md md:rounded-lg border-2 border-black"
              value={leaveType}
            >
              <option value="default">Select...</option>
              <option value="ANNUAL">ANNUAL</option>
              <option value="SICK">SICK</option>
              <option value="FAMILY RESPONSIBILITY">
                FAMILY RESPONSIBILITY
              </option>
              <option value="UNPAID">UNPAID</option>
            </select>
          </div>

          <div className="w-full h-fit flex flex-col py-4 text-center gap-2 items-center">
            <h3 className=" text-2xl font-semibold mb-4">Commencement date</h3>
            <input
              type="text"
              className="w-full md:w-8/12 lg:w-6/12 h-fit text-black bg-white py-5 lg:py-2 rounded-md md:rounded-lg px-3 placeholder:text-neutral-600/70 text-[16px]"
              placeholder="Day, eg. 18"
              value={startDay}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStartDay(e.target.value)
              }
            />
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStartMonth(e.target.value)
              }
              name="month"
              id="month"
              className="py-2 w-full md:w-8/12 lg:w-6/12 px-3 text-black rounded-md md:rounded-lg border-2 border-black"
              value={startMonth}
            >
              <option value="default">Select...</option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </div>
          <div className="w-full h-fit flex flex-col py-4 text-center gap-2 items-center">
            <h3 className=" text-2xl font-semibold mb-4">End date</h3>
            <input
              type="text"
              className="w-full md:w-8/12 lg:w-6/12 h-fit text-black bg-white py-5 lg:py-2 rounded-md md:rounded-lg px-3 placeholder:text-neutral-600/70 text-[16px]"
              placeholder="Day, eg. 18"
              value={untilDay}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUntilDay(e.target.value)
              }
            />
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setUntilMonth(e.target.value)
              }
              name="month"
              id="month"
              className="py-2 w-full md:w-8/12 lg:w-6/12 px-3 text-black rounded-md md:rounded-lg border-2 border-black"
              value={untilMonth}
            >
              <option value="default">Select...</option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </div>
        </form>
        <Link
          href="https://drive.google.com/"
          target="_blank"
          className="bg-white w-full md:w-8/12 lg:w-6/12 text-black py-1 rounded-lg mb-1"
        >
          Attach sick note
        </Link>
        <button
          onClick={handleApplication}
          className="bg-white w-full md:w-8/12 lg:w-6/12 text-black py-1 rounded-lg mb-1"
        >
          Submit leave application
        </button>
      </div>
    </div>
  );
};

export default ManagerLeaveUI;
