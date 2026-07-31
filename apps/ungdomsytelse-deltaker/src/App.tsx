import '@navikt/ds-css';
import './app.css';

import { VStack } from '@navikt/ds-react';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { SøknadAppProvider } from '@sif/soknad-app';
import MockDate from 'mockdate';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { getMockToday } from '../mock/utils/mockDate';
import DeltakerInfoLoader from './components/deltaker-info-loader/DeltakerInfoLoader';
import { DemoInformasjon } from './demo/DemoInformasjon';
import { DemoScenarioHeader } from './demo/DemoScenarioHeader';
import { applicationIntlMessages } from './i18n';
import { getAppEnv } from './app/setup/appEnv';
import { initApiClients } from './utils/initApiClients';

const env = getAppEnv();
initApiClients();

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
    if (!(__IS_GITHUB_PAGES__ || __IS_VEILEDER_DEMO__) && globalThis.location.pathname === '/') {
        globalThis.location.pathname = env.PUBLIC_PATH;
        return null;
    }

    return (
        <SøknadAppProvider
            applicationKey={UngdomsytelseDeltakerApp.key}
            appVersion={env.APP_VERSION}
            faroConfig={{
                isActive: env.SIF_PUBLIC_USE_FARO === 'true',
                telemetryCollectorURL: env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
            }}
            analyticsConfig={{ isActive: env.SIF_PUBLIC_USE_ANALYTICS === 'true' }}
            sentryConfig={{
                dsn: 'https://01c0cdacd803d88882c2eab4c345c610@sentry.gc.nav.no/179',
                application: 'ungdomsytelse-deltaker',
            }}
            intlConfig={{ intlMessages: applicationIntlMessages, useLanguageSelector: true }}
            appStatusConfig={{
                sanityConfig: {
                    projectId: env.SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: env.SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}>
            {__IS_GITHUB_PAGES__ || __IS_VEILEDER_DEMO__ ? (
                <HashRouter>
                    <div className="demoMode">
                        <VStack gap="space-40">
                            <DemoScenarioHeader />
                            <aside>
                                <DemoInformasjon />
                            </aside>
                        </VStack>
                        <DeltakerInfoLoader />
                    </div>
                </HashRouter>
            ) : (
                <BrowserRouter basename={env.PUBLIC_PATH}>
                    {__SCENARIO_HEADER__ ? <DemoScenarioHeader /> : null}
                    <DeltakerInfoLoader />
                </BrowserRouter>
            )}
        </SøknadAppProvider>
    );
};

export default App;
