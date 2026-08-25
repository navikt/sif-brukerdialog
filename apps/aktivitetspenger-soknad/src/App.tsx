import '@navikt/ds-css';
import './app.css';

import { AktivitetspengerSoknadApp } from '@navikt/sif-app-register';
import { SøknadAppProvider } from '@sif/soknad-app';
import { InitialDataErrorPage, LoadingPage } from '@sif/soknad-ui';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { AppContextProvider } from './app/context/AppContext';
import { applicationIntlMessages, useAppIntl } from './app/i18n';
import { getAppEnv } from './app/setup/appEnv';
import { Søknad } from './app/Soknad';
import { ScenarioHeader } from './demo/ScenarioHeader';
import { useInitialData } from './useInitialData';

initApiClients();

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
            return <InitialDataErrorPage applicationTitle={text('application.title')} />;
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

export const App = () => {
    const env = getAppEnv();
    if (globalThis.location.pathname === '/') {
        globalThis.location.pathname = env.PUBLIC_PATH;
        return null;
    }

    return (
        <SøknadAppProvider
            applicationKey={AktivitetspengerSoknadApp.key}
            analyticsConfig={{ isActive: env.SIF_PUBLIC_USE_ANALYTICS === 'true' }}
            intlConfig={{ intlMessages: applicationIntlMessages, useLanguageSelector: true }}>
            <BrowserRouter basename={env.PUBLIC_PATH}>
                {__SCENARIO_HEADER__ ? <ScenarioHeader /> : null}
                <SøknadDataWrapper />
            </BrowserRouter>
        </SøknadAppProvider>
    );
};
