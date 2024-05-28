"use client";

import { useSearchParams } from "next/navigation";

const ClientLoginWarning = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <div className="w-full text-black text-sm px-5 py-2.5 text-center">
          <p className="text-lg text-bold">{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default ClientLoginWarning;
