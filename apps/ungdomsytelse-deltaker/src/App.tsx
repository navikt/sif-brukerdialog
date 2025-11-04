import '@navikt/ds-css/darkside';
import './app.css';

import { SanityConfig } from '@navikt/appstatus-react-ds';
import { BodyShort } from '@navikt/ds-react';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { UxSignalsLoaderProvider } from '@navikt/sif-common-core-ds';
import AppStatusWrapper from '@navikt/sif-common-core-ds/src/components/app-status-wrapper/AppStatusWrapper';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { EnvKey } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MockDate from 'mockdate';

import { getMockToday } from '../mock/utils/mockDate';
import { AnalyticsProvider } from './analytics/analytics';
import DeltakerInfoLoader from './components/deltaker-info-loader/DeltakerInfoLoader';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import DevFooter from './dev/DevFooter';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import { getAppEnv } from './utils/appEnv';
import { initApiClients } from './utils/initApiClients';
import { initSentry } from './utils/sentryUtils';

initSentry();
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

const queryClient = new QueryClient();

if (globalThis.location.pathname === '/') {
    globalThis.location.pathname = '/ungdomsprogrammet/ytelsen/';
}

if (globalThis.location.pathname === '/ungdomsytelse-deltaker') {
    globalThis.location.pathname = '/ungdomsprogrammet/ytelsen/';
}

function App() {
    const env = getAppEnv();
    const analyticsIsActive = env[EnvKey.SIF_PUBLIC_USE_AMPLITUDE] === 'true';

    const sanityConfig: SanityConfig = {
        projectId: env.SIF_PUBLIC_APPSTATUS_PROJECT_ID,
        dataset: env.SIF_PUBLIC_APPSTATUS_DATASET,
    };

    return (
        <ErrorBoundary fallback={<AppErrorFallback />}>
            <AppIntlMessageProvider>
                <UxSignalsLoaderProvider>
                    <AppStatusWrapper
                        applicationKey={UngdomsytelseDeltakerApp.key}
                        sanityConfig={sanityConfig}
                        contentRenderer={() => (
                            <FaroProvider
                                appVersion={env.APP_VERSION}
                                applicationKey={UngdomsytelseDeltakerApp.key}
                                telemetryCollectorURL={env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}
                                isActive={env.SIF_PUBLIC_USE_FARO === 'true'}>
                                <AnalyticsProvider
                                    applicationKey={UngdomsytelseDeltakerApp.key}
                                    isActive={analyticsIsActive}>
                                    <QueryClientProvider client={queryClient}>
                                        <DeltakerInfoLoader />
                                        <DevFooter />
                                    </QueryClientProvider>
                                </AnalyticsProvider>
                            </FaroProvider>
                        )}
                        unavailableContentRenderer={() => (
                            <ErrorPage
                                bannerTitle="Ungdomsprogramytelsen"
                                pageTitle="Vi utfører vedlikehold"
                                contentRenderer={() => (
                                    <SifGuidePanel mood="happy" title="Vi utfører vedlikehold" poster={true}>
                                        <BodyShort className="pt-4" size="large">
                                            Sidene for ungdomsprogramytelsen er midlertidig utilgjengelige. Vi regner
                                            med å være ferdige snart, så prøv gjerne igjen om en liten stund.
                                        </BodyShort>
                                    </SifGuidePanel>
                                )}
                            />
                        )}
                    />
                </UxSignalsLoaderProvider>
            </AppIntlMessageProvider>
        </ErrorBoundary>
    );
}

export default App;
