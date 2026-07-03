import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAnalyticsInstance } from '../analytics/analytics';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å fullføre søknadsinnsending.
 * Kall `onSøknadSendt()` etter vellykket POST til backend.
 *
 * Gjør i rekkefølge:
 * 1. Sletter mellomlagring
 * 2. Logger "skjema fullført"-hendelse
 * 3. Markerer søknad som sendt i store (SøknadRouter bytter til å rendre kvitteringElement)
 * 4. Navigerer til /kvittering (URL-en oppdateres, men ruting skjer via Zustand-state)
 */
export function useSøknadSendt(): { onSøknadSendt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();
    const { logSkjemaFullført } = useAnalyticsInstance();
    const navigate = useNavigate();

    const onSøknadSendt = useCallback(async (): Promise<void> => {
        await slettMellomlagring();
        await logSkjemaFullført();
        store.getState().setSøknadSendt();
        // Navigasjon: etter innsending settes URL til /kvittering.
        // SøknadRouter viser kvitteringElement basert på søknadSendt-state — ikke denne ruten.
        navigate('/kvittering', { replace: true });
    }, [store, slettMellomlagring, logSkjemaFullført, navigate]);

    return { onSøknadSendt };
}
