import { Navigate } from 'react-router-dom';

import { StegConfig } from '../types';

interface SøknadIndexRedirectProps {
    stegConfig: StegConfig;
    mellomlagretStegId?: string | null;
    velkommenPath?: string;
}

/**
 * Redirect fra /soknad til mellomlagret steg, eller velkommen hvis ingen mellomlagring finnes.
 */
export const SøknadIndexRedirect = ({
    stegConfig,
    mellomlagretStegId,
    velkommenPath = '/',
}: SøknadIndexRedirectProps) => {
    if (!mellomlagretStegId) {
        return <Navigate to={velkommenPath} replace />;
    }

    const targetRoute = stegConfig[mellomlagretStegId].route;
    return <Navigate to={targetRoute} replace />;
};
