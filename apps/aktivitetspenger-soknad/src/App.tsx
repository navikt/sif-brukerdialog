import '@navikt/ds-css';
import './app.css';

import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { EnvKey } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import { DevBranchInfo } from '@sif/soknad-ui';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { AppErrorBoundary } from './app/AppErrorBoundary';
import { AppContextProvider } from './app/context/AppContext';
import { applicationIntlMessages, useAppIntl } from './app/i18n';
import { SifQueryClientProvider } from './app/SifQueryClientProvider';
import { initApiClients } from './app/api/initApiClients';
import { getAppEnv } from './app/setup/env/appEnv';
import { Søknad } from './app/Soknad';
import { ScenarioHeader } from './demo/ScenarioHeader';
import { useInitialData } from './useInitialData';
import { ErrorPage, LoadingPage } from '@sif/soknad-ui';

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
                    value={{ søker: result.data.søker, barn: result.data.barn, kontoInfo: result.data.kontonummer }}>
                    <Søknad />
                </AppContextProvider>
            );
    }
};

export const App = () => {
    const appEnv = getAppEnv();
    const basePath = appEnv[EnvKey.PUBLIC_PATH];

    initApiClients();

    if (globalThis.location.pathname === '/') {
        globalThis.location.pathname = basePath;
        return null;
    }

    return (
        <FaroProvider
            applicationKey={AktivitetspengerApp.key}
            appVersion={appEnv.APP_VERSION}
            isActive={appEnv.SIF_PUBLIC_USE_FARO === 'true'}>
            <AppErrorBoundary>
                <SifQueryClientProvider>
                    <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                        <BrowserRouter basename={basePath}>
                            {__SCENARIO_HEADER__ ? <ScenarioHeader /> : null}
                            <SøknadDataWrapper />
                        </BrowserRouter>
                    </IntlProvider>
                </SifQueryClientProvider>
            </AppErrorBoundary>
            <DevBranchInfo />
        </FaroProvider>
    );
};
