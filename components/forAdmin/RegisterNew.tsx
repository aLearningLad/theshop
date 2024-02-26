"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";
import Link from "next/link";
import { IoReturnUpBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const RegisterNew = () => {
  const router = useRouter();
  const dummyAuth = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passport, setPassport] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [moreInfo, setMoreInfo] = useState<string>("");
  const [leaveStatus, setLeaveStatus] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState(false);
  const [leaveDays, setLeaveDays] = useState<number>(0);
  const [remainingDays, setremainingDays] = useState<number>(21);

  const handleRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      password !== "" &&
      day !== "" &&
      month !== "" &&
      role !== ""
    ) {
      try {
        const res = await fetch("/api/register", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
            isApplied,
            leaveDays,
            remainingDays,
          }),
        });

        if (res.ok) {
          toast.success(`${name} has been successfully registered`);
          router.refresh();
          setName("");
          setSurname("");
          setEmail("");
          setPassword("");
          setPassport("");
          setRole("");
          setDay("");
          setMonth("");
          setMoreInfo("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please complete all the employee info fields");
    }
  };

  const { data: session } = useSession();

  const handleUnauthorizedUser = async () => {
    await signOut();
    toast.success("Signing out...");
    router.push("/");
  };

  return (
    <div className="h-full w-full">
      {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
        <div className=" flex flex-col w-full h-full items-center p-2">
          <header className="w-full flex justify-start px-3 items-end pb-2 h-[10%]">
            <Link href="/admindash">
              <IoReturnUpBackSharp size={50} />
            </Link>
          </header>
          <div className="w-full h-[90%] bg-white flex flex-col justify-center items-center lg:flex-row px-3 py-4 md:px-6 lg:px-10 gap-3 md:gap-5">
            {/* LEFT  */}
            <section className="h-fit py-4 md:py-6 lg:py-10 w-full flex flex-col items-center justify-center gap-3 md:gap-5 px-4 bg-cyan-600/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
              <input
                type="text"
                className="w-full h-fit text-white bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
                placeholder="Name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <input
                type="text"
                className="w-full h-fit text-white bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
                placeholder="Surname"
                value={surname}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSurname(e.target.value)
                }
              />
              <input
                type="email"
                className="w-full h-fit text-white bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
                placeholder="Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <input
                type="password"
                className="w-full h-fit text-white focus:text-black focus-within:bg-white bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <input
                type="text"
                className="w-full h-fit text-white bg-black py-4 md:py-8 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
                placeholder="ID/PASSPORT NO."
                value={passport}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassport(e.target.value)
                }
              />
            </section>

            {/* MIDDLE  */}

            <section className="w-full h-fit py-4 md:py-6 lg:py-10 px-3 md:px-5 flex justify-center items-center flex-col gap-6 bg-cyan-600/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
              <div className=" w-full flex flex-col gap-3 items-center text-center mb-5">
                <h3 className="text-2xl font-semibold mb-4">Role</h3>
                <select
                  className="py-2 px-3 rounded-md md:rounded-lg border-2 border-black"
                  name=""
                  id=""
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRole(e.target.value)
                  }
                  value={role}
                >
                  <option value="default">Select...</option>
                  <option value="General Worker">General Worker</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div className="w-full h-fit flex flex-col py-4 text-center gap-2">
                <h3 className=" text-2xl font-semibold mb-4">
                  Commencement date
                </h3>
                <input
                  type="text"
                  className="w-full h-fit text-white bg-black py-4 rounded-md md:rounded-lg px-3 placeholder:text-neutral-300 text-[16px]"
                  placeholder="Day, eg. 18"
                  value={day}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDay(e.target.value)
                  }
                />
                <select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setMonth(e.target.value)
                  }
                  name="month"
                  id="month"
                  className="py-2 px-3 rounded-md md:rounded-lg border-2 border-black"
                  value={month}
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
            </section>

            {/* RIGHT S */}

            <section className="w-full gap-3 md:gap-5 px-4 md:px-6 h-fit py-4 md:py-6 flex flex-col items-center text-center bg-cyan-600/20 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
              <textarea
                className="bg-black text-white text-[16px] md:text-[14px] w-full h-[55vh] p-3 md:p-5 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl"
                value={moreInfo}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setMoreInfo(e.target.value)
                }
                placeholder="Notes on this employee..."
              />
              <button
                onClick={handleRegister}
                className="w-full text-white text-xl lg:text-2xl hover:scale-90 transition duration-500 ease-in-out active:bg-black h-[10vh] lg:h-[20vh] bg-pink-600/40 hover:bg-pink-600 rounded-md md:rounded-lg lg:rounded-xl"
              >
                Register Employee
              </button>
            </section>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-5 sm:gap-7 md:gap-10 lg:gap-14">
          <h3 className=" text-center text-2xl">
            {"You're"} not authorized to be here, {session?.user?.name}
          </h3>
          <button
            className="text-lg active:bg-white/60 bg-white rounded-md md:rounded-lg text-black w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-fit xl:px-9 py-3 md:py-5"
            onClick={handleUnauthorizedUser}
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterNew;
