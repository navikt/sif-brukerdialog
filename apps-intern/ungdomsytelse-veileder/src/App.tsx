import '@navikt/ds-css';
import { UngdomsytelseVeilederApp } from '@navikt/sif-app-register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import './app.css';
import AppRouter from './AppRouter';
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
import { DevBranchInfo } from './components/dev-branch-info/DevBranchInfo';

const queryClient = new QueryClient();

initApiClients();

const App = () => {
    const env = getAppEnv();

    return (
        <ThemeProvider>
            {registerAnalytics(env.SIF_PUBLIC_UMAMI_NETTSIDE_ID)}
            <VeilederProvider>
                <ErrorBoundary fallback={<AppErrorFallback />}>
                    <AnalyticsProvider applicationKey={UngdomsytelseVeilederApp.key} isActive={true}>
                        <QueryClientProvider client={queryClient}>
                            <GlobalQueryLogger />
                            <IntlProvider locale="nb" messages={appMessages.nb}>
                                <AppRouter>
                                    <DrawerProvider
                                        initialContent={<DrawerArticles />}
                                        initialOpen={false}
                                        initialTitle="Hjelp og informasjon">
                                        <AppHeader />
                                        <AppRoutes />
                                    </DrawerProvider>
                                </AppRouter>
                            </IntlProvider>
                        </QueryClientProvider>
                    </AnalyticsProvider>
                </ErrorBoundary>
            </VeilederProvider>
            <DevBranchInfo />
        </ThemeProvider>
    );
};

export default App;
