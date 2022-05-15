import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    );
}