import { Navigate, Route, Routes } from 'react-router-dom';
import ForsidePage from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';

const InnsynRouter = () => (
    <Routes>
        <Route index path="" element={<ForsidePage />} />
        <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
        <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
    </Routes>
);

export default InnsynRouter;
