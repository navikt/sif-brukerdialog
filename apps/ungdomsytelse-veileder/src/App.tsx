import { Page, VStack } from '@navikt/ds-react';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import { initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';
import AppHeader from './components/app-header/AppHeader';
import { VeilederProvider } from './context/VeilederContext';
import { appMessages } from './i18n';
import DeltakerPage from './pages/deltaker-page/DeltakerPage';
import InfoPage from './pages/info-page/InfoPage';
import StartPage from './pages/start-page/StartPage';
import './app.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFoundPage from './pages/page-not-found/PageNotFound';
import DevFooter from './dev-components/DevFooter';
import { ToDoProvider } from './dev-components/ToDo/ToDoContext';
import { getAppEnv } from './utils/appEnv';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

initUngDeltakelseOpplyserApiClient({
    onUnAuthorized: () => {
        window.location.reload();
    },
});
const queryClient = new QueryClient();

const App = () => {
    return (
        <VeilederProvider>
            <ToDoProvider>
                <ErrorBoundary appKey="ung-veileder" appTitle="Ungdomsytelse Veileder">
                    <QueryClientProvider client={queryClient}>
                        <IntlProvider locale="nb" messages={appMessages.nb}>
                            <VStack gap="4" className="bg-gray-300">
                                <AppHeader />
                                <Page style={{ minHeight: 'calc(100lvh - 3rem)' }} className="bg-gray-300">
                                    <Routes>
                                        <Route path="" element={<StartPage />}></Route>
                                        <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                                        <Route path="informasjon/*" element={<InfoPage />} />
                                        <Route path="informasjon/*" element={<InfoPage />} />
                                        <Route path="*" element={<NotFoundPage />} />
                                    </Routes>
                                </Page>
                            </VStack>
                        </IntlProvider>
                    </QueryClientProvider>
                </ErrorBoundary>
                {getAppEnv()['ENV'] === 'development' ? <DevFooter /> : null}
            </ToDoProvider>
        </VeilederProvider>
    );
};

export default App;
