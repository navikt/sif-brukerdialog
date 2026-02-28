import { Navigate } from 'react-router-dom';

import { StegConfig } from '../types';
import { getStegRoute } from './routeUtils';

interface SøknadIndexRedirectProps<TSøknadsdata> {
    stegConfig: StegConfig<TSøknadsdata>;
    stegRekkefølge: string[];
    mellomlagretStegId?: string | null;
}

/**
 * Redirect fra /soknad til første steg, eller mellomlagret steg hvis det finnes
 */
export const SøknadIndexRedirect = <TSøknadsdata,>({
    stegConfig,
    stegRekkefølge,
    mellomlagretStegId,
}: SøknadIndexRedirectProps<TSøknadsdata>) => {
    const targetStegId = mellomlagretStegId ?? stegRekkefølge[0];
    const targetRoute = getStegRoute(stegConfig, targetStegId);

    return <Navigate to={targetRoute} replace />;
};
