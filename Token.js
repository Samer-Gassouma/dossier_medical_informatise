import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MyComponent() {
  const [token, setToken] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(null);

  const setTokenInCookie = (token) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (30 * 1000));
    Cookies.set('token', token, { expires: expiryDate });
  };

  useEffect(() => {
    const retrievedToken = localStorage.getItem("token");
    if (retrievedToken) {
      setTokenInCookie(retrievedToken);
      setToken(retrievedToken);
    }
    const expiryDate = new Date();

    expiryDate.setTime(expiryDate.getTime() + (30 * 1000));

    const timeLeft = Math.floor((expiryDate - new Date()) / 1000);
    setSecondsLeft(timeLeft);

    const interval = setInterval(() => {
      const newTimeLeft = Math.floor((expiryDate - new Date()) / 1000);
      setSecondsLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  if (secondsLeft <= 0) {
    return Cookies.remove("token");
  }


}
