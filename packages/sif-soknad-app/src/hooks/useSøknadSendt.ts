import { useCallback } from 'react';

import { useAnalyticsInstance } from '../analytics/analytics';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å fullføre søknadsinnsending: rydder opp og markerer søknaden som sendt.
 *
 * Navigerer ikke selv — SøknadRouter synker URL mot `søknadSendt`.
 *
 * **Bruk den som `onSuccess` i mutasjonsoppsettet:**
 *
 * ```ts
 * useMutation({ mutationFn: sendSøknad, onSuccess: onSøknadSendt });
 * ```
 *
 * React Query awaiter `onSuccess` derfra før status settes til `success`. `isPending`
 * holder seg dermed sann til `søknadSendt` er satt, slik at submit-knappen står
 * deaktivert helt til søknaden er markert som sendt.
 *
 * `onSøknadSendt()` rejecter aldri. Det er en forutsetning for bruken som `onSuccess`:
 * en rejection ville satt mutasjonen i error-state og vist innsendingsfeil til brukeren,
 * selv om søknaden faktisk ble sendt.
 */
export function useSøknadSendt(): { onSøknadSendt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();
    const { logSkjemaFullført } = useAnalyticsInstance();

    const onSøknadSendt = useCallback(async (): Promise<void> => {
        try {
            await slettMellomlagring();
            await logSkjemaFullført();
        } catch {
            // Søknaden er sendt. Feilet opprydding må aldri hindre kvitteringen.
        }
        store.getState().setSøknadSendt();
    }, [store, slettMellomlagring, logSkjemaFullført]);

    return { onSøknadSendt };
}
