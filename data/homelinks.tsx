import { Ihomelinks } from "@/types";
import { RiAdminFill } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import { SiCodechef } from "react-icons/si";

export const homelinks: Ihomelinks[] = [
  {
    title: "Admin",
    img: <RiAdminFill size={50} />,
    uniquelink: "/adminlogin",
    id: 3878278,
  },
  {
    title: "Manager",
    img: <GrUserManager size={50} />,
    uniquelink: "/managerlogin",
    id: 8732832,
  },
  {
    title: "General Worker",
    img: <SiCodechef size={50} />,
    uniquelink: "/generalsignin",
    id: 9012824,
  },
];
