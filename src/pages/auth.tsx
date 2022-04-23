import Header from "../components/Header";
import Form from "../components/Form";
import { EnumFormType } from "../utils/types";

export default function Authentication() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex flex-col h-full items-center bg-[url('../assets/images/login.jpg')]" >
                <div className="h-full flex flex-col justify-center">
                    <Form formType={EnumFormType.REGISTER} />
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