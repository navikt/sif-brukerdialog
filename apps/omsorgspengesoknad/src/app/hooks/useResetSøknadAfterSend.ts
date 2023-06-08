import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';

import actionsCreator from '../søknad/context/action/actionCreator';

import { SøknadRoutes } from '../types/SøknadRoutes';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { relocateToWelcomePage } from '../utils/navigationUtils';

/**
 * Nullstiller søknad etter at søker har sendt inn
 * og navigerer back/til en annen side i søknaden
 */

export const useResetSøknadAfterSend = () => {
    const { pathname } = useLocation();
    const previousPath = usePrevious(pathname);
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const {
        dispatch,
        state: { søknadSendt },
    } = useSøknadContext();

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setTimeout(() => {
                relocateToWelcomePage();
            });
        }
    }, [shouldResetSøknad, dispatch]);

    if (søknadSendt && !shouldResetSøknad && pathname !== SøknadRoutes.SØKNAD_SENDT && pathname !== previousPath) {
        setShouldResetSøknad(true);
    }

    return { shouldResetSøknad };
};
