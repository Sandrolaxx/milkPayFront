import { ModalCardButtonProps } from "src/utils/types";

export default function ModalCardButtons({ handleClose, handleContinue, isEnabled = true }: ModalCardButtonProps) {
    return (
        <div className="w-full flex flex-row my-6 justify-center">
            <button onClick={() => handleClose()} className={`w-32 h-10 mx-4 bg-red-600 rounded-xl border-2
                border-black text-white text-lg font-semibold hover:bg-red-400 hover:text-secundary-dark-color`}>
                CANCELAR
            </button>
            <button onClick={isEnabled ? () => handleContinue() : () => false} className={`w-32 h-10 mx-4 bg-green-600
                 rounded-xl border-2 border-black text-white text-lg font-semibold hover:bg-green-400 
                 hover:text-secundary-dark-color ${isEnabled ? false : 'bg-green-400 text-gray-color hover:bg-none hover:text-gray-color'}`}>
                CONTINUAR
            </button>
        </div>
    )
}