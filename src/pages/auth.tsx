import Form from "src/components/Form";
import Header from "src/components/Header";
import { EnumFormType } from "../utils/types";

export default function Authentication() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex flex-col h-full bg-cover items-center bg-[url('../assets/images/login.jpg')]" >
                <div className="h-full flex flex-col justify-center mx-4">
                    <Form formType={EnumFormType.LOGIN} />
                </div>
                <footer className="flex justify-center mt-auto m-6" >
                    <p className="text-base text-white animate-fade-up">
                        Todos os direitos reservados. MilkPay®
                    </p>
                </footer>
            </main>
        </div>
    );
}