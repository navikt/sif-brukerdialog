import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import AppStatusWrapper from '@navikt/sif-common-core-ds/lib/components/app-status-wrapper/AppStatusWrapper';
import { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import Head from 'next/head';
import useSWR from 'swr';
import { ServerSidePropsResult } from '../auth/withAuthentication';
import ComponentLoader from '../components/component-loader/ComponentLoader';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentInnsynsdataFeilet from '../components/hent-innsynsdata-feilet/HentInnsynsdataFeilet';
import EmptyPage from '../components/page-layout/empty-page/EmptyPage';
import { InnsynsdataContextProvider } from '../context/InnsynsdataContextProvider';
import { Innsynsdata } from '../types/InnsynData';
import { browserEnv } from '../utils/env';
import { messages } from '../utils/message';
import { innsynsdataFetcher } from './api/innsynsdata.api';
import UnavailablePage from './unavailable.page';
import 'react-loading-skeleton/dist/skeleton.css';
import '../components/process/process.css';
import '../style/global.css';

export const APPLICATION_KEY = 'sif-innsyn';

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
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
    if (error) {
        return (
            <EmptyPage>
                <HentInnsynsdataFeilet error={error} />
            </EmptyPage>
        );
    }

    return (
        <ErrorBoundary>
            <main>
                <AppStatusWrapper
                    applicationKey={APPLICATION_KEY}
                    sanityConfig={{
                        projectId: browserEnv.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
                        dataset: browserEnv.NEXT_PUBLIC_APPSTATUS_DATASET,
                    }}
                    contentRenderer={() => (
                        <IntlProvider locale="nb" messages={messages.nb}>
                            {data ? (
                                <InnsynsdataContextProvider innsynsdata={data}>
                                    <Component {...pageProps} />
                                </InnsynsdataContextProvider>
                            ) : null}
                        </IntlProvider>
                    )}
                    unavailableContentRenderer={() => <UnavailablePage />}
                />
            </main>
        </ErrorBoundary>
    );
}

export default MyApp;
