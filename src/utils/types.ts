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
    paymentId: string;
    inclusionDate: Date;
    dueDate: Date;
    amount: number;
    dailyInterest: number;
}

export enum EnumFormType {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

export enum EnumError {
    CADASTRO_INDISPONIVEL = "Serviço de cadastro indisponível. Tente novamente em instantes.",
    ERRO_LOGIN = "Erro ao realizar login! Verifique os campos informados.",
}