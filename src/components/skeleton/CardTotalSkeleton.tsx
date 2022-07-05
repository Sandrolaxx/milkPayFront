export default function CardTotalSkeleton() {
    return (
        <div className={`w-full h-16 p-2 shadow-md border-2 rounded-3xl sm:h-24 xl:mt-4 lg:m-2 
            xl:h-32 animate-fade-left md:animate-fade-down`}>
            <div className="flex justify-between w-full">
                <div className={`flex items-center justify-center w-16 h-12 animate-pulse bg-gray-300 
                    rounded-3xl shadow-md border-2 sm:h-16 lg:w-14 lg:h-16 xl:w-16 xl:h-20 2xl:w-24 
                    2xl:h-24 -mt-8 xl:-mt-10`}>
                </div>
                <div className="flex flex-col">
                    <div className={`w-28 h-4 self-end animate-pulse bg-gray-300 rounded-sm 
                        mr-1 xl:mr-0 xl:h-6`}>
                    </div>
                    <div className="w-16 h-4 self-end animate-pulse bg-gray-300 rounded-sm 
                        mt-2 mr-1 xl:mr-0 xl:h-6">
                    </div>
                </div>
            </div>
            <hr className="hidden sm:block rounded-sm mt-2 mb-1 sm:mt-4 xl:mt-6" />
            <div className="w-32 h-4 ml-2 -mt-4 animate-pulse bg-gray-300 rounded-sm sm:-mt-0 xl:h-6">
            </div>
        </div>
    );
}