import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "src/components/Dashboard";
import Menu from "src/components/Menu";
import { fetchAllTitles, fetchTotalizers } from "src/utils/restClient";
import { CardTotalizers, EnumScreens, TitleData } from "src/utils/types";
import { equalsEnum, getTotalCardComponentData, isUserAuth } from "src/utils/utils";

export default function Home() {
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.DASHBOARD);
    const [cardsData, setCardsData] = useState<CardTotalizers[]>();
    const [titleList, setTitleList] = useState<TitleData[]>();
    const router = useRouter();

    useEffect(() => {
        isUserAuth() ? fetchData() : router.push("/auth");
    }, []);

    function fetchData() {
        fetchTotalizers().then(res => {
            setCardsData(getTotalCardComponentData(res));
        }).catch(err => router.push("/auth"));

        fetchAllTitles().then(res => {
            setTitleList(res);
        }).catch(err => router.push("/auth"));
    }


    function changeView(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
    }

    return (
        cardsData != undefined && //bg-cyan-300 sm:bg-red-300 md:bg-yellow-300 lg:bg-purple-300 xl:bg-orange-300 2xl:bg-slate-300
        <div className="block md:flex">
            <div className="w-full md:w-54 lg:w-52 xl:w-64">
                <Menu changeFunction={changeView} />
            </div>
            {equalsEnum(selectedScreen, EnumScreens.DASHBOARD)
                && <Dashboard cardsData={cardsData!} titleListData={titleList!} />}
        </div>
    );
}