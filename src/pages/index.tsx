import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardTotal from "src/components/CardTotal";
import Menu from "src/components/Menu";
import CardTotalSkeleton from "src/components/skeleton/CardTotalSkeleton";
import Table from "src/components/Table";
import { CartTotal } from "src/utils/types";
import CalendarIcon from "../assets/icons/calendar.svg";
import AmountRecivedIcon from "../assets/icons/chevrons-down.svg";
import RecivedTitlesIcon from "../assets/icons/chevrons-up.svg";
import AmountReceiveToIcon from "../assets/icons/dollar-sign.svg";
import TitlesToReceiveIcon from "../assets/icons/trending-up.svg";

export default function Home() {
    const router = useRouter();
    let [isAuth, setAuth] = useState(false);
    let [isLoading, setLoading] = useState(true);
    const teste: CartTotal = {
        title: "Títulos Recebidos",
        subTitle: "Últimos 12 meses",
        value: 27,
        bigIcon: RecivedTitlesIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-dark-color"
    }
    const teste2: CartTotal = {
        title: "Valor Recebido",
        subTitle: "Últimos 12 meses",
        value: 330759.90,
        bigIcon: AmountRecivedIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-primary-color"
    }
    const teste3: CartTotal = {
        title: "Títulos a Receber",
        subTitle: "Próximos 30 dias",
        value: 14,
        bigIcon: TitlesToReceiveIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-dark-color"
    }
    const teste4: CartTotal = {
        title: "Valor  a Receber",
        subTitle: "Próximos 30 dias",
        value: 22319.82,
        bigIcon: AmountReceiveToIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-primary-color"
    }

    useEffect(() => isAuthenticated());

    function isAuthenticated() {
        const expiration = localStorage.getItem("expiration");
        const token = localStorage.getItem("token");
        // const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

        // if (!hasAuth 
        //     || (hasAuth && !isValidToken(expiration!))) {
        //     router.push("/auth");
        // }

        setTimeout(() => setLoading(false), 2000);

        setAuth(true);
    }

    return (
        isAuth && //bg-cyan-300 sm:bg-red-300 md:bg-yellow-300 lg:bg-purple-300 xl:bg-orange-300 2xl:bg-slate-300
        <div className="block md:flex">
            <div className="w-full md:w-54 lg:w-52 xl:w-64">
                <Menu />
            </div>
            <div className="w-full flex flex-col overflow-hidden md:pr-2">
                <div className={`w-full h-full mt-4 p-2 grid grid-flow-row grid-cols-1 
                    gap-y-8 gap-x-4 sm:grid-cols-2 md:pt-6 lg:flex lg:gap-0 lg:p-1`}>
                    {isLoading ?
                        <>
                            <CardTotalSkeleton />
                            <CardTotalSkeleton />
                            <CardTotalSkeleton />
                            <CardTotalSkeleton />
                        </>
                        :
                        <>
                            <CardTotal element={teste} />
                            <CardTotal element={teste2} />
                            <CardTotal element={teste3} />
                            <CardTotal element={teste4} />
                        </>
                    }
                </div>
                <Table />
                <Table />
            </div>
        </div>
    );
}