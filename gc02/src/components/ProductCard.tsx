"use client";

import { ProductModel } from "@/app/db/models/products";
import Image from "next/image";
import Link from "next/link";
import { PiBookmarkSimpleThin } from "react-icons/pi";
import { PiBookmarkSimpleFill } from "react-icons/pi";

interface Props {
  product: ProductModel;
}

export default function ProductCard({ product }: Props) {
  const slugUri = `http://localhost:3000/products/${product.slug}`;
  const addToWishlistHandler = async () => {
    try {
      const data = {
        productId: product._id,
      };

      const response = await fetch(`http://localhost:3000/api/users/wishlist`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="block w-72 mb-20">
      <Link href={slugUri}>
        <Image
          alt=""
          src={product.thumbnail}
          className="w-72 object-cover sm:h-80 lg:h-96"
          style={{ height: "27rem" }}
        />
      </Link>
      <div className="grid grid-cols-12 mt-1">
        <div className="col-span-11">
          <h3 className="text-m font-extralight text-black text-wrap">
            {product.name}
          </h3>

          <p className="text-m font-extralight text-black">RP{product.price}</p>
        </div>
        <div className="text-black justify-self-end">
          <button onClick={addToWishlistHandler}>
            <PiBookmarkSimpleThin />
            {/* <PiBookmarkSimpleFill /> */}
          </button>
        </div>
      </div>
    </div>
  );
}
