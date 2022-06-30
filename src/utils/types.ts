//==========Interfaces==========//
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

export interface ModalCardProps {
    title: TitleData;
    handleClose: Function;
}

export interface ModalCardButtonProps {
    handleClose: Function;
    handleContinue: Function;
    isEnabled: boolean
}

//==========Types==========//
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
    liquidated: boolean;
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

export type ConsultPixKey = {
    account: ConsultPixKeyAccount,
    endtoendid: string,
    key: string,
    keyType: string,
    owner: ConsultPixKeyOwner
}

export type ConsultPixKeyAccount = {
    accountNumber: string,
    accountType: string,
    branch: number,
    participant: string
}

export type ConsultPixKeyOwner = {
    name: string,
    taxIdNumber: string,
}

export type PixPayment = {
    titleId: number,
	endToEndId: string,
	receiverKey: string,
	receiverBank: string,
	receiverAccount: string,
	receiverBranch: number,
	receiverDocument: string,
	receiverAccountType: string,
	receiverName: string
}

//==========Enum's==========//
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
    ERRO_CONSULTAR_CHAVE = "Ocorreu um erro ao consultar chave! Erro: ",
    ERRO_CONSULTAR_TOTALIZADORES = "Ocorreu um erro ao buscar os totalizadores! Erro: ",
    ERRO_CONSULTAR_TITULOS = "Ocorreu um erro ao buscar os títulos ",
    SERVICOS_INDISPONIVEIS = "Serviços da MilkPay indisponíveis! Não foi possível realizar a",
    SESSAO_EXPIRADA = "Sessão expirada! Realize o login novamente.",
    ERRO_AO_REALIZAR_PAGAMENTO = "Erro ao realizar o pagamento do título. Verifique se os serviços estão disponíveis."
}

export enum EnumModalSteps {
    STEP_ONE,
    STEP_TWO,
    STEP_THREE
}