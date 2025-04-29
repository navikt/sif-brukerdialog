import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import RapporterInntektPage from './pages/RapporterInntektPage';
import { getRequiredEnv } from '@navikt/sif-common-env';

const InnsynApp = () => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');
    return (
        <BrowserRouter basename={publicPath}>
            <Routes>
                <Route index path="" element={<ForsidePage />} />
                <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                <Route path="inntekt/:periode/:kvittering?" element={<RapporterInntektPage />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default InnsynApp;
