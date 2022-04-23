import { EnumFormType } from "./types"

export function equalsEnumFormType(firstEnum: EnumFormType, secondEnum: EnumFormType) {
    return firstEnum == secondEnum;
}

export function getUrl(...values:string[]) {
    return ("").concat(...values);
}