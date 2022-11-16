declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_URL: string;
        NEXT_PUBLIC_TOKENBASE_URL: string;
        NEXT_PUBLIC_TOKEN_BASIC: string;
        NEXT_PUBLIC_TOKEN_USER: string;
        NEXT_PUBLIC_TOKEN_PASSWORD: string;
        NEXT_PUBLIC_TOKEN_GRANT_TYPE: string;
        NEXT_PUBLIC_TOKEN_EXPIRATION_TIME: number;
        NEXT_PUBLIC_DEFAULT_PAGE_SIZE: number;
        NEXT_PUBLIC_DEFAULT_PAGE_SIZE_FULL_TABLE: number;
        NEXT_PUBLIC_USER_PATH: string;
        NEXT_PUBLIC_TITLE_PATH: string;
        NEXT_PUBLIC_TOTALIZERS_PATH: string;
        NEXT_PUBLIC_PIX_PATH: string;
        NEXT_PUBLIC_CONSULT_PIX_KEY_PATH: string;
        NEXT_PUBLIC_BANKSLIP_PATH: string;
        NEXT_PUBLIC_PAYMENT_PATH: string;
        NEXT_PUBLIC_CONSULT_PATH: string;
        NEXT_PUBLIC_RECEIPT_PATH: string;
        NEXT_PUBLIC_RESTORE_PASS: string;
    }
}