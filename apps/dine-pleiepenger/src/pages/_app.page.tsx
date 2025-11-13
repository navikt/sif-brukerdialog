import 'react-loading-skeleton/dist/skeleton.css';
import '../style/global.css';

import { Status, StatusMessage } from '@navikt/appstatus-react-ds';
import { Theme } from '@navikt/ds-react';
import { configureLogger } from '@navikt/next-logger';
import { InnsynPsbApp } from '@navikt/sif-app-register';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import { useVerifyCurrentUser } from '@navikt/sif-common-core-ds';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import useSWR from 'swr';

import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentInnsynsdataFeilet from '../components/hent-innsynsdata-feilet/HentInnsynsdataFeilet';
import EmptyPage from '../components/page-layout/empty-page/EmptyPage';
import PageLoading from '../components/page-layout/page-loading/PageLoading';
import { InnsynsdataContextProvider } from '../context/InnsynsdataContextProvider';
import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro';
import { messages } from '../i18n';
import { Søker } from '../server/api-models/SøkerSchema';
import { Innsynsdata } from '../types/InnsynData';
import appSentryLogger from '../utils/appSentryLogger';
import { browserEnv } from '../utils/env';
import { Feature } from '../utils/features';
import { swrBaseConfig } from '../utils/swrBaseConfig';
import UnavailablePage from './unavailable.page';

export const AMPLITUDE_APPLICATION_KEY = 'sif-innsyn';

const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

const søkerIdFetcher = async (): Promise<string> => {
    const url = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soker`;
    return axios.get<Søker>(url).then((res) => res.data.fødselsnummer);
};

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
        swrBaseConfig,
    );

    // Legg inn sjekk på at innlogget bruker er den samme når vinduet vises/får fokus.
    // Ligger her for å være aktiv i alle sider i løsningen.
    useVerifyCurrentUser(data?.søker.fødselsnummer || '', søkerIdFetcher);

    if (isLoading) {
        return (
            <PageLoading
                title="Henter informasjon..."
                documentTitle="Henter informasjon - Dine pleiepenger for sykt barn"
            />
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
        <Theme hasBackground={false}>
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
        </Theme>
    );
}

export default MyApp;
