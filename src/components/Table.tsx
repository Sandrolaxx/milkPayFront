export default function Table() {
    return (
        <div className="container min-w-full py-4 pr-4 xl:pr-0 animate-fade-right">
            <div className="px-4 overflow-x-auto">
                <div className="relative h-16 p-3 pl-3 -mb-6 mx-4 rounded-2xl bg-purple-600 xl:p-2">
                    <p className="font-medium text-base xl:text-lg text-light-color">Títulos a Receber</p>
                    <p className="text-xs text-light-color xl:text-sm">Dados dos Recebimentos dos próximos 30 dias.</p>
                </div>
                <div className="inline-block min-w-full shadow-md border-2 rounded-3xl overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th title="Identificador" scope="col" className={`pt-6 px-6 bg-white  border-b border-gray-200 
                                text-gray-800  text-left text-sm uppercase font-normal cursor-help`}>
                                    Id.
                                </th>
                                <th scope="col" className={`pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help`}>
                                    Número NF
                                </th>
                                <th scope="col" className="pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help">
                                    Tipo Recebimento
                                </th>
                                <th scope="col" className="pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help">
                                    Id. Recebimento
                                </th>
                                <th scope="col" className="pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help">
                                    Data Serviço/Venda
                                </th>
                                <th scope="col" className="pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help">
                                    Data Recebimento
                                </th>
                                <th scope="col" className="pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help">
                                    Valor Total Título
                                </th>
                                <th scope="col" className="pt-8 px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal cursor-help">
                                    Antecipar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        1231234
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        4564234
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        BOLETO
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        ICON
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        12/09/2020
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        12/09/2020
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        R$ 234,43
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                        </span>
                                        <span className="relative">
                                            ANTECIPAR
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                        <div className="flex items-center">
                            <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                1
                            </button>
                            <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                2
                            </button>
                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                3
                            </button>
                            <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                4
                            </button>
                            <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}