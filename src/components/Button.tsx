import { ButtonProps } from "../utils/types";

export default function Button({ text, handleFunction, stylized }: ButtonProps) {
    return (
        <button onClick={() => handleFunction()} className={`${stylized ? `py-2 px-4  bg-purple-600 hover:bg-purple-700 
            focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full 
            transition ease-in duration-200 text-center text-base font-semibold shadow-md 
            focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg` : false}`}>
            {text}
        </button>
    )
}