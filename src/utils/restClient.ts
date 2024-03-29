import { toast } from "react-toastify";
import {
    BankSlip,
    ConsultPixKey,
    EnumError,
    FecthTitleParams,
    FecthTitleResponse,
    PaymentResponse,
    PixPayment,
    Receipt,
    Totalizers,
    User,
    UserUpdateInfo
} from "./types";
import {
    addQueryParams,
    getBasicToken,
    getBearerToken,
    getHeaderWithToken,
    getTitleURLSearchParams,
    getToastError,
    getToastSuccess,
    handleReponseError,
    handleToastifyError,
    resolveRequestError
} from "./utils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const tokenBaseUrl = process.env.NEXT_PUBLIC_TOKENBASE_URL;
const tokenAuth = process.env.NEXT_PUBLIC_TOKEN_BASIC;
const tokenUser = process.env.NEXT_PUBLIC_TOKEN_USER;
const tokenPassword = process.env.NEXT_PUBLIC_TOKEN_PASSWORD;
const tokenGrantType = process.env.NEXT_PUBLIC_TOKEN_GRANT_TYPE;
const userPath = process.env.NEXT_PUBLIC_USER_PATH;
const titlePath = process.env.NEXT_PUBLIC_TITLE_PATH;
const pixPath = process.env.NEXT_PUBLIC_PIX_PATH;
const bankslipPath = process.env.NEXT_PUBLIC_BANKSLIP_PATH;
const totalizersPath = process.env.NEXT_PUBLIC_TOTALIZERS_PATH;
const consultKeyPath = process.env.NEXT_PUBLIC_CONSULT_PIX_KEY_PATH;
const consultPath = process.env.NEXT_PUBLIC_CONSULT_PATH;
const paymentPath = process.env.NEXT_PUBLIC_PAYMENT_PATH;
const receiptPath = process.env.NEXT_PUBLIC_RECEIPT_PATH;
const restorePath = process.env.NEXT_PUBLIC_RESTORE_PASS;

export async function createAccount(document: string, password: string) {
    const userDto = { document, password };
    const url = baseUrl.concat(userPath);
    const token = await getToken(tokenUser, tokenPassword);
    const toastify = toast.loading("Criando usuário...");

    if (!token) {
        const error = EnumError.SERVICOS_INDISPONIVEIS.concat("a criação de conta.");

        return handleToastifyError(toastify, error, false);
    }

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userDto),
    };

    return fetch(url, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Usuário criado com sucesso!"));

                return;
            }

            return handleReponseError(res, toastify, true);
        })
        .catch(err => resolveRequestError(err, toastify));
}

export async function sendEmailForgorPassword(email: string) {
    const url = baseUrl.concat(userPath).concat(restorePath);
    const token = await getToken(tokenUser, tokenPassword);
    const toastify = toast.loading("Enviando e-mail📨...");

    if (!token) {
        const error = EnumError.SERVICOS_INDISPONIVEIS.concat("o envio do e-mail.");

        return handleToastifyError(toastify, error, false);
    }

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            email: email,
        },
        method: "POST",
    };

    return fetch(url, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("E-mail enviado com sucesso! Verifique sua caixa de entrada."));

                return;
            }

            return handleReponseError(res, toastify, true);
        })
        .catch(err => resolveRequestError(err, toastify));
}

function getToken(tokenUser: string, tokenPassword: string) {
    const form = new URLSearchParams({
        username: tokenUser,
        password: tokenPassword,
        grant_type: tokenGrantType,
    });

    const request: RequestInit = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: getBasicToken(tokenAuth),
        },
        body: form,
        method: "POST",
    };

    return fetch(tokenBaseUrl, request)
        .then(res => res.json())
        .then(json => json.access_token)
        .catch(() => null);
}

export async function getUserToken(document: string, password: string) {
    const toastify = toast.loading("Realizando login...");
    const token = await getToken(document, password);

    if (!token) {
        toast.update(toastify, getToastError(EnumError.ERRO_LOGIN));

        return;
    }

    toast.update(toastify, getToastSuccess("Login realizado com sucesso!"));

    return token;
}

export function fetchTotalizers(): Promise<Totalizers> {
    const urlTotalizers = baseUrl.concat(titlePath).concat(totalizersPath);
    const request = getHeaderWithToken();

    return fetch(urlTotalizers, request)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return handleReponseError(res, null, true);
        })
        .catch(err => resolveRequestError(err));
}

export function fetchUserData(): Promise<User> {
    const urlTotalizers = baseUrl.concat(userPath);
    const request = getHeaderWithToken();

    return fetch(urlTotalizers, request)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return handleReponseError(res, null, true);
        })
        .catch(err => resolveRequestError(err));
}

export function fetchTitles(params: FecthTitleParams): Promise<FecthTitleResponse> {
    const urlTitles = addQueryParams(getTitleURLSearchParams(params), new URL(baseUrl.concat(titlePath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
        },
    };

    return fetch(urlTitles.toString(), request)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return handleReponseError(res, null, true);
        })
        .catch(err => resolveRequestError(err));
}

export function consultPixKey(pixKey: string): Promise<ConsultPixKey> {
    const toastify = toast.loading("Consultando Chave🗝");
    const urlConsultPix = baseUrl.concat(pixPath).concat(consultKeyPath);
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
            key: pixKey,
        },
    };

    return fetch(urlConsultPix, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Chave consultada com sucesso!"));

                return res.json();
            }

            handleReponseError(res, toastify, false);
        })
        .catch(err => resolveRequestError(err, toastify));
}

export function pixPayment(pixPayment: PixPayment): Promise<PaymentResponse> {
    const toastify = toast.loading("Realizando Pagamento...💸");
    const urlPaymentPix = baseUrl.concat(pixPath).concat(paymentPath);
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(pixPayment),
    };

    return fetch(urlPaymentPix, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Pagamento realizado com sucesso!"));

                return res.json();
            }

            handleReponseError(res, toastify, false);
        })
        .catch(err => resolveRequestError(err, toastify));
}

export function consultBankSlip(bankSlip: BankSlip): Promise<BankSlip> {
    const toastify = toast.loading("Consultando Boleto📃");
    const urlConsultBankSlip = baseUrl.concat(bankslipPath).concat(consultPath);
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bankSlip),
    };

    return fetch(urlConsultBankSlip, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Boleto consultado com sucesso!"));

                return res.json();
            }

            handleReponseError(res, toastify, false);
        })
        .catch(err => resolveRequestError(err, toastify));
}

export function bankSlipayment(bankSlip: BankSlip): Promise<PaymentResponse> {
    const toastify = toast.loading("Realizando Pagamento...💸");
    const urlPaymentBankSlip = baseUrl.concat(bankslipPath).concat(paymentPath);
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bankSlip),
    };

    return fetch(urlPaymentBankSlip, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Pagamento realizado com sucesso!"));

                return res.json();
            }

            handleReponseError(res, toastify, false);
        })
        .catch(err => resolveRequestError(err, toastify));
}

export function consultReceipt(txId: number): Promise<Receipt> {
    const urlConsultReceipt = baseUrl.concat(receiptPath);
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
            txId: txId.toString(),
        },
    };

    return fetch(urlConsultReceipt, request)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            handleReponseError(res, null, false);
        })
        .catch(err => resolveRequestError(err));
}

export function updateUser(userInfo: UserUpdateInfo): Promise<User> {
    const urlUpdateUser = baseUrl.concat(userPath);
    const toastify = toast.loading("Atualizando Usuário...✨");
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            Authorization: getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(userInfo),
    };

    return fetch(urlUpdateUser, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Usuário atualizado com sucesso!"));

                return res.json();
            }

            handleReponseError(res, toastify, false);
        })
        .catch(err => resolveRequestError(err, toastify));
}
