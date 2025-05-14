import { Theme } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { getMaybeEnv } from '@navikt/sif-common-env';
import AppRouter from './AppRouter';
import DeltakerInfoLoader from './components/deltaker-info-loader/DeltakerInfoLoader';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import DevFooter from './dev/DevFooter';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
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
            simple: true,
            chatbot: true,
        },
    });
}

const queryClient = new QueryClient();

function App() {
    return (
        <Theme>
            <ErrorBoundary fallback={<AppErrorFallback />}>
                <QueryClientProvider client={queryClient}>
                    <AppIntlMessageProvider>
                        <AppRouter>
                            <DeltakerInfoLoader />
                        </AppRouter>
                        <DevFooter />
                    </AppIntlMessageProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </Theme>
    );
}

export default App;
