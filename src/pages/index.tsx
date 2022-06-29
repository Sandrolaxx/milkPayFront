import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "src/components/Dashboard";
import Menu from "src/components/Menu";
import { useDataContext } from "src/context/data";
import { EnumScreens } from "src/utils/types";
import { equalsEnum, isUserAuth } from "src/utils/utils";

export default function Home() {
    const router = useRouter();
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.DASHBOARD);
    const { cardsData, titlesData } = useDataContext();
    const dashboardData = {
        cardsData: cardsData.cardsData!,
        receivedTitles: titlesData.receivedTitles!, 
        titlesToReceive: titlesData.titlesToReceive!
    }

    useEffect(() => {
        isUserAuth() ? fetchData() : router.push("/auth");
    }, []);

    function fetchData() {
        cardsData.fetchCardsData();
        titlesData.fetchRecivedTitlesData();
        titlesData.fetchTitlesToReciveData();
    }

    function changeView(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
    }

    return (
        cardsData && //bg-cyan-300 sm:bg-red-300 md:bg-yellow-300 lg:bg-purple-300 xl:bg-orange-300 2xl:bg-slate-300
        <div className="block md:flex">
            <div className="w-full md:w-54 lg:w-52 xl:w-64">
                <Menu changeFunction={changeView} />
            </div>
            {equalsEnum(selectedScreen, EnumScreens.DASHBOARD)
                && <Dashboard dashboardData={dashboardData} />}
        </div>
    );
}