import { EnumFilterTitle, FecthTitleResponse } from "./types";

export function getFiltersWithString() {
    return [
        EnumFilterTitle.NONE,
        EnumFilterTitle.ID,
        EnumFilterTitle.AMOUNT,
        EnumFilterTitle.NF_NUMBER,
        EnumFilterTitle.BARCODE,
        EnumFilterTitle.DIGITABLE,
    ];
}