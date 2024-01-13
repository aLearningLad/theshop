"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const GeneralLeaveApplication = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState<any>(session?.user?.name);
  const [surname, setSurname] = useState<any>(session?.user?.name);
  const [role, setRole] = useState<string>("General Worker");
  const [email, setEmail] = useState(session?.user?.email);
  const [startDay, setStartDay] = useState<string>("");
  const [startMonth, setStartMonth] = useState<string>("");
  const [untilDay, setUntilDay] = useState<string>("");
  const [untilMonth, setUntilMonth] = useState<string>("");
  const [leaveType, setLeaveType] = useState<string>("");
  const [leaveStatus, setLeaveStatus] = useState<boolean>(false);
  const [sickNote, setSickNote] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState(true);

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
      leaveStatus !== true &&
      isApplied === true
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
          router.push("/generalprofile");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please complete all data input fields");
    }
  };

  return (
    <div className="h-full flex w-full flex-col p-2 md:p-5 items-center relative">
      <header className="w-full h-[10%] flex justify-between px-3 lg:px-5 py-2">
        <Link
          className="text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
          href="/generalprofile"
        >
          Return
        </Link>
        <button className="text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black">
          View leave balance
        </button>
      </header>
      <div className="w-full  sm:w-10/12 md:w-8/12 lg:w-6/12 h-[85%] p-2 md:p-5 flex flex-col items-center text-center bg-neutral-200/10 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
        <h3 className="w-fit text-white px-4 border-b-2 border-white">Nancy</h3>
        {/* FROM  */}
        <div className=" w-full flex flex-col gap-2 text-start mt-3 md:mt-7 lg:mt-10">
          <label className=" text-white text-xl  font-semibold" htmlFor="">
            From
          </label>
          <span className=" w-full flex items-center gap-4 justify-center">
            <input
              type="text"
              className="w-1/2 text-[14px] bg-white rounded-md md:rounded-lg text-black placeholder:text-neutral-500 px-2 py-3"
              placeholder="eg. 15"
              value={startDay}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStartDay(e.target.value)
              }
            />
            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg"
              value={startMonth}
              name="fromMonth"
              id="fromMonth"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStartMonth(e.target.value)
              }
            >
              <option value="Default">Select...</option>
              <option value="Jan">1. Jan</option>
              <option value="Feb">2. Feb</option>
              <option value="Mar">3. Mar</option>
              <option value="Apr">4. Apr</option>
              <option value="May">5. May</option>
              <option value="Jun">6. Jun</option>
              <option value="Jul">7. Jul</option>
              <option value="Aug">8. Aug</option>
              <option value="Sep">9. Sep</option>
              <option value="Oct">10. Oct</option>
              <option value="Nov">11. Nov</option>
              <option value="Dec">12. Dec</option>
            </select>
          </span>
        </div>

        {/* UNTIL  */}
        <div className=" w-full flex flex-col gap-2 text-start mt-3 md:mt-7 lg:mt-10">
          <label className=" text-white text-xl  font-semibold" htmlFor="">
            Until
          </label>
          <span className=" w-full flex items-center gap-4 justify-center">
            <input
              type="text"
              className="w-1/2 text-[14px] bg-white rounded-md md:rounded-lg text-black placeholder:text-neutral-500 px-2 py-3"
              placeholder="eg. 28"
              value={untilDay}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUntilDay(e.target.value)
              }
            />
            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg"
              value={untilMonth}
              name="untilMonth"
              id="untilMonth"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setUntilMonth(e.target.value)
              }
            >
              <option value="Default">Select...</option>
              <option value="Jan">1. Jan</option>
              <option value="Feb">2. Feb</option>
              <option value="Mar">3. Mar</option>
              <option value="Apr">4. Apr</option>
              <option value="May">5. May</option>
              <option value="Jun">6. Jun</option>
              <option value="Jul">7. Jul</option>
              <option value="Aug">8. Aug</option>
              <option value="Sep">9. Sep</option>
              <option value="Oct">10. Oct</option>
              <option value="Nov">11. Nov</option>
              <option value="Dec">12. Dec</option>
            </select>
          </span>
        </div>
        <div className=" w-full flex justify-center items-center text-center flex-col gap-3 mt-3 md:mt-5">
          <label className=" text-white text-xl  font-semibold" htmlFor="">
            Type of leave
          </label>
          <select
            className="w-1/2 px-2 py-3 rounded-md md:rounded-lg"
            name="leavetype"
            id="leavetype"
            value={leaveType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setLeaveType(e.target.value)
            }
          >
            <option value="">Select...</option>
            <option value="Annual">ANNUAL</option>
            <option value="Sick">SICK</option>
            <option value="Family Responsibility">FAMILY RESPONSIBILITY</option>
            <option value="Unpaid">UNPAID</option>
          </select>
        </div>
      </div>
      <div className=" absolute flex items-center justify-center text-center bottom-2 md:bottom-3 py-2 md:py-3 lg:py-4 w-full text-2xl bg-green-600 active:bg-green-600/60 transition text-white sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg">
        {leaveType === "" ? (
          <>Select a leave type</>
        ) : (
          <button onClick={handleApplication}>
            Apply for {leaveType} leave
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneralLeaveApplication;
