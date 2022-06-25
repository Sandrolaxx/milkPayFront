import { useRouter } from "next/router";
import { useState } from "react";
import { EnumScreens, MenuProps } from "src/utils/types";
import { equalsEnum } from "src/utils/utils";
import FileTextIcon from "../assets/icons/file-text.svg";
import HomeIcon from "../assets/icons/home.svg";
import LogoutIcon from "../assets/icons/log-out.svg";
import MilkPayIcon from "../assets/icons/milkpay.svg";
import Header from "./Header";

export default function Menu({ changeFunction }: MenuProps) {
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.DASHBOARD);
    const route = useRouter();

    function handleExit() {
        localStorage.removeItem("token");

        route.push("/auth");
    }

    function handleSelect(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
        changeFunction(selectedScreen);
    }

    return (
        <div className="animate-fade-down md:animate-fade-left">
            <Header />
            <div className="hidden flex-col md:fixed md:flex bg-[url('../assets/images/menu.png')] h-screen text-light-color">
                <nav>
                    <div className="flex items-center m-2 mt-6 mb-6 animate-fade-in-slow">
                        <MilkPayIcon fill="#F1F1F1" width={42} height={42} name="Logo MilkPay" />
                        <h1 className="text-2xl font-medium xl:text-3xl">MilkPay</h1>
                    </div>
                    <hr className="rounded-sm m-4 animate-fade-in-slow" />
                    <ul className="w-full animate-fade-in-fast">
                        <button className={`flex w-full items-center p-4 rounded-lg ${equalsEnum(selectedScreen, EnumScreens.DASHBOARD) ?
                            'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelect(EnumScreens.DASHBOARD)}>
                            <HomeIcon stroke="#F1F1F1" name="Painel Principal" />
                            <li className="ml-1 text-sm xl:text-xl">Painel Principal</li>
                        </button>
                        <button className={`flex w-full p-4 items-center rounded-xl ${equalsEnum(selectedScreen, EnumScreens.SEARCH_TITLE) ?
                            'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelect(EnumScreens.SEARCH_TITLE)}>
                            <FileTextIcon stroke="#F1F1F1" name="Consultas Títulos" />
                            <li className="ml-1 text-sm xl:text-xl">Consultas Títulos</li>
                        </button>
                    </ul>
                </nav>
                <button onClick={handleExit} className="flex w-full mt-auto p-4 rounded-lg animate-fade-in-slow hover:opacity-60">
                    <LogoutIcon transform="rotate(180)" stroke="#F1F1F1" width={24} height={24} name="Sair" />
                    <p className="text-xl ml-1">Sair</p>
                </button>
            </div>
            <div className="flex min-w-full p-2 justify-center h-16 md:hidden bg-light-color">
                <MilkPayIcon fill="#212121" width={54} height={54} name="Logo MilkPay" />
            </div>
        </div>
    )
}