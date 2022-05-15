import { UpdateOptions, ToastTransitionProps } from "react-toastify";
import { EnumFormType } from "./types"

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