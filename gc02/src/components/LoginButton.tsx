"use client";
import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button className="transition-colors duration-200 bg-slate-100 w-full border border-black mt-9 text-black focus:outline-none font-medium text-sm px-5 py-2.5 text-center">
          LOADING ...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full border border-black mt-9 text-black bg-white focus:outline-none font-medium text-sm px-5 py-2.5 text-center transition-colors duration-200 hover:bg-black hover:text-white"
        >
          LOGIN
        </button>
      )}
    </>
  );
}
