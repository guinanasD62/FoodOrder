import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import ReduxProvider from '@/redux/redux-provider';
import { AuthProvider } from '@/auth/auth-context';
import '@/styles/globals.css';
import Loading from './loading';

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setLoading(true);
        };
        const handleRouteChangeComplete = () => {
            setLoading(false);
        };

        Router.events.on('routeChangeStart', handleRouteChangeStart);
        Router.events.on('routeChangeComplete', handleRouteChangeComplete);
        Router.events.on('routeChangeError', handleRouteChangeComplete);

        return () => {
            Router.events.off('routeChangeStart', handleRouteChangeStart);
            Router.events.off('routeChangeComplete', handleRouteChangeComplete);
            Router.events.off('routeChangeError', handleRouteChangeComplete);
        };
    }, []);

    return (
        <>
            {loading && <Loading />}
            <ReduxProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </ReduxProvider>
        </>
    );
}

export default MyApp;
