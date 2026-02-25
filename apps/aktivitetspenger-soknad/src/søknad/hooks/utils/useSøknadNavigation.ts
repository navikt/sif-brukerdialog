import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Steg } from '../../types';
import { getSøknadStegRoute, SøknadRoutePaths } from '../../utils/søknadRouteUtils';
import { getStegFraPath } from '../../utils/stegUtils';

export const useSøknadNavigation = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const stegIPath = getStegFraPath(pathname);
    const [aktivtSteg, setAktivtSteg] = useState<Steg | undefined>(stegIPath);

    const gotoVelkommenPage = () => {
        navigate(SøknadRoutePaths.VELKOMMEN);
    };

    const gotoKvittering = () => {
        navigate(SøknadRoutePaths.KVITTERING);
    };

    const gotoSteg = (steg: Steg, replace?: boolean) => {
        setAktivtSteg(steg);
        navigate(getSøknadStegRoute(steg), replace ? { replace: true } : undefined);
    };

    return {
        aktivtSteg,
        navigate,
        gotoSteg,
        gotoKvittering,
        gotoVelkommenPage,
    };
};
