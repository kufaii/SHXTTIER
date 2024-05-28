"use client";

import { ObjectId } from "mongodb";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  data: {
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
  };
}
export default function SelfCard({ data }: Props) {
  const router = useRouter();
  const removeWishlistHandler = async () => {
    try {
      const input = {
        productId: data.product[0]._id,
      };

      const response = await fetch(`http://localhost:3000/api/users/wishlist`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        body: JSON.stringify(input), // body data type must match "Content-Type" header
      });
      router.refresh();
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/6 block border-b border-r border-gray-400">
      <Image
        alt=""
        src={data.product[0].thumbnail}
        className="object-cover w-full"
        style={{ height: "26rem" }}
      />
      <div className="ml-1 mt-1 mb-8 pl-2">
        <h3 className="text-m font-extralight text-black">
          {data.product[0].name}
        </h3>

        <p className="text-m font-extralight text-black">
          RP{data.product[0].price}
        </p>
      </div>
      <div className="border-t border-gray-400">
        <button
          className="mx-1 pl-2 text-m font-extralight text-black text-center py-3 w-full"
          onClick={removeWishlistHandler}
        >
          REMOVE FROM WISHLIST
        </button>
      </div>
    </div>
  );
}
