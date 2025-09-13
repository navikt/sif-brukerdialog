import type { AppProps } from 'next/app';
import { Theme } from '@navikt/ds-react';
import { IntlProvider } from 'react-intl';
import { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '../components/container/Container';
import { messages } from '../utils/message';
import '@navikt/ds-css/darkside';
import '../components/section-panel/circle-mask/circleMask.scss';
import '../components/section-panel/sectionPanel.scss';
import '../styles/buttonRow.scss';
import '../styles/customExpCard.scss';
import '../styles/globals.css';
import '../styles/ResultBox.scss';

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
        <Theme>
            <IntlProvider locale={locale} messages={messages[locale as DecoratorLocale]}>
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
        </Theme>
    );
}
