import { ModalCardSkeletonProps } from "src/utils/types";

export default function ModalCardStepTwoSkeleton({ isBankslipPayment }: ModalCardSkeletonProps) {
    return (
        <>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            <span className="w-full flex flex-row justify-between px-6 py-2">
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
            </span>
            {isBankslipPayment &&
                <>
                    <span className="w-full flex flex-row justify-between px-6 py-2">
                        <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                        <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                    </span>
                    <span className="w-full flex flex-row justify-between px-6 py-2">
                        <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                        <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                    </span>
                    <span className="w-full flex flex-row justify-between px-6 py-2">
                        <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                        <p className="w-20 h-4 animate-pulse bg-gray-300"></p>
                    </span>
                </>
            }
            <span className="w-full flex flex-row justify-center px-6 pt-4">
                <p className="w-52 h-4 animate-pulse bg-gray-300"></p>
            </span>
        </>
    );
}