import { Status, StatusMessage } from '@navikt/appstatus-react-ds';
import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { InnsynPsbApp } from '@navikt/sif-app-register';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import { AxiosError } from 'axios';
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
import { messages } from '../utils/message';
import { innsynsdataFetcher } from './api/innsynsdata.api';
import UnavailablePage from './unavailable.page';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';

export const APPLICATION_KEY = 'sif-innsyn';

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

    // const appStatus = useAppStatus('sif-innsyn', {
    //     projectId: browserEnv.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
    //     dataset: browserEnv.NEXT_PUBLIC_APPSTATUS_DATASET,
    // });

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

    const { appStatus } = data;
    if (appStatus?.status === Status.unavailable) {
        return <UnavailablePage />;
    }

    return (
        <ErrorBoundary>
            <AmplitudeProvider applicationKey={InnsynPsbApp.key}>
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
            </AmplitudeProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
