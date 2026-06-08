import { useEffect } from 'react';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { lagreSøknadState } from '../utils/lagreSøknadState';

export const usePersistSøknadState = () => {
    const { dispatch, state } = useSøknadContext();

    useEffect(() => {
        if (state.børMellomlagres) {
            lagreSøknadState(state).then(() => {
                dispatch(actionsCreator.setSøknadLagret());
            });
        }
    }, [state, dispatch]);
};
