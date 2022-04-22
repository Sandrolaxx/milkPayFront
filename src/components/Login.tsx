import Image from "next/image";
import Header from "./Header";
import MilkPayIcon from "../assets/icons/milkPayIcon.png";
import LockIcon from "../assets/icons/lock.svg";
import UserIcon from "../assets/icons/user.svg";
import Link from "next/link";

export default function Login() {
    function handleLogin() {

    }

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex flex-col h-full items-center bg-[url('../assets/images/login.jpg')]" >
                <div className="h-full flex flex-col justify-center">
                    <div className="flex flex-col items-center px-4 py-8 bg-opacity-90 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <Image src={MilkPayIcon} alt="Logo MilkPay" width={56} height={56} layout="fixed" />
                        <p className="text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                            Autenticação
                        </p>
                        <div className="mt-6">
                            <form autoComplete="off" onSubmit={e => {
                                e.preventDefault();
                                handleLogin();
                            }}>
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
                                        <input type="password" id="sign-in-document" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Senha" />
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
                                    <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="items-center text-sm font-normal mt-6 text-center text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white">
                            <Link href="#">
                                Não possui uma conta?
                            </Link>
                        </div>
                    </div>
                </div>
                <footer className="flex justify-center mt-auto m-6" >
                    <p className="text-base text-white">
                        Todos os direitos reservados. MilkPay®
                    </p>
                </footer>
            </main>
        </div>
    );
}