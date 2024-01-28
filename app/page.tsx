import { LinkButton } from "@/components/sharedui";
import { homelinks } from "@/data/homelinks";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex px-3 py-8 sm:px-4 md:px-10 md:py-6 lg:px-20 lg:py-6 h-screen flex-col items-center justify-center bg-black text-white">
      <div className=" w-full flex justify-center items-center py-2">
        <Image
          alt="shop-logo"
          src="/assets/logo.png"
          width={70}
          height={80}
          className=" overflow-clip rounded-md md:rounded-lg"
        />
      </div>
      <div className="w-full h-full sm:w-10/12 md:w-8/12 lg:w-6/12 rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl gap-5 md:gap-9 lg:gap-12 xl:gap-14 bg-white flex flex-col items-center justify-center text-center p-2 md:p-3 lg:px-5">
        {homelinks.map((item) => (
          <LinkButton
            icon={item.img}
            link={item.uniquelink}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
    </main>
  );
}
