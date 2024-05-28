import Image from "next/image";

export default function Details() {
  return (
    <div className="flex bg-white">
      <div className="grid grid-cols-12 pt-32 pb-20 justify-center w-full h-screen">
        <div className="col-span-8 grid grid-cols-8">
          <div className="flex col-span-4 justify-end items-end pr-20">
            <div className="border border-black border-1 w-3/5 h-2/5 py-8 px-6 text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              augue feugiat, feugiat sapien vitae, tempor lorem. Pellentesque
              molestie felis nulla, ut fringilla tellus condimentum viverra.
              Class aptent taciti sociosqu ad litora torquent per conubia
            </div>
          </div>
          <div className="flex col-span-4 justify-center items-end">
            <Image
              alt=""
              src="https://static.zara.net/assets/public/97c0/ccf4/fc494ba1ab5e/ba87dc29df79/04723619250-a6/04723619250-a6.jpg?ts=1714124808506&w=301"
              className="object-cover h-full w-screen/3"
              //   style={{ height: "45rem", width: "30rem" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center col-span-4">
          <div className="border border-1 border-black w-3/5 h-2/3 text-black flex flex-col">
            <div className="border-b border-1 border-black h-2/5 py-8 px-6">
              <p>LOREM IPSUM DOLOR SIR AMET</p>
              <p>RP12.345.678,90</p>
              <p className="mt-6">
                Pellentesque molestie felis nulla, ut fringilla tellus
                condimentum viverra.
              </p>
            </div>
            <div className="flex-grow flex flex-col items-end justify-end">
              <button className="w-full border-t border-black text-black hover:text-slate-400 focus:outline-none font-medium text-sm px-5 py-2.5 text-center">
                BUY
              </button>
            </div>
          </div>
          <div className="text-black text-sm mt-2">ADD TO WISHLIST</div>
        </div>
      </div>
    </div>
  );
}
