import { Theme } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './AppRouter';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import DevFooter from './dev/DevFooter';
import { useInitApiClients } from './hooks/useInitApiClients';
import { AppIntlMessageProvider } from './i18n/AppIntlMessageProvider';
import '@navikt/ds-css/darkside';
import './app.css';

const queryClient = new QueryClient();

function App() {
    useInitApiClients();

    return (
        <Theme>
            <ErrorBoundary fallback={<AppErrorFallback />}>
                <QueryClientProvider client={queryClient}>
                    <AppIntlMessageProvider>
                        <AppRouter />
                        <DevFooter />
                    </AppIntlMessageProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </Theme>
    );
}

export default App;
