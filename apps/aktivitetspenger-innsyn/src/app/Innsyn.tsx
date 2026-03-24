import { Søker } from '@sif/api';
import { Navigate, Route, Routes } from 'react-router-dom';

import { InnsynForside } from './pages/forside/Forside';

interface Props {
    søker: Søker;
}

export const Innsyn = ({ søker }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<InnsynForside søker={søker} oppgaver={[]} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
