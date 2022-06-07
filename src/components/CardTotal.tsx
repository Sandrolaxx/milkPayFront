import { CardTotalProps } from "src/utils/types";

export default function CardTotal({element}: CardTotalProps) {
    return (
        <div className="w-full h-28 m-2 p-4 rounded-3xl border-2 xl:h-36 2xl:m-4">
            <div className="flex justify-between w-full">
                <div className={`flex items-center justify-center w-24 h-20 lg:w-20 lg:h-16 xl:w-24 xl:h-20 2xl:w-32 2xl:h-24 ${element.iconAreaColor} 
                rounded-3xl from-transparent border-2 -mt-10`}>
                    <element.bigIcon width={42} height={42} stroke="#F1F1F1"  />
                </div>
                <div className="text-right w-full">
                    <h1 className="text-sm lg:text-xs xl:text-lg text-gray-color">{element.title}</h1>
                    <p className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-secundary-dark-color">{element.value}</p>
                </div>
            </div>
            <hr className="rounded-sm mt-2 mb-1 lg:mb-2 xl:mt-4" />
            <div className="flex items-center">
                <element.smallIcon/>
                <p className="ml-2 text-sm lg:xs xl:text-lg text-gray-color">{element.subTitle}</p>
            </div>
        </div>
    );
}