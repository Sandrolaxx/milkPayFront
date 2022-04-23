import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LockIcon from "../assets/icons/lock.svg";
import MilkPayIcon from "../assets/icons/milkPayIcon.png";
import UserIcon from "../assets/icons/user.svg";
import { FormTypeProps } from "../utils/types";
import Button from "./Button";

export default function Form({ formType }: FormTypeProps) {

    const [isChangeFormType, setChangeFormType] = useState(true);
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        console.log("Realizando login!");
    }

    function handleRegister() {
        console.log("Se registre!");
    }

    return (
        <>
            {isChangeFormType ?
                <motion.div
                    initial={{ rotateY: isChangeFormType ? 180 : 0 }}
                    animate={{ rotateY: isChangeFormType ? 0 : 180 }}
                    transition={{ duration: 0.500 }}
                    className={`flex flex-col items-center px-4 py-8 bg-opacity-90 bg-white
                        rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10`}
                >
                    <Image src={MilkPayIcon} alt="Logo MilkPay" width={56} height={56} />
                    <p className="text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Autenticação
                    </p>
                    <div className="mt-6">
                        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                            <div className="flex flex-col mb-2">
                                <div className="flex">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500">
                                        <UserIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="text" id="sign-in-document" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="CPF/CNPJ" />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <LockIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="password" id="sign-in-password" value={password} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Senha" />
                                </div>
                            </div>
                            <div className="flex items-center mb-6 -mt-4 text-xs font-normal sm:text-sm text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white">
                                <div className="flex ml-auto">
                                    <Link href="#">
                                        Esqueceu sua senha?
                                    </Link>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <Button text="Login" stylized={true} handleFunction={handleLogin} />
                            </div>
                        </form>
                    </div>
                    <div className="items-center text-sm font-normal mt-6 text-center text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white">
                        <Button text="Não possui uma conta?" handleFunction={() => setChangeFormType(false)} />
                    </div>
                </motion.div>
                :
                <motion.div
                    initial={{ rotateY: isChangeFormType ? 360 : 0 }}
                    animate={{ rotateY: isChangeFormType ? 0 : 360 }}
                    transition={{ duration: 0.500 }}
                    className={`flex flex-col items-center px-4 py-8 bg-opacity-90 bg-white
                        rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10`}
                >
                    <Image src={MilkPayIcon} alt="Logo MilkPay" width={56} height={56} />
                    <p className="text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Registrar-se
                    </p>
                    <div className="mt-6">
                        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                            <div className="flex flex-col mb-2">
                                <div className="flex">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500">
                                        <UserIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="text" id="sign-in-document" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="CPF/CNPJ" />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <LockIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="password" id="sign-in-password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Senha" />
                                </div>
                            </div>
                            <div className="flex w-full mt-12">
                                <Button text="Registrar" stylized={true} handleFunction={handleRegister} />
                            </div>
                        </form>
                    </div>
                    <div className="items-center text-sm font-normal mt-6 text-center text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white">
                        <Button text="Já possui uma conta?" handleFunction={() => setChangeFormType(true)} />
                    </div>
                </motion.div>
            }
        </>
    );
}