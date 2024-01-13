import { Ilinkbutton } from "@/types";
import { MdOutlineGroups3 } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { GiMoneyStack } from "react-icons/gi";

export const admindashlinks: Ilinkbutton[] = [
  {
    title: "All Employees",
    icon: <MdOutlineGroups3 size={50} />,
    link: "/all",
  },
  {
    title: "Register Employee",
    icon: <IoIosPersonAdd size={50} />,
    link: "/new",
  },
  {
    title: "Pending Leave Applications",
    icon: <SlCalender size={50} />,
    link: "/leaves",
  },
  {
    title: "Payslips",
    icon: <GiMoneyStack size={50} />,
    link: "/payslips",
  },
];
