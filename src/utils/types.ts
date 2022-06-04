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
    element: CartTotal;
}

export type CartTotal = {
    title: string;
    subTitle: string;
    value: number;
    bigIcon: SVGElement;
    smallIcon: SVGElement;
    iconAreaColor: string;
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