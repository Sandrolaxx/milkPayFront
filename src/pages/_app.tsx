import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DataProvider from "../context/data";
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <DataProvider>
            <ToastContainer />
            <Component {...pageProps} />
        </DataProvider>
    );
}