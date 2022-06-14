import { TableProps } from "src/utils/types";
import ArrowRightIcon from "../assets/icons/arrow-left.svg";
import ArrowLeftIcon from "../assets/icons/arrow-right.svg";
import BoletoIcon from "../assets/icons/barcode.svg";
import PixIcon from "../assets/icons/pix.svg";

export default function Table({ title, subTitle, data }: TableProps) {
    return (
        <div className="container min-w-full py-4 pr-4 xl:pr-0">
            <div className="px-4 overflow-x-auto">
                <div className="relative h-16 p-3 -mb-6 mx-4 rounded-2xl bg-purple-600 xl:py-2">
                    <p className="font-medium text-base xl:text-lg text-light-color">{title}</p>
                    <p className="text-xs text-light-color xl:text-sm">{subTitle}</p>
                </div>
                <div className="inline-block min-w-full shadow-md border-2 rounded-3xl overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th title="Identificador" scope="col" className={`pt-6 px-6 border-b border-gray-200 
                                    text-purple-700  text-left text-sm uppercase font-normal cursor-help`}>
                                    Id.
                                </th>
                                <th title="Número Nota Fiscal" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Número NF
                                </th>
                                <th title="Tipo Recebimento(PIX/Boleto)" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Tipo Recebimento
                                </th>
                                <th title="Identificador do Tipo Recebimento" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Id. Recebimento
                                </th>
                                <th title="Data de Realização do Serviço/Venda" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Data Serviço/Venda
                                </th>
                                <th title="Data Prevista do Recebimento" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Data Recebimento
                                </th>
                                <th title="Valor Total Título a ser Recebido" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Valor Total Título
                                </th>
                                <th title="Solicitar Antecipação" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Antecipar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map(result => (
                                <tr key={result.id} >
                                    <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-dark-color whitespace-no-wrap">
                                            {result.id}
                                        </p>
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm">
                                        <p className="text-dark-colorwhitespace-no-wrap">
                                            {result.nfNumber}
                                        </p>
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm">
                                        <p className="text-dark-color whitespace-no-wrap">
                                            {result.paymentType}
                                        </p>
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm" title={result.paymentId}>
                                        {result.paymentType == "BOLETO" ?
                                            <BoletoIcon width={32} height={32} stroke="#212121" />
                                            :
                                            <PixIcon width={32} height={32} stroke="#212121" />
                                        }
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm">
                                        <p className="text-dark-color whitespace-no-wrap">
                                            {result.inclusionDate.toISOString()}
                                        </p>
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm">
                                        <p className="text-dark-color whitespace-no-wrap">
                                            {result.dueDate.toISOString()}
                                        </p>
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm">
                                        <p className="text-dark-color whitespace-no-wrap">
                                            {result.amount}
                                        </p>
                                    </td>
                                    <td className="p-5 border-b border-gray-200 text-sm">
                                        <button className="px-3 py-1 font-semibold bg-dark-color rounded-full text-light-color leading-tight">
                                            ANTECIPAR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-4 bg-white py-4 flex flex-col xs:flex-row items-center xs:justify-between">
                        <div className="flex items-center">
                            <button type="button" className="p-2 border rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                <ArrowRightIcon width={16} stroke="#7E22CE" />
                            </button>
                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-purple-600 hover:bg-gray-100 ">
                                1
                            </button>
                            <button type="button" className="w-full px-4 py-2 border text-base text-gray-color hover:bg-gray-100">
                                2
                            </button>
                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-color hover:bg-gray-100">
                                3
                            </button>
                            <button type="button" className="w-full px-4 py-2 border text-base text-gray-color hover:bg-gray-100">
                                4
                            </button>
                            <button type="button" className="p-2 border-t border-b border-r rounded-r-xl text-gray-color hover:bg-gray-100">
                                <ArrowLeftIcon width={16} stroke="#7E22CE" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}