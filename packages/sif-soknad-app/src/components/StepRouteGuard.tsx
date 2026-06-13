import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';

import { IncludedStep } from '../types';
import { buildStepPath } from '../utils/routeUtils';

interface Props {
    steps: IncludedStep[];
    currentStepId?: string;
    isInitialized?: boolean;
    basePath?: string;
    initialPath?: string;
}

/**
 * Guard for søknadssteg. Venter på at storen er initialisert, deretter:
 * - Redirecter til initialPath hvis currentStepId ikke er satt
 * - Redirecter til currentStepId hvis URL-en peker på et ikke-inkludert steg
 * - Redirecter til første uferdige steg hvis bruker prøver å hoppe over uferdige steg
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

    const stepIndex = steps.indexOf(stepAtPath);
    const firstIncompleteStep = steps.slice(0, stepIndex).find((s) => !s.completed);
    if (firstIncompleteStep) {
        return <Navigate to={buildStepPath(basePath, firstIncompleteStep.stepRoute)} replace />;
    }

    return <Outlet />;
};
