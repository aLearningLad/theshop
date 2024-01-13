import { Imanagerdashlinks } from "@/types";
import { GrUser } from "react-icons/gr";
import { MdGroups } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

export const managerdashlinks: Imanagerdashlinks[] = [
  {
    img: <MdGroups size={50} />,
    title: "View team",
    uniqueLink: "/managerseeworkers",
  },
  {
    img: <FaLayerGroup size={50} />,
    title: "Pending leave requests",
    uniqueLink: "/managersapproveleave",
  },
  {
    img: <SlCalender size={50} />,
    title: "Manager's leave",
    uniqueLink: "/managerapplyforleave",
  },
];
