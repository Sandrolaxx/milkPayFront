import { EnumTitleType, TableLinekeletonProps } from "src/utils/types";
import { equalsEnum, getArrayOfElements } from "src/utils/utils";

export default function TableLineSkeleton({ titleType }: TableLinekeletonProps) {
    const arrayOfElements = getArrayOfElements();

    return (
        <tbody>
            {arrayOfElements.map(element => (
                <tr key={element.toString()}>
                    <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="w-14 h-4 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-12 h-4 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-14 h-4 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-10 h-8 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-20 h-4 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-20 h-4 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-20 h-4 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    <td className="p-5 border-b border-gray-200 text-sm">
                        <div className="w-24 h-6 animate-pulse bg-gray-300 rounded-sm" >
                        </div>
                    </td>
                    {(equalsEnum(titleType, EnumTitleType.RECEIVED)
                        || equalsEnum(titleType, EnumTitleType.ALL)) &&
                        <td className="p-5 border-b border-gray-200 text-sm">
                            <div className="w-24 h-6 animate-pulse bg-gray-300 rounded-sm" >
                            </div>
                        </td>
                    }
                </tr>
            ))}
        </tbody>
    );
}