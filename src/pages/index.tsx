import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardTotal from "src/components/CardTotal";
import Menu from "src/components/Menu";
import RecivedTitlesIcon from "../assets/icons/chevrons-up.svg"
import AmountRecivedIcon from "../assets/icons/chevrons-down.svg"
import CalendarIcon from "../assets/icons/calendar.svg"
import TitlesToReceiveIcon from "../assets/icons/trending-up.svg"
import AmountReceiveToIcon from "../assets/icons/dollar-sign.svg"
import { isNullOrEmpty, isValidToken } from "src/utils/utils";
import { CartTotal } from "src/utils/types";

export default function Home() {
    const router = useRouter();
    let [isAuth, setAuth] = useState(false);
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

        setAuth(true);
    }

    return (
        isAuth &&
        <div className="flex">
            <Menu />
            <CardTotal element={teste} />
            <CardTotal element={teste2} />
            <CardTotal element={teste3} />
            <CardTotal element={teste4} />
        </div>
    );
}