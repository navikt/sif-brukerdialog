import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import { initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import AppHeader from './components/app-header/AppHeader';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { VeilederProvider } from './context/VeilederContext';
import { appMessages } from './i18n';
import DeltakerPage from './pages/deltaker-page/DeltakerPage';
import InfoPage from './pages/info-page/InfoPage';
import NotFoundPage from './pages/page-not-found/PageNotFound';
import StartPage from './pages/start-page/StartPage';
import '@navikt/ds-css/darkside';
import './app.css';
import { ThemeProvider } from './context/ThemeContext';

initUngDeltakelseOpplyserApiClient({
    onUnAuthorized: () => {
        window.location.reload();
    },
});
const queryClient = new QueryClient();

const App = () => {
    return (
        <ThemeProvider>
            <VeilederProvider>
                <ErrorBoundary appKey="ung-veileder" appTitle="Ungdomsytelse Veileder">
                    <QueryClientProvider client={queryClient}>
                        <IntlProvider locale="nb" messages={appMessages.nb}>
                            <AppHeader />
                            <Routes>
                                <Route path="" element={<StartPage />}></Route>
                                <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                                <Route path="informasjon/*" element={<InfoPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </IntlProvider>
                    </QueryClientProvider>
                </ErrorBoundary>
            </VeilederProvider>
        </ThemeProvider>
    );
};

export default App;
