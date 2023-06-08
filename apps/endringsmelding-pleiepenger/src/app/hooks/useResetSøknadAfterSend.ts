import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import actionsCreator from '../søknad/context/action/actionCreator';
import { relocateToWelcomePage } from '../utils';
import { useSøknadContext } from './useSøknadContext';

/**
 * Nullstiller søknad etter at søker har sendt inn melding
 * og navigerer back/til en annen side i søknaden
 */

export const useResetSøknadAfterSend = () => {
    const { pathname } = useLocation();
    const previousPath = usePrevious(pathname);
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const {
        dispatch,
        state: { endringsmeldingSendt },
    } = useSøknadContext();

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setTimeout(() => {
                relocateToWelcomePage();
            });
        }
    }, [shouldResetSøknad, dispatch]);

    if (
        endringsmeldingSendt &&
        !shouldResetSøknad &&
        pathname !== SøknadRoutes.SØKNAD_SENDT &&
        pathname !== previousPath
    ) {
        setShouldResetSøknad(true);
    }

    return { shouldResetSøknad };
};
