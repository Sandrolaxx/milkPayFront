import { useRouter } from "next/router";
import { useState } from "react";
import { useDataContext } from "src/context/data";
import { consultPixKey, pixPayment } from "src/utils/restClient";
import { ConsultPixKey, EnumModalSteps, EnumPaymentType, ModalCardProps } from "src/utils/types";
import { equalsEnum, formatMoney, getPixDto } from "src/utils/utils";
import ModalCardButtons from "./ModalCardButtons";
import ModalCardStepTwoSkeleton from "./skeleton/ModalCardStepTwoSkeleton";

export default function ModalCard({ title, handleClose }: ModalCardProps) {
    const [step, setStep] = useState(EnumModalSteps.STEP_ONE);
    const [isConsultData, setConsultData] = useState(true);
    const [pixKeyData, setPixKeyData] = useState<ConsultPixKey>();
    const [isPaymentDataCorrect, setPaymentDataCorrect] = useState(false);
    const [isPaymentConfirmed, setPaymentConfirmed] = useState(false);
    const { titlesData } = useDataContext();
    const router = useRouter();

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
                setPixKeyData(res);
                setConsultData(false);
            }).catch(() => {
                handleClose();
            });
    }

    function handleConsultBoleto() {
        console.log("TO-DO fluxo boleto");
    }

    function handlePayment() {

        if (equalsEnum(title.paymentType, EnumPaymentType.PIX)) {
            handlePaymentPix()
        } else {
            handlePaymentBoleto();
        }

        handleClose();
    }

    function handlePaymentPix() {
        const pixDto = getPixDto(pixKeyData!, title.id);

        pixPayment(pixDto)
            .then(res => {
                titlesData.fetchRecivedTitlesData();
                titlesData.fetchTitlesToReciveData();

                console.log(res.receipt)
            })
            .catch(() => router.push("/auth"));
    }

    function handlePaymentBoleto() {
        console.log("TO-DO fluxo boleto");
    }

    return (
        <div className={`w-1/5 min-w-min min-h-min flex bg-light-color rounded-3xl 
            border-2 shadow-md animate-fade-down`}>
            {equalsEnum(step, EnumModalSteps.STEP_ONE) &&
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <h1 className="font-medium text-lg my-6">Dados da Transação</h1>
                    <span className="w-full flex my- flex-row justify-between px-6 py-1">
                        <p className="font-medium">Valor</p>
                        <p>{formatMoney(title.amount)}</p>
                    </span>
                    <span className="w-full flex my- flex-row justify-between px-6 py-1">
                        <p className="font-medium">Juro diário</p>
                        <p>{title.dailyInterest}%</p>
                    </span>
                    <span className="w-full flex my- flex-row justify-between px-6 py-1">
                        <p className="font-medium">Juro total</p>
                        <p>{title.dailyInterest}%</p>
                    </span>
                    <span className="w-full flex my- flex-row justify-between px-6 py-1">
                        <p className="font-medium">Valor juro</p>
                        <p>{title.dailyInterest}</p>
                    </span>
                    <span className="w-full flex my- flex-row justify-between px-6 py-4">
                        <p className="font-medium">Total</p>
                        <p>{formatMoney(title.amount)}</p>
                    </span>
                    <ModalCardButtons isEnabled handleClose={handleClose} handleContinue={handleStartStepTwo} />
                </div>}
            {equalsEnum(step, EnumModalSteps.STEP_TWO) &&
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <h1 className="font-medium text-lg my-6">Dados do Recebedor</h1>
                    {isConsultData && equalsEnum(title.paymentType, EnumPaymentType.PIX) ?
                        <ModalCardStepTwoSkeleton />
                        :
                        <>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Nome</p>
                                <p>{pixKeyData?.owner.name}</p>
                            </span>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Documento</p>
                                <p>{pixKeyData?.owner.taxIdNumber}</p>
                            </span>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Chave</p>
                                <p>{pixKeyData?.key}</p>
                            </span>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Tipo</p>
                                <p>{pixKeyData?.keyType}</p>
                            </span>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Banco</p>
                                <p>{pixKeyData?.account.participant}</p>
                            </span>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Agência</p>
                                <p>{pixKeyData?.account.branch}</p>
                            </span>
                            <span className="w-full flex my- flex-row justify-between px-6 py-1">
                                <p className="font-medium">Conta</p>
                                <p>{pixKeyData?.account.accountNumber}</p>
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
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <h1 className="font-medium text-lg my-6">Confirmação de Antecipação</h1>
                    <p className="mx-6 mb-4 text-lg text-center">
                        Deseja mesmo realizar a antecipação no valor de {formatMoney(title.amount)}?
                    </p>
                    <span className="w-full flex justify-center items-center py-1">
                        <input className="mx-2" type="checkbox" name="confirmPaymentData" id="checkbox"
                            onChange={e => setPaymentConfirmed(e.target.checked)} />
                        <p className="mr-1">Concordo com os</p>
                        <p className="underline">termos de uso.</p>
                    </span>
                    <ModalCardButtons isEnabled={isPaymentConfirmed} handleClose={handleClose}
                        handleContinue={handlePayment} />
                </div>}
        </div>
    );
}