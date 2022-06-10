import MilkPayIcon from "../assets/icons/milkpay.svg";
import HomeIcon from "../assets/icons/home.svg";
import FileTextIcon from "../assets/icons/file-text.svg";
import LogoutIcon from "../assets/icons/log-out.svg";
import Header from "./Header";
import { useState } from "react";

export default function Menu() {
    const [selected, setSelected] = useState(true);

    return (
        <div className="min-w-max">
            <Header />
            <div className="hidden md:flex flex-col bg-[url('../assets/images/menu.png')] h-screen text-light-color">
                <nav>
                    <div className="flex items-center m-2 mt-6 mb-6">
                        <MilkPayIcon fill="#F1F1F1" width={42} height={42} name="Logo MilkPay" />
                        <h1 className="text-2xl font-medium xl:text-3xl">MilkPay</h1>
                    </div>
                    <hr className="rounded-sm m-4" />
                    <ul className="w-full">
                        <button className={`flex w-full p-4 rounded-lg ${selected ? 'bg-primary-color' : 'bg-none hover:opacity-60'}`}
                            onClick={() => setSelected(!selected)}>
                            <HomeIcon stroke="#F1F1F1" name="Painel Principal" />
                            <li className="ml-1 text-sm xl:text-xl">Painel Principal</li>
                        </button>
                        <button className={`flex w-full p-4 rounded-xl ${!selected ? 'bg-primary-color' : 'bg-none hover:opacity-60'}`}
                            onClick={() => setSelected(!selected)}>
                            <FileTextIcon stroke="#F1F1F1" name="Consultas Títulos" />
                            <li className="ml-1 text-sm xl:text-xl">Consultas Títulos</li>
                        </button>
                    </ul>
                </nav>
                <button className="flex w-full mt-auto p-4 rounded-lg hover:opacity-60">
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