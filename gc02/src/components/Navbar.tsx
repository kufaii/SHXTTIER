import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="">
      <div className="bg-transparent fixed w-full z-50 flex flex-wrap justify-between mx-auto py-5 grid grid-cols-12 transition-colors duration-300 hover:bg-white">
        <div></div>
        <Link
          href="/"
          className="pb-2 flex items-center space-x-3 rtl:space-x-reverse col-span-4"
        >
          <span className="self-center text-7xl font-bold whitespace-nowrap text-black">
            SHXTTIER
          </span>
        </Link>
        {/* yg bawah ini perlu edit lagi */}
        <div className="fixed z-50 ml-20">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full justify-self-end md:block md:w-auto mt-1 col-span-6"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-1">
            <li>
              <Link href="/" className="block py-2 px-3 text-black md:p-0">
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="block py-2 px-3 text-black md:p-0"
              >
                WISHLIST
              </Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 px-3 text-black md:p-0">
                LOGIN
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block py-2 px-3 text-black md:p-0"
              >
                REGISTER
              </Link>
            </li>
          </ul>
        </div>
        <div className=""></div>
      </div>
    </nav>
  );
}
