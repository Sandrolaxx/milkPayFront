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
    cardsData: CardTotalizers[];
    titleListData: TitleData[];
}

export interface CardTotalProps {
    element: CardTotalizers;
}

export interface TableProps {
    title: string;
    subTitle: string;
    data?: TitleData[];
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