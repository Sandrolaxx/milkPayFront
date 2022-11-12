import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CloseEyeIcon from "../assets/icons/eye-off.svg";
import OpenEyeIcon from "../assets/icons/eye.svg";
import LockIcon from "../assets/icons/lock.svg";
import EmailIcon from "../assets/icons/mail.svg";
import MilkPayIcon from "../assets/icons/milkpay.svg";
import UserIcon from "../assets/icons/user.svg";
import { createAccount, getUserToken } from "../utils/restClient";
import { EnumFormType, FormInputProps } from "../utils/types";
import { equalsEnum, formatDocument, getTokenExpirationDate, isNullOrEmpty } from "../utils/utils";
import Button from "./Button";

export default function FormInput({ formType, changeFunction }: FormInputProps) {
    const router = useRouter();
    const [isOpenEye, setOpenEye] = useState(false);
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleLogin(event: any) {
        if (!isNullOrEmpty(document) && !isNullOrEmpty(password)) {
            event.preventDefault();

            getUserToken(document, password)
                .then(res => {
                    if (res) {
                        localStorage.setItem("token", res);
                        localStorage.setItem("expiration", getTokenExpirationDate());

                        router.push("/");
                    }
                })
                .catch(err => err);
        }
    }

    function handleRegister(event: any) {
        if (!isNullOrEmpty(document) && !isNullOrEmpty(password)) {
            event.preventDefault();

            createAccount(document, password)
                .then(() => changeInput(EnumFormType.LOGIN))
                .catch(err => err);
        }
    }

    function handleForgotPassword(event: any) {
        event.preventDefault();

        console.log("Esqueci!" + email);//TODO criar fluxo esqueci minha senha
    }

    function handleLoseEmail(event: any) {
        //TODO abrir modal informações contato suporte
    }

    function changeInput(formType: EnumFormType) {
        setDocument("");
        setPassword("");
        setEmail("");

        changeFunction(formType);
    }

    function verifyFormTypeAndHandle(event: any) {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();

            switch (formType) {
                case EnumFormType.LOGIN:
                    handleLogin(event);
                    break;
                case EnumFormType.REGISTER:
                    handleRegister(event);
                    break;
                case EnumFormType.FORGOT_PASSWORD:
                    handleForgotPassword(event);
                    break;
            }
        }
    }

    return (
        <>
            <MilkPayIcon fill="#000" width={56} height={56} name="Logo MilkPay" />
            <p className="text-xl font-light text-gray-color sm:text-2xl dark:text-white">
                {equalsEnum(formType, EnumFormType.LOGIN) && 'Autenticação'}
                {equalsEnum(formType, EnumFormType.REGISTER) && 'Registrar-se'}
                {equalsEnum(formType, EnumFormType.FORGOT_PASSWORD) && 'Redefinir Senha'}
            </p>
            <div className="mt-6">
                <form autoComplete="off" onKeyDown={verifyFormTypeAndHandle} onSubmit={verifyFormTypeAndHandle}>
                    {(equalsEnum(formType, EnumFormType.LOGIN)
                        || equalsEnum(formType, EnumFormType.REGISTER))
                        && <>
                            <div className="flex flex-col mb-2">
                                <div className="flex items-center">
                                    <span className={`h-12 rounded-l-md inline-flex  items-center px-3 border-t 
                                            bg-white border-l border-b  border-gray-300 text-gray-color`}>
                                        <UserIcon className="text-dark-color" width={24} />
                                    </span>
                                    <input type="text" id="sign-in-document" placeholder="CPF/CNPJ" required
                                        value={document} onChange={e => setDocument(formatDocument(e.target.value))}
                                        className={`w-full h-12 flex rounded-r-lg appearance-none border 
                                            border-gray-300 px-3 bg-white text-gray-color 
                                            placeholder-gray-400 shadow-sm text-base focus:outline-none 
                                            focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <div className="flex">
                                    <span className={`h-12 rounded-l-md inline-flex  items-center px-3 border-t 
                                            bg-white border-l border-b  border-gray-300 text-gray-color`}>
                                        <LockIcon className="text-dark-color" width={24} />
                                    </span>
                                    <span className="flex flex-col">
                                        <input type={isOpenEye ? "text" : "password"} id="sign-in-password" placeholder="Senha"
                                            value={password} onChange={e => setPassword(e.target.value)} required
                                            className={`w-full h-12 flex rounded-r-lg appearance-none border 
                                                border-gray-300 pl-3 pr-12 bg-white text-gray-color 
                                                placeholder-gray-400 shadow-sm text-base focus:outline-none 
                                                focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                        />
                                        <button type="button" onClick={() => setOpenEye(!isOpenEye)}
                                            className={`flex self-end -mt-9 m-4 animate-fade-in-fast`}>
                                            {
                                                isOpenEye ?
                                                    <OpenEyeIcon className="text-second-gray-color" width={24} height={24} />
                                                    :
                                                    <CloseEyeIcon className="text-second-gray-color" width={24} height={24} />
                                            }
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </>
                    }
                    {equalsEnum(formType, EnumFormType.FORGOT_PASSWORD) &&
                        <>
                            <div className="flex flex-col mb-2">
                                <div className="flex">
                                    <span className={`rounded-l-md inline-flex  items-center px-3 border-t 
                                    bg-white border-l border-b  border-gray-300 text-gray-color `}>
                                        <EmailIcon className="text-dark-color" width={24} />
                                    </span>
                                    <input type="email" id="forgot-email" placeholder="E-mail"
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        className={`flex-1 rounded-r-lg appearance-none border 
                                border-gray-300 w-full py-2 px-3 bg-white text-gray-color
                                placeholder-gray-400 shadow-sm text-base focus:outline-none 
                                focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                    />
                                </div>
                            </div>
                            <div className={`flex items-center mb-6 text-xs font-normal sm:text-sm 
                        text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white`}>
                                <div className="flex ml-auto">
                                    <Button text="Voltar ao Login" handleFunction={() => changeInput(EnumFormType.LOGIN)}  />
                                </div>
                            </div>
                        </>
                    }
                    {equalsEnum(formType, EnumFormType.LOGIN) &&
                        <div className={`flex items-center mb-6 -mt-4 text-xs font-normal sm:text-sm 
                                            text-gray-600 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white`}>
                            <div className="flex ml-auto">
                                <Button text="Esqueceu sua senha?" handleFunction={() => changeInput(EnumFormType.FORGOT_PASSWORD)} />
                            </div>
                        </div>
                    }
                    {equalsEnum(formType, EnumFormType.LOGIN) &&
                        <div className="flex w-full">
                            <Button  text="Login" dafaultStyle handleFunction={handleLogin} />
                        </div>
                    }
                    {equalsEnum(formType, EnumFormType.REGISTER) &&
                        <div className="flex w-full mt-12">
                            <Button text="Registrar" dafaultStyle handleFunction={handleRegister} />
                        </div>
                    }
                    {equalsEnum(formType, EnumFormType.FORGOT_PASSWORD) &&
                        <div className="flex w-full mt-16">
                            <Button text="Enviar" dafaultStyle handleFunction={handleForgotPassword} />
                        </div>
                    }
                </form>
            </div>
            <div className={`items-center text-sm font-normal mt-6 text-center text-gray-600
                                hover:text-gray-500 dark:text-gray-100 dark:hover:text-white`}>
                {equalsEnum(formType, EnumFormType.LOGIN) &&
                    <Button text="Não possui uma conta?" handleFunction={() => changeInput(EnumFormType.REGISTER)} />
                }
                {equalsEnum(formType, EnumFormType.REGISTER) &&

                    <Button text="Já possui uma conta?" handleFunction={() => changeInput(EnumFormType.LOGIN)} />
                }
                {equalsEnum(formType, EnumFormType.FORGOT_PASSWORD) &&
                    <Button text="Não possui mais o e-mail cadastrado?" handleFunction={handleLoseEmail} />
                }
            </div>
        </>
    );
}