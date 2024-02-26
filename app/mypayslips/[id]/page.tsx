import { PayslipsUI } from "@/components/sharedui";

const MyPayslips = () => {
  const getEmployeePayslips = async (id: string | null | undefined) => {
    "use server";
    try {
      const res = await fetch(`/api/viaemail/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.log(`The response is not ok. Check code`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-black">
      <PayslipsUI getEmployeePayslips={getEmployeePayslips} />
    </div>
  );
};

export default MyPayslips;
