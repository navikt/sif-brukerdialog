import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { EnvKey, getMaybeEnv } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import DeltakerInfoLoader from './components/deltaker-info-loader/DeltakerInfoLoader';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import DevFooter from './dev/DevFooter';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import { AnalyticsProvider, registerAnalytics } from './utils/analytics';
import { getAppEnv } from './utils/appEnv';
import { initApiClients } from './utils/initApiClients';
import { initSentry } from './utils/sentryUtils';
import '@navikt/ds-css/darkside';
import './app.css';

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
    const analyticsIsActive = env[EnvKey.SIF_PUBLIC_USE_AMPLITUDE] === 'true';
    return (
        <ErrorBoundary fallback={<AppErrorFallback />}>
            {analyticsIsActive && registerAnalytics(env.SIF_PUBLIC_UMAMI_NETTSIDE_ID)}
            <FaroProvider
                appVersion={env.APP_VERSION}
                applicationKey={UngdomsytelseDeltakerApp.key}
                telemetryCollectorURL={env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}
                isActive={env.SIF_PUBLIC_USE_FARO === 'true'}>
                <AnalyticsProvider applicationKey={UngdomsytelseDeltakerApp.key} isActive={analyticsIsActive}>
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
