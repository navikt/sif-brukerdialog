import { Søker } from '@sif/api/k9-prosessering';
import { Oppgave } from '@sif/api/ung-brukerdialog';
import { Navigate, Route, Routes } from 'react-router-dom';

import { InnsynContextProvider } from './context/InnsynContext';
import { ForsidePage } from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';

interface Props {
    søker: Søker;
    oppgaver: Oppgave[];
}

export const Innsyn = ({ søker, oppgaver }: Props) => {
    return (
        <InnsynContextProvider søker={søker} oppgaver={oppgaver} refetchOppgaver={() => Promise.resolve()}>
            <Routes>
                <Route path="/" element={<ForsidePage oppgaver={oppgaver} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
            </Routes>
        </InnsynContextProvider>
    );
};
