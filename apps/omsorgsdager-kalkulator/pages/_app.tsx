import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { Locale } from '@navikt/nav-dekoratoren-moduler';
import Container from '../components/container/Container';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { messages } from '../utils/message';
import '../styles/globals.css';
import '../styles/buttonRow.scss';
import '../styles/ResultBox.scss';
import '@navikt/ds-css';

const getLocaleOrFallback = (locale?: string) => {
    if (locale && ['nb', 'nn'].includes(locale)) {
        return locale;
    }

    return 'nb';
};

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const locale = getLocaleOrFallback(router.locale);
    return (
        <IntlProvider locale={locale} messages={messages[locale as Locale]}>
            <>
                <Head>
                    {process.env.NEXT_PUBLIC_ENVIRONMENT != 'prod' ? <meta name="robots" content="noindex" /> : ''}
                    <title>Omsorgdager kalkulator - www.nav.no</title>
                </Head>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </>
        </IntlProvider>
    );
}
