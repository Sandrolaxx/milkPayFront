import ArrowRightIcon from "../assets/icons/arrow-left.svg";
import ArrowLeftIcon from "../assets/icons/arrow-right.svg";
import BoletoIcon from "../assets/icons/barcode.svg";
import PixIcon from "../assets/icons/pix.svg";

export default function Table() {
    return (
        <div className="container min-w-full py-4 pr-4 xl:pr-0 animate-fade-right">
            <div className="px-4 overflow-x-auto">
                <div className="relative h-16 p-3 -mb-6 mx-4 rounded-2xl bg-purple-600 xl:py-2">
                    <p className="font-medium text-base xl:text-lg text-light-color">Títulos a Receber</p>
                    <p className="text-xs text-light-color xl:text-sm">Dados dos Recebimentos dos próximos 30 dias.</p>
                </div>
                <div className="inline-block min-w-full shadow-md border-2 rounded-3xl overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th title="Identificador" scope="col" className={`pt-6 px-6 border-b border-gray-200 
                                    text-purple-700  text-left text-sm uppercase font-normal cursor-help`}>
                                    Id.
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Número NF
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Tipo Recebimento
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Id. Recebimento
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Data Serviço/Venda
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Data Recebimento
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Valor Total Título
                                </th>
                                <th title="Identificador" scope="col" className={`pt-8 px-5 py-3 border-b cursor-help 
                                    border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                                    Antecipar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        1231234
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-colorwhitespace-no-wrap">
                                        4564234
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        BOLETO
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <BoletoIcon width={32} height={32} stroke="#212121" />
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        12/09/2020
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        12/09/2020
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        R$ 234,43
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <button className="px-3 py-1 font-semibold bg-dark-color rounded-full text-light-color leading-tight">
                                        ANTECIPAR
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        1231234
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-colorwhitespace-no-wrap">
                                        4564234
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        PIX
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <PixIcon width={32} height={32} fill="#212121" />
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        12/09/2020
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        12/09/2020
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <p className="text-dark-color whitespace-no-wrap">
                                        R$ 234,43
                                    </p>
                                </td>
                                <td className="p-5 border-b border-gray-200 text-sm">
                                    <button className="px-3 py-1 font-semibold bg-dark-color rounded-full text-light-color leading-tight">
                                        ANTECIPAR
                                    </button>
                                </td>
                            </tr>
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