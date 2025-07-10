import { useEffect, useState } from 'react';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

/**
 * Hook for å mellomlagre state i applikasjonen
 * Denne hooken håndterer mellomlagring av state når børMellomlagres er satt til true.
 * Den bruker useSøknadMellomlagring for å utføre lagringen,
 * og oppdaterer søknadskonteksten når lagringen er fullført.
 * @returns {Object} - Et objekt som inneholder en pending-tilstand som indikerer om lagringen pågår.
 */

export const useLagreState = () => {
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
