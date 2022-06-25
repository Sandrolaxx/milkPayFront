import { UpdateOptions } from "react-toastify";
import CalendarIcon from "../assets/icons/calendar.svg";
import AmountRecivedIcon from "../assets/icons/chevrons-down.svg";
import RecivedTitlesIcon from "../assets/icons/chevrons-up.svg";
import AmountReceiveToIcon from "../assets/icons/dollar-sign.svg";
import TitlesToReceiveIcon from "../assets/icons/trending-up.svg";
import { CardTotalizers, Totalizers } from "./types";

const expirationTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRATION_TIME;

export function isNullOrEmpty(str: any): boolean {
    return str == null || str == undefined || str.trim() == "";
}

export function equalsEnum(firstEnum: any, secondEnum: any) {
    return firstEnum == secondEnum;
}

export function getBearerToken(token: string) {
    return "Bearer ".concat(token);
}

export function getBasicToken(token: string) {
    return "Basic ".concat(token);
}

export function getToastError(msg: string): UpdateOptions {
    return {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true
    };
}

export function getToastSuccess(msg: string): UpdateOptions {
    return {
        render: msg,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true
    };
}

export function getTokenExpirationDate() {
    return (new Date().getTime() + (expirationTime * 1000)).toString();
}

export function isValidToken(expiration: string) {
    return Number.parseInt(expiration) > new Date().getTime();
}

export function formatDateStrToDDMMYYYY(date: string): string {
    const DD = date.slice(8, 10);
    const MM = date.slice(5, 7);
    const YYYY = date.slice(0, 4);

    return DD.concat("/").concat(MM).concat("/").concat(YYYY);
}

export function formatDateStrToDDMMYYYYHHMMSS(date: string): string {
    const DDMMYYYY = formatDateStrToDDMMYYYY(date.slice(0, 10));
    const HHMMSS = date.slice(11, 19);

    return DDMMYYYY.concat(" ").concat(HHMMSS);
}

export function formatMoney(amount: number) {
    return amount.toFixed(2)
        .replace("", "R$ ")
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function formatDocument(document: string) {
    const regex = new RegExp(/[^\d]/g);

    if (document.length > 14) {
        return document.substring(0, 14);
    }

    return document.replace(regex, "");
}

export function isUserAuth(): boolean {
    const expiration = localStorage.getItem("expiration");
    const token = localStorage.getItem("token");
    const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

    if (!hasAuth
        || (hasAuth && !isValidToken(expiration!))) {
        return false;
    }

    return true;
}

export function getTotalCardComponentData(totalizers: Totalizers): CardTotalizers[] {
    return [
        {
            title: "Títulos Recebidos",
            subTitle: "Últimos 12 meses",
            value: totalizers.titlesReceived.toString(),
            bigIcon: RecivedTitlesIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-dark-color"
        },
        {
            title: "Valor Recebido",
            subTitle: "Últimos 12 meses",
            value: formatMoney(totalizers.amountReceived),
            bigIcon: AmountRecivedIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-primary-color"
        },
        {
            title: "Títulos a Receber",
            subTitle: "Próximos 30 dias",
            value: totalizers.titlesToReceive.toString(),
            bigIcon: TitlesToReceiveIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-dark-color"
        },
        {
            title: "Valor  a Receber",
            subTitle: "Próximos 30 dias",
            value: formatMoney(totalizers.amountToReceive),
            bigIcon: AmountReceiveToIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-primary-color"
        }
    ];
};