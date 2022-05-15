import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    );
}