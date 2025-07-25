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
import { getSøknadStegRoute, SøknadRoutes } from './utils/søknadRouteUtils';
import { useDeltakerContext } from '../../hooks/useDeltakerContext';
import { AppRoutes } from '../../utils/AppRoutes';

const SøknadRouter = () => {
    const { søknadSendt, søknadStartet } = useSøknadContext();
    const { deltakelsePeriode } = useDeltakerContext();
    const { pathname } = useLocation();

    const previousSøknadStartet = usePrevious(søknadStartet);
    const previousSøknadSendt = usePrevious(søknadSendt);

    /**
     * Sjekker om tilstand på søknaden samsvarer med hvilken side brukeren er på.
     * Hvis det ikke stemmer, returner korrekt route
     */
    const determineRedirectPath = (): string | null => {
        /** Sjekker om søknad er registrert på deltakelsen, og redirecter til innsyn i så fall */
        if (deltakelsePeriode.søktTidspunkt !== undefined) {
            return AppRoutes.innsyn;
        }
        if (pathname === SøknadRoutes.VELKOMMEN && søknadStartet && previousSøknadStartet === true) {
            return getSøknadStegRoute(Steg.KONTONUMMER);
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
            <Route index element={<VelkommenPage />} />
            <Route path="steg/barn" element={<BarnSteg />} />
            <Route path="steg/kontonummer" element={<KontonummerSteg />} />
            <Route path="steg/oppsummering" element={<OppsummeringSteg />} />
            <Route path="kvittering" element={<KvitteringPage />} />
        </Routes>
    );
};

export default SøknadRouter;
