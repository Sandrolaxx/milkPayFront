import { useRouter } from "next/router";
import { useState } from "react";
import { fetchTotalizers } from "src/utils/restClient";
import { CardTotalizers } from "src/utils/types";
import { getTotalCardComponentData } from "src/utils/utils";

export function useCardsData() {
    const [cardsData, setCardsData] = useState<CardTotalizers[]>();
    const router = useRouter();

    function fetchCardsData() {
        fetchTotalizers()
            .then(res => {
                setCardsData(getTotalCardComponentData(res));
            })
            .catch(() => router.push("/auth"));
    }

    return { cardsData, fetchCardsData }
} 