import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchTitles } from "src/utils/restClient";
import { FecthTitleResponse } from "src/utils/types";
import { getFetchTitlesParams } from "src/utils/utils";
import OptionDownIcon from "../assets/icons/menu-down.svg";
import Button from "./Button";
import Table from "./Table";

export default function Search() {
    const [titles, setTitles] = useState<FecthTitleResponse>();
    const [filterBy, setFilterBy] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const router = useRouter();
    const pageIndex = 0;
    const pageSize = 15;

    useEffect(() => {
        const allTitlesParams = getFetchTitlesParams(pageIndex, pageSize);

        fetchTitles(allTitlesParams)
            .then(res => setTitles(res))
            .catch(() => router.push("/"))
    }, []);

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full h-full mt-24 md:mt-12 flex flex-col">
                <div className="w-full flex justify-center md:justify-end px-4 md:px-0 md:pr-8">
                    <div className="w-40">
                        <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                            Buscar por
                        </p>
                        <select id="filterBy" onChange={e => setFilterBy(e.target.value)}
                            value={filterBy} className="w-full h-12 py-2 px-4 border bg-white rounded-md
                                    border-primary-gray-color shadow-sm text-sm focus:outline-none focus:ring-1
                                    focus:ring-primary-color focus:border-transparent appearance-none">
                            <option>
                                Teste 1
                            </option>
                            <option>
                                Teste 2
                            </option>
                            <option>
                                Teste 3
                            </option>
                        </select>
                        <button className="absolute -ml-9 mt-4 bg-red pointer-events-none">
                            <OptionDownIcon className="fill-current text-dark-color" width={24} height={24} />
                        </button>
                    </div>
                    <div className="w-64 ml-4">
                        <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                            Buscar
                        </p>
                        <input type="text" id="filterValue" onChange={e => setFilterValue(e.target.value)} value={filterValue}
                            placeholder="Buscar" className="w-full h-12 px-4 border placeholder-gray-color 
                                rounded-md bg-white border-primary-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                        />
                    </div>
                    <span className="w-28 ml-4">
                        <Button text="Filtrar" key="filter-btn" customStile="w-full h-12 text-center  
                            bg-primary-color hover:bg-blue-400 focus:ring-primary-color focus:ring-offset-blue-200 
                            text-base text-white font-semibold shadow-md transition ease-in duration-200  
                            focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            handleFunction={() => console.log("Teste")} />
                    </span>
                </div>
                {titles &&
                    <Table title="Títulos" data={titles} setShowModal={() => false}
                        subTitle="Todos os títulos gerados" />
                }
            </div>
        </div>
    )
}