import { useEffect, useState } from 'react';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

export const useOppdaterMellomlagringHvisNødvendig = () => {
    const { dispatch, state } = useSøknadContext();
    const [pending, setPending] = useState(false);
    const mellomlagring = useSøknadMellomlagring();

    useEffect(() => {
        if (state.børMellomlagres) {
            setPending(true);
            mellomlagring.lagreMellomlagring(state).then(() => {
                dispatch(actionsCreator.setSøknadLagret());
                setPending(false);
            });
        }
    }, [state, dispatch]);

    return { pending };
};
