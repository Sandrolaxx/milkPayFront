import CalendarIcon from "../assets/icons/calendar.svg";
import AmountRecivedIcon from "../assets/icons/chevrons-down.svg";
import RecivedTitlesIcon from "../assets/icons/chevrons-up.svg";
import AmountReceiveToIcon from "../assets/icons/dollar-sign.svg";
import TitlesToReceiveIcon from "../assets/icons/trending-up.svg";

export const listTotalCard = [
    {
        title: "Títulos Recebidos",
        subTitle: "Últimos 12 meses",
        value: 27,
        bigIcon: RecivedTitlesIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-dark-color"
    },
    {
        title: "Valor Recebido",
        subTitle: "Últimos 12 meses",
        value: 330759.90,
        bigIcon: AmountRecivedIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-primary-color"
    },
    {
        title: "Títulos a Receber",
        subTitle: "Próximos 30 dias",
        value: 14,
        bigIcon: TitlesToReceiveIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-dark-color"
    },
    {
        title: "Valor  a Receber",
        subTitle: "Próximos 30 dias",
        value: 22319.82,
        bigIcon: AmountReceiveToIcon,
        smallIcon: CalendarIcon,
        iconAreaColor: "bg-primary-color"
    }
];

export const titleListData = [
    {
        id: 12334,
        nfNumber: "NF-123233",
        paymentType: "PIX",
        paymentId: "Chave: sandro--ramos@hotmail.com",
        inclusionDate: new Date(),
        dueDate: new Date(),
        amount: 999.98,
        dailyInterest: 0.3
    },
    {
        id: 234234,
        nfNumber: "NF-33333",
        paymentType: "BOLETO",
        paymentId: "21890010070653975080968814001589289830000040000",
        inclusionDate: new Date(),
        dueDate: new Date(),
        amount: 1239.20,
        dailyInterest: 0.3
    },
    {
        id: 23634,
        nfNumber: "NF-45433",
        paymentType: "PIX",
        paymentId: "Chave: sandro--ramos@hotmail.com",
        inclusionDate: new Date(),
        dueDate: new Date(),
        amount: 454.8,
        dailyInterest: 0.3
    },
    {
        id: 23444,
        nfNumber: "NF-344542",
        paymentType: "PIX",
        paymentId: "Chave: sandro--ramos@hotmail.com",
        inclusionDate: new Date(),
        dueDate: new Date(),
        amount: 194.98,
        dailyInterest: 0.3
    }
];
