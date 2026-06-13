import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å fullføre søknadsinnsending.
 * Kall `onSøknadSendt()` etter vellykket POST til backend.
 * Sletter mellomlagring, markerer søknad som sendt og navigerer til kvittering.
 */
export function useSøknadSendt(): { onSøknadSendt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();
    const navigate = useNavigate();

    const onSøknadSendt = useCallback(async (): Promise<void> => {
        await slettMellomlagring();
        store.getState().setSøknadSendt();
        navigate('/kvittering');
    }, [store, slettMellomlagring, navigate]);

    return { onSøknadSendt };
}
