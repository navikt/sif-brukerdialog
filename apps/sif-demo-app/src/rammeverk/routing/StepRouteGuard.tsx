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
 * Guard for steg-routes. Redirecter til initialPath hvis currentStepId mangler.
 * Venter til isInitialized=true før redirect. Hvis isStepIncluded er satt,
 * sjekkes om steget skal vises - ellers redirect til currentStepId.
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
