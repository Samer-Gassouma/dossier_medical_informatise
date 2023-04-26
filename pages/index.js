import LoginForm from "./Login";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Main from "./Main";
import Cookies from "js-cookie";
import Router from "next/router";
import Logout from "./Logout";

export default function Home() {
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {  
      if(token.expires < new Date()) {
        Cookies.remove("token");
        Router.push('/Logout');
      }
      setUser(token);
    }


    if (typeof window !== "undefined") {
      const user = sessionStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
    setLoading(false);
  }, []);

  
  
  const handleLogout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  if (loading) {
    return (
      <div className="flex items-center h-screen w-screen justify-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Logout />;
  }

  return (
    <>
    
      <Navbar user={user} handleLogout={handleLogout} />
      <Main />
    </>
  );
}
