import { TableProps } from "src/utils/types";
import ArrowRightIcon from "../../assets/icons/arrow-left.svg";
import ArrowLeftIcon from "../../assets/icons/arrow-right.svg";
import TableLineSkeleton from "./TableLineSkeleton";

export default function TableSkeleton({ title, subTitle }: TableProps) {
    return (
        <div className="container min-w-full py-4 pr-4 xl:pr-0 animate-fade-right">
            <div className="px-4 overflow-x-auto">
                <div className="relative h-16 p-3 -mb-6 mx-4 rounded-2xl bg-purple-600 xl:py-2">
                    <p className="font-medium text-base animate-fade-in xl:text-lg text-light-color">{title}</p>
                    <p className="text-xs text-light-color animate-fade-in xl:text-sm">{subTitle}</p>
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
                            <TableLineSkeleton />
                        </tbody>
                    </table>
                    <div className="px-4 bg-white py-4 flex flex-col xs:flex-row items-center xs:justify-between">
                        <div className="flex items-center">
                            <button type="button" className="p-2 border rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                <ArrowRightIcon width={16} stroke="#7E22CE" />
                            </button>
                            <div className="w-24 h-10 animate-pulse bg-gray-300" >
                            </div>
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