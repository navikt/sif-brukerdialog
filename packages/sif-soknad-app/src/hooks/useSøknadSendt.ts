import { useCallback } from 'react';

import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å fullføre søknadsinnsending.
 * Kall `onSøknadSendt()` etter vellykket POST til backend.
 * Sletter mellomlagring og markerer søknad som sendt.
 * SøknadRouter håndterer navigering til kvitteringssiden.
 */
export function useSøknadSendt(): { onSøknadSendt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();

    const onSøknadSendt = useCallback(async (): Promise<void> => {
        await slettMellomlagring();
        store.getState().setSøknadSendt();
    }, [store, slettMellomlagring]);

    return { onSøknadSendt };
}
