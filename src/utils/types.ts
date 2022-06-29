export interface LayoutProps {
    children: any;
    animateFooter?: boolean;
}

export interface ButtonProps {
    text: string;
    handleFunction: Function;
    stylized?: boolean;
}

export interface FormTypeProps {
    formType: EnumFormType;
}

export interface FormInputProps {
    formType: EnumFormType;
    changeFunction: Function;
}

export interface MenuProps {
    changeFunction: Function;
}

export interface DashboardProps {
    dashboardData: {
        cardsData: CardTotalizers[];
        titlesToReceive: FecthTitleResponse;
        receivedTitles: FecthTitleResponse;
    };
}

export interface CardTotalProps {
    element: CardTotalizers;
}

export interface TableProps {
    title: string;
    subTitle: string;
    data?: FecthTitleResponse;
}

export type DataContext = {
    cardsData: {
        cardsData: CardTotalizers[] | undefined;
        fetchCardsData: () => void
    },
    titlesData: {
        titlesToReceive: FecthTitleResponse | undefined;
        receivedTitles: FecthTitleResponse | undefined;
        fetchTitlesToReciveData: (pageIndex?: number | undefined, pageSize?: number | undefined) => void;
        fetchRecivedTitlesData: (pageIndex?: number | undefined, pageSize?: number | undefined) => void;
    },
    isAuth: boolean
}

export type CardTotalizers = {
    title: string;
    subTitle: string;
    value: string;
    bigIcon: SVGElement;
    smallIcon: SVGElement;
    iconAreaColor: string;
}

export type Totalizers = {
    amountReceived: number;
    amountToReceive: number;
    titlesReceived: number;
    titlesToReceive: number;
}

export type TitleData = {
    id: number;
    nfNumber: string;
    paymentType: string;
    digitable: string;
    barcode: string;
    pixKey: string;
    inclusionDate: string;
    dueDate: string;
    amount: number;
    dailyInterest: number;
}

export type FecthTitleResponse = {
    allResultsSize: number;
    page: number;
    results: TitleData[];
}

export type FecthTitleParams = {
    offset: string,
    limit: string,
    pageIndex: number,
    pageSize: number,
    liquidated: boolean
}

export enum EnumFormType {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

export enum EnumScreens {
    DASHBOARD,
    SEARCH_TITLE
}

export enum EnumError {
    CADASTRO_INDISPONIVEL = "Serviço de cadastro indisponível. Tente novamente em instantes.",
    ERRO_LOGIN = "Erro ao realizar login! Verifique os campos informados.",
}