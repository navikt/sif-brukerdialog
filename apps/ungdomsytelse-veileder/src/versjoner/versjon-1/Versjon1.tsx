import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './pages/start-page/StartPage';
import { Page } from '@navikt/ds-react';
import AppHeader from './components/AppHeader';
import DeltakerPage from './pages/deltaker-page/DeltakerPage';

const Versjon1 = () => {
    return (
        <Page>
            <AppHeader />
            <BrowserRouter basename={'/'}>
                <Routes>
                    <Route path="/" element={<StartPage />}></Route>
                    <Route path="/deltaker/:deltakerId" element={<DeltakerPage />} />
                </Routes>
            </BrowserRouter>
        </Page>
    );
};

export default Versjon1;
