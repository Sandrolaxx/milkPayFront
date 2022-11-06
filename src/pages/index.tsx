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
    const { userData, cardsData, titlesData } = useDataContext();
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
        userData.fetchUser();
        cardsData.fetchCardsData();
        titlesData.fetchRecivedTitlesData();
        titlesData.fetchTitlesToReciveData();

        if (userData.user && !userData.user.acceptTerms) {
            userData.changeView(EnumScreens.PROFILE);
        }

        setAuth(true);
    }

    return (
        isAuth &&
        <div className="w-full h-screen block md:flex">
            <Menu />
            {equalsEnum(userData.selectedScreen, EnumScreens.DASHBOARD)
                && <Dashboard dashboardData={dashboardData} />}
            {equalsEnum(userData.selectedScreen, EnumScreens.SEARCH_TITLE)
                && <Search />}
            {equalsEnum(userData.selectedScreen, EnumScreens.PROFILE)
                && <Profile />}
        </div>
    );
}