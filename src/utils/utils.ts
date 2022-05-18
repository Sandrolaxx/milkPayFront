import { UpdateOptions } from "react-toastify";
import { EnumFormType } from "./types"

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