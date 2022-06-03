import MilkPayIcon from "../assets/icons/milkpay.svg";
import HomeIcon from "../assets/icons/home.svg";
import FileTextIcon from "../assets/icons/file-text.svg";
import Header from "./Header";

export default function Menu() {
    return (
        <>
            <Header />
            <div className="flex justify-center bg-[url('../assets/images/menu.png')] h-screen w-56 text-light-color">
                <nav className="w-full m-3 mt-8">
                    <div className="flex items-center">
                        <MilkPayIcon fill="#FFFFFF" width={56} height={56} name="Logo MilkPay" />
                        <h1 className="text-4xl">MilkPay</h1>
                    </div>
                    <hr className="rounded-sm mt-4 mb-4" />
                    <ul className="m-2">
                        <div className="flex mt-4">
                            <HomeIcon stroke="#FFFFFF" name="Logo MilkPay" />
                            <li className="text-xl ml-1">Painel Principal</li>
                        </div>
                        <div className="flex mt-4">
                            <FileTextIcon stroke="#FFFFFF" name="Logo MilkPay" />
                            <li className="text-xl ml-1">Consultas Títulos</li>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}