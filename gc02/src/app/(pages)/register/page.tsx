import RegisterButton from "@/components/RegisterButton";
import { redirect } from "next/navigation";

export default function Register() {
  const registerHandler = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const username = formData.get("username");

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        username,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return redirect("/register");
    }

    return redirect("/login");
  };

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center bg-white text-black">
        <div className="mt-10 h-2/3 w-10/12 bg-white justify-center grid grid-cols-12">
          <div className="col-span-4">
            <form className="max-w-m" action={registerHandler}>
              <div className="text-large mb-10">PERSONAL DETAILS</div>
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
              <div className="mb-8 border-b-2 border-gray-300">
                <input
                  type="text"
                  name="name"
                  className="text-gray-900 text-sm w-full py-1 bg-white focus:outline-none"
                  placeholder="NAME"
                  required
                />
              </div>
              <div className="mb-8 border-b-2 border-gray-300">
                <input
                  type="text"
                  name="username"
                  className="text-gray-900 text-sm w-full py-1 bg-white focus:outline-none"
                  placeholder="USERNAME"
                  required
                />
              </div>
              <RegisterButton />
            </form>
          </div>
          <div />
          <div className="col-span-4" />
          <div className="col-span-3" />
        </div>
      </div>
    </div>
  );
}
