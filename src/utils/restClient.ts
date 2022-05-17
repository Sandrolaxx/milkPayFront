import { Id, toast } from "react-toastify";
import { EnumError } from "./types";
import { getBasicToken, getBearerToken, getToastError, getToastSuccess } from "./utils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const userRoutes = process.env.NEXT_PUBLIC_API_USER_ROUTES;
const tokenBaseUrl = process.env.NEXT_PUBLIC_TOKENBASE_URL;
const tokenAuth = process.env.NEXT_PUBLIC_TOKEN_BASIC;
const tokenUser = process.env.NEXT_PUBLIC_TOKEN_USER;
const tokenPassword = process.env.NEXT_PUBLIC_TOKEN_PASSWORD;
const tokenGrantType = process.env.NEXT_PUBLIC_TOKEN_GRANT_TYPE;

export async function createAccount(document: string, password: string) {
    const userDto = { document, password };
    const url = baseUrl.concat(userRoutes);
    const token = await getToken(tokenUser, tokenPassword);
    const toastify = toast.loading("Criando usuário...");

    if (!token) {
        toast.update(toastify, getToastSuccess("Serviços indisponíveis!"));
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
    const qs = require("querystring");

    const form = qs.stringify({
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
        toast.update(toastify, getToastError("Erro ao realizar login!"));//Todo colocar response erro
        return;
    } else {
        toast.update(toastify, getToastSuccess("Login realizado com sucesso!"));

        return token;
    }
}