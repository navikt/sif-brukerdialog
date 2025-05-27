import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { UngdomsytelseVeilederApp } from '@navikt/sif-app-register';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import nais from '../nais.js';
import AppRoutes from './AppRoutes';
import AppHeader from './components/app-header/AppHeader';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { VeilederProvider } from './context/VeilederContext';
import { appMessages } from './i18n';
import { getAppEnv } from './utils/appEnv';
import { initApiClients } from './utils/initApiClients';
import '@navikt/ds-css/darkside';
import './app.css';

const queryClient = new QueryClient();

initApiClients();

const App = () => {
    const env = getAppEnv();
    return (
        <ThemeProvider>
            <VeilederProvider>
                <FaroProvider
                    appVersion={env.APP_VERSION}
                    applicationKey={UngdomsytelseVeilederApp.key}
                    telemetryCollectorURL={nais.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}
                    isActive={env.SIF_PUBLIC_USE_FARO}>
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
                </FaroProvider>
            </VeilederProvider>
        </ThemeProvider>
    );
};

export default App;
