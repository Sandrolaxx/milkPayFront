import { useRouter } from "next/router";
import { useEffect } from "react";
import { isNullOrEmpty, isValidToken } from "src/utils/utils";

export default function Home() {
    const router = useRouter();

    useEffect(() => isAuthenticated());

    function isAuthenticated() {
        const expiration = localStorage.getItem("expiration");
        const token = localStorage.getItem("token");
        const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

        if (!hasAuth 
            || (hasAuth && !isValidToken(expiration!))) {
            router.push("/auth");
        }
    }

    return (
        <>
            <h1>Dashbord</h1>
        </>
    );
}