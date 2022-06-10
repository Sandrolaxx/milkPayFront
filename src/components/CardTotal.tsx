import { CardTotalProps } from "src/utils/types";

export default function CardTotal({ element }: CardTotalProps) {
    return (
        <div className="w-full h-16 p-2 rounded-3xl border-2 sm:h-24 lg:mt-4 lg:m-2 xl:p-4 xl:h-36">
            <div className="flex justify-between w-full">
                <div className={`flex items-center justify-center w-16 h-12 -mt-8 rounded-3xl border-2
                    sm:w-20 sm:h-16 xl:w-24 xl:h-20 2xl:w-32 2xl:h-24 ${element.iconAreaColor} xl:-mt-10`}>
                    <element.bigIcon width={42} height={42} stroke="#F1F1F1" />
                </div>
                <div className="text-right w-full pr-2 xl:pr-0">
                    <h1 className="text-sm text-gray-color lg:text-sm xl:text-lg">
                        {element.title}
                    </h1>
                    <p className="text-xl font-semibold text-secundary-dark-color xl:text-2xl 2xl:text-3xl">
                        {element.value}
                    </p>
                </div>
            </div>
            <hr className="hidden sm:block rounded-sm mt-1 mb-1 xl:mt-6" />
            <div className="flex items-center pl-2 -mt-6 sm:-m-0">
                <element.smallIcon width={18} height={18} />
                <p className="ml-1 text-sm text-gray-color xl:text-lg">
                    {element.subTitle}
                </p>
            </div>
        </div>
    );
}