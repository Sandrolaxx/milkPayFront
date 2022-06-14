import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardTotal from "src/components/CardTotal";
import Menu from "src/components/Menu";
import CardTotalSkeleton from "src/components/skeleton/CardTotalSkeleton";
import TableSkeleton from "src/components/skeleton/TableSkeleton";
import Table from "src/components/Table";
import { listTotalCard, titleListData } from "src/utils/testFront";

export default function Home() {
    const router = useRouter();
    let [isAuth, setAuth] = useState(false);
    let [isLoading, setLoading] = useState(true);

    useEffect(() => isAuthenticated());

    function isAuthenticated() {
        const expiration = localStorage.getItem("expiration");
        const token = localStorage.getItem("token");
        // const hasAuth = !isNullOrEmpty(expiration) && !isNullOrEmpty(token);

        // if (!hasAuth 
        //     || (hasAuth && !isValidToken(expiration!))) {
        //     router.push("/auth");
        // }

        setTimeout(() => setLoading(false), 2000);

        setAuth(true);
    }

    return (
        isAuth && //bg-cyan-300 sm:bg-red-300 md:bg-yellow-300 lg:bg-purple-300 xl:bg-orange-300 2xl:bg-slate-300
        <div className="block md:flex">
            <div className="w-full md:w-54 lg:w-52 xl:w-64">
                <Menu />
            </div>
            <div className="w-full flex flex-col overflow-hidden md:pr-2">
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
                        listTotalCard.map(data => (
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
        </div>
    );
}