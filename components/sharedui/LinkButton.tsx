import { Ilinkbutton } from "@/types";
import Link from "next/link";

const LinkButton: React.FC<Ilinkbutton> = ({ icon, link, title }) => {
  return (
    <Link
      className="w-full rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl h-fit py-3 md:py-4 flex flex-col text-center justify-center bg-black items-center text-white"
      href={link}
    >
      {icon}
      <h3 className="text-2xl md:text-xl lg:text-[16px]">{title}</h3>
    </Link>
  );
};

export default LinkButton;
