import { Id, toast, UpdateOptions } from "react-toastify";
import { URL } from "url";
import CalendarIcon from "../assets/icons/calendar.svg";
import AmountRecivedIcon from "../assets/icons/chevrons-down.svg";
import RecivedTitlesIcon from "../assets/icons/chevrons-up.svg";
import AmountReceiveToIcon from "../assets/icons/dollar-sign.svg";
import TitlesToReceiveIcon from "../assets/icons/trending-up.svg";
import { CardTotalizers, ConsultPixKey, EnumFilterTitle, FecthTitleParams, PixPayment, Totalizers, User, UserUpdateInfo } from "./types";

const expirationTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRATION_TIME;
const defaultPageSize = process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE;
const defaultPageSizeFullTable = process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE_FULL_TABLE;

export function isNullOrEmpty(str: any): boolean {
    return str == null || str == undefined || str.trim() == "";
}

export function equalsStr(firstStr: string, secondStr: string) {
    return firstStr === secondStr;
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
        closeButton: true,
    };
}

export function getToastSuccess(msg: string): UpdateOptions {
    return {
        render: msg,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
    };
}

export function getTokenExpirationDate() {
    return (getNow().getTime() + expirationTime * 1000).toString();
}

export function getNow(): Date {
    return new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1000);
}

export function isValidToken(expiration: string) {
    return Number.parseInt(expiration) > getNow().getTime();
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

export function formatMoneyWithSign(amount: number) {
    return amount
        .toFixed(2)
        .replace("", "R$ ")
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function formatMoneyInput(valueToFormat: string) {
    const regex = new RegExp(/(\d)(?=(\d{3})+(?!\d))/g);

    const onlyDigits = valueToFormat
        .split("")
        .filter(s => /\d/.test(s))
        .join("");

    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);

    return digitsFloat.replace(".", ",").replace(regex, "$1.");
}

export function formatDocument(document: string) {
    const regex = new RegExp(/[^\d]/g);

    if (document.length > 14) {
        return document.substring(0, 14);
    }

    return document.replace(regex, "");
}

export function onlyNumbers(value: string): string {
    const regex = new RegExp(/[^\d]/g);

    return value.replace(regex, "");
}

export function isUserAuth(): boolean {
    const expiration = localStorage.getItem("expiration");
    const token = localStorage.getItem("token");
    const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

    if (!hasAuth || (hasAuth && !isValidToken(expiration!))) {
        return false;
    }

    return true;
}

export function getTotalCardComponentData(totalizers: Totalizers): CardTotalizers[] {
    return [
        {
            title: "Títulos Recebidos",
            subTitle: "Últimos 12 meses",
            value: totalizers.titlesReceived ? totalizers.titlesReceived.toString() : "0",
            bigIcon: RecivedTitlesIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-dark-color",
        },
        {
            title: "Valor Recebido",
            subTitle: "Últimos 12 meses",
            value: totalizers.amountReceived ? formatMoneyWithSign(totalizers.amountReceived) : formatMoneyWithSign(0),
            bigIcon: AmountRecivedIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-primary-color",
        },
        {
            title: "Títulos a Receber",
            subTitle: "Próximos 30 dias",
            value: totalizers.titlesToReceive ? totalizers.titlesToReceive.toString() : formatMoneyWithSign(0),
            bigIcon: TitlesToReceiveIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-dark-color",
        },
        {
            title: "Valor  a Receber",
            subTitle: "Próximos 30 dias",
            value: totalizers.amountToReceive ? formatMoneyWithSign(totalizers.amountToReceive) : formatMoneyWithSign(0),
            bigIcon: AmountReceiveToIcon,
            smallIcon: CalendarIcon,
            iconAreaColor: "bg-primary-color",
        },
    ];
}

export function addQueryParams(params: URLSearchParams, url: URL): URL {
    params.forEach((k, v) => {
        url.searchParams.append(v, k);
    });

    return url;
}

export function getTitleURLSearchParams(params: FecthTitleParams) {
    let searchParams;

    if (params.offset && params.limit) {
        searchParams = new URLSearchParams({
            offset: params.offset,
            limit: params.limit,
            pageIndex: params.pageIndex.toString(),
            pageSize: params.pageSize.toString(),
        });
    } else {
        searchParams = new URLSearchParams({
            pageIndex: params.pageIndex.toString(),
            pageSize: params.pageSize.toString(),
        });
    }

    if (params.liquidated != undefined) {
        searchParams.set("liquidated", JSON.stringify(params.liquidated));
    }

    if (params.filterBy) {
        searchParams.set("filterBy", params.filterBy);
    }

    if (params.filterValue) {
        searchParams.set("filterValue", params.filterValue);
    }

    if (params.filterValueAux) {
        searchParams.set("filterValueAux", params.filterValueAux);
    }

    return searchParams;
}

export function getFetchTitlesParams(pageIndex?: number, pageSize?: number, liquidated?: boolean): FecthTitleParams {
    const today = getNow();
    const nextMonth = getNow();
    nextMonth.setMonth(today.getMonth() + 2);

    return {
        offset: formatDDMMYYYY(today),
        limit: formatDDMMYYYY(nextMonth),
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 5,
        liquidated,
    };
}

export function getFetchTitlesParamsWithFilter(
    filterBy: EnumFilterTitle,
    filterValue: string,
    filterValueAux: string,
    pageIndex?: number,
    pageSize?: number,
    liquidated?: boolean,
): FecthTitleParams {
    return {
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 5,
        liquidated,
        filterBy,
        filterValueAux,
        filterValue,
    };
}

export function formatDDMMYYYY(date: Date): string {
    const month = date.getUTCMonth() + 1;
    const day = date.getDate();

    const DD = day < 10 ? "0".concat(day.toString()) : day.toString();
    const MM = month < 10 ? "0".concat(month.toString()) : month.toString();
    const YYYY = date.getUTCFullYear().toString();

    return DD.concat("/").concat(MM).concat("/").concat(YYYY);
}

export function firstElement<T>(array: T[]): T {
    return array.at(0)!;
}

export function getPixPaymentDto(pixKeyData: ConsultPixKey, titleId: number): PixPayment {
    return {
        titleId,
        endToEndId: pixKeyData.endtoendid,
        receiverAccount: pixKeyData.account.accountNumber,
        receiverAccountType: pixKeyData.account.accountType,
        receiverBank: pixKeyData.account.participant,
        receiverKey: pixKeyData.key,
        receiverBranch: pixKeyData.account.branch,
        receiverDocument: pixKeyData.owner.taxIdNumber,
        receiverName: pixKeyData.owner.name,
    };
}

export function getArrayOfElements(lineSize?: number): number[] {
    return Array.from({ length: lineSize ?? getDefaultPageSize() }, (x, i) => i + 1);
}

export function getDefaultPageSize() {
    return defaultPageSize;
}

export function getDefaultPageSizeFullTable() {
    return defaultPageSizeFullTable;
}

export function getTotalInterest(dailyInterest: number, dueDate: Date): string {
    var timeDiff = Math.abs(dueDate.getTime() - getNow().getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (diffDays * dailyInterest).toFixed(2);
}

export function formatTextSize(text: string, maxSize: number): string {
    return text.length > maxSize ? text.slice(0, maxSize).concat("...") : text;
}

export function resolveRequestError(err: any, toastify?: any) {
    if (err instanceof TypeError && err.message == "Failed to fetch") {
        const error = "Serviços MilkPay indisponíveis!";

        if (toastify) {
            handleToastifyError(toastify, error, true);
        } else {
            handleError(error, true);
        }
    } else {
        const error = err.message ? err.message : "Erro desconhecido ao realizar operação.";

        toastify ? handleToastifyError(toastify, error, true) : handleError(error, true);
    }
}

export function handleToastifyError(toastify: any, error: string, throws?: boolean) {
    toast.update(toastify, getToastError(error));

    if (throws) {
        throw new Error(error);
    }
}

export function handleError(error: string, throws?: boolean) {
    toast.error(error);

    if (throws) {
        throw new Error(error);
    }
}

export function handleReponseError(res: Response, toastify?: Id | null, throws?: boolean) {
    const defaultError = "Erro desconhecido ao realizar operação.";

    if (res && res.status == 401) {
        const unauthorizedError = "Token expirado, realize o login novamente!";

        if (toastify) {
            toast.update(toastify, getToastError(unauthorizedError));
        }

        throw new Error(unauthorizedError);
    }

    if (res && res.status != 401) {
        return res.json().then(err => {
            let error = err.error ? err.error : defaultError;

            if (toastify) {
                if (throws) {
                    toast.update(toastify, getToastError(error));

                    throw new Error(error);
                }

                toast.update(toastify, getToastError(error));
            } else {
                if (throws) {
                    throw new Error(error);
                }
            }
        });
    }

    throw new Error(defaultError);
}

export function getHeaderWithToken(contentTypeHeader?: string, params?: Map<string, string>): RequestInit {
    const token = localStorage.getItem("token");

    if (params && contentTypeHeader) {
        const h = {
            headers: {
                Authorization: "Bearer ".concat(token!),
                "Content-Type": contentTypeHeader,
            },
        };

        return h;
    } else if (params) {
    }

    if (contentTypeHeader) {
        return {
            headers: {
                Authorization: "Bearer ".concat(token!),
                "Content-Type": contentTypeHeader,
            },
        };
    }

    return {
        headers: {
            Authorization: "Bearer ".concat(token!),
        },
    };
}

export function verifyValidPassword(password: string, confirmation: string) {
    if (!equalsStr(password, confirmation)) {
        handleError("Senha de confirmação diferente da senha informada!");

        return false;
    }

    return true;
}

export function verifyValidUserFields(user: UserUpdateInfo) {
    if (isNullOrEmpty(user.name) || isNullOrEmpty(user.phone)) {
        return false;
    }

    if (isNullOrEmpty(user.password) || isNullOrEmpty(user.pixKey) || isNullOrEmpty(user.email)) {
        return false;
    }

    return true;
}

export function verifyUserHasChanges(userNewIfnfo: UserUpdateInfo, user: User) {
    if (userNewIfnfo.name != user.name || userNewIfnfo.email != user.email) {
        return true;
    }

    if (userNewIfnfo.phone != user.phone || userNewIfnfo.password != user.password) {
        return true;
    }

    if (userNewIfnfo.address != user.address || userNewIfnfo.postalCode != user.postalCode) {
        return true;
    }

    if (userNewIfnfo.pixKey != user.pixKey || userNewIfnfo.acceptTerms != user.acceptTerms) {
        return true;
    }

    return false;
}

export function parseStrToFilterTitleEnum(strValue: string): EnumFilterTitle {
    switch (strValue) {
        case "ID":
            return EnumFilterTitle.ID;
        case "Status":
            return EnumFilterTitle.STATUS;
        case "Número NF":
            return EnumFilterTitle.NF_NUMBER;
        case "Tipo Recebimento":
            return EnumFilterTitle.PAYMENT_TYPE;
        case "Data Serviço/Venda":
            return EnumFilterTitle.INCLUSION_DATE;
        case "Data Recebimento":
            return EnumFilterTitle.DUE_DATE;
        case "Valor Total Título":
            return EnumFilterTitle.AMOUNT;
        case "Linha Digitável":
            return EnumFilterTitle.DIGITABLE;
        case "Código de Barras":
            return EnumFilterTitle.BARCODE;
        default:
            return EnumFilterTitle.NONE;
    }
}

export function changeInputType(event: any, type: string) {
    event.currentTarget.type = type;

    if (type == "date") {
        event.currentTarget.showPicker();
    }
}

export function YYYYMMDDtoDDMMYYYY(srtData: string) {
    const DD = srtData.substring(8, 10);
    const MM = srtData.substring(5, 7);
    const YYYY = srtData.substring(0, 4);

    return DD.concat("/").concat(MM).concat("/").concat(YYYY);
}

export function DDMMYYYYtoISO(srtData: string) {
    const DD = srtData.substring(0, 2);
    const MM = srtData.substring(3, 5);
    const YYYY = srtData.substring(6, 10);

    return YYYY.concat("-").concat(MM).concat("-").concat(DD).concat("T00:00:00");
}

export function isValidDate(startDate: string, endDate: string) {

    if (isNullOrEmpty(startDate)) {
        handleError("Necessário informar a data inicial!");
    
        return false;
    }

    if (isNullOrEmpty(endDate)) {
        handleError("Necessário informar a data final!");
    
        return false;
    }

    const sDate = new Date(startDate).getTime();
    const eDate = new Date(endDate).getTime();

    if (sDate > eDate) {
        handleError("A data final não pode ser menor que a inicial!");

        return false;
    }

    return true;
}
