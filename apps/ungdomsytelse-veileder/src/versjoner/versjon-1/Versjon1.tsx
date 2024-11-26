import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './pages/start-page/StartPage';
import { Page } from '@navikt/ds-react';
import AppHeader from './components/AppHeader';
import DeltakerPage from './pages/deltaker-page/DeltakerPage';
import { IntlProvider } from 'react-intl';
import { appMessages } from './i18n';

const Versjon1 = () => {
    return (
        <IntlProvider locale="nb" messages={appMessages.nb}>
            <Page>
                <AppHeader />
                <BrowserRouter basename={'/'}>
                    <Routes>
                        <Route path="/" element={<StartPage />}></Route>
                        <Route path="/deltaker/:deltakerId" element={<DeltakerPage />} />
                    </Routes>
                </BrowserRouter>
            </Page>
        </IntlProvider>
    );
};

export default Versjon1;
