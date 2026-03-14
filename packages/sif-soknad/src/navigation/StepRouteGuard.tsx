import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';

import { IncludedStep } from '../types';
import { buildStepPath } from './routeUtils';

interface Props<TStepId extends string> {
    steps: Array<IncludedStep<TStepId>>;
    currentStepId?: TStepId;
    isInitialized?: boolean;
    basePath?: string;
    initialPath?: string;
}

/**
 * Guard for steg-routes. Venter på initialisering før den gjør noe.
 * Redirecter til initialPath hvis currentStepId ikke er definert.
 * Hvis steget i URL-en ikke er inkludert, redirectes til currentStepId.
 */
export const StepRouteGuard = <TStepId extends string>({
    steps,
    currentStepId,
    isInitialized = true,
    basePath = '/soknad',
    initialPath = '/',
}: Props<TStepId>) => {
    const location = useLocation();

    if (!isInitialized) {
        return null;
    }

    if (!currentStepId) {
        return <Navigate to={initialPath} replace />;
    }

    const stepAtPath = steps.find((s) =>
        matchPath({ path: buildStepPath(basePath, s.stepRoute), end: false }, location.pathname),
    );
    if (!stepAtPath) {
        const currentRoute = steps.find((s) => s.stepId === currentStepId)?.stepRoute;
        const fallbackRoute = currentRoute ?? steps[0]?.stepRoute;
        if (fallbackRoute) {
            return <Navigate to={buildStepPath(basePath, fallbackRoute)} replace />;
        }
        return <Navigate to={initialPath} replace />;
    }

    return <Outlet />;
};
