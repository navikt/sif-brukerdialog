import { useCallback } from 'react';

import { useAnalyticsInstance } from '../analytics/analytics';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å fullføre søknadsinnsending.
 * Kall `onSøknadSendt()` etter vellykket POST til backend.
 *
 * Navigerer ikke selv — SøknadRouter synker URL mot `søknadSendt`.
 */
export function useSøknadSendt(): { onSøknadSendt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();
    const { logSkjemaFullført } = useAnalyticsInstance();

    const onSøknadSendt = useCallback(async (): Promise<void> => {
        await slettMellomlagring();
        await logSkjemaFullført();
        store.getState().setSøknadSendt();
    }, [store, slettMellomlagring, logSkjemaFullført]);

    return { onSøknadSendt };
}
