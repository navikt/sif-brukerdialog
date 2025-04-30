import { Navigate, Route, Routes } from 'react-router-dom';
import KvitteringPage from './pages/KvitteringPage';
import BarnSteg from './steg/barn/BarnSteg';
import KontonummerSteg from './steg/kontonummer/KontonummerSteg';
import OppstartSteg from './steg/oppstart/OppstartSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import VelkommenSteg from './steg/velkommen/VelkommenSteg';
import { useSøknadContext } from './context/søknadContext';

const SøknadRoutes = () => {
    const { søknadSendt } = useSøknadContext();
    return (
        <Routes>
            {søknadSendt ? (
                <>
                    <Route path="soknad/kvittering" element={<KvitteringPage />} />
                    <Route path="*" element={<Navigate to="/soknad/kvittering" replace={true} />} />
                </>
            ) : (
                <>
                    <Route index={true} element={<VelkommenSteg />} />
                    <Route path="soknad" element={<Navigate to="/soknad/barn" replace={true} />} />
                    <Route path="soknad/barn" element={<BarnSteg />} />
                    <Route path="soknad/oppstart" element={<OppstartSteg />} />
                    <Route path="soknad/kontonummer" element={<KontonummerSteg />} />
                    <Route path="soknad/oppsummering" element={<OppsummeringSteg />} />
                    <Route path="soknad/kvittering" element={<KvitteringPage />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </>
            )}
        </Routes>
    );
};

export default SøknadRoutes;
