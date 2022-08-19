export default function ModalReceiptSkeleton() {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <span className="w-full px-6">
                <p className="w-full h-104 rounded-t-3xl animate-pulse bg-gray-300"></p>
                <p className="w-full h-24 rounded-b-3xl animate-pulse bg-gray-300"></p>
            </span>
        </div>
    );
}