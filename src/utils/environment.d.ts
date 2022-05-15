declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_URL: string;
        NEXT_PUBLIC_TOKENBASE_URL: string;
        NEXT_PUBLIC_TOKEN_BASIC: string;
        NEXT_PUBLIC_TOKEN_USER: string;
        NEXT_PUBLIC_TOKEN_PASSWORD: string;
        NEXT_PUBLIC_TOKEN_GRANT_TYPE: string;
        NEXT_PUBLIC_API_USER_ROUTES: string;
    }
}