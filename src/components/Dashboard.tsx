import { DashboardProps } from "src/utils/types";
import CardTotal from "./CardTotal";
import CardTotalSkeleton from "./skeleton/CardTotalSkeleton";
import Table from "./Table";

export default function Dashboard({ dashboardData }: DashboardProps) {
    return (
        <div className="w-full flex flex-col overflow-hidden md:pr-2 animate-fade-in-fast">
            <div className={`w-full h-full mt-6 p-2 grid grid-flow-row grid-cols-1 
                    gap-y-8 gap-x-4 sm:grid-cols-2 lg:flex lg:gap-0 lg:p-1`}>
                {dashboardData.cardsData ?
                    dashboardData.cardsData!.map(data => (
                        <CardTotal element={data} key={data.title} />
                    ))
                    :
                    <>
                        <CardTotalSkeleton />
                        <CardTotalSkeleton />
                        <CardTotalSkeleton />
                        <CardTotalSkeleton />
                    </>
                }
            </div>
            <Table title="Títulos a Receber" data={dashboardData.titlesToReceive}
                subTitle="Dados dos Recebimentos dos próximos 30 dias." />
            <Table title="Títulos Recebidos" data={dashboardData.receivedTitles}
                subTitle="Recebimentos dos últimos 30 dias." />
        </div>
    );
}