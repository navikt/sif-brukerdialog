import { useEffect, useState } from 'react';
import { lagreSøknadState } from '../../../api/endpoints/mellomlagringEndpoint';
import actionsCreator from '../action/actionCreator';
import { useSøknadContext } from './useSøknadContext';

export const useBørSøknadMellomlagres = () => {
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
