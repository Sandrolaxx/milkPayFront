import { useEffect, useState } from "react";
import { useDataContext } from "src/context/data";
import { EnumTitleTypes, TableProps, TitleData } from "src/utils/types";
import * as util from "src/utils/utils";
import ArrowRightIcon from "../assets/icons/arrow-left.svg";
import ArrowLeftIcon from "../assets/icons/arrow-right.svg";
import BoletoIcon from "../assets/icons/barcode.svg";
import PixIcon from "../assets/icons/pix.svg";
import ModalCard from "./ModalCard";
import TableLineSkeleton from "./skeleton/TableLineSkeleton";
import TableHead from "./TableHead";

export default function Table({ title, subTitle, data }: TableProps) {
    const { titlesData } = useDataContext();
    const [listPageSize, setListPageSize] = useState<number[]>();
    const [selectedTitle, setSelectedTitle] = useState<TitleData>();
    const [showModal, setShowModal] = useState(false);
    const [isFetchingData, setFetchingData] = useState(false);
    const [titleType, setTitleType] = useState<EnumTitleTypes>();

    useEffect(() => {
        setFetchingData(false);
        setListPageSize(util.getArrayOfElements(Math.ceil(data?.allResultsSize! / util.getDefaultPageSize())));
        setTitleType(util.firstElement(data?.results!)?.liquidated ? EnumTitleTypes.RECEIVED : EnumTitleTypes.TO_RECEIVE);
    }, [data]);

    function changePage(pageIndex: number) {
        setFetchingData(true);

        if (util.equalsEnum(titleType, EnumTitleTypes.RECEIVED)) {
            titlesData.fetchRecivedTitlesData(pageIndex)
        } else {
            titlesData.fetchTitlesToReciveData(pageIndex);
        }
    }

    function handleShowModal(title: TitleData) {
        setSelectedTitle(title);
        setShowModal(true);
    }

    return (
        <>
            {showModal &&
                <div className="fixed z-10 inset-0 backdrop-blur-[2px] overflow-auto flex justify-center items-center">
                    <ModalCard title={selectedTitle!} handleClose={() => setShowModal(false)} />
                </div>
            }
            <div className="container min-w-full py-4 pr-4 xl:pr-0">
                <div className="px-4 overflow-x-auto">
                    <div className="relative h-16 p-3 -mb-6 mx-4 rounded-2xl bg-purple-600 xl:py-2">
                        <p className="font-medium text-base xl:text-lg text-light-color">{title}</p>
                        <p className="text-xs text-light-color xl:text-sm">{subTitle}</p>
                    </div>
                    <div className="inline-block min-w-full shadow-md border-2 rounded-3xl overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <TableHead titleType={titleType!} />
                            <tbody>
                                {isFetchingData ?
                                    <TableLineSkeleton />
                                    :
                                    data!.results.map(result => (
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
                                            <td className="p-5 border-b border-gray-200 text-sm"
                                                title={result.pixKey ?? result.digitable ?? result.barcode}>
                                                {result.paymentType == "BOLETO" ?
                                                    <BoletoIcon width={32} height={32} stroke="#212121" />
                                                    :
                                                    <PixIcon width={32} height={32} stroke="#212121" />
                                                }
                                            </td>
                                            <td className="p-5 border-b border-gray-200 text-sm">
                                                <p className="text-dark-color whitespace-no-wrap">
                                                    {util.formatDateStrToDDMMYYYYHHMMSS(result.inclusionDate)}
                                                </p>
                                            </td>
                                            <td className="p-5 border-b border-gray-200 text-sm">
                                                <p className="text-dark-color whitespace-no-wrap">
                                                    {util.formatDateStrToDDMMYYYY(result.dueDate)}
                                                </p>
                                            </td>
                                            <td className="p-5 border-b border-gray-200 text-sm">
                                                <p className="text-dark-color whitespace-no-wrap">
                                                    {util.formatMoney(result.amount)}
                                                </p>
                                            </td>
                                            {
                                                !result.liquidated &&
                                                <td className="p-5 border-b border-gray-200 text-sm">
                                                    <button onClick={() => handleShowModal(result)} className={`px-3 py-1 
                                                font-semibold bg-dark-color rounded-full text-light-color leading-tight`}>
                                                        ANTECIPAR
                                                    </button>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {listPageSize && listPageSize.length ?
                            <div className="px-4 bg-white py-4 flex flex-col xs:flex-row items-center xs:justify-between">
                                <div className="flex items-center">
                                    <button type="button" onClick={data?.page! > 0 ? () => changePage(data?.page! - 1) : () => false}
                                        className="p-2 border rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                        <ArrowRightIcon width={16} stroke="#7E22CE" />
                                    </button>
                                    {listPageSize!.map(pageIndex => (
                                        <button key={pageIndex} type="button" onClick={pageIndex != data?.page! + 1 ? () => changePage(pageIndex - 1) : () => false}
                                            className={`px-4 py-2 border-t border-b text-base hover:bg-gray-100
                                            ${pageIndex == data?.page! + 1 ? 'text-purple-600' : 'text-gray-500'} `}>
                                            {pageIndex}
                                        </button>
                                    ))}
                                    <button type="button" onClick={data?.page! + 1 < listPageSize.length ? () => changePage(data?.page! + 1) : () => false}
                                        className="p-2 border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                                        <ArrowLeftIcon width={16} stroke="#7E22CE" />
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="flex justify-center items-center h-16">
                                Nenhum registro encontrado
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}