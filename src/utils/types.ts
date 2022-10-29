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
    data: FecthTitleResponse;
    setShowModal: Function;
}

export interface ModalCardProps {
    title: TitleData;
    handleClose: Function;
}

export interface ModalCardButtonProps {
    handleClose: Function;
    handleContinue?: Function;
    isEnabled: boolean
}

export interface TableHeadProps {
    titleType: EnumTitleTypes;
}

export interface TableBodyProps {
    titles: TitleData[];
    titleType: EnumTitleTypes;
    handleShowModal: Function;
}

export interface ModalCardSkeleton {
    isBankslipPayment?: boolean;
}

export interface IDataContext {
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
    }
}

export type CardTotalizers = {
    title: string;
    subTitle: string;
    value: string;
    bigIcon: any;
    smallIcon: any;
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
    paymentType: EnumPaymentType;
    digitable: string;
    barcode: string;
    pixKey: string;
    inclusionDate: string;
    dueDate: string;
    amount: number;
    finalAmount: number;
    dailyInterest: number;
    liquidated: boolean;
    txId: number;
}

export type FecthTitleResponse = {
    allResultsSize: number;
    page: number;
    results: TitleData[];
}

export type FecthTitleParams = {
    offset: string;
    limit: string;
    pageIndex: number;
    pageSize: number;
    liquidated: boolean;
}

export type ConsultPixKey = {
    account: ConsultPixKeyAccount;
    endtoendid: string;
    key: string;
    keyType: string;
    owner: ConsultPixKeyOwner;
}

export type ConsultPixKeyAccount = {
    accountNumber: string;
    accountType: string;
    branch: number;
    participant: string;
}

export type ConsultPixKeyOwner = {
    name: string;
    taxIdNumber: string;
}

export type PixPayment = {
    titleId: number;
    endToEndId: string;
    receiverKey: string;
    receiverBank: string;
    receiverAccount: string;
    receiverBranch: number;
    receiverDocument: string;
    receiverAccountType: string;
    receiverName: string;
}

export type BankSlip = {
    digitable: string;
    barcode: string;
    bank?: string;
    documentPayer?: string;
    documentRecipient?: string;
    dueDate?: string;
    payer?: string;
    recipient?: string;
    transactionId?: number;
    amount?: number;
    discount?: number;
    fine?: number;
    interest?: number;
}

export type PaymentResponse = {
    txId: number;
    receiptImage: string;
}

export type Receipt = {
    receiptImage: string;
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
    ERRO_CADASTRAR_USUARIO = "Ocorreu um erro ao cadastrar usuário! Erro: ",
    ERRO_LOGIN = "Erro ao realizar login! Verifique os campos informados.",
    SERVICOS_INDISPONIVEIS = "Serviços da MilkPay indisponíveis! Não foi possível realizar ",
    SESSAO_EXPIRADA = "Sessão expirada! Realize o login novamente.",
}

export enum EnumModalSteps {
    STEP_ONE,
    STEP_TWO,
    STEP_THREE,
    STEP_RECEIPT
}

export enum EnumTitleTypes {
    ALL,
    RECEIVED,
    TO_RECEIVE
}

export enum EnumPaymentType {
    PIX = "PIX",
    BOLETO = "BOLETO"
}