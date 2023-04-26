import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="text-white text-2xl font-bold">DMI</div>
            </Link>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                      className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Link href="/">
              <div className="hover:bg-gray-700 hover:text-white rounded-md py-2 px-3 text-gray-300 text-sm font-medium">
                Home
              </div>
            </Link>
            <Link href="/Add_Pation">
              <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Add Pation
              </div>
            </Link>
            <Link href="/Pation_Req">
              <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Pation  Request
              </div>
            </Link>
            {user ? (
              <>
                <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {user.fname + " " + user.lname}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link href="/Logout">
                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-s-md hover:bg-blue-700">
                      Logout
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href="/Login">
                  <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-s-md hover:bg-blue-700">
                    Login
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </div>
          </Link>
          <Link href="/Add_Pation">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Add Pation
            </div>
          </Link>
          <Link href="/Pation_Req">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Pation  Request
            </div>
          </Link>
          <Link href="/Login">
            <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-s-md hover:bg-blue-700">
              {user ? "Logout" : "Login"}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
