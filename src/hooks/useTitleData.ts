import { NextRouter } from "next/router";
import { useState } from "react";
import { fetchAllTitles } from "src/utils/restClient";
import { TitleData } from "src/utils/types";

export function useTitleData(router: NextRouter) {
    const [titleList, setTitleList] = useState<TitleData[]>();

    function fetchTitlesData() {
        fetchAllTitles()
            .then(res => {
                setTitleList(res);
            })
            .catch(err => router.push("/auth"));
    }

    return { titleList, fetchTitlesData }
} 