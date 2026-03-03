import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
    currentStegId?: string;
    erInitialisert: boolean;
    velkommenPath?: string;
    skalStegVises?: (stegId: string) => boolean;
    getStegIdFraPath?: (path: string) => string | undefined;
    getPathForSteg?: (stegId: string) => string;
}

/**
 * Guard for steg-routes. Redirecter til velkommen hvis søknad ikke er startet
 * (currentStegId er null - f.eks. ved direktenavigasjon til /soknad/* uten gyldig mellomlagring).
 *
 * Venter med å redirecte til etter initialisering er ferdig (erInitialisert=true).
 *
 * Hvis skalStegVises er satt, sjekker den om det aktuelle steget skal vises.
 * Hvis ikke, redirecter til currentStegId.
 */
export const StegRouteGuard = ({
    currentStegId,
    erInitialisert,
    velkommenPath = '/',
    skalStegVises,
    getStegIdFraPath,
    getPathForSteg,
}: Props) => {
    const location = useLocation();

    // Vent til initialisering er ferdig før vi sjekker
    if (!erInitialisert) {
        return null;
    }

    if (!currentStegId) {
        return <Navigate to={velkommenPath} replace />;
    }

    // Sjekk om steget skal være synlig
    if (skalStegVises && getStegIdFraPath && getPathForSteg) {
        const stegId = getStegIdFraPath(location.pathname);
        if (stegId && !skalStegVises(stegId)) {
            return <Navigate to={getPathForSteg(currentStegId)} replace />;
        }
    }

    return <Outlet />;
};
