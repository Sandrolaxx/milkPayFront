import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LockIcon from "../assets/icons/lock.svg";
import EmailIcon from "../assets/icons/mail.svg";
import MilkPayIcon from "../assets/icons/milkPayIcon.png";
import UserIcon from "../assets/icons/user.svg";
import { createAccount, getUserToken } from "../utils/restClient";
import { EnumFormType, FormInputProps } from "../utils/types";
import { equalsEnumFormType, getTokenExpirationDate } from "../utils/utils";
import Button from "./Button";

export default function FormInput({ formType, changeFunction }: FormInputProps) {
    const router = useRouter();
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function handleLogin() {
        const token = await getUserToken(document, password);

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("expiration", getTokenExpirationDate());

            router.push("/");
        }
    }

    async function handleRegister() {
        await createAccount(document, password);

        changeInput(EnumFormType.LOGIN);
    }

    function handleForgotPassword() {
        console.log("Esqueci!" + email);//TODO criar fluxo esqueci minha senha
    }

    function handleLoseEmail() {
        //TODO abrir modal informações contato suporte
    }

    function changeInput(formType: EnumFormType) {
        setDocument("");
        setPassword("");
        setEmail("");

        changeFunction(formType);
    }

    return (
        <>
            <Image src={MilkPayIcon} priority alt="Logo MilkPay" width={56} height={56} />
            <p className="text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                {equalsEnumFormType(formType, EnumFormType.LOGIN) && 'Autenticação'}
                {equalsEnumFormType(formType, EnumFormType.REGISTER) && 'Registrar-se'}
                {equalsEnumFormType(formType, EnumFormType.FORGOT_PASSWORD) && 'Redefinir Senha'}
            </p>
            <div className="mt-6">
                <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                    {(equalsEnumFormType(formType, EnumFormType.LOGIN)
                        || equalsEnumFormType(formType, EnumFormType.REGISTER))
                        && <>
                            <div className="flex flex-col mb-2">
                                <div className="flex">
                                    <span className={`rounded-l-md inline-flex  items-center px-3 border-t 
                                            bg-white border-l border-b  border-gray-300 text-gray-500`}>
                                        <UserIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="text" id="sign-in-document" placeholder="CPF/CNPJ"
                                        value={document} onChange={e => setDocument(e.target.value)}
                                        className={`flex-1 rounded-r-lg appearance-none border 
                                        border-gray-300 w-full py-2 px-3 bg-white text-gray-700 
                                        placeholder-gray-400 shadow-sm text-base focus:outline-none 
                                        focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <span className={`rounded-l-md inline-flex  items-center px-3 border-t 
                                            bg-white border-l border-b  border-gray-300 text-gray-500`}>
                                        <LockIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="password" id="sign-in-password" placeholder="Senha"
                                        value={password} onChange={e => setPassword(e.target.value)}
                                        className={`flex-1 rounded-r-lg appearance-none border 
                                        border-gray-300 w-full py-2 px-3 bg-white text-gray-700 
                                        placeholder-gray-400 shadow-sm text-base focus:outline-none 
                                        focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    {equalsEnumFormType(formType, EnumFormType.FORGOT_PASSWORD) &&
                        <>
                            <div className="flex flex-col mb-2">
                                <div className="flex">
                                    <span className={`rounded-l-md inline-flex  items-center px-3 border-t 
                                    bg-white border-l border-b  border-gray-300 text-gray-500`}>
                                        <EmailIcon className="text-gray-700" width={24} />
                                    </span>
                                    <input type="email" id="forgot-email" placeholder="E-mail"
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        className={`flex-1 rounded-r-lg appearance-none border 
                                border-gray-300 w-full py-2 px-3 bg-white text-gray-700 
                                placeholder-gray-400 shadow-sm text-base focus:outline-none 
                                focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                    />
                                </div>
                            </div>
                            <div className={`flex items-center mb-6 text-xs font-normal sm:text-sm 
                        text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white`}>
                                <div className="flex ml-auto">
                                    <Button text="Voltar ao Login" handleFunction={() => changeInput(EnumFormType.LOGIN)} />
                                </div>
                            </div>
                        </>
                    }
                    {equalsEnumFormType(formType, EnumFormType.LOGIN) &&
                        <div className={`flex items-center mb-6 -mt-4 text-xs font-normal sm:text-sm 
                                            text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white`}>
                            <div className="flex ml-auto">
                                <Button text="Esqueceu sua senha?" handleFunction={() => changeInput(EnumFormType.FORGOT_PASSWORD)} />
                            </div>
                        </div>
                    }
                    {equalsEnumFormType(formType, EnumFormType.LOGIN) &&
                        <div className="flex w-full">
                            <Button text="Login" stylized={true} handleFunction={handleLogin} />
                        </div>
                    }
                    {equalsEnumFormType(formType, EnumFormType.REGISTER) &&
                        <div className="flex w-full mt-12">
                            <Button text="Registrar" stylized={true} handleFunction={handleRegister} />
                        </div>
                    }
                    {equalsEnumFormType(formType, EnumFormType.FORGOT_PASSWORD) &&
                        <div className="flex w-full mt-16">
                            <Button text="Enviar" stylized={true} handleFunction={handleForgotPassword} />
                        </div>
                    }
                </form>
            </div>
            <div className={`items-center text-sm font-normal mt-6 text-center text-gray-600
                                hover:text-gray-500 dark:text-gray-100 dark:hover:text-white`}>
                {equalsEnumFormType(formType, EnumFormType.LOGIN) &&
                    <Button text="Não possui uma conta?" handleFunction={() => changeInput(EnumFormType.REGISTER)} />
                }
                {equalsEnumFormType(formType, EnumFormType.REGISTER) &&

                    <Button text="Não possui uma conta?" handleFunction={() => changeInput(EnumFormType.LOGIN)} />
                }
                {equalsEnumFormType(formType, EnumFormType.FORGOT_PASSWORD) &&
                    <Button text="Não possui mais o e-mail cadastrado?" handleFunction={handleLoseEmail} />
                }
            </div>
        </>
    );
}