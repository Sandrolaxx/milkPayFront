import { useRouter } from "next/router";
import { useState } from "react";
import { useDataContext } from "src/context/data";
import { updateUser } from "src/utils/restClient";
import { UserUpdateInfo } from "src/utils/types";
import { verifyUserHasChanges, verifyValidPassword, verifyValidUserFields } from "src/utils/utils";
import Button from "./Button";

export default function Profile() {
    const { userData } = useDataContext();
    const user = userData.user;
    const router = useRouter();
    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [phone, setPhone] = useState(user ? user.phone : "");
    const [password, setPassword] = useState(user ? user.password : "");
    const [confirmPassword, setConfirmPassword] = useState(user ? user.password : "");
    const [address, setAddress] = useState(user ? user.address : "");
    const [postalCode, setPostalCode] = useState(user ? user.postalCode : "");
    const [pixKey, setPixKey] = useState(user ? user.pixKey : "");
    const [acceptTerms, setAcceptTerms] = useState(user ? user.acceptTerms : false);

    function updateUserInfo() {
        if (verifyValidPassword(password, confirmPassword)) {
            const userNewInfo: UserUpdateInfo = {
                name,
                password,
                email,
                pixKey,
                phone,
                address,
                postalCode,
                acceptTerms
            }

            if (verifyValidUserFields(userNewInfo) && verifyUserHasChanges(userNewInfo, user!)) {
                updateUser(userNewInfo)
                    .then(res => userData.setUser(res))
                    .catch(() => router.push("/auth"));
            }

        }
    }

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full h-full mt-20 flex flex-col">
                {!userData.user?.acceptTerms &&
                    <span className="mx-8 mt-12">
                        <h1 className="text-dark-color text-xl text-center">
                            Finalize seu cadastro para poder ter acesso à visualização de totalizadores, recebíveis e realizar antecipações.
                        </h1>
                        <p className="text-dark-color text-md font-light text-center mt-6">
                            Lembrando que para ter acesso aos serviços é necessário aceitar os termos de serviço.
                        </p>
                    </span>
                }
                <div className="w-full h-full flex flex-col mt-6 p-8 px-12 xl:px-40 2xl:px-96">
                    <span className="font-medium text-dark-color md:text-lg">
                        Informações básicas
                    </span>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="w-full mt-6 relative md:mr-4">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Nome
                                </p>
                                <input required type="text" id="name" onChange={e => setName(e.target.value)} value={name}
                                    placeholder="Nome" className={`w-full h-14 px-4 border placeholder-gray-400
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none`}
                                />
                            </div>
                            <div className="w-full mt-7 relative md:mt-6">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Documento
                                </p>
                                <input disabled type="text" id="document" value={user ? user.document : "Não encontrado"}
                                    placeholder="CPF/CNPJ" className="w-full h-14 px-4 border placeholder-gray-400 text-gray-400
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="w-full mt-6 relative md:mr-4">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    E-mail
                                </p>
                                <input required type="email" id="email" onChange={e => setEmail(e.target.value)} value={email}
                                    placeholder="E-mail" className="w-full h-14 px-4 border placeholder-gray-400 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                            <div className="w-full mt-7 relative md:mt-6">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Telefone
                                </p>
                                <input required type="text" id="phone" onChange={e => setPhone(e.target.value)} value={phone}
                                    placeholder="Telefone" className="w-full h-14 px-4 border placeholder-gray-400 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="w-full mt-6 relative md:mr-4">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Senha
                                </p>
                                <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password}
                                    placeholder="Nome do usuário" className="w-full h-14 px-4 border placeholder-gray-400 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                            <div className="w-full mt-7 relative md:mt-6">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Confirmar Senha
                                </p>
                                <input type="password" id="passwordConfirmation" onChange={e => setConfirmPassword(e.target.value)}
                                    value={confirmPassword} placeholder="Username" className="w-full h-14 px-4 border placeholder-gray-400 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="w-full mt-6 relative md:mr-4">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Endereço
                                </p>
                                <input type="text" id="address" onChange={e => setAddress(e.target.value)} value={address}
                                    placeholder="Endereço" className="w-full h-14 px-4 border placeholder-gray-400 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                            <div className="w-full mt-7 relative md:mt-6">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    CEP
                                </p>
                                <input type="text" id="postaCode" onChange={e => setPostalCode(e.target.value)} value={postalCode}
                                    placeholder="CEP" className="w-full h-14 px-4 border placeholder-gray-400 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="w-full mt-6 relative md:mr-4">
                                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary-color text-xs font-medium">
                                    Chave PIX
                                </p>
                                <input required type="text" id="pixKey" onChange={e => setPixKey(e.target.value)} value={pixKey}
                                    placeholder="Chave PIX" className="w-full h-14 px-4 border placeholder-gray-400 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                                />
                            </div>
                            <div className="w-full">
                                <span className="w-full h-full flex justify-end items-end mt-3 md:mt-2">
                                    <input className="mx-2 mb-1.5" type="checkbox" checked={acceptTerms} name="acceptTerms" id="checkboxTerms"
                                        onChange={e => setAcceptTerms(e.target.checked)} />
                                    <p className="mr-1 mb-0.5 text-sm lg:text-base lg:mb-0">Concordo com os</p>
                                    <a href="https://github.com/Sandrolaxx/sonsRodrigoFaroPrivacy/blob/main/privacyPolicy.md"
                                        target="_blank" rel="noopener noreferrer" className="underline mb-0.5 text-sm lg:text-base lg:mb-0">
                                        termos de uso.
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between mt-8 md:mt-52">
                            <div className="w-full" />
                            <div className="w-full" />
                            <div className="w-full mt-6">
                                <Button text="Atualizar" key="BtnCadastro" handleFunction={updateUserInfo} dafaultStyle />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}