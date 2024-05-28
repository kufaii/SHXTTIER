import Image from "next/image";
import { PiBookmarkSimpleThin } from "react-icons/pi";
import { PiBookmarkSimpleFill } from "react-icons/pi";

export default function Card() {
  return (
    <a href="#" className="block">
      <Image
        alt=""
        src="https://static.zara.net/assets/public/97c0/ccf4/fc494ba1ab5e/ba87dc29df79/04723619250-a6/04723619250-a6.jpg?ts=1714124808506&w=301"
        className="w-72 object-cover sm:h-80 lg:h-96"
        style={{ height: "27rem" }}
      />
      <div className="grid grid-cols-12 mt-1">
        <div className="col-span-11">
          <h3 className="text-m font-extralight text-black">
            LOREM IPSUM DOLOR SIR AMET
          </h3>

          <p className="text-m font-extralight text-black">RP12.345.678,90</p>
        </div>
        <div className="text-black justify-self-end">
          {/* <PiBookmarkSimpleThin /> */}
          <PiBookmarkSimpleFill />
        </div>
      </div>
    </a>
  );
}
