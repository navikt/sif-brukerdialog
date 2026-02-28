import { Route, Routes } from 'react-router-dom';

import { Oppsummering } from './steg/Oppsummering';
import { Steg1 } from './steg/Steg1';
import { Steg2 } from './steg/Steg2';

export const SøknadRouter = () => {
    return (
        <Routes>
            <Route path="personalia" element={<Steg1 />} />
            <Route path="kontakt" element={<Steg2 />} />
            <Route path="oppsummering" element={<Oppsummering />} />
        </Routes>
    );
};
