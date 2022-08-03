import { toast } from "react-toastify";
import { ConsultPixKey, EnumError, FecthTitleParams, FecthTitleResponse, PixPayment, Totalizers } from "./types";
import { addQueryParams, getBasicToken, getBearerToken, getToastError, getToastSuccess } from "./utils";

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
const consultPath = process.env.NEXT_PUBLIC_CONSULT_PATH;
const paymentPath = process.env.NEXT_PUBLIC_PAYMENT_PATH;
const consultBankSlipPath = process.env.NEXT_PUBLIC_CONSULT_PATH;

export async function createAccount(document: string, password: string) {
    const userDto = { document, password };
    const url = baseUrl.concat(userPath);
    const token = await getToken(tokenUser, tokenPassword);
    const toastify = toast.loading("Criando usuário...");

    if (!token) {
        toast.update(toastify, getToastError("Serviços indisponíveis!"));
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
            } else {
                res.json()
                    .then(res => {
                        toast.update(toastify, getToastError(res.error));
                    });
            }
        })
        .catch(() => toast.update(toastify, getToastError(EnumError.CADASTRO_INDISPONIVEL)));
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
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                throw new Error(EnumError.ERRO_CONSULTAR_TOTALIZADORES.concat(response.error)
                    .concat(". Realize o login novamente!"));
            }

            return response;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                toast.error(EnumError.SERVICOS_INDISPONIVEIS.concat("consulta dos totalizadores!"));
            } else {
                toast.error(err);
            }

            throw new Error(EnumError.SESSAO_EXPIRADA);
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
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                const error = EnumError.ERRO_CONSULTAR_TITULOS.concat(errorMsgType)
                    .concat(".Erro: ").concat(response.error).concat(". Realize o login novamente!");

                throw new Error(error);
            }

            return response;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                toast.error(EnumError.SERVICOS_INDISPONIVEIS.concat("consulta dos títulos ").concat(errorMsgType));
            } else {
                toast.error(err);
            }

            throw new Error(EnumError.SESSAO_EXPIRADA);
        });
}

export function consultPixKey(pixKey: string): Promise<ConsultPixKey> {
    const toastify = toast.loading("Consultando Chave🗝");
    const urlConsultPix = new URL(baseUrl.concat(pixPath.concat(consultPath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
            "key": pixKey
        },
    }

    return fetch(urlConsultPix, request)
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                const err = EnumError.ERRO_CONSULTAR_CHAVE.concat(response.error).concat(" Tente novamente.");
                toast.update(toastify, getToastError(err));

                throw new Error(err);
            }

            toast.update(toastify, getToastSuccess("Chave consultada com sucesso!"));

            return response;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                toast.update(toastify, getToastError(EnumError.SERVICOS_INDISPONIVEIS.concat("a consulta da chave pix")));
            } else {
                toast.update(toastify, getToastError(err));
            }

            throw new Error(EnumError.SESSAO_EXPIRADA);
        })
}

export function pixPayment(pixPayment: PixPayment) {
    const toastify = toast.loading("Realizando Pagamento");
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
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                toast.update(toastify, getToastError(response.error));

                throw new Error(response.error);
            }

            toast.update(toastify, getToastSuccess("Pagamento realizado com sucesso!"));

            return response;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                toast.update(toastify, getToastError(EnumError.ERRO_AO_REALIZAR_PAGAMENTO));
            } else {
                toast.update(toastify, getToastError(err));
            }

            throw new Error(EnumError.SESSAO_EXPIRADA);
        });
}

export function consultBankSlip(pixKey: string): Promise<ConsultPixKey> {
    const toastify = toast.loading("Consultando Boleto📃");
    const urlConsultBankSlipPath = new URL(baseUrl.concat(bankslipPath.concat(consultBankSlipPath)));
    const token = localStorage.getItem("token");

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
            "key": pixKey
        },
    }

    return fetch(urlConsultBankSlipPath, request)
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                const err = EnumError.ERRO_CONSULTAR_CHAVE.concat(response.error).concat(" Tente novamente.");
                toast.update(toastify, getToastError(err));

                throw new Error(err);
            }

            toast.update(toastify, getToastSuccess("Chave consultada com sucesso!"));

            return response;
        })
        .catch(err => {
            if (err instanceof TypeError
                && err.message == "Failed to fetch") {
                toast.update(toastify, getToastError(EnumError.SERVICOS_INDISPONIVEIS.concat("a consulta da chave pix")));
            } else {
                toast.update(toastify, getToastError(err));
            }

            throw new Error(EnumError.SESSAO_EXPIRADA);
        })
}