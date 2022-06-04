import { CardTotalProps } from "src/utils/types";

export default function CardTotal({element}: CardTotalProps) {
    return (
        <div className="w-96 h-44 m-6 mt-12 p-4 rounded-3xl border-2">
            <div className="flex justify-between">
                <div className={`flex items-center justify-center w-28 h-28 ${element.iconAreaColor} 
                rounded-3xl from-transparent border-2 -mt-10`}>
                    <element.bigIcon width={68} height={68} stroke="#F1F1F1"  />
                </div>
                <div className="text-right">
                    <h1 className="text-2xl text-gray-color">{element.title}</h1>
                    <p className="text-4xl font-semibold text-secundary-dark-color">{element.value}</p>
                </div>
            </div>
            <hr className="rounded-sm mt-6 mb-4" />
            <div className="flex m-2">
                <element.smallIcon />
                <p className="ml-2 text-xl text-gray-color">{element.subTitle}</p>
            </div>
        </div>
    );
}