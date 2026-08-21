import 'react-loading-skeleton/dist/skeleton.css';
import '../style/global.css';

import { Theme } from '@navikt/ds-react';
import { configureLogger } from '@navikt/next-logger';
import { InnsynPsbApp } from '@navikt/sif-app-register';
import { AnalyticsProvider } from '@navikt/sif-common-analytics';
import axios, { AxiosError } from 'axios';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import useSWR from 'swr';

import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import HentInnsynsdataFeilet from '../components/hent-innsynsdata-feilet/HentInnsynsdataFeilet';
import SanityStatusBanner from '../components/sanity-status-banner/SanityStatusBanner';
import EmptyPage from '../components/page-layout/empty-page/EmptyPage';
import LoadingPage from '../components/page-layout/loading-page/LoadingPage';
import { InnsynsdataContextProvider } from '../context/InnsynsdataContextProvider';
import { appLogger } from '@sif/apm';
import { initNaisAPMClient } from '@nais/apm/react';
import { useVerifyCurrentUser } from '../hooks/useVerifyCurrentUser';
import { messages } from '../i18n';
import { SøkerDto } from '../server/dto-schemas/søkerDtoSchema';
import { Innsynsdata } from '../types';
import { innsynsdataClientSchema } from '../types/client-schemas/innsynsdataClientSchema';
import { søkerClientSchema } from '../types/client-schemas/søkerClientSchema';
import { browserEnv } from '../utils/env';
import { reportClientParseError } from '../utils/reportClientParseError';
import { logApiError } from '../utils/apiErrorLogger';
import { swrBaseConfig } from '../utils/swrBaseConfig';

const innsynsdataFetcher = async (url: string): Promise<Innsynsdata> =>
    axios.get(url).then((res) => {
        const result = innsynsdataClientSchema.safeParse(res.data);
        if (!result.success) {
            reportClientParseError(result.error, 'innsynsdataClientSchema');
            throw result.error;
        }
        return result.data;
    });

const søkerIdFetcher = async (): Promise<string> => {
    const url = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soker`;
    return axios.get<SøkerDto>(url).then((res) => {
        const result = søkerClientSchema.safeParse(res.data);
        if (!result.success) {
            reportClientParseError(result.error, 'søkerClientSchema');
            throw result.error;
        }
        return result.data.fødselsnummer;
    });
};

initNaisAPMClient({ app: 'dine-pleiepenger', namespace: 'dusseldorf' });
configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    onLog: (log) => appLogger.logError(log.messages.join(' ')),
});

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
            <LoadingPage
                title="Henter informasjon ..."
                documentTitle="Henter informasjon - Dine pleiepenger for sykt barn"
            />
        );
    }

    if (error || !data) {
        logApiError(error, 'fetchInnsynsdata-failed', { ignore401: true });
        return (
            <EmptyPage>
                <HentInnsynsdataFeilet error={error} />
            </EmptyPage>
        );
    }

    return (
        <Theme hasBackground={false}>
            <ErrorBoundary>
                <AnalyticsProvider
                    applicationKey={InnsynPsbApp.key}
                    isActive={browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production'}>
                    <SanityStatusBanner>
                        <main>
                            <IntlProvider locale="nb" messages={messages.nb}>
                                <InnsynsdataContextProvider innsynsdata={data}>
                                    <Component {...pageProps} />
                                </InnsynsdataContextProvider>
                            </IntlProvider>
                        </main>
                    </SanityStatusBanner>
                </AnalyticsProvider>
            </ErrorBoundary>
        </Theme>
    );
}

export default MyApp;
