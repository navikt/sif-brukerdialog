import { usePrevious } from '@navikt/sif-common-hooks';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { useSøknadContext } from './hooks/context/useSøknadContext';
import KvitteringPage from './pages/KvitteringPage';
import VelkommenPage from './pages/VelkommenPage';
import BarnSteg from './steg/barn/BarnSteg';
import BostedSteg from './steg/bosted/BostedSteg';
import KontonummerSteg from './steg/kontonummer/KontonummerSteg';
import MedlemskapSteg from './steg/medlemskap/MedlemskapSteg';
import OppsummeringSteg from './steg/oppsummering/OppsummeringSteg';
import { Steg } from './types';
import { getSøknadStegRoute, SøknadRoutePaths } from './utils/søknadRouteUtils';

const SøknadRoutes = () => {
    const {
        søknadsdata: { søknadSendt, søknadStartet },
    } = useSøknadContext();
    const { pathname } = useLocation();

    const previousSøknadStartet = usePrevious(søknadStartet);
    const previousSøknadSendt = usePrevious(søknadSendt);

    /**
     * Sjekker om tilstand på søknaden samsvarer med hvilken side brukeren er på.
     * Hvis det ikke stemmer, returner korrekt route
     */
    const determineRedirectPath = (): string | null => {
        /** Sjekker om søknad er registrert på deltakelsen, og redirecter til innsyn i så fall */
        if (pathname === SøknadRoutePaths.VELKOMMEN && søknadStartet && previousSøknadStartet === true) {
            return getSøknadStegRoute(Steg.KONTONUMMER);
        }
        if (pathname !== SøknadRoutePaths.KVITTERING && søknadSendt && previousSøknadSendt === true) {
            return SøknadRoutePaths.KVITTERING;
        }
        if (pathname === SøknadRoutePaths.KVITTERING && !søknadSendt) {
            return SøknadRoutePaths.VELKOMMEN;
        }
        if (pathname !== SøknadRoutePaths.VELKOMMEN && !søknadStartet) {
            return SøknadRoutePaths.VELKOMMEN;
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
            <Route index element={<VelkommenPage />} />
            <Route path="steg/kontonummer" element={<KontonummerSteg />} />
            <Route path="steg/bosted" element={<BostedSteg />} />
            <Route path="steg/medlemskap" element={<MedlemskapSteg />} />
            <Route path="steg/barn" element={<BarnSteg />} />
            <Route path="steg/oppsummering" element={<OppsummeringSteg />} />
            <Route path="kvittering" element={<KvitteringPage />} />
        </Routes>
    );
};

export default SøknadRoutes;
