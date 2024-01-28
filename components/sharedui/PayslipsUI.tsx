"use client";

import { Ipayslip } from "@/types";
import { PayslipCard, ReturnBtn } from ".";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface PayslipsUIProps {
  getEmployeePayslips: (id: string | null | undefined) => any;
}

const PayslipsUI: React.FC<PayslipsUIProps> = ({ getEmployeePayslips }) => {
  const { data: session } = useSession();
  const id = session?.user?.email;
  const [payslips, setPayslips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayslip = async () => {
      try {
        const payslipData = await getEmployeePayslips(id);
        setPayslips(payslipData.singleEmployee.payslips);

        if (payslipData !== null) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayslip();
  }, [getEmployeePayslips, id]);

  return (
    <div className="w-full h-full flex flex-col p-2 md:p-3 justify-between lg:p-5">
      <header className=" w-full h-[5%] flex justify-start items-center px-1 lg:px-4 py-1 lg:py-3">
        <ReturnBtn />
      </header>

      {isLoading ? (
        <div className="h-[85%] flex justify-center items-center gap-3 lg:gap-5 w-full  p-1 md:p-4 lg:p-7 xl:p-9 lg:bg-neutral-500/60 rounded-xl">
          <h1 className=" text-white text-5xl">Loading...</h1>
        </div>
      ) : (
        <div className="h-[85%] overflow-auto gap-3 lg:gap-5 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-1 md:p-4 lg:p-7 xl:p-9 lg:bg-neutral-500/60 rounded-xl">
          {payslips?.map((card: Ipayslip) => (
            <PayslipCard
              drivelink={card.drivelink}
              forMonth={card.forMonth}
              key={card._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PayslipsUI;
