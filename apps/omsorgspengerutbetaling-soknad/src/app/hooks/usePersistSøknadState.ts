import { useEffect, useState } from 'react';
import { mellomlagringService } from '../api/mellomlagringService';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';

export const usePersistSøknadState = () => {
    const { dispatch, state } = useSøknadContext();
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (state.børMellomlagres) {
            setPending(true);
            mellomlagringService.update(state).then(() => {
                dispatch(actionsCreator.setSøknadLagret());
                setPending(false);
            });
        }
    }, [state, dispatch]);

    return { pending };
};
