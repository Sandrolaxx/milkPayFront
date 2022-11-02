import { useRouter } from "next/router";
import { useState } from "react";
import { EnumScreens, MenuProps } from "src/utils/types";
import { equalsEnum } from "src/utils/utils";
import CloseIcon from "../assets/icons/close.svg";
import FileTextIcon from "../assets/icons/file-text.svg";
import HomeIcon from "../assets/icons/home.svg";
import LogoutIcon from "../assets/icons/log-out.svg";
import MenuIcon from "../assets/icons/menu.svg";
import MilkPayIcon from "../assets/icons/milkpay.svg";
import UserIcon from "../assets/icons/user.svg";
import Header from "./Header";

export default function Menu({ changeFunction }: MenuProps) {
    const [selectedScreen, setSelectedScreen] = useState(EnumScreens.DASHBOARD);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const route = useRouter();

    function handleExit() {
        localStorage.removeItem("token");

        route.push("/auth");
    }

    function handleSelect(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
        changeFunction(selectedScreen);
    }

    function handleSelectMenu(selectedScreen: EnumScreens) {
        setSelectedScreen(selectedScreen);
        changeFunction(selectedScreen);

        setShowMenuMobile(!showMenuMobile);
    }

    return (
        <div className="w-full md:w-52 lg:w-48 xl:w-56 xl:mr-3 md:animate-fade-left">
            <Header />
            <div className={`hidden flex-col md:fixed md:flex bg-cover bg-[url('../assets/images/menu.png')] 
                h-screen text-light-color`}>
                <nav>
                    <div className="flex items-center m-2 mt-6 mb-6 animate-fade-in-slow">
                        <MilkPayIcon fill="#FAF9F9" width={42} height={42} name="Logo MilkPay" />
                        <h1 className="text-2xl font-medium xl:text-3xl">MilkPay</h1>
                    </div>
                    <hr className="rounded-sm m-4 animate-fade-in-slow" />
                    <nav className="w-full animate-fade-in-fast">
                        <button className={`flex w-full items-center p-4 rounded-lg 
                            ${equalsEnum(selectedScreen, EnumScreens.DASHBOARD) ?
                                'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelect(EnumScreens.DASHBOARD)}>
                            <HomeIcon stroke="#FAF9F9" width={24} height={24} name="Painel Principal" />
                            <p className="ml-2 text-sm xl:text-xl">Painel Principal</p>
                        </button>
                        <button className={`flex w-full p-4 items-center rounded-xl 
                            ${equalsEnum(selectedScreen, EnumScreens.SEARCH_TITLE) ?
                                'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelect(EnumScreens.SEARCH_TITLE)}>
                            <FileTextIcon stroke="#FAF9F9" width={24} height={24} name="Consulta Título" />
                            <p className="ml-2 text-sm xl:text-xl">Consulta Título</p>
                        </button>
                        <button className={`flex w-full p-4 items-center rounded-xl 
                            ${equalsEnum(selectedScreen, EnumScreens.PROFILE) ?
                                'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelect(EnumScreens.PROFILE)}>
                            <UserIcon stroke="#FAF9F9" width={24} height={24} name="Perfil" />
                            <p className="ml-2 text-sm xl:text-xl">Perfil</p>
                        </button>
                    </nav>
                </nav>
                <button onClick={handleExit} className={`flex w-full mt-auto p-4 rounded-lg hover:opacity-60
                    animate-fade-in-slow`}>
                    <LogoutIcon transform="rotate(180)" stroke="#FAF9F9" width={24} height={24} name="Sair" />
                    <p className="text-xl ml-1">Sair</p>
                </button>
            </div>
            <div className="w-full fixed top-0 flex py-2 h-16 animate-fade-down md:hidden bg-light-color">
                <div className="w-full ml-14 flex justify-center">
                    <MilkPayIcon fill="#212121" width={48} height={52} name="Logo MilkPay" />
                </div>
                {showMenuMobile ?
                    <button onClick={() => setShowMenuMobile(!showMenuMobile)} className="flex items-center mx-4">
                        <CloseIcon fill="#212121" width={24} height={24} name="Menu" />
                    </button>
                    :
                    <button onClick={() => setShowMenuMobile(!showMenuMobile)} className="flex items-center mx-4">
                        <MenuIcon fill="#212121" width={24} height={24} name="Menu-Close" />
                    </button>
                }
            </div>
            {showMenuMobile &&
                <div className="fixed z-10 inset-0 mt-16 flex flex-col bg-light-color animate-fade-left md:hidden">
                    <nav className="w-full h-full flex flex-col justify-center">
                        <button className={`flex w-full justify-center items-center p-4 rounded-lg 
                            ${equalsEnum(selectedScreen, EnumScreens.DASHBOARD) ?
                                'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelectMenu(EnumScreens.DASHBOARD)}>
                            <HomeIcon stroke={equalsEnum(selectedScreen, EnumScreens.DASHBOARD) ? "#FAF9F9" : "#01ACE2"}
                                width={24} height={24} name="Painel Principal" />
                            <p className={`ml-2 text-lg ${equalsEnum(selectedScreen, EnumScreens.DASHBOARD) && "text-white"}`}>
                                Painel Principal
                            </p>
                        </button>
                        <button className={`flex w-full p-4 justify-center items-center rounded-xl 
                            ${equalsEnum(selectedScreen, EnumScreens.SEARCH_TITLE) ?
                                'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelectMenu(EnumScreens.SEARCH_TITLE)}>
                            <FileTextIcon stroke={equalsEnum(selectedScreen, EnumScreens.SEARCH_TITLE) ? "#FAF9F9" : "#01ACE2"}
                                width={24} height={24} name="Consulta Título" />
                            <p className={`ml-2 text-lg ${equalsEnum(selectedScreen, EnumScreens.SEARCH_TITLE) && "text-white"}`}>
                                Consulta Título
                            </p>
                        </button>
                        <button className={`flex w-full p-4 justify-center items-center rounded-xl 
                            ${equalsEnum(selectedScreen, EnumScreens.PROFILE) ?
                                'bg-primary-color animate-fade-in-fast' : 'bg-none hover:opacity-60'}`}
                            onClick={() => handleSelectMenu(EnumScreens.PROFILE)}>
                            <UserIcon stroke={equalsEnum(selectedScreen, EnumScreens.PROFILE) ? "#FAF9F9" : "#01ACE2"}
                                width={24} height={24} name="Perfil" />
                            <p className={`ml-2 text-lg ${equalsEnum(selectedScreen, EnumScreens.PROFILE) && "text-white"}`}>
                                Perfil
                            </p>
                        </button>
                    </nav>
                </div>
            }
        </div>
    )
}