import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDataContext } from "src/context/data";
import { bankSlipayment, consultBankSlip, consultPixKey, consultReceipt, pixPayment } from "src/utils/restClient";
import { BankSlip, ConsultPixKey, EnumModalSteps, EnumPaymentType, ModalCardProps, PaymentResponse } from "src/utils/types";
import { equalsEnum, formatMoney, formatTextSize, getPixPaymentDto, getTotalInterest } from "src/utils/utils";
import DownloadIcon from "../assets/icons/download.svg";
import ModalCardButtons from "./ModalCardButtons";
import ModalCardStepTwoSkeleton from "./skeleton/ModalCardStepTwoSkeleton";
import ModalReceiptSkeleton from "./skeleton/ModalReceiptSkeleton";

export default function ModalCard({ title, handleClose }: ModalCardProps) {
    const router = useRouter();
    const { titlesData, cardsData } = useDataContext();
    const [step, setStep] = useState<EnumModalSteps>();
    const [pixKeyData, setPixKeyData] = useState<ConsultPixKey>();
    const [bankSlipData, setBankSlipData] = useState<BankSlip>();
    const [receiptData, setReceipt] = useState<string>();
    const [isConsultData, setConsultData] = useState(true);
    const [isPaymentDataCorrect, setPaymentDataCorrect] = useState(false);
    const [isPaymentConfirmed, setPaymentConfirmed] = useState(false);

    useEffect(() => {
        if (title.liquidated) {
            setStep(EnumModalSteps.STEP_RECEIPT);
            handleConsultReceipt();

            return;
        }

        return setStep(EnumModalSteps.STEP_ONE);
    }, []);

    function handleStartStepTwo() {
        if (equalsEnum(title.paymentType, EnumPaymentType.PIX)) {
            handleConsultPixKey();
        } else {
            handleConsultBoleto();
        }

        setStep(EnumModalSteps.STEP_TWO);
    }

    function handleConsultPixKey() {
        consultPixKey(title.pixKey)
            .then(res => {
                if (res == null) {
                    handleClose();
                }

                setPixKeyData(res);
                setConsultData(false);
            })
            .catch(() => router.push("/auth"));
    }

    function handleConsultBoleto() {
        const bankSlip: BankSlip = {
            barcode: title.barcode,
            digitable: title.digitable
        }

        consultBankSlip(bankSlip)
            .then(res => {
                if (res == null) {
                    handleClose();
                }

                setBankSlipData(res);
                setConsultData(false);
            })
            .catch(() => router.push("/auth"));
    }

    function handleConsultReceipt() {
        consultReceipt(title.txId)
            .then(res => {
                if (res == null) {
                    handleClose();
                }

                setStep(EnumModalSteps.STEP_RECEIPT);
                setReceipt("data:image/png;base64," + res.receiptImage);
                setConsultData(false);
            })
            .catch(() => router.push("/auth"));
    }

    function handlePayment() {
        if (equalsEnum(title.paymentType, EnumPaymentType.PIX)) {
            handlePaymentPix()
        } else {
            handlePaymentBoleto();
        }
    }

    function handlePaymentPix() {
        const pixDto = getPixPaymentDto(pixKeyData!, title.id);

        pixPayment(pixDto)
            .then(handleShowReceiptAfterPayment)
            .catch(err => err);
    }

    function handlePaymentBoleto() {
        bankSlipData!.titleId = title.id;
        console.log(JSON.stringify(bankSlipData));

        bankSlipayment(bankSlipData!)
            .then(handleShowReceiptAfterPayment)
            .catch(err => err);
    }

    function handleShowReceiptAfterPayment(paymentRes: PaymentResponse) {
        if (!paymentRes) {
            handleClose();
        }

        titlesData.fetchRecivedTitlesData();
        titlesData.fetchTitlesToReciveData();
        cardsData.fetchCardsData();

        setStep(EnumModalSteps.STEP_RECEIPT);
        setReceipt("data:image/png;base64," + paymentRes.receiptImage);
    }

    return (
        <div className={`w-96 min-w-0 min-h-min flex bg-light-color rounded-3xl border-2 shadow-md animate-fade-down`}>
            {equalsEnum(step, EnumModalSteps.STEP_ONE) &&
                <div className="w-full h-full flex flex-col justify-start items-center mt-2">
                    <h1 className="font-medium text-lg my-2">Dados da Transação</h1>
                    <span className="w-full flex flex-row justify-between px-6 py-1">
                        <p className="font-medium">
                            {equalsEnum(title.paymentType, EnumPaymentType.PIX) ? 'Valor Bruto' : 'Total'}
                        </p>
                        <p>{formatMoney(title.amount)}</p>
                    </span>
                    {
                        equalsEnum(title.paymentType, EnumPaymentType.PIX) &&
                        <>
                            <span className="w-full flex flex-row justify-between px-6 py-1">
                                <p className="font-medium">Juro diário</p>
                                <p>{title.dailyInterest}%</p>
                            </span>
                            <span className="w-full flex flex-row justify-between px-6 py-1">
                                <p className="font-medium">Juro total</p>
                                <p>{getTotalInterest(title.dailyInterest, new Date(title.dueDate))}%</p>
                            </span>
                            <span className="w-full flex flex-row justify-between px-6 py-1">
                                <p className="font-medium">Valor juro</p>
                                <p>{formatMoney(title.amount - title.finalAmount)}</p>
                            </span>
                            <span className="w-full flex flex-row justify-between px-6 py-4">
                                <p className="font-medium">Total</p>
                                <p>{formatMoney(title.finalAmount)}</p>
                            </span>
                        </>
                    }
                    <ModalCardButtons isEnabled handleClose={handleClose} handleContinue={handleStartStepTwo} />
                </div>}
            {equalsEnum(step, EnumModalSteps.STEP_TWO) &&
                <div className="w-full h-full flex flex-col justify-start items-center mt-2">
                    <h1 className="font-medium text-lg my-2">Dados do Recebedor</h1>
                    {isConsultData ?
                        <ModalCardStepTwoSkeleton isBankslipPayment={equalsEnum(title.paymentType, EnumPaymentType.BOLETO)} />
                        :
                        equalsEnum(title.paymentType, EnumPaymentType.PIX) ?
                            <>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Nome</p>
                                    <p>{pixKeyData?.owner.name}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Documento</p>
                                    <p>{pixKeyData?.owner.taxIdNumber}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Chave</p>
                                    <p>{pixKeyData?.key}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Tipo</p>
                                    <p>{pixKeyData?.keyType}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Banco</p>
                                    <p>{pixKeyData?.account.participant}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Agência</p>
                                    <p>{pixKeyData?.account.branch}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Conta</p>
                                    <p>{pixKeyData?.account.accountNumber}</p>
                                </span>
                                <span className="w-full flex justify-center items-center py-1">
                                    <input className="mx-2" type="checkbox" name="confirmPaymentData" id="checkbox"
                                        onChange={e => setPaymentDataCorrect(e.target.checked)} />
                                    <p>Dados da Transferência Corretos</p>
                                </span>
                            </>
                            :
                            <>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Banco</p>
                                    <p title={bankSlipData?.receiverBank} className="cursor-help">
                                        {formatTextSize(bankSlipData?.receiverBank!, 22)}
                                    </p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Nome Pagador</p>
                                    <p title={bankSlipData?.payerName} className="cursor-help">
                                        {formatTextSize(bankSlipData?.payerName!, 20)}
                                    </p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Doc. Pagador</p>
                                    <p>{bankSlipData?.payerDocument}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Nome Beneficiário</p>
                                    <p title={bankSlipData?.receiverName} className="cursor-help">
                                        {formatTextSize(bankSlipData?.receiverName!, 20)}
                                    </p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Doc. Beneficiário</p>
                                    <p>{bankSlipData?.receiverDocument}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Linha Digitável</p>
                                    <p title={bankSlipData?.digitable} className="cursor-help">
                                        {bankSlipData?.digitable.slice(0, 14)}...
                                    </p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Vencimento</p>
                                    <p>{bankSlipData?.dueDate}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Multa</p>
                                    <p>{formatMoney(bankSlipData?.fine!)}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Juro</p>
                                    <p>{formatMoney(bankSlipData?.interest!)}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Desconto</p>
                                    <p>{formatMoney(bankSlipData?.discount!)}</p>
                                </span>
                                <span className="w-full flex flex-row justify-between px-6 py-1">
                                    <p className="font-medium">Valor</p>
                                    <p>{formatMoney(bankSlipData?.amount!)}</p>
                                </span>
                                <span className="w-full flex justify-center items-center py-1">
                                    <input className="mx-2" type="checkbox" name="confirmPaymentData" id="checkbox"
                                        onChange={e => setPaymentDataCorrect(e.target.checked)} />
                                    <p>Dados da Transferência Corretos</p>
                                </span>
                            </>
                    }
                    <ModalCardButtons isEnabled={isPaymentDataCorrect} handleClose={handleClose}
                        handleContinue={() => setStep(EnumModalSteps.STEP_THREE)} />
                </div>
            }
            {equalsEnum(step, EnumModalSteps.STEP_THREE) &&
                <div className="w-full h-full flex flex-col justify-start items-center mt-2">
                    <h1 className="font-medium text-lg my-2">Confirmação de Antecipação</h1>
                    <p className="mx-6 mb-4 text-lg text-center">
                        Deseja mesmo realizar a antecipação no valor de {
                            formatMoney(title.finalAmount ? title.finalAmount : title.amount)
                        }?
                    </p>
                    <span className="w-full flex justify-center items-center py-1">
                        <input className="mx-2" type="checkbox" name="confirmPaymentData" id="checkbox"
                            onChange={e => setPaymentConfirmed(e.target.checked)} />
                        <p className="mr-1">Concordo com os</p>
                        <p className="underline">termos de uso.</p>
                    </span>
                    <ModalCardButtons isEnabled={isPaymentConfirmed} handleClose={handleClose} handleContinue={handlePayment} />
                </div>}
            {equalsEnum(step, EnumModalSteps.STEP_RECEIPT) &&
                <div className="w-full h-full flex flex-col justify-start items-center mt-2">
                    <h1 className="font-medium text-lg my-2 mt-2">Comprovante de Pagamento📃</h1>
                    {isConsultData ?
                        <ModalReceiptSkeleton />
                        :
                        <div className="flex flex-col items-center rounded-3xl bg-purple-600">
                            {receiptData &&
                                <>
                                    <Image alt="Logo MilkPay" className="rounded-b-3xl rounded-t-2xl" src={receiptData} width={320} height={636} quality={100} />
                                    <a href={receiptData} download={"comprovante.png"} title="Realizar download do comprovante" className="w-full cursor-pointer">
                                        <DownloadIcon className="w-full text-white my-3" width={28} key={"Download Icon"} />
                                    </a>
                                </>
                            }
                        </div>
                    }
                    <ModalCardButtons isEnabled={isPaymentConfirmed} handleClose={handleClose} />
                </div>
            }
        </div>
    );
}