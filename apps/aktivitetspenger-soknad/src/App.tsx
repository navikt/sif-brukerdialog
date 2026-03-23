import '@navikt/ds-css';
import './app.css';

import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { EnvKey } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { applicationIntlMessages } from './app/i18n';
import { getAppEnv } from './app/setup/env/appEnv';
import { AppErrorBoundary } from './app/setup/wrappers/AppErrorBoundary';
import { SifQueryClientProvider } from './app/setup/wrappers/SifQueryClientProvider';
import { InitialDataLoader } from './InitialDataLoader';

initApiClients();

const appEnv = getAppEnv();
const basePath = appEnv[EnvKey.PUBLIC_PATH];

if (globalThis.location.pathname === '/') {
    globalThis.location.pathname = basePath;
}

export const App = () => {
    return (
        <FaroProvider
            applicationKey={AktivitetspengerApp.key}
            appVersion={appEnv.APP_VERSION}
            isActive={appEnv.SIF_PUBLIC_USE_FARO === 'true'}>
            <AppErrorBoundary>
                <SifQueryClientProvider>
                    <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                        <BrowserRouter basename={basePath}>
                            <InitialDataLoader />
                        </BrowserRouter>
                    </IntlProvider>
                </SifQueryClientProvider>
            </AppErrorBoundary>
        </FaroProvider>
    );
};
