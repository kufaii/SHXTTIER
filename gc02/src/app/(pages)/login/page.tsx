import ClientLoginWarning from "@/components/ClientLoginWarning";
import LoginButton from "@/components/LoginButton";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  const loginHandler = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // console.log("ini response >>>>>>>>>", response);

    const result = await response.json();

    if (!response.ok) {
      return redirect("/login?error=" + result.message);
    }
    if (result.data.access_token) {
      cookies().set("Authorization", `Bearer ${result.data.access_token}`);
    }

    return redirect("/home");
  };

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center bg-white text-black">
        <div className="mt-10 h-2/3 w-10/12 bg-white justify-center grid grid-cols-12">
          <div className="col-span-4">
            <form className="max-w-m" action={loginHandler}>
              <div className="text-large mb-10">LOG IN TO YOUR ACCOUNT</div>

              <div className="mb-8 border-b-2 border-gray-300">
                <input
                  type="email"
                  name="email"
                  className="text-gray-900 text-sm w-full py-1 bg-white focus:outline-none"
                  placeholder="E-MAIL"
                  required
                />
              </div>
              <div className="mb-8 border-b-2 border-gray-300">
                <input
                  type="password"
                  name="password"
                  className="text-gray-900 text-sm w-full py-1 bg-white focus:outline-none"
                  placeholder="PASSWORD"
                  required
                />
              </div>
              <ClientLoginWarning />
              <LoginButton />
            </form>
          </div>
          <div></div>
          <div className="col-span-4">
            <div className="max-w-m">
              <div>DIDNT HAVE ACCOUNT YET?</div>
              <Link href="/register">
                <button className="w-full border border-black mt-9 text-black bg-white focus:outline-none font-medium text-sm px-5 py-2.5 text-center transition-colors duration-200 hover:bg-black hover:text-white">
                  REGISTER
                </button>
              </Link>
            </div>
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </div>
  );
}
