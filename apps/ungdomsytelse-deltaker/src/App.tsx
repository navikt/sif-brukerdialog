import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { getMaybeEnv } from '@navikt/sif-common-env';
import DeltakerInfoLoader from './components/deltaker-info-loader/DeltakerInfoLoader';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import DevFooter from './dev/DevFooter';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import { AnalyticsProvider } from './utils/analytics';
import { initApiClients } from './utils/initApiClients';
import { initSentry } from './utils/sentryUtils';
import '@navikt/ds-css/darkside';
import './app.css';
import { FaroProvider } from '@navikt/sif-common-faro';
import { getAppEnv } from './utils/appEnv';

initSentry();
initApiClients();

if (getMaybeEnv('VITE') && getMaybeEnv('ENV') !== 'prod') {
    injectDecoratorClientSide({
        env: 'dev',
        params: {
            simple: false,
            chatbot: true,
        },
    });
}

const queryClient = new QueryClient();

if (window.location.pathname === '/') {
    window.location.pathname = '/ungdomsprogrammet/ytelsen/';
}

if (window.location.pathname === '/ungdomsytelse-deltaker') {
    window.location.pathname = '/ungdomsprogrammet/ytelsen/';
}

function App() {
    const env = getAppEnv();
    return (
        <ErrorBoundary fallback={<AppErrorFallback />}>
            <FaroProvider
                appVersion={env.APP_VERSION}
                applicationKey={UngdomsytelseDeltakerApp.key}
                telemetryCollectorURL={env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}
                isActive={env.SIF_PUBLIC_USE_FARO}>
                <AnalyticsProvider
                    applicationKey={UngdomsytelseDeltakerApp.key}
                    logToConsoleOnly={true}
                    isActive={true}>
                    <QueryClientProvider client={queryClient}>
                        <AppIntlMessageProvider>
                            <DeltakerInfoLoader />
                            <DevFooter />
                        </AppIntlMessageProvider>
                    </QueryClientProvider>
                </AnalyticsProvider>
            </FaroProvider>
        </ErrorBoundary>
    );
}

export default App;
