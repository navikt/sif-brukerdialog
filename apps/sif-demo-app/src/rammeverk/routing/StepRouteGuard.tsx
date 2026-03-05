import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { IncludedStep } from '../types';

interface Props {
    steps: IncludedStep[];
    currentStepId?: string;
    isInitialized?: boolean;
    basePath?: string;
    initialPath?: string;
}

/**
 * Guard for steg-routes. Venter på initialisering før den gjør noe.
 * Redirecter til initialPath hvis currentStepId mangler.
 * Hvis steget i URL-en ikke er inkludert, redirectes til currentStepId.
 */
export const StepRouteGuard = ({
    steps,
    currentStepId,
    isInitialized = true,
    basePath = '/soknad',
    initialPath = '/',
}: Props) => {
    const location = useLocation();

    if (!isInitialized) {
        return null;
    }

    if (!currentStepId) {
        return <Navigate to={initialPath} replace />;
    }

    const stepAtPath = steps.find((s) => location.pathname.includes(s.route));
    if (!stepAtPath) {
        const currentRoute = steps.find((s) => s.stepId === currentStepId)?.route;
        if (currentRoute) {
            return <Navigate to={`${basePath}/${currentRoute}`} replace />;
        }
    }

    return <Outlet />;
};
