import { NextRouter } from "next/router";
import { useState } from "react";
import { fetchTotalizers } from "src/utils/restClient";
import { CardTotalizers } from "src/utils/types";
import { getTotalCardComponentData } from "src/utils/utils";

export function useCardsData(router: NextRouter) {
    const [cardsData, setCardsData] = useState<CardTotalizers[]>();

    function fetchCardsData() {
        fetchTotalizers()
            .then(res => {
                setCardsData(getTotalCardComponentData(res));
            })
            .catch(err => router.push("/auth"));
    }

    return { cardsData, fetchCardsData }
} 