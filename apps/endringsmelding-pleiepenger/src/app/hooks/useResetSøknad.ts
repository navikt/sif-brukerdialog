import { useEffect, useState } from 'react';

import actionsCreator from '../søknad/context/action/actionCreator';
import { relocateToWelcomePage } from '../utils';
import { useSøknadContext } from './useSøknadContext';

/**
 * Nullstiller søknad etter at søker har sendt inn melding
 * og navigerer bort fra kvitteringssiden.
 */

export const useResetSøknad = () => {
    const [shouldResetSøknad, setShouldResetSøknad] = useState(false);
    const { dispatch } = useSøknadContext();

    useEffect(() => {
        if (shouldResetSøknad) {
            dispatch(actionsCreator.resetSøknad());
            setTimeout(() => {
                relocateToWelcomePage();
            });
        }
    }, [shouldResetSøknad, dispatch]);

    return { setShouldResetSøknad, shouldResetSøknad };
};
