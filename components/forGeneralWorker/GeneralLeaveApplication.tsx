"use client";

import { ChangeEvent, useState, useEffect, MouseEventHandler } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import getLeaveBalance from "@/utils/getLeaveBalance";
import { LBModal } from "../sharedui";

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
  const [leaveDays, setLeaveDays] = useState<number>(1);
  const [balanceModal, setBalanceModal] = useState<boolean>(true);
  const [remainingDays, setRemainingDays] = useState<number>(21);

  const getLeaveBalance = async () => {
    const useremail = session?.user?.email;
    console.log(`The email object: ${useremail}`);

    try {
      const res = await fetch(
        `http://localhost:3000/api/getLeaveBalance/${useremail}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Something went wrong. Error status: ${res.status}`);
      }

      const data = await res.json();
      const currentEmployee = data.currentEmployee;
      console.log(currentEmployee);
      return currentEmployee;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const date1 = startDay + startMonth + "2024";
  const date2 = untilDay + untilMonth + "2024";

  const calculateDaysBetweenDates = (date1: string, date2: string) => {
    //CHOP UP DATE INTO dd-mm-yyyy
    const formattedDate1 = `${date1.slice(4)}-${date1.slice(
      2,
      4
    )}-${date1.slice(0, 2)}`;
    const formattedDate2 = `${date2.slice(4)}-${date2.slice(
      2,
      4
    )}-${date2.slice(0, 2)}`;

    const firstDate = new Date(formattedDate1);
    const secondDate = new Date(formattedDate2);

    // DIFFERENCE IN ms
    const timeDifference = secondDate.getTime() - firstDate.getTime();

    // I CAN CHANGE ms to DAYS ===> VERIFY MATH FORUMLA FOR SECONDS TO DAYS!!
    const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));

    const leaveLength = Math.abs(daysDifference);
    console.log(typeof leaveLength);
    setLeaveDays(leaveLength);
    return leaveLength;
  };

  const handleApplication = async () => {
    const leaveLength = calculateDaysBetweenDates(date1, date2);

    if (session) {
      if (
        name !== "" &&
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
          const res = await fetch("/api/applyforleave", {
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
              // leaveDays: leaveLength,
              leaveLength,
            }),
          });

          console.log(`days of leave is: ${leaveLength}`);
          console.log(`Leave starts on ${date1} and ends on ${date2}`);

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
    } else {
      toast.error("You're not signed in!");
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employee = await getLeaveBalance();
        setRemainingDays(employee.remainingDays);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [getLeaveBalance]);

  const employee = getLeaveBalance();

  return (
    <div className="h-full flex w-full flex-col p-2 md:p-5 items-center relative">
      <header className="w-full h-[10%] flex justify-between px-3 lg:px-5 py-2">
        {balanceModal && (
          <LBModal
            remainingDays={remainingDays}
            setBalanceModal={setBalanceModal}
          />
        )}
        <Link
          className="text-lg xl:text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
          href="/generalprofile"
        >
          Return
        </Link>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setBalanceModal((prev) => !prev)
          }
          className="text-lg xl:text-2xl flex justify-center px-3 md:px-5 rounded-md md:rounded-lg active:bg-white/70 duration-500 ease-in-out transition items-center h-full bg-white lg:text-lg text-black"
        >
          View leave balance
        </button>
      </header>
      <div className="w-full  sm:w-10/12 md:w-8/12 lg:w-6/12 h-[85%] p-2 md:p-5 flex flex-col items-center text-center bg-neutral-200/10 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
        <h3 className="w-fit text-white px-4 border-b-2 border-white">
          {name}
        </h3>
        {/* FROM  */}
        <div className=" w-full flex flex-col gap-2 text-start mt-3 md:mt-7 lg:mt-10">
          <label className=" text-white text-xl  font-semibold" htmlFor="">
            From
          </label>
          <span className=" w-full flex items-center gap-4 justify-center">
            {/* SELECT DAY  */}
            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg"
              value={startDay}
              name="fromDay"
              id="fromDay"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStartDay(e.target.value)
              }
            >
              <option value="Default">Select...</option>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option
                className={startMonth === "02" ? "hidden" : "flex"}
                value="29"
              >
                29
              </option>
              <option
                className={startMonth === "02" ? "hidden" : "flex"}
                value="30"
              >
                30
              </option>
              <option
                className={` ${
                  startMonth === "11" ||
                  startMonth === "04" ||
                  startMonth === "06" ||
                  startMonth === "09"
                    ? "hidden"
                    : "flex"
                }  ${startMonth === "02" && "hidden"} `}
                value="31"
              >
                31
              </option>
            </select>
            {/* SELECT MONTH  */}
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
              <option value="01">1. Jan</option>
              <option
                className={` ${
                  startDay === "29" ||
                  startDay === "30" ||
                  (startDay === "31" && "hidden")
                }  `}
                value="02"
              >
                2. Feb
              </option>
              <option value="03">3. Mar</option>
              <option
                className={` ${startDay === "31" ? "hidden" : "flex"} `}
                value="04"
              >
                4. Apr
              </option>
              <option value="05">5. May</option>
              <option
                className={` ${startDay === "31" ? "hidden" : "flex"} `}
                value="06"
              >
                6. Jun
              </option>
              <option value="07">7. Jul</option>
              <option value="08">8. Aug</option>
              <option
                className={` ${startDay === "31" ? "hidden" : "flex"} `}
                value="09"
              >
                9. Sep
              </option>
              <option value="10">10. Oct</option>
              <option
                className={` ${startDay === "31" ? "hidden" : "flex"} `}
                value="11"
              >
                11. Nov
              </option>
              <option value="12">12. Dec</option>
            </select>
          </span>
        </div>

        {/* UNTIL  */}
        <div className=" w-full flex flex-col gap-2 text-start mt-3 md:mt-7 lg:mt-10">
          <label className=" text-white text-xl  font-semibold" htmlFor="">
            Until
          </label>
          <span className=" w-full flex items-center gap-4 justify-center">
            {/* UNTIL DAY  */}
            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg"
              value={untilDay}
              name="untilDay"
              id="untilDay"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setUntilDay(e.target.value)
              }
            >
              <option value="Default">Select...</option>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option
                className={startMonth === "02" ? "hidden" : "flex"}
                value="29"
              >
                29
              </option>
              <option
                className={startMonth === "02" ? "hidden" : "flex"}
                value="30"
              >
                30
              </option>
              <option
                className={` ${
                  untilMonth === "11" ||
                  untilMonth === "04" ||
                  untilMonth === "06" ||
                  untilMonth === "09"
                    ? "hidden"
                    : "flex"
                }  ${untilMonth === "02" && "hidden"} ${
                  untilMonth === "04" ||
                  untilMonth === "06" ||
                  untilMonth === "09" ||
                  untilMonth === "11"
                    ? "hidden"
                    : "flex"
                } `}
                value="31"
              >
                31
              </option>
            </select>

            {/* UNTIL MONTH  */}
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
              <option value="01">1. Jan</option>
              <option
                className={` ${
                  untilDay === "29" || untilDay === "30" || untilDay === "31"
                    ? "hidden"
                    : "flex"
                }`}
                value="02"
              >
                2. Feb
              </option>
              <option value="03">3. Mar</option>
              <option
                className={` ${untilDay === "31" ? "hidden" : "flex"} `}
                value="04"
              >
                4. Apr
              </option>
              <option value="05">5. May</option>
              <option
                className={` ${untilDay === "31" ? "hidden" : "flex"} `}
                value="06"
              >
                6. Jun
              </option>
              <option value="07">7. Jul</option>
              <option value="08">8. Aug</option>
              <option
                className={` ${untilDay === "31" ? "hidden" : "flex"} `}
                value="09"
              >
                9. Sep
              </option>
              <option value="10">10. Oct</option>
              <option
                className={` ${untilDay === "31" ? "hidden" : "flex"} `}
                value="11"
              >
                11. Nov
              </option>
              <option value="12">12. Dec</option>
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
