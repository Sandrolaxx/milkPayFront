import { useEffect, useState } from "react";
import { useDataContext } from "src/context/data";
import { getFiltersWithString } from "src/utils/configs";
import { EnumFilterTitle, EnumTitleType } from "src/utils/types";
import { changeInputType, equalsEnum, formatMoneyInput, getFetchTitlesParamsWithFilter, isValidDate, onlyNumbers, parseStrToFilterTitleEnum, YYYYMMDDtoDDMMYYYY } from "src/utils/utils";
import CalendarIcon from "../assets/icons/calendar.svg";
import OptionDownIcon from "../assets/icons/menu-down.svg";
import Button from "./Button";
import Table from "./Table";

export default function Search() {
    const { titlesData } = useDataContext();
    const [filterBy, setFilterBy] = useState(EnumFilterTitle.NONE);
    const [filterValue, setFilterValue] = useState("");
    const [filterValueAux, setFilterValueAux] = useState("");
    const [isFetchingData, setFetchingData] = useState(true);
    const filterWithStringOptions = getFiltersWithString();
    const pageIndex = 0;
    const pageSize = 10;

    useEffect(() => {
        const allTitlesParams = {
            pageIndex,
            pageSize
        };

        titlesData.fetchAllTitlesData(allTitlesParams);

        setFetchingData(false);
    }, []);

    function handleFilter() {
        if (equalsEnum(filterBy, EnumFilterTitle.DUE_DATE)
            || equalsEnum(filterBy, EnumFilterTitle.INCLUSION_DATE)) {
            if (!isValidDate(filterValue, filterValueAux)) {
                return;
            }
        }

        setFetchingData(true);

        const allTitlesParamsWithFilter = getFetchTitlesParamsWithFilter(filterBy, filterValue, filterValueAux, pageIndex, pageSize);

        titlesData.fetchAllTitlesData(allTitlesParamsWithFilter);

        setFetchingData(false);
    }

    function changeSelectedFilterType(filterType: string) {
        if (equalsEnum(parseStrToFilterTitleEnum(filterType), EnumFilterTitle.STATUS)) {
            setFilterValue("Aberto");
        } else if (equalsEnum(parseStrToFilterTitleEnum(filterType), EnumFilterTitle.PAYMENT_TYPE)) {
            setFilterValue("PIX");
        } else {
            setFilterValue("");
            setFilterValueAux("");
        }

        setFilterBy(parseStrToFilterTitleEnum(filterType));
    }

    function verifyToSet(valueToSet: string) {

        if (onlyNumbers(valueToSet) != "" && equalsEnum(filterBy, EnumFilterTitle.AMOUNT)) {
            setFilterValue(formatMoneyInput(valueToSet));

            return;
        }

        if (equalsEnum(filterBy, EnumFilterTitle.NF_NUMBER)) {
            setFilterValue(valueToSet);

            return;
        }

        if (onlyNumbers(valueToSet) != "" &&
            (equalsEnum(filterBy, EnumFilterTitle.ID)
                || equalsEnum(filterBy, EnumFilterTitle.BARCODE)
                || equalsEnum(filterBy, EnumFilterTitle.DIGITABLE))) {
            setFilterValue(onlyNumbers(valueToSet));

            return;
        }

        setFilterValue("");
    }

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full h-full mt-24 md:mt-12 flex flex-col">
                <div className="w-full flex flex-col justify-center md:justify-end px-4 md:px-0 md:pr-8 md:flex-row relative">
                    <div>
                        <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                            Buscar por
                        </p>
                        <select id="filterBy" onChange={e => changeSelectedFilterType(e.target.value)}
                            className="w-full md:w-44 h-12 py-2 px-4 border bg-white rounded-md
                            border-primary-gray-color shadow-sm text-sm focus:outline-none focus:ring-1
                            focus:ring-primary-color focus:border-transparent appearance-none">
                            <option>
                                Selecione
                            </option>
                            <option>
                                ID
                            </option>
                            <option>
                                Status
                            </option>
                            <option>
                                Número NF
                            </option>
                            <option>
                                Tipo Recebimento
                            </option>
                            <option>
                                Data Serviço/Venda
                            </option>
                            <option>
                                Data Recebimento
                            </option>
                            <option>
                                Valor Total Título
                            </option>
                            <option>
                                Linha Digitável
                            </option>
                            <option>
                                Código de Barras
                            </option>
                        </select>
                        <button className="absolute -ml-9 mt-3 bg-red pointer-events-none">
                            <OptionDownIcon className="fill-current text-dark-color" width={24} height={24} />
                        </button>
                    </div>
                    {filterWithStringOptions.includes(filterBy) &&
                        <div className="w-full mt-4 md:w-64 md:mt-0 md:ml-4">
                            <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                                Buscar
                            </p>
                            <input type="text" id="filterValue" disabled={equalsEnum(filterBy, EnumFilterTitle.NONE)}
                                onChange={e => verifyToSet(e.target.value)} value={filterValue}
                                placeholder={`${equalsEnum(filterBy, EnumFilterTitle.NONE) ? "Selecione um tipo de busca" : "Insira o valor da busca"}`}
                                className="w-full h-12 px-4 border placeholder-gray-color rounded-md bg-white border-primary-gray-color 
                                shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                    }
                    {(equalsEnum(filterBy, EnumFilterTitle.DUE_DATE)
                        || equalsEnum(filterBy, EnumFilterTitle.INCLUSION_DATE)) &&
                        <div className="w-full flex h-12 mt-4 md:mt-0 relative lg:w-96">
                            <div className="w-full lg:w-44 md:ml-4">
                                <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Data inicial
                                </p>
                                <input type="text" id="initial-date" placeholder="dd/mm/aaaa"
                                    onFocus={e => changeInputType(e, "date")} onChange={e => setFilterValue(YYYYMMDDtoDDMMYYYY(e.target.value))}
                                    className={`w-full lg:w-44 h-12 px-4 border placeholder-dark-color rounded-md bg-white
                                    border-primary-gray-color shadow-sm text-sm focus:outline-none focus:ring-1
                                    focus:ring-primary-color focus:border-transparent appearance-none`}
                                />
                                <button className="absolute -ml-[32px] mt-[14px] pointer-events-none">
                                    <CalendarIcon width={18} height={18} />
                                </button>
                            </div>
                            <div className="w-full lg:w-44 ml-4">
                                <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Data final
                                </p>
                                <input type="text" id="final-date" placeholder="dd/mm/aaaa"
                                    onFocus={e => changeInputType(e, "date")} onChange={e => setFilterValueAux(YYYYMMDDtoDDMMYYYY(e.target.value))}
                                    className={`w-full lg:w-44 h-12 px-4 border placeholder-dark-color rounded-md bg-white 
                                    border-primary-gray-color shadow-sm text-sm focus:outline-none focus:ring-1
                                    focus:ring-primary-color focus:border-transparent appearance-none`}
                                />
                                <button className="absolute -ml-[32px] mt-[14px] pointer-events-none">
                                    <CalendarIcon width={18} height={18} />
                                </button>
                            </div>
                        </div>
                    }
                    {equalsEnum(filterBy, EnumFilterTitle.STATUS) &&
                        <div className="mt-4 md:mt-0 md:ml-4">
                            <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                                Buscar por
                            </p>
                            <select id="filterStatus" onChange={e => setFilterValue(e.target.value)}
                                className="w-full md:w-44 h-12 py-2 px-4 border bg-white rounded-md
                                    border-primary-gray-color shadow-sm text-sm focus:outline-none focus:ring-1
                                    focus:ring-primary-color focus:border-transparent appearance-none">
                                <option onLoad={() => setFilterValue("Aberto")}>
                                    Aberto
                                </option>
                                <option>
                                    Liquidado
                                </option>
                            </select>
                            <button className="absolute -ml-9 mt-3 bg-red pointer-events-none">
                                <OptionDownIcon className="fill-current text-dark-color" width={24} height={24} />
                            </button>
                        </div>
                    }
                    {equalsEnum(filterBy, EnumFilterTitle.PAYMENT_TYPE) &&
                        <div className="mt-4 md:mt-0 md:ml-4">
                            <p className="absolute bg-white -mt-1 ml-3 px-2 text-secondary-color text-xs font-medium">
                                Buscar por
                            </p>
                            <select id="filterPaymentType" onChange={e => setFilterValue(e.target.value)}
                                className="w-full md:w-44 h-12 py-2 px-4 border bg-white rounded-md
                                    border-primary-gray-color shadow-sm text-sm focus:outline-none focus:ring-1
                                    focus:ring-primary-color focus:border-transparent appearance-none">
                                <option onLoad={() => setFilterValue("Aberto")}>
                                    PIX
                                </option>
                                <option>
                                    BOLETO
                                </option>
                            </select>
                            <button className="absolute -ml-9 mt-3 bg-red pointer-events-none">
                                <OptionDownIcon className="fill-current text-dark-color" width={24} height={24} />
                            </button>
                        </div>
                    }
                    <span className="w-full mt-4 mb-4 md:w-28 md:mt-0 md:mb-0 md:ml-4">
                        <Button text="Filtrar" key="filter-btn" customStile="w-full h-12 text-center  
                            bg-primary-color hover:bg-blue-400 focus:ring-primary-color focus:ring-offset-blue-200 
                            text-base text-white font-semibold shadow-md transition ease-in duration-200  
                            focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            handleFunction={handleFilter} />
                    </span>
                </div>
                <Table key="all-title" title="Títulos" subTitle="Todos os títulos gerados" data={titlesData.allTitles}
                    setShowModal={() => false} titleType={EnumTitleType.ALL} fetchingData={isFetchingData}
                    filterParams={getFetchTitlesParamsWithFilter(filterBy, filterValue, filterValueAux, pageIndex, pageSize)} />
            </div>
        </div>
    )
}