import { useState } from "react";
import { DashboardProps } from "src/utils/types";
import CardTotal from "./CardTotal";
import CardTotalSkeleton from "./skeleton/CardTotalSkeleton";
import Table from "./Table";

export default function Dashboard({ dashboardData }: DashboardProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={`w-full h-full flex overflow-auto ${showModal && 'h-screen overflow-y-hidden'}`}>
            <div className="w-full h-full mt-16 md:mt-0 flex flex-col xl:mr-1 animate-fade-in-fast">
                <div className={`w-full mt-6 p-4 md:p-2 grid grid-flow-row grid-cols-1 
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
                    subTitle="Dados dos Recebimentos dos próximos 30 dias." setShowModal={() => setShowModal(!showModal)} />
                <Table title="Títulos Recebidos" data={dashboardData.receivedTitles}
                    subTitle="Recebimentos dos últimos 30 dias." setShowModal={() => setShowModal(!showModal)} />
            </div>
        </div>
    );
}