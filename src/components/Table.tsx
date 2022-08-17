import { useEffect } from "react";
import useTable from "src/hooks/useTable";
import { TableProps, TitleData } from "src/utils/types";
import ArrowRightIcon from "../assets/icons/arrow-left.svg";
import ArrowLeftIcon from "../assets/icons/arrow-right.svg";
import ModalCard from "./ModalCard";
import TableLineSkeleton from "./skeleton/TableLineSkeleton";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function Table({ title, subTitle, data, setShowModal }: TableProps) {
    const table = useTable();

    useEffect(() => {
        if (data) {
            table.setFetchingData(false);
            table.updateListPageSize(data);
            table.updateTitleType(data);
        }
    }, [data]);

    function handleShowModal(title: TitleData) {
        table.handleShowModal(title);
        setShowModal();
    }

    function handleCloseModal() {
        table.handleCloseModal();
        setShowModal();
    }

    return (
        <>
            {table.showModal &&
                <div className="fixed z-10 inset-0 backdrop-blur-[2px] overflow-auto flex justify-center items-center">
                    <ModalCard title={table.selectedTitle!} handleClose={handleCloseModal} />
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
                            <TableHead titleType={table.titleType!} />
                            {table.isFetchingData ?
                                <TableLineSkeleton />
                                :
                                <TableBody titles={data.results} titleType={table.titleType!} handleShowModal={handleShowModal} />
                            }
                        </table>
                        {table.renderPageNavigation() ?
                            <div className="px-4 bg-white py-4 flex flex-col xs:flex-row items-center xs:justify-between">
                                <div className="flex items-center">
                                    <button type="button" onClick={() => table.goBackPage(data.page)}
                                        className="p-2 border rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                        <ArrowRightIcon width={16} stroke="#7E22CE" />
                                    </button>
                                    {table.listPageSize!.map(pageIndex => (
                                        <button key={pageIndex} type="button" onClick={() => table.goToIndexPage(data.page, pageIndex)}
                                            className={`px-4 py-2 border-t border-b text-base hover:bg-gray-100
                                            ${pageIndex == data?.page! + 1 ? 'text-purple-600' : 'text-gray-500'} `}>
                                            {pageIndex}
                                        </button>
                                    ))}
                                    <button type="button" onClick={() => table.goNextPage(data.page, table.listPageSize?.length!)}
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