import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { appMessages } from './i18n';
import StartPage from './pages/start-page/StartPage';
import DeltakerPage from './components/DeltakerPage';
import './app.css';
import { Page } from '@navikt/ds-react';

const App = () => {
    return (
        <IntlProvider locale="nb" messages={appMessages.nb}>
            <AppHeader />
            <Page className="bg-gray-500">
                <Routes>
                    <Route path="" element={<StartPage />}></Route>
                    <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                </Routes>
            </Page>
        </IntlProvider>
    );
};

export default App;
