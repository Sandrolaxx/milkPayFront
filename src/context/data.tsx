import React from "react";
import { useCardsData } from "src/hooks/useCardsData";
import { useTitleData } from "src/hooks/useTitleData";
import { DataContext, IDataContext } from "src/utils/types";

const DataContext = React.createContext<DataContext>({} as IDataContext);

export default function DataProvider(props: any) {
    const cardsData = useCardsData();
    const titlesData = useTitleData();
    
    return (
        <DataContext.Provider value={{ cardsData, titlesData }}>
            {props.children}
        </DataContext.Provider>
    )
}

export function useDataContext(): DataContext {
    return React.useContext(DataContext);
}