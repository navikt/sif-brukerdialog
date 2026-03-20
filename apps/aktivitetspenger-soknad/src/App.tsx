import '@navikt/ds-css';
import './app.css';

import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { FaroProvider } from '@navikt/sif-common-faro';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { applicationIntlMessages } from './app/i18n';
import { getAppEnv } from './app/setup/env/appEnv';
import { AppErrorBoundary } from './app/setup/wrappers/AppErrorBoundary';
import { InitialDataLoader } from './InitialDataLoader';

initApiClients();

const appEnv = getAppEnv();
const queryClient = new QueryClient();

export const App = () => {
    return (
        <FaroProvider
            applicationKey={AktivitetspengerApp.key}
            appVersion={appEnv.APP_VERSION}
            isActive={appEnv.SIF_PUBLIC_USE_FARO === 'true'}>
            <AppErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                        <BrowserRouter basename="/aktivitetspenger-soknad">
                            <InitialDataLoader />
                        </BrowserRouter>
                    </IntlProvider>
                </QueryClientProvider>
            </AppErrorBoundary>
        </FaroProvider>
    );
};
