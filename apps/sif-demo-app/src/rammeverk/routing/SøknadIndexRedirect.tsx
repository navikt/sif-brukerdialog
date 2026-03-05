import { Navigate } from 'react-router-dom';

import { StepConfig } from '../types';

interface SøknadIndexRedirectProps {
    stepConfig: StepConfig;
    mellomlagretStepId?: string | null;
    initialPath?: string;
    basePath?: string;
}

/**
 * Redirect fra /soknad til mellomlagret steg, eller velkommen hvis ingen mellomlagring finnes.
 */
export const SøknadIndexRedirect = ({
    stepConfig,
    mellomlagretStepId,
    initialPath = '/',
    basePath = '/soknad',
}: SøknadIndexRedirectProps) => {
    if (!mellomlagretStepId) {
        return <Navigate to={initialPath} replace />;
    }

    const targetRoute = stepConfig[mellomlagretStepId]?.route;
    if (!targetRoute) {
        return <Navigate to={initialPath} replace />;
    }

    return <Navigate to={`${basePath}/${targetRoute}`} replace />;
};
