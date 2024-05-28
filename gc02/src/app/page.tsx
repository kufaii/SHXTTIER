import Card from "@/components/Card";
import Collection from "@/components/Collection";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ProductModel } from "./db/models/products";
import Image from "next/image";

const fetchData = async () => {
  const limit: number = 8;
  let result = await fetch(`http://localhost:3000/api/products?page=1&limit=8`);

  const dataJSON = await result.json();

  if (!result.ok) {
    return;
  }

  return dataJSON.products;
};

export default async function Home() {
  const data = (await fetchData()) as ProductModel[];
  return (
    <div>
      <div className="overflow-y-auto snap-y snap-mandatory h-screen">
        <section className="snap-center bg-[url(https://static.zara.net/assets/public/759a/fa78/e2004092a42d/a47ca082e734/image-landscape-fill-f12e083b-06ba-4b57-92fe-aba639da4643-default_0.jpg?ts=1714647425962&w=2880)] bg-cover bg-center bg-no-repeat">
          <div className="justify-end items-end lg:flex lg:h-screen">
            <div className="flex flex-col w-1/2 mb-10 items-end">
              <p className="mt-4 max-w-lg sm:text-xl/relaxed mr-5 text-right">
                100% LINEN OVERSHIRT
              </p>
              <Link
                href="/products/linen-overshirt"
                className="block w-1/4 text-center bg-white mt-3 mr-5 px-12 py-3 text-sm font-medium text-black hover:text-rose-700 focus:outline-none active:text-rose-500"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section className="snap-center bg-[url(https://static.zara.net/assets/public/c684/280c/2a0b4452827b/13ca7af77d0f/image-landscape-default-fill-47e2ba8e-2098-47e4-b54e-35f29d2393d5-default_0.jpg?ts=1714647660372&w=1920)] bg-cover bg-center bg-no-repeat">
          <div className="justify-end items-end lg:flex lg:h-screen">
            <div className="flex flex-col w-1/2 mb-10 items-end">
              <p className="mt-4 max-w-lg sm:text-xl/relaxed mr-5 text-right">
                COTTON-LINEN BERMUDA SHORTS
              </p>
              <Link
                href="/products/cotton-linen-bermuda-shorts"
                className="block w-1/4 text-center bg-white mt-3 mr-5 px-12 py-3 text-sm font-medium text-black hover:text-rose-700 focus:outline-none active:text-rose-500"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section className="snap-always snap-start bg-white bg-cover bg-center bg-no-repeat">
          <div className="flex flex-wrap gap-48 pt-24 pb-48">
            {data.map((el, i) => {
              return <ProductCard product={el} key={i} />;
            })}
            <Link
              href="/products"
              className="block py-2 px-3 text-black md:p-0"
            >
              SEE MORE
            </Link>
          </div>
        </section>
        <div className="snap-center bg-red-100 relative h-screen">
          {/* Flex container with text */}
          <div className="flex flex-col w-1/4 absolute top-0 right-0 justify-end items-end z-40 h-full">
            <p className="mt-4 max-w-lg sm:text-xl/relaxed mr-5 text-right">
              STRAIGHT-LEG COTTON - HEMP JEANS
            </p>
            <Link
              href="/products/straight-leg-cotton-hemp-jeans"
              className="block w-1/2 text-center bg-white mt-3 mr-5 mb-10 px-12 py-3 text-sm font-medium text-black hover:text-rose-700 focus:outline-none active:text-rose-500"
            >
              Learn More
            </Link>
          </div>

          {/* Image */}
          <Link
            href="/products/straight-leg-cotton-hemp-jeans"
            className="group block overflow-hidden relative z-30"
          >
            <Image
              src="https://static.zara.net/assets/public/d020/17c0/30b4461781e3/63ab5677868d/image-landscape-default-fill-7ae8de15-7b14-4f23-a0ca-eb9062ae434d-default_0.jpg?ts=1714647290707&w=2880"
              alt=""
              className="w-screen object-cover transition duration-500 group-hover:scale-105 h-screen"
            />
          </Link>
        </div>
        <footer className="snap-end bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
            <div className="lg:flex lg:items-end lg:justify-between">
              <div>
                <p className="mx-auto mt-6 max-w-md text-center text-4xl leading-relaxed text-black lg:text-left">
                  SHXTTIER
                </p>

                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                  Introducing our innovative mobile venture, where convenience
                  meets eco-consciousness. Our company seamlessly integrates
                  cutting-edge technology with sustainable practices, offering a
                  guilt-free solution for the modern, on-the-go consumer. Join
                  us in redefining mobility with a green twist.
                </p>
              </div>

              <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    Blog{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
      {/* <div className="snap-center bg-red-100">
        <a href="#" className="group block overflow-hidden">
          <img
            src="https://static.zara.net/assets/public/d020/17c0/30b4461781e3/63ab5677868d/image-landscape-default-fill-7ae8de15-7b14-4f23-a0ca-eb9062ae434d-default_0.jpg?ts=1714647290707&w=2880"
            alt=""
            className="object-contain transition duration-500 group-hover:scale-105"
          />
        </a>
      </div> */}
    </div>
  );
}
