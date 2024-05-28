import { ProductModel } from "@/app/db/models/products";
import WishlistButton from "@/components/WishlistButton";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

interface Params {
  params: { slug: string };
}

interface Data {
  status: number;
  products: ProductModel;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await fetch(
    `http://localhost:3000/api/products/id?name=${params.slug}`
  ).then((res) => res.json());

  return {
    title: product.products.name,
    description: product.products.excerpt,
  };
}

export default async function Slug({ params }: Params) {
  const fetchSlugData = async () => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/products/id?name=${params.slug}`
      );

      const dataJSON = await result.json();

      if (!result.ok) {
        return;
      }
      return dataJSON;
    } catch (error) {
      console.log(error);
    }
  };
  const data = (await fetchSlugData()) as Data;

  return (
    <div className="flex bg-white">
      <div className="grid grid-cols-12 pt-32 pb-20 justify-center w-full h-screen">
        <div className="col-span-8 grid grid-cols-8">
          <div className="flex col-span-4 justify-end items-end pr-20">
            <div className="border border-black border-1 w-3/5 h-3/5 py-8 px-6 text-black">
              At SHXTTIER, our devotion to customer satisfaction and
              environmental welfare is unwaveringly impeccable. Through
              meticulous sourcing and conscientious production, we epitomize
              sartorial elegance with an air of discerning responsibility.
              Embrace the epitome of refined fashion while championing a
              planet-conscious ethos with us.
            </div>
          </div>
          <div className="flex col-span-4 justify-center items-end">
            <Image
              alt=""
              src={data.products.thumbnail}
              className="object-cover h-full w-screen/3"
              style={{ width: "30rem" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center col-span-4">
          <div className="border border-1 border-black w-3/5 h-2/3 text-black flex flex-col">
            <div className="border-b border-1 border-black h-3/5 py-8 px-6">
              <p>{data.products.name}</p>
              <p>RP{data.products.price}</p>
              <p className="mt-6">{data.products.description}</p>
            </div>
            <div className="flex-grow flex flex-col items-end justify-end">
              <button className="w-full border-t border-black text-black hover:text-slate-400 focus:outline-none font-medium text-sm px-5 py-2.5 text-center">
                BUY
              </button>
            </div>
          </div>
          <WishlistButton objectId={data.products._id} />
        </div>
      </div>
    </div>
  );
}
