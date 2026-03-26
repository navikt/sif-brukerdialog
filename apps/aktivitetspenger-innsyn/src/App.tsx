import '@navikt/ds-css';
import './app.css';

import { Theme } from '@navikt/ds-react';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { EnvKey } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import MockDate from 'mockdate';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import { getMockToday } from '../mock/utils/mockDate';
import { initApiClients } from './app/api/initApiClients';
import { getAppEnv } from './app/appEnv';
import AppRouter from './app/AppRouter';
import { applicationIntlMessages } from './app/i18n';
import { AppErrorBoundary } from './app/setup/wrappers/AppErrorBoundary';
import { SifQueryClientProvider } from './app/setup/wrappers/SifQueryClientProvider';
import { InitialDataLoader } from './InitialDataLoader';

initApiClients();

const appEnv = getAppEnv();
const basePath = appEnv[EnvKey.PUBLIC_PATH];

if (globalThis.location.pathname === '/') {
    globalThis.location.pathname = basePath;
}

if (__INJECT_DECORATOR_CLIENT_SIDE__) {
    injectDecoratorClientSide({
        env: 'dev',
        params: {
            simple: false,
            chatbot: true,
        },
    });
}

if (__USE_FIXED_MOCKED_DATE__) {
    MockDate.set(getMockToday());
}

export const App = () => {
    /** Setter bakgrunnsfarge på body */
    useEffect(() => {
        document.body.classList.add('innsynAppBody');
        return () => {
            document.body.classList.remove('innsynAppBody');
        };
    }, []);

    return (
        <Theme hasBackground={false}>
            <FaroProvider
                applicationKey={AktivitetspengerApp.key}
                appVersion={appEnv.APP_VERSION}
                isActive={appEnv.SIF_PUBLIC_USE_FARO === 'true'}>
                <AppErrorBoundary>
                    <SifQueryClientProvider>
                        <IntlProvider locale="nb" messages={applicationIntlMessages.nb}>
                            <AppRouter>
                                <InitialDataLoader />
                            </AppRouter>
                        </IntlProvider>
                    </SifQueryClientProvider>
                </AppErrorBoundary>
            </FaroProvider>
        </Theme>
    );
};
