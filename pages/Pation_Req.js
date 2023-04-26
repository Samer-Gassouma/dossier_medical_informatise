import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

function Pation_Req() {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")).cin);
    if (user === null) {
      router.push("/Login");
    }
  }, []);
 
  const handleSearch = (event) => {
    setMessage("Loading...");
    event.preventDefault();
    const encrypted_patientID = CryptoJS.AES.encrypt(searchQuery.toString(),"131993ce477e0753f7ba5d716c32c8cc565e917f87cc0b0fa3b9c4bf041a74a2" ).toString();
    const encrypted_user_id = CryptoJS.AES.encrypt(user.toString(), "131993ce477e0753f7ba5d716c32c8cc565e917f87cc0b0fa3b9c4bf041a74a2").toString();
  
    Cookies.set("patientID",searchQuery );
    Cookies.set("user_id", user);

    router.push({
      pathname: "/PatientRecord",
      query: { results: encrypted_patientID, tts: encrypted_user_id },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <Link href="/">
        <div className="fixed top-0 left-0 m-4 text-lg font-bold text-gray-400 hover:text-pink-500 transition-colors duration-300 ease-in-out">
          &lt; Back to Main Page
        </div>
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-white tracking-wide">
          SEARCH PATIENT RECORDS
        </h1>
        <p className="text-red-400 text-center">{message}</p>
        <form onSubmit={handleSearch} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Search by name, or ID"
            className="w-full max-w-md py-2 px-4 rounded-full shadow-lg border border-gray-600 bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button
            type="submit"
            className="mt-4 py-2 px-4 rounded-full bg-red-400  hover:bg-red-700  text-gray-100 shadow-lg"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pation_Req;
