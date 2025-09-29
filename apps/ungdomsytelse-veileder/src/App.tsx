import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { UngdomsytelseVeilederApp } from '@navikt/sif-app-register';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { FaroProvider } from '@navikt/sif-common-faro';
import AppRoutes from './AppRoutes';
import AppHeader from './components/app-header/AppHeader';
import { DrawerProvider } from './components/drawer/DrawerContext';
import AppErrorFallback from './components/error-boundary/AppErrorFallback';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { VeilederProvider } from './context/VeilederContext';
import { appMessages } from './i18n';
import DrawerArticles from './pages/info-page/DrawerArticles';
import { AnalyticsProvider, registerAnalytics } from './utils/analytics';
import { getAppEnv } from './utils/appEnv';
import { GlobalQueryLogger } from './utils/globalQueryLogger';
import { initApiClients } from './utils/initApiClients';
import '@navikt/ds-css/darkside';
import './app.css';

const queryClient = new QueryClient();

initApiClients();

const App = () => {
    const env = getAppEnv();

    return (
        <ThemeProvider>
            {registerAnalytics(env.SIF_PUBLIC_UMAMI_NETTSIDE_ID)}
            <VeilederProvider>
                <FaroProvider
                    appVersion={env.APP_VERSION}
                    applicationKey={UngdomsytelseVeilederApp.key}
                    telemetryCollectorURL={env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}
                    isActive={env.SIF_PUBLIC_USE_FARO}>
                    <ErrorBoundary fallback={<AppErrorFallback />}>
                        <AnalyticsProvider applicationKey={UngdomsytelseVeilederApp.key} isActive={true}>
                            <QueryClientProvider client={queryClient}>
                                <GlobalQueryLogger />
                                <IntlProvider locale="nb" messages={appMessages.nb}>
                                    <BrowserRouter basename={getRequiredEnv('PUBLIC_PATH')}>
                                        <DrawerProvider
                                            initialContent={<DrawerArticles />}
                                            initialOpen={false}
                                            initialTitle="Hjelp og informasjon">
                                            <AppHeader />
                                            <AppRoutes />
                                        </DrawerProvider>
                                    </BrowserRouter>
                                </IntlProvider>
                            </QueryClientProvider>
                        </AnalyticsProvider>
                    </ErrorBoundary>
                </FaroProvider>
            </VeilederProvider>
        </ThemeProvider>
    );
};

export default App;
