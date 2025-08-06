import { useEffect, useState } from 'react';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useMellomlagring } from './useMellomlagring';

/**
 * Hook for å mellomlagre state i applikasjonen
 * Denne hooken håndterer mellomlagring av state når børMellomlagres er satt til true.
 * @returns {Object} - Et objekt som inneholder en pending-tilstand som indikerer om lagringen pågår.
 */

export const useAutoMellomlagring = () => {
    const { dispatch, state } = useSøknadContext();
    const [pending, setPending] = useState(false);
    const mellomlagring = useMellomlagring();

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
