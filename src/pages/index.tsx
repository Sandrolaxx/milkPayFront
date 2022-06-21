import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "src/components/Dashboard";
import Menu from "src/components/Menu";
import { fetchTotalizers } from "src/utils/restClient";
import { CardTotalizers, EnumScreens } from "src/utils/types";
import { equalsEnum, getTotalCardComponentData, isNullOrEmpty, isValidToken } from "src/utils/utils";

export default function Home() {
    const router = useRouter();
    const [cardsData, setCardsData] = useState<CardTotalizers[]>();
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.DASHBOARD);

    useEffect(() => isAuthenticated(), []);

    function isAuthenticated() {
        const expiration = localStorage.getItem("expiration");
        const token = localStorage.getItem("token");
        const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

        if (!hasAuth
            || (hasAuth && !isValidToken(expiration!))) {
            router.push("/auth");
            return;
        }

        setAuth(true);
        
        fetchTotalizers().then(res => {
            setCardsData(getTotalCardComponentData(res));
            setLoading(false);
        }).catch(err => router.push("/auth"));

    }

    function changeView(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
    }

    return (
        isAuth && //bg-cyan-300 sm:bg-red-300 md:bg-yellow-300 lg:bg-purple-300 xl:bg-orange-300 2xl:bg-slate-300
        <div className="block md:flex">
            <div className="w-full md:w-54 lg:w-52 xl:w-64">
                <Menu changeFunction={changeView} />
            </div>
            {equalsEnum(selectedScreen, EnumScreens.DASHBOARD) && <Dashboard isLoading={isLoading} cardsData={cardsData!} />} 
        </div>
    );
}