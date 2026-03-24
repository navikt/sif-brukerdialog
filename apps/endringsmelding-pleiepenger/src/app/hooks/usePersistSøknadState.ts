import { useSøknadContext } from '@app/hooks';
import { useEffect, useState } from 'react';

import actionsCreator from '../søknad/context/action/actionCreator';
import { lagreSøknadState } from '../utils/lagreSøknadState';

export const usePersistSøknadState = () => {
    const { dispatch, state } = useSøknadContext();
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (state.børMellomlagres) {
            setPending(true);
            lagreSøknadState(state).then(() => {
                dispatch(actionsCreator.setSøknadLagret());
                setPending(false);
            });
        }
    }, [state, dispatch]);

    return { pending };
};
