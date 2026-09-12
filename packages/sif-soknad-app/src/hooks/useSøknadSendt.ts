import { useCallback } from 'react';

import { useAnalyticsInstance } from '../analytics/analytics';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å fullføre søknadsinnsending.
 * Kall `onSøknadSendt()` etter vellykket POST til backend.
 *
 * Gjør i rekkefølge:
 * 1. Sletter mellomlagring
 * 2. Logger "skjema fullført"-hendelse
 * 3. Markerer søknad som sendt i store
 *
 * Navigasjon til kvitteringssiden håndteres av SøknadRouter, som synker URL-en
 * mot `søknadSendt`. Denne hooken navigerer derfor ikke selv.
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
