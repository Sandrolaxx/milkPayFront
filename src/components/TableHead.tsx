import { EnumTitleType, TableHeadProps } from "src/utils/types";
import { equalsEnum } from "src/utils/utils";

export default function TableHead({ titleType }: TableHeadProps) {
    return (
        <thead>
            <tr>
                <th title="Identificador" scope="col" className={`whitespace-nowrap pt-6 px-6 border-b border-gray-200 
                    text-purple-700  text-left text-sm uppercase font-normal cursor-help`}>
                    Id.
                </th>
                <th title="Número Nota Fiscal" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 border-b 
                    cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                    Número NF
                </th>
                <th title="Tipo Recebimento(PIX/Boleto)" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 
                    border-b cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                    Tipo Recebimento
                </th>
                <th title="Identificador do Tipo Recebimento" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 border-b 
                    cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                    Id. Recebimento
                </th>
                <th title="Data de Realização do Serviço/Venda" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 border-b 
                    cursor-help first-letter:border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                    Data Serviço/Venda
                </th>
                <th title="Data Prevista do Recebimento" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 border-b 
                    cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                    Data Recebimento
                </th>
                <th title="Valor Total Título a ser Recebido" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 
                    border-b cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                    Valor Total Título
                </th>
                {(equalsEnum(titleType, EnumTitleType.TO_RECEIVE)
                    && !equalsEnum(titleType, EnumTitleType.ALL)) &&
                    <th title="Solicitar Antecipação" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3 border-b 
                        cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                        Antecipar
                    </th>
                }
                {(equalsEnum(titleType, EnumTitleType.RECEIVED)
                    || equalsEnum(titleType, EnumTitleType.ALL)) &&
                    <>
                        <th title="Visualizar Comprovante" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3
                            border-b cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                            Valor Juro
                        </th>
                        <th title="Visualizar Comprovante" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3
                            border-b cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                            Valor Recebido
                        </th>
                        <th title="Visualizar Comprovante" scope="col" className={`whitespace-nowrap pt-8 px-5 py-3
                            border-b cursor-help border-gray-200 text-purple-700 text-left text-sm font-normal`}>
                            Comprovante
                        </th>
                    </>
                }
            </tr>
        </thead>
    );
}