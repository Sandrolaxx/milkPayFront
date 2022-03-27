import LayoutProps from "../utils/types";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: LayoutProps) {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}