import { toast } from "react-toastify";
import {
    BankSlip, ConsultPixKey, EnumError, FecthTitleParams,
    FecthTitleResponse, PixPayment, Receipt, Totalizers
} from "./types";
import {
    addQueryParams, getBasicToken, getBearerToken, getToastError,
    getToastSuccess, handleError, handleReponseError, handleToastifyError, handleToastifyResponseError
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

export async function createAccount(document: string, password: string) {
    const userDto = { document, password };
    const url = baseUrl.concat(userPath);
    const token = await getToken(tokenUser, tokenPassword);
    const toastify = toast.loading("Criando usuário...");

    if (!token) {
        const error = EnumError.SERVICOS_INDISPONIVEIS.concat("a criação de conta.");
        handleToastifyError(toastify, error, false);

        return;
    }

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userDto),
    }

    return fetch(url, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Usuário criado com sucesso!"));
                return;
            }

            handleToastifyResponseError(res, toastify, true);
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("o cadastro do usúario!");
                handleError(toast, error, true);
            } else {
                handleError(toast, err, true);
            }
        });
}

function getToken(tokenUser: string, tokenPassword: string) {
    const form = new URLSearchParams({
        username: tokenUser,
        password: tokenPassword,
        grant_type: tokenGrantType,
    });

    const request: RequestInit = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization: getBasicToken(tokenAuth),
        },
        body: form,
        method: "POST"
    }

    return fetch(tokenBaseUrl, request)
        .then(res => res.json())
        .then(json => json.access_token);
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
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json"
        }
    }

    return fetch(urlTotalizers, request)
        .then(res => {
            handleReponseError(res, toast, true);

            return res.json();
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("a consulta dos totalizadores!");
                handleError(toast, error, true);
            } else {
                handleError(toast, err, true);
            }
        });
}

export function fetchTitles(params: FecthTitleParams): Promise<FecthTitleResponse> {
    const searchParams = new URLSearchParams({
        offset: params.offset,
        limit: params.limit,
        pageIndex: params.pageIndex.toString(),
        pageSize: params.pageSize.toString()
    });
    
    const urlTitles = addQueryParams(searchParams, new URL(baseUrl.concat(titlePath)));
    const token = localStorage.getItem("token");
    const errorMsgType = params.liquidated ? "recebidos" : "a receber";

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
            "liquidated": JSON.stringify(params.liquidated)
        },
    }

    return fetch(urlTitles, request)
        .then(res => {
            handleReponseError(res, toast, true);

            return res.json();
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("consulta dos títulos ").concat(errorMsgType);
                handleError(toast, error, true);
            } else {
                handleError(toast, err, true);
            }
        });
}

export function consultPixKey(pixKey: string): Promise<ConsultPixKey> {
    const toastify = toast.loading("Consultando Chave🗝");
    const urlConsultPix = new URL(baseUrl.concat(pixPath.concat(consultKeyPath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
            "key": pixKey
        },
    }

    return fetch(urlConsultPix, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Chave consultada com sucesso!"));

                return res.json();
            }

            handleToastifyResponseError(res, toastify, false);

            return null;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("a consulta da chave PIX.");
                handleToastifyError(toastify, error, true);
            } else {
                handleToastifyError(toastify, err, true);
            }
        });
}

export function pixPayment(pixPayment: PixPayment): Promise<PaymentResponse> {
    const toastify = toast.loading("Realizando Pagamento...💸");
    const urlPaymentPix = new URL(baseUrl.concat(pixPath.concat(paymentPath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(pixPayment)
    }

    return fetch(urlPaymentPix, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Pagamento realizado com sucesso!"));

                return res.json();
            }

            handleToastifyResponseError(res, toastify, false);

            return null;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("o pagamento PIX.");
                handleToastifyError(toastify, error, true);
            } else {
                handleToastifyError(toastify, err, true);
            }
        });
}

export function consultBankSlip(bankSlip: BankSlip): Promise<BankSlip> {
    const toastify = toast.loading("Consultando Boleto📃");
    const urlConsultBankSlip = new URL(baseUrl.concat(bankslipPath.concat(consultPath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bankSlip)
    }

    return fetch(urlConsultBankSlip, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Boleto consultado com sucesso!"));

                return res.json();
            }

            handleToastifyResponseError(res, toastify, false);

            return null;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("a consulta do boleto.");
                handleToastifyError(toastify, error, true);
            } else {
                handleToastifyError(toastify, err, true);
            }
        });
}

export function bankSlipayment(bankSlip: BankSlip): Promise<PaymentResponse> {
    const toastify = toast.loading("Realizando Pagamento...💸");
    const urlPaymentBankSlip = new URL(baseUrl.concat(bankslipPath.concat(paymentPath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bankSlip)
    }

    return fetch(urlPaymentBankSlip, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Pagamento realizado com sucesso!"));

                return res.json();
            }

            handleToastifyResponseError(res, toastify, false);

            return null;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("o pagamento do Boleto.");
                handleToastifyError(toastify, error, true);
            } else {
                handleToastifyError(toastify, err, true);
            }
        });
}

export function consultReceipt(txId: number): Promise<Receipt> {
    const toastify = toast.loading("Consultando Comprovante📃");
    const urlConsultReceipt = new URL(baseUrl.concat(receiptPath));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
            "txId": txId.toString()
        },
    }

    return fetch(urlConsultReceipt, request)
        .then(res => {
            if (res.ok) {
                toast.update(toastify, getToastSuccess("Comprovante consultado com sucesso!"));

                return res.json();
            }

            handleToastifyResponseError(res, toastify, false);

            return null;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                const error = EnumError.SERVICOS_INDISPONIVEIS.concat("a consulta do comprovante.");
                handleToastifyError(toastify, error, true);
            } else {
                handleToastifyError(toastify, err, true);
            }
        });
}
