import { useRouter } from "next/router";
import { useState } from "react";
import { fetchTitles } from "src/utils/restClient";
import { FecthTitleParams, FecthTitleResponse } from "src/utils/types";
import { getFetchTitlesParams } from "src/utils/utils";

export function useTitleData() {
    const [allTitles, setAllTitles] = useState<FecthTitleResponse>();
    const [titlesToReceive, setTitlesRecive] = useState<FecthTitleResponse>();
    const [receivedTitles, setReceivedTitles] = useState<FecthTitleResponse>();
    const router = useRouter();

    function fetchTitlesToReciveData(pageIndex?: number, pageSize?: number) {
        const titlesToReceiveParams = getFetchTitlesParams(pageIndex, pageSize, false);

        fetchTitles(titlesToReceiveParams)
            .then(res => setTitlesRecive(res))
            .catch(() => router.push("/auth"));
    }

    function fetchRecivedTitlesData(pageIndex?: number, pageSize?: number) {
        const receivedTitlesParams = getFetchTitlesParams(pageIndex, pageSize, true);

        fetchTitles(receivedTitlesParams)
            .then(res => setReceivedTitles(res))
            .catch(() => router.push("/auth"));
    }

    function fetchAllTitlesData(filterParams: FecthTitleParams) {
        fetchTitles(filterParams)
            .then(res => setAllTitles(res))
            .catch(() => router.push("/auth"));
    }

    return {
        allTitles,
        titlesToReceive,
        receivedTitles,
        fetchAllTitlesData,
        fetchTitlesToReciveData,
        fetchRecivedTitlesData,
    };
}
