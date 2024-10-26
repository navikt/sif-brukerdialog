import { Status, StatusMessage } from '@navikt/appstatus-react-ds';
import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { configureLogger } from '@navikt/next-logger';
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
import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro';
import { messages } from '../i18n';
import { Innsynsdata } from '../types/InnsynData';
import appSentryLogger from '../utils/appSentryLogger';
import { browserEnv } from '../utils/env';
import UnavailablePage from './unavailable.page';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';
import { Feature } from '../utils/features';

export const AMPLITUDE_APPLICATION_KEY = 'sif-innsyn';

const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

if (Feature.FARO) {
    initInstrumentation();
    configureLogger({
        basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        onLog: (log) =>
            getFaro().api.pushLog(log.messages, {
                level: pinoLevelToFaroLevel(log.level.label),
            }),
    });
}

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
                <Head>Henter informasjon - Dine pleiepenger for sykt barn</Head>
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
                apiKey={browserEnv.NEXT_PUBLIC_AMPLITUDE_API_KEY}
                isActive={browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production'}>
                {data.appStatus?.status === Status.unavailable ? (
                    <UnavailablePage />
                ) : (
                    <main>
                        {data.appStatus?.message && (
                            <div className="max-w-[1128px] mx-auto p-5 mb-5">
                                <StatusMessage message={data.appStatus.message} />
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
