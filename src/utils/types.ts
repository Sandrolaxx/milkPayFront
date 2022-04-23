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

export enum EnumFormType {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}