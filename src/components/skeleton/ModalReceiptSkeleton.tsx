export default function ModalReceiptSkeleton() {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <span className="w-full flex flex-row justify-center px-6 pt-4">
                <p className="w-56 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full px-6 py-2">
                <p className="w-full h-104 rounded-3xl animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-center py-4">
                <p className="w-28 h-8 animate-pulse bg-gray-300"></p>
            </span>
        </div>
    );
}