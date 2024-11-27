import { Page } from '@navikt/ds-react';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { appMessages } from './i18n';
import StartPage from './pages/start-page/StartPage';
import DeltakerPage from './versjoner/versjon-1/pages/deltaker-page/DeltakerPage';
import './app.css';

const App = () => {
    return (
        <>
            <IntlProvider locale="nb" messages={appMessages.nb}>
                <Page>
                    <AppHeader />
                    <Routes>
                        <Route path="" element={<StartPage />}></Route>
                        <Route path="deltaker/:deltakerId" element={<DeltakerPage />} />
                    </Routes>
                </Page>
            </IntlProvider>
        </>
    );
};

export default App;
