import { Page } from '@navikt/ds-react';
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

initUngDeltakelseOpplyserApiClient();

const App = () => {
    return (
        <VeilederProvider veileder={{ fornavn: 'Pål', etternavn: 'Veileder Hønesen' }}>
            <IntlProvider locale="nb" messages={appMessages.nb}>
                <AppHeader />
                <Page className="bg-gray-300">
                    <Routes>
                        <Route path="" element={<StartPage />}></Route>
                        <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                        <Route path="informasjon/*" element={<InfoPage />} />
                    </Routes>
                </Page>
            </IntlProvider>
        </VeilederProvider>
    );
};

export default App;
