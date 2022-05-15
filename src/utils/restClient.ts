import { getBasicToken, getBearerToken } from "./utils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const userRoutes = process.env.NEXT_PUBLIC_API_USER_ROUTES;
const tokenBaseUrl = process.env.NEXT_PUBLIC_TOKENBASE_URL;
const tokenAuth = process.env.NEXT_PUBLIC_TOKEN_BASIC;
const tokenUser = process.env.NEXT_PUBLIC_TOKEN_USER;
const tokenPassword = process.env.NEXT_PUBLIC_TOKEN_PASSWORD;
const tokenGrantType = process.env.NEXT_PUBLIC_TOKEN_GRANT_TYPE;

export async function createAccount(document: string, password: string): Promise<Response> {
    const userDto = { document, password };
    const url = baseUrl.concat(userRoutes);
    const token = await getToken();

    if (!token) {
        return new Response(JSON.stringify({ error: "Serviços indisponíveis" }), { status: 503 })
    }

    const request: RequestInit = {
        headers: {
            "Authorization": getBearerToken(token!),
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userDto),
    }

    return fetch(url, request);
}

async function getToken() {
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