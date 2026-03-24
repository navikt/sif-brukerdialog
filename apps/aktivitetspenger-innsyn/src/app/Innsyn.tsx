import { Oppgave, Søker } from '@sif/api';
import { Navigate, Route, Routes } from 'react-router-dom';

import { InnsynForside } from './pages/forside/Forside';

interface Props {
    søker: Søker;
    oppgaver: Oppgave[];
}

export const Innsyn = ({ søker, oppgaver }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<InnsynForside søker={søker} oppgaver={oppgaver} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
