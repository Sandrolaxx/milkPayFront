import { useRouter } from "next/router";
import { useState } from "react";
import { fetchTitles } from "src/utils/restClient";
import { FecthTitleResponse } from "src/utils/types";
import { getFetchTitlesParams } from "src/utils/utils";

export function useTitleData() {
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

    return {
        titlesToReceive,
        receivedTitles,
        fetchTitlesToReciveData,
        fetchRecivedTitlesData,
    };
}
