import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Login from "./Login";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("user");
            router.push("/");
            Cookies.remove("token");
        }
    }, [router]);
    return (
        <Login />
    );
    }