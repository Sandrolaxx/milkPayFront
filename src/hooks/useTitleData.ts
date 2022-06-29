import { useRouter } from "next/router";
import { useState } from "react";
import { fetchTitles } from "src/utils/restClient";
import { FecthTitleParams, FecthTitleResponse } from "src/utils/types";

export function useTitleData() {
    const [titlesToReceive, setTitlesRecive] = useState<FecthTitleResponse>();
    const [receivedTitles, setReceivedTitles] = useState<FecthTitleResponse>();
    const router = useRouter();

    function fetchTitlesToReciveData(pageIndex?: number, pageSize?: number) {
        const titlesToReceiveParams: FecthTitleParams = {
            offset: "24/06/2022",
            limit: "26/07/2022",
            pageIndex: pageIndex ?? 0,
            pageSize: pageSize ?? 5,
            liquidated: false
        };

        fetchTitles(titlesToReceiveParams)
            .then(res => {
                setTitlesRecive(res);
            })
            .catch(err => router.push("/auth"));
    }

    function fetchRecivedTitlesData(pageIndex?: number, pageSize?: number) {
        const receivedTitlesParams: FecthTitleParams = {
            offset: "24/06/2022",
            limit: "26/07/2022",
            pageIndex: pageIndex ? pageIndex : 0,
            pageSize: pageSize ? pageSize : 5,
            liquidated: true
        };

        fetchTitles(receivedTitlesParams)
            .then(res => {
                setReceivedTitles(res);
            })
            .catch(err => router.push("/auth"));
    }

    return {
        titlesToReceive, receivedTitles,
        fetchTitlesToReciveData, fetchRecivedTitlesData
    }
} 