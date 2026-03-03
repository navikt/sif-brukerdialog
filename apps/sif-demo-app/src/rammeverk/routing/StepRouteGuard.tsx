import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
    currentStepId?: string;
    isInitialized: boolean;
    initialPath?: string;
    isStepIncluded?: (stepId: string) => boolean;
    getStepIdFromPath?: (path: string) => string | undefined;
    getPathForStep?: (stepId: string) => string;
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
export const StepRouteGuard = ({
    currentStepId,
    isInitialized,
    initialPath = '/',
    isStepIncluded,
    getStepIdFromPath,
    getPathForStep,
}: Props) => {
    const location = useLocation();

    // Vent til initialisering er ferdig før vi sjekker
    if (!isInitialized) {
        return null;
    }

    if (!currentStepId) {
        return <Navigate to={initialPath} replace />;
    }

    // Sjekk om steget skal være synlig
    if (isStepIncluded && getStepIdFromPath && getPathForStep) {
        const stepId = getStepIdFromPath(location.pathname);
        if (stepId && !isStepIncluded(stepId)) {
            return <Navigate to={getPathForStep(currentStepId)} replace />;
        }
    }

    return <Outlet />;
};
