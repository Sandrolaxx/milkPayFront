import { toast } from "react-toastify";
import { EnumError, FecthTitleParams, FecthTitleResponse, Totalizers } from "./types";
import { getBasicToken, getBearerToken, getToastError, getToastSuccess } from "./utils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const tokenBaseUrl = process.env.NEXT_PUBLIC_TOKENBASE_URL;
const tokenAuth = process.env.NEXT_PUBLIC_TOKEN_BASIC;
const tokenUser = process.env.NEXT_PUBLIC_TOKEN_USER;
const tokenPassword = process.env.NEXT_PUBLIC_TOKEN_PASSWORD;
const tokenGrantType = process.env.NEXT_PUBLIC_TOKEN_GRANT_TYPE;

const userPath = process.env.NEXT_PUBLIC_USER_PATH;
const titlePath = process.env.NEXT_PUBLIC_TITLE_PATH;
const totalizersPath = process.env.NEXT_PUBLIC_TOTALIZERS_PATH;

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
        }).catch(() => toast.update(toastify, getToastError(EnumError.CADASTRO_INDISPONIVEL)));
}

async function getToken(tokenUser: string, tokenPassword: string) {
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

    return await fetch(tokenBaseUrl, request)
        .then(res => res.json().then(res => res.access_token));
}

export async function getUserToken(document: string, password: string) {
    const toastify = toast.loading("Realizando login...");
    const token = await getToken(document, password);

    if (!token) {
        toast.update(toastify, getToastError(EnumError.ERRO_LOGIN));
        return;
    } else {
        toast.update(toastify, getToastSuccess("Login realizado com sucesso!"));

        return token;
    }
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
        .then(response => response)
        .catch(() => {
            toast.error("Sessão expirada! Realize o login novamente.");

            throw Error("Erro ao buscar totalizadores.");
        });
}

export function fetchTitles(params: FecthTitleParams): Promise<FecthTitleResponse> {

    const urlTitles = new URL(baseUrl.concat(titlePath));
    const token = localStorage.getItem("token");
    
    urlTitles.searchParams.append("offset", params.offset);
    urlTitles.searchParams.append("limit", params.limit);
    urlTitles.searchParams.append("pageIndex", params.pageIndex.toString());
    urlTitles.searchParams.append("pageSize", params.pageSize.toString());

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json",
            "liquidated": JSON.stringify(params.liquidated)
        },
    }

    return fetch(urlTitles, request)
        .then(res => res.json())
        .then(response => response)
        .catch(() => {
            toast.error("Sessão expirada! Realize o login novamente.");

            throw Error("Erro ao buscar títulos.");
        });
}