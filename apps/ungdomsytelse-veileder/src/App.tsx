import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import AppRoutes from './AppRoutes';
import AppHeader from './components/app-header/AppHeader';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { VeilederProvider } from './context/VeilederContext';
import { appMessages } from './i18n';
import { initApiClients } from './utils/initApiClients';
import '@navikt/ds-css/darkside';
import './app.css';

const queryClient = new QueryClient();

initApiClients();

const App = () => {
    return (
        <ThemeProvider>
            <VeilederProvider>
                <ErrorBoundary fallback={<AppErrorFallback />}>
                    <QueryClientProvider client={queryClient}>
                        <IntlProvider locale="nb" messages={appMessages.nb}>
                            <BrowserRouter basename={getRequiredEnv('PUBLIC_PATH')}>
                                <AppHeader />
                                <AppRoutes />
                            </BrowserRouter>
                        </IntlProvider>
                    </QueryClientProvider>
                </ErrorBoundary>
            </VeilederProvider>
        </ThemeProvider>
    );
};

export default App;
