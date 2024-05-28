"use client";

import { ProductModel } from "@/app/db/models/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PiControlThin } from "react-icons/pi";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function Products() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // const { search } = router.query;

  const [data, setData] = useState<ProductModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(search || "");

  const fetchData = async () => {
    const limit: number = 8;
    let result;

    if (searchQuery) {
      result = await fetch(
        `http://localhost:3000/api/products/search?name=${searchQuery}`
      );

      const dataJSON = await result.json();

      if (!result.ok) {
        return;
      }
      setData(dataJSON.products);
    } else {
      result = await fetch(
        `http://localhost:3000/api/products?page=${page}&limit=${limit}`
      );

      const dataJSON = await result.json();

      if (!result.ok) {
        return;
      }

      if (dataJSON.products.length > 0) {
        setData([...data, ...dataJSON.products]);
        setPage(page + 1);

        console.log("ini data total >>>>>>", data);

        if (dataJSON.products.length < limit) setHasMore(false);
      } else {
        setHasMore(false);
      }
    }
  };

  const searchHandler = () => {
    const queryParamString = searchQuery.toString();
    return redirect("/products?search=" + queryParamString);
    // const router = useRouter();
    // router.push(`/products?search=${searchQuery}`);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  {
    console.log(">>>>>>>", data);
  }
  return (
    <div className="bg-white h-full min-h-screen">
      <div className="grid grid-cols-12 pt-32 text-black w-full">
        <div className="" />
        <div className="col-span-2">
          <form onSubmit={searchHandler}>
            <div className="border-b-2 border-gray-300">
              <input
                type="text"
                value={searchQuery}
                onChange={changeHandler}
                className="text-gray-900 text-sm w-full py-1 bg-white focus:outline-none"
                placeholder="SEARCH PRODUCT"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="pt-10 pb-48 w-full min-w-fit">
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={
            <h4 className="text-black text-center font-extralight">
              Loading...
            </h4>
          }
          endMessage={
            <div className="text-black w-full">
              <PiControlThin />
            </div>
          }
        >
          <div className="grid grid-cols-4 justify-items-center px-72">
            {data.map((el, i) => {
              return <ProductCard product={el} key={i} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
