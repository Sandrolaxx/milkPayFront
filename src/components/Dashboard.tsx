import { titleListData } from "src/utils/testFront";
import { DashboardProps } from "src/utils/types";
import CardTotal from "./CardTotal";
import CardTotalSkeleton from "./skeleton/CardTotalSkeleton";
import TableSkeleton from "./skeleton/TableSkeleton";
import Table from "./Table";

export default function Dashboard({ isLoading, cardsData }: DashboardProps) {
    return (
        <div className="w-full flex flex-col overflow-hidden md:pr-2 animate-fade-in-fast">
            <div className={`w-full h-full mt-6 p-2 grid grid-flow-row grid-cols-1 
                    gap-y-8 gap-x-4 sm:grid-cols-2 lg:flex lg:gap-0 lg:p-1`}>
                {isLoading ?
                    <>
                        <CardTotalSkeleton />
                        <CardTotalSkeleton />
                        <CardTotalSkeleton />
                        <CardTotalSkeleton />
                    </>
                    :
                    cardsData!.map(data => (
                        <CardTotal element={data} key={data.title} />
                    ))
                }
            </div>
            {isLoading ?
                <>
                    <TableSkeleton title="Títulos a Receber" subTitle="Dados dos Recebimentos dos próximos 30 dias." />
                    <TableSkeleton title="Títulos Recebidos" subTitle="Recebimentos dos últimos 30 dias." />
                </>
                :
                <>
                    <Table title="Títulos a Receber" data={titleListData}
                        subTitle="Dados dos Recebimentos dos próximos 30 dias." />
                    <Table title="Títulos Recebidos" data={titleListData}
                        subTitle="Recebimentos dos últimos 30 dias." />
                </>
            }
        </div>
    );
}