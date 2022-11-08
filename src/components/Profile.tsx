import { useState } from "react";
import { useDataContext } from "src/context/data"

export default function Profile() {
    const { userData } = useDataContext();
    const user = userData.user;
    const [name, setName] = useState(user ? user.name : "");
    const [document, setDocument] = useState(user ? user.document : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [phone, setPhone] = useState(user ? user.phone : "");
    const [password, setPassword] = useState(user ? user.password : "");
    const [confimrPassword, setConfimrPassword] = useState(user ? user.password : "");
    const [address, setAddress] = useState(user ? user.address : "");
    const [postalCode, setPostalCode] = useState(user ? user.postalCode : "");
    const [pixKey, setPixKey] = useState(user ? user.pixKey : "");

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-full mt-32 flex flex-col">
                {!userData.user?.acceptTerms &&
                    <span className="mx-8">
                        <h1 className="text-dark-color text-xl text-center">
                            Finalize seu cadastro para poder ter acesso à visualização de totalizadores, recebíveis e realizar antecipações.
                        </h1>
                        <p className="text-dark-color text-md font-light text-center mt-6">
                            Lembrando que para ter acesso aos serviços é necessário aceitar os termos de serviço.
                        </p>
                    </span>
                }
                <div className="w-full h-full flex flex-col mt-6 p-8">
                    <span className="font-medium text-dark-color mt-6 md:text-lg">
                        Informações básicas
                    </span>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="w-full mt-6 relative md:mr-4">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Nome
                            </p>
                            <input type="text" id="name" onChange={e => setName(e.target.value)} value={name}
                                placeholder="Nome do usuário" className="w-full h-14 px-4 border placeholder-dark-color 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                        <div className="w-full mt-7 relative md:mt-6">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Documento
                            </p>
                            <input type="text" id="username" onChange={e => setDocument(e.target.value)} value={document}
                                placeholder="Username" className="w-full h-14 px-4 border placeholder-dark-color 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="w-full mt-6 relative md:mr-4">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                E-mail
                            </p>
                            <input type="text" id="name" onChange={e => setEmail(e.target.value)} value={email}
                                placeholder="Nome do usuário" className="w-full h-14 px-4 border placeholder-dark-color 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                        <div className="w-full mt-7 relative md:mt-6">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Telefone
                            </p>
                            <input type="text" id="username" onChange={e => setPhone(e.target.value)} value={phone}
                                placeholder="Username" className="w-full h-14 px-4 border placeholder-dark-color 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="w-full mt-6 relative md:mr-4">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Senha
                            </p>
                            <input type="text" id="name" onChange={e => setPassword(e.target.value)} value={password}
                                placeholder="Nome do usuário" className="w-full h-14 px-4 border placeholder-dark-color 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                        <div className="w-full mt-7 relative md:mt-6">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Confirmar Senha
                            </p>
                            <input type="text" id="username" onChange={e => setConfimrPassword(e.target.value)} value={confimrPassword}
                                placeholder="Username" className="w-full h-14 px-4 border placeholder-dark-color 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="w-full mt-6 relative md:mr-4">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Endereço
                            </p>
                            <input type="text" id="name" onChange={e => setAddress(e.target.value)} value={address}
                                placeholder="Nome do usuário" className="w-full h-14 px-4 border placeholder-dark-color 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                        <div className="w-full mt-7 relative md:mt-6">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                CEP
                            </p>
                            <input type="text" id="username" onChange={e => setPostalCode(e.target.value)} value={postalCode}
                                placeholder="Username" className="w-full h-14 px-4 border placeholder-dark-color 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="w-full mt-6 relative md:mr-4">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Chave PIX
                            </p>
                            <input type="text" id="name" onChange={e => setPixKey(e.target.value)} value={pixKey}
                                placeholder="Nome do usuário" className="w-full h-14 px-4 border placeholder-dark-color 
                                rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                                focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                        <div className="w-full mt-7 relative md:mt-6">
                            <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-second-gray-color text-xs font-medium">
                                Termos de uso
                            </p>
                            <input type="text" id="username" onChange={e => setEmail(e.target.value)} value={email}
                                placeholder="Username" className="w-full h-14 px-4 border placeholder-dark-color 
                               rounded-md bg-white border-second-gray-color shadow-sm text-sm focus:outline-none 
                               focus:ring-1 focus:ring-primary-color focus:border-transparent appearance-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}