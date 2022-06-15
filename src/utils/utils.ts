import { UpdateOptions } from "react-toastify";
import { EnumFormType } from "./types";

const expirationTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRATION_TIME;

export function isNullOrEmpty(str: any): boolean {
    return str == null || str == undefined || str.trim() == "";
}

export function equalsEnumFormType(firstEnum: EnumFormType, secondEnum: EnumFormType) {
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

export function formatDateToDDMMYYYHHMMSS(date: Date):string {
    const day = date.getUTCDate().toString();
    const month = (date.getMonth() + 1);
    const monthFormated = month < 10 ? ("0").concat(month.toString()) : month.toString(); 
    const year = date.getFullYear().toString();

    const hour = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();

    const formatedDate = day.concat("/").concat(monthFormated).concat("/").concat(year);
    const formatedTime = hour.concat(":").concat(minutes).concat(":").concat(seconds);

    return formatedDate.concat(" ").concat(formatedTime);
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
        return document.substring(0,14);
    }

    return document.replace(regex, "");
}