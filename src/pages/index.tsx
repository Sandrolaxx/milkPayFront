import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu from "src/components/Menu";
import { isNullOrEmpty, isValidToken } from "src/utils/utils";

export default function Home() {
    const router = useRouter();
    let [isAuth, setAuth] = useState(false);

    useEffect(() => isAuthenticated());

    function isAuthenticated() {
        const expiration = localStorage.getItem("expiration");
        const token = localStorage.getItem("token");
        // const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

        // if (!hasAuth 
        //     || (hasAuth && !isValidToken(expiration!))) {
        //     router.push("/auth");
        // }

        setAuth(true);
    }

    return (
        isAuth && 
        <>
        <Menu />
        </>
    );
}