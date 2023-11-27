import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import useSWR from 'swr';
import { ServerSidePropsResult } from '../auth/withAuthentication';
import ComponentLoader from '../components/component-loader/ComponentLoader';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentBrukerFeilet from '../components/hent-bruker-feilet/HentBrukerFeilet';
import EmptyPage from '../components/layout/empty-page/EmptyPage';
import { Innsynsdata } from '../types/InnsynData';
import { messages } from '../utils/message';
import { innsynsdataFetcher } from './api/innsynsdata.api';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';
import { InnsynsdataContextProvider } from '../context/InnsynsdataContextProvider';

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    const { data, error, isLoading } = useSWR<Innsynsdata, AxiosError>(
        '/dine-pleiepenger/api/innsynsdata',
        innsynsdataFetcher,
        {
            errorRetryCount: 0,
        },
    );

    if (isLoading) {
        return (
            <EmptyPage>
                <ComponentLoader />
            </EmptyPage>
        );
    }
    return (
        <ErrorBoundary>
            <main id="maincontent" role="main" tabIndex={-1}>
                <IntlProvider locale="nb" messages={messages.nb}>
                    {error ? <HentBrukerFeilet error={error} /> : null}
                    {data ? (
                        <InnsynsdataContextProvider innsynsdata={data}>
                            <Component {...pageProps} />
                        </InnsynsdataContextProvider>
                    ) : null}
                </IntlProvider>
            </main>
        </ErrorBoundary>
    );
}

export default MyApp;
