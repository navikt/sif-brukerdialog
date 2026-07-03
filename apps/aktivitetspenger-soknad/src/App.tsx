import '@navikt/ds-css';
import './app.css';

import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { SøknadAppProvider } from '@sif/soknad-app';
import { ErrorPage, LoadingPage } from '@sif/soknad-ui';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { AppContextProvider } from './app/context/AppContext';
import { applicationIntlMessages, useAppIntl } from './app/i18n';
import { getAppEnv } from './app/setup/appEnv';
import { Søknad } from './app/Soknad';
import { ScenarioHeader } from './demo/ScenarioHeader';
import { useInitialData } from './useInitialData';

const SøknadDataWrapper = () => {
    const result = useInitialData();
    const { text } = useAppIntl();
    switch (result.status) {
        case 'loading':
            return <LoadingPage applicationTitle={text('application.title')} />;
        case 'error':
            if (import.meta.env.MODE === 'development') {
                // eslint-disable-next-line no-console
                console.error(
                    result.errors.map((e) => (e as Error).message).join(', ') || 'Ukjent feil ved innlasting',
                );
            }
            return <ErrorPage applicationTitle={text('application.title')} />;
        case 'success':
            return (
                <AppContextProvider
                    value={{
                        søker: result.data.søker,
                        registrerteBarn: result.data.barn,
                        kontoInfo: result.data.kontonummer,
                    }}>
                    <Søknad />
                </AppContextProvider>
            );
    }
};

const env = getAppEnv();
initApiClients(env);

export const App = () => {
    if (globalThis.location.pathname === '/') {
        globalThis.location.pathname = env.PUBLIC_PATH;
        return null;
    }

    return (
        <SøknadAppProvider
            applicationKey={AktivitetspengerApp.key}
            appVersion={env.APP_VERSION}
            faroConfig={{
                isActive: env.SIF_PUBLIC_USE_FARO === 'true',
                telemetryCollectorURL: env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
            }}
            analyticsConfig={{ isActive: env.SIF_PUBLIC_USE_ANALYTICS === 'true' }}
            sentryConfig={{
                dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
                application: 'aktivitetspenger-soknad',
            }}
            intlConfig={{ intlMessages: applicationIntlMessages, useLanguageSelector: true }}>
            <BrowserRouter basename={env.PUBLIC_PATH}>
                {__SCENARIO_HEADER__ ? <ScenarioHeader /> : null}
                <SøknadDataWrapper />
            </BrowserRouter>
        </SøknadAppProvider>
    );
};
