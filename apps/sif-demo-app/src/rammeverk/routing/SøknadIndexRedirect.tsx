import { Navigate } from 'react-router-dom';

import { StepConfig } from '../types';

interface SøknadIndexRedirectProps {
    stepConfig: StepConfig;
    mellomlagretStepId?: string | null;
    initialPath?: string;
}

/**
 * Redirect fra /soknad til mellomlagret steg, eller velkommen hvis ingen mellomlagring finnes.
 */
export const SøknadIndexRedirect = ({
    stepConfig,
    mellomlagretStepId,
    initialPath = '/',
}: SøknadIndexRedirectProps) => {
    if (!mellomlagretStepId) {
        return <Navigate to={initialPath} replace />;
    }

    const targetRoute = stepConfig[mellomlagretStepId].route;
    return <Navigate to={targetRoute} replace />;
};
