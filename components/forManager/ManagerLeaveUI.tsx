"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [leaveDays, setLeaveDays] = useState<number>(1);
  const [remainingDays, setRemainingDays] = useState<number>(21);

  const getLeaveBalance = async () => {
    const useremail = session?.user?.email;
    console.log(`The email object: ${useremail}`);

    try {
      const res = await fetch(`/api/getLeaveBalance/${useremail}`, {
        cache: "no-store",
      });
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

  const handleLeaveType = (e: ChangeEvent<HTMLSelectElement>) => {
    setLeaveType(e.target.value);
  };

  const handleApplication = async () => {
    const leaveLength = calculateDaysBetweenDates(date1, date2);

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
            leaveLength,
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
    <div className="flex items-center justify-center text-center flex-col h-full w-full bg-black text-white">
      <header className="w-full h-[5%] px-3 md:px-5 flex justify-start items-end py-1">
        <Link className=" text-white" href="/managerdash">
          Return
        </Link>
      </header>
      <div className="flex flex-col p-2 md:p-3 text-center items-center w-full h-[95%] sm:w-10/12 md:w-8/12 lg:w-6/12 bg-neutral-600/30 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl">
        <h3 className="text-xl font-semibold text-white mb-3">
          {session?.user?.name} leave application - {remainingDays} left
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
            {/* START DAY  */}

            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg text-black"
              value={startDay}
              name="fromDay"
              id="fromDay"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStartDay(e.target.value)
              }
            >
              <option className="" value="Default">
                Select...
              </option>
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
            {/* START MONTH  */}
            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg text-black"
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
          </div>
          <div className="w-full h-fit flex flex-col py-4 text-center gap-2 items-center">
            <h3 className=" text-2xl font-semibold mb-4">End date</h3>
            {/* UNTIL DAY  */}

            <select
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg text-black"
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
              className="w-1/2 px-2 py-3 rounded-md md:rounded-lg text-black"
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
