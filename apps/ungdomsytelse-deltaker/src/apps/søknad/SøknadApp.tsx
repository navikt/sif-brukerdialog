import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { SøknadProvider } from './context/søknadContext';
import KvitteringPage from './pages/KvitteringPage';
import BarnSteg from './steg/barn/BarnSteg';
import KontonummerSteg from './steg/kontonummer/KontonummerSteg';
import OppstartSteg from './steg/oppstart/OppstartSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import VelkommenSteg from './steg/velkommen/VelkommenSteg';

const SøknadApp = () => {
    const publicPath = getRequiredEnv('PUBLIC_PATH');
    return (
        <BrowserRouter basename={publicPath}>
            <SøknadProvider>
                <Routes>
                    <Route index={true} element={<VelkommenSteg />} />
                    <Route path="soknad" element={<Navigate to="/soknad/barn" replace={true} />} />
                    <Route path="soknad/barn" element={<BarnSteg />} />
                    <Route path="soknad/oppstart" element={<OppstartSteg />} />
                    <Route path="soknad/kontonummer" element={<KontonummerSteg />} />
                    <Route path="soknad/oppsummering" element={<OppsummeringSteg />} />
                    <Route path="soknad/kvittering" element={<KvitteringPage />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </SøknadProvider>
        </BrowserRouter>
    );
};

export default SøknadApp;
