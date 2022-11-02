import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "src/components/Dashboard";
import Menu from "src/components/Menu";
import Profile from "src/components/Profile";
import Search from "src/components/Search";
import { useDataContext } from "src/context/data";
import { EnumScreens } from "src/utils/types";
import { equalsEnum, isUserAuth } from "src/utils/utils";

export default function Home() {
    const router = useRouter();
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.DASHBOARD);
    const { cardsData, titlesData } = useDataContext();
    const [isAuth, setAuth] = useState(false);
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

        setAuth(true);
    }

    function changeView(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
    }

    return (
        isAuth &&
        <div className="block md:flex">
            <Menu changeFunction={changeView} />
            {equalsEnum(selectedScreen, EnumScreens.DASHBOARD)
                && <Dashboard dashboardData={dashboardData} />}
            {equalsEnum(selectedScreen, EnumScreens.SEARCH_TITLE)
                && <Search />}
            {equalsEnum(selectedScreen, EnumScreens.PROFILE)
                && <Profile />}
        </div>
    );
}