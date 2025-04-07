import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import RapporterInntektPage from './pages/RapporterInntektPage';

const InnsynApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="" element={<ForsidePage />} />
                <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                <Route path="inntekt/:periode/:kvittering?" element={<RapporterInntektPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default InnsynApp;
