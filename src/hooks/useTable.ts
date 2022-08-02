import { useState } from "react";
import { useDataContext } from "src/context/data";
import { EnumTitleTypes, FecthTitleResponse, TitleData } from "src/utils/types";
import { equalsEnum, firstElement, getArrayOfElements, getDefaultPageSize } from "src/utils/utils";

export default function useTable() {
    const { titlesData } = useDataContext();
    const [listPageSize, setListPageSize] = useState<number[]>();
    const [selectedTitle, setSelectedTitle] = useState<TitleData>();
    const [showModal, setShowModal] = useState(false);
    const [isFetchingData, setFetchingData] = useState(true);
    const [titleType, setTitleType] = useState<EnumTitleTypes>();

    function updateListPageSize(data: FecthTitleResponse) {
        setListPageSize(getArrayOfElements(Math.ceil(data.allResultsSize / getDefaultPageSize())));
    }

    function updateTitleType(data: FecthTitleResponse) {
        if (firstElement(data.results)) {
            setTitleType(firstElement(data.results).liquidated ? EnumTitleTypes.RECEIVED : EnumTitleTypes.TO_RECEIVE);
        }
    }

    function handleShowModal(title: TitleData) {
        setSelectedTitle(title);
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setSelectedTitle(undefined);
    }

    function changePage(pageIndex: number) {
        setFetchingData(true);

        if (equalsEnum(titleType, EnumTitleTypes.RECEIVED)) {
            titlesData.fetchRecivedTitlesData(pageIndex)
        } else {
            titlesData.fetchTitlesToReciveData(pageIndex);
        }
    }

    function renderPageNavigation(): boolean {
        return listPageSize && listPageSize.length ? true : false;
    }

    function goBackPage(page: number) {
        page > 0 ? changePage(page - 1) : () => false;
    }

    function goNextPage(page: number, listPageLength: number) {
        page + 1 < listPageLength ? changePage(page + 1) : () => false;
    }

    function goToIndexPage(page: number, pageIndex: number) {
        pageIndex != page + 1 ? changePage(pageIndex - 1) : () => false;
    }

    return {
        listPageSize, selectedTitle, showModal, isFetchingData, titleType, setFetchingData,
        handleShowModal, handleCloseModal, updateListPageSize, updateTitleType,
        renderPageNavigation, goBackPage, goNextPage, goToIndexPage
    }
}