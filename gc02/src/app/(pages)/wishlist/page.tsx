"use client";
import SelfCard from "@/components/SelfCard";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

interface Data {
  _id: ObjectId;
  product: [
    {
      _id: ObjectId;
      thumbnail: string;
      name: string;
      price: string;
    }
  ];
  userId: ObjectId;
  productId: ObjectId;
  createdAt: number;
  updatedAt: number;
}

export default function Wishlist() {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    const result = await fetch(`http://localhost:3000/api/users/wishlist`, {
      next: { tags: ["wishlist"] },
    });

    const dataJSON = await result.json();

    if (!result.ok) {
      return;
    }

    setData(dataJSON.data.wishlistList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex bg-white h-full w-full">
      <div className=" w-full h-screen mt-36">
        <div className="grid grid-cols-12 border-b border-gray-400 text-black h-10 w-full items-end">
          <p className="col-span-3 border-t border-r border-gray-400 pl-4 py-2 text-l text-center h-10">
            CART
          </p>
          <p className="col-span-3 border-t border-r border-gray-400 pl-4 py-2 text-l text-center h-10">
            WISHLIST
          </p>
          <div className="col-span-6" />
        </div>
        <div className="bg-white">
          <div className="flex flex-wrap flex-row pb-48">
            {data.map((el, i) => {
              return <SelfCard data={el} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
