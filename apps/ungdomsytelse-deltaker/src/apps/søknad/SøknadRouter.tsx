import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { usePrevious } from '@navikt/sif-common-hooks';
import { useSøknadContext } from './hooks/context/useSøknadContext';
import KvitteringPage from './pages/KvitteringPage';
import VelkommenPage from './pages/VelkommenPage';
import BarnSteg from './steg/barn/BarnSteg';
import KontonummerSteg from './steg/kontonummer/KontonummerSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import { Steg } from './types';
import { getStegRoute, SøknadRoutes } from './utils/routeUtils';

const SøknadRouter = () => {
    const { søknadSendt, søknadStartet } = useSøknadContext();
    const { pathname } = useLocation();

    const previousSøknadStartet = usePrevious(søknadStartet);
    const previousSøknadSendt = usePrevious(søknadSendt);

    /**
     * Sjekker om tilstand på søknaden samsvarer med hvilken side brukeren er på.
     * Hvis det ikke stemmer, returner korrekt route
     */
    const determineRedirectPath = (): string | null => {
        if (pathname === SøknadRoutes.VELKOMMEN && søknadStartet && previousSøknadStartet === true) {
            return getStegRoute(Steg.KONTONUMMER);
        }
        if (pathname !== SøknadRoutes.KVITTERING && søknadSendt && previousSøknadSendt === true) {
            return SøknadRoutes.KVITTERING;
        }
        if (pathname === SøknadRoutes.KVITTERING && !søknadSendt) {
            return SøknadRoutes.VELKOMMEN;
        }
        if (pathname !== SøknadRoutes.VELKOMMEN && !søknadStartet) {
            return SøknadRoutes.VELKOMMEN;
        }
        return null;
    };

    const [redirectPath, setRedirectPath] = useState<string | null>(determineRedirectPath());

    useEffect(() => {
        const newRedirectPath = determineRedirectPath();
        if (newRedirectPath !== redirectPath) {
            setRedirectPath(newRedirectPath);
        }
    }, [pathname, søknadStartet, previousSøknadStartet, previousSøknadSendt]);

    if (redirectPath && redirectPath !== pathname) {
        return <Navigate to={redirectPath} replace={true} />;
    }

    return (
        <Routes>
            <Route index={true} element={<VelkommenPage />} />
            <Route path="soknad" element={<Navigate to="/soknad/barn" replace={true} />} />
            <Route path="soknad/barn" element={<BarnSteg />} />
            <Route path="soknad/kontonummer" element={<KontonummerSteg />} />
            <Route path="soknad/oppsummering" element={<OppsummeringSteg />} />
            <Route path="soknad/kvittering" element={<KvitteringPage />} />
            <Route path="*" element={<>Unknown route</>} />
        </Routes>
    );
};

export default SøknadRouter;
