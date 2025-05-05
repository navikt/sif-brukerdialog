import { Navigate, Route, Routes } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import RapporterInntektPage from './pages/RapporterInntektPage';

const InnsynApp = () => {
    return (
        <Routes>
            <Route index path="" element={<ForsidePage />} />
            <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
            <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
            <Route path="inntekt/:periode/:kvittering?" element={<RapporterInntektPage />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
    );
};

export default InnsynApp;
