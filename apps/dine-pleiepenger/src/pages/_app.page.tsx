import { Status, StatusMessage } from '@navikt/appstatus-react-ds';
import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { InnsynPsbApp } from '@navikt/sif-app-register';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import Head from 'next/head';
import useSWR from 'swr';
import ComponentLoader from '../components/component-loader/ComponentLoader';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentInnsynsdataFeilet from '../components/hent-innsynsdata-feilet/HentInnsynsdataFeilet';
import EmptyPage from '../components/page-layout/empty-page/EmptyPage';
import { InnsynsdataContextProvider } from '../context/InnsynsdataContextProvider';
import { Innsynsdata } from '../types/InnsynData';
import appSentryLogger from '../utils/appSentryLogger';
import { browserEnv } from '../utils/env';
import UnavailablePage from './unavailable.page';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';
import { messages } from '../i18n';

export const APPLICATION_KEY = 'sif-innsyn';

const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    const { data, error, isLoading } = useSWR<Innsynsdata, AxiosError>(
        `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/innsynsdata`,
        innsynsdataFetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            errorRetryCount: 0,
        },
    );

    if (isLoading) {
        return (
            <EmptyPage>
                <Head>Henter informasjon - Dine pleiepenger</Head>
                <ComponentLoader />
            </EmptyPage>
        );
    }

    if (error || !data) {
        appSentryLogger.logError('fetchInnsynsdata-failed', JSON.stringify({ error }));
        return (
            <EmptyPage>
                <HentInnsynsdataFeilet error={error} />
            </EmptyPage>
        );
    }

    return (
        <ErrorBoundary>
            <AmplitudeProvider
                applicationKey={InnsynPsbApp.key}
                isActive={browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production'}>
                {data.appStatus?.status === Status.unavailable ? (
                    <UnavailablePage />
                ) : (
                    <main>
                        {appStatus?.message && (
                            <div className="max-w-[1128px] mx-auto p-5 mb-5">
                                <StatusMessage message={appStatus.message} />
                            </div>
                        )}
                        <IntlProvider locale="nb" messages={messages.nb}>
                            <InnsynsdataContextProvider innsynsdata={data}>
                                <Component {...pageProps} />
                            </InnsynsdataContextProvider>
                        </IntlProvider>
                    </main>
                )}
            </AmplitudeProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
