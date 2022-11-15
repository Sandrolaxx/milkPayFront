import { EnumTitleType, TableBodyProps } from "src/utils/types";
import * as utils from "src/utils/utils";
import BoletoIcon from "../assets/icons/barcode.svg";
import PixIcon from "../assets/icons/pix.svg";
import ReceiptIcon from "../assets/icons/receipt-solid.svg";

export default function TableBody({ titles, titleType, handleShowModal }: TableBodyProps) {
    return (
        <tbody>
            {titles.map(result => (
                <tr key={result.id}>
                    <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-dark-color whitespace-no-wrap">
                            {result.id}
                        </p>
                    </td>
                    <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                        <p className="text-dark-colorwhitespace-no-wrap">
                            {result.nfNumber}
                        </p>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <p className="text-dark-color whitespace-no-wrap">
                            {result.paymentType}
                        </p>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm"
                        title={result.pixKey ?? result.digitable ?? result.barcode}>
                        {result.paymentType == "BOLETO" ?
                            <BoletoIcon width={32} height={32} stroke="#212121" />
                            :
                            <PixIcon width={32} height={32} stroke="#212121" />
                        }
                    </td>
                    <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                        <p className="text-dark-color whitespace-no-wrap">
                            {utils.formatDateStrToDDMMYYYYHHMMSS(result.inclusionDate)}
                        </p>
                    </td>
                    <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                        <p className="text-dark-color whitespace-no-wrap">
                            {utils.formatDateStrToDDMMYYYY(result.dueDate)}
                        </p>
                    </td>
                    <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                        <p className="text-dark-color whitespace-no-wrap">
                            {utils.formatMoneyWithSign(result.amount)}
                        </p>
                    </td>
                    {(utils.equalsEnum(titleType, EnumTitleType.TO_RECEIVE)
                        && !utils.equalsEnum(titleType, EnumTitleType.ALL)) &&
                        <td className="p-5 border-b border-gray-200 text-sm">
                            <button onClick={() => handleShowModal(result)} className={`px-3 py-1 
                                                font-semibold bg-dark-color rounded-full text-light-color leading-tight`}>
                                ANTECIPAR
                            </button>
                        </td>
                    }
                    {(utils.equalsEnum(titleType, EnumTitleType.RECEIVED)
                        || utils.equalsEnum(titleType, EnumTitleType.ALL)) &&
                        <>
                            <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                                <p className="text-dark-color whitespace-no-wrap">
                                    {result.liquidated && utils.formatMoneyWithSign((result.amount - result.finalAmount))}
                                </p>
                            </td>
                            <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                                <p className="text-dark-color whitespace-no-wrap">
                                    {result.liquidated && utils.formatMoneyWithSign(result.finalAmount)}
                                </p>
                            </td>
                            <td className="whitespace-nowrap p-5 border-b border-gray-200 text-sm">
                                {result.liquidated &&
                                    <button onClick={() => handleShowModal(result)} title="Visualizar comprovante"
                                        className="w-full flex justify-center" >
                                        <ReceiptIcon width={24} height={24} fill="#7001DF" />
                                    </button>
                                }
                            </td>
                        </>
                    }
                </tr>
            ))}
        </tbody>
    );
}