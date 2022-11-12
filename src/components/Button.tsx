import { ButtonProps } from "../utils/types";

export default function Button({ text, handleFunction, dafaultStyle, customStile }: ButtonProps) {
    return (
        <button onClick={e => handleFunction(e)} className={`${dafaultStyle ? `w-full py-2 px-4 text-center  
            bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 
            text-base text-white font-semibold shadow-md transition ease-in duration-200  
            focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg` : customStile}`}>
            {text}
        </button>
    );
}