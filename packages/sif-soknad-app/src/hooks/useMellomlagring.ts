import { useCallback } from 'react';

import { useSøknadFormValues } from '../consistency/SøknadFormValuesContext';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å lagre mellomlagring manuelt — inkluderer midlertidige skjemaverdier
 * for det aktive steget, slik at de kan gjenopprettes som defaultValues etter reload.
 *
 * @example
 * ```tsx
 * const { lagre } = useMellomlagring();
 * await lagre();
 * ```
 */
export function useMellomlagring(): { lagre: () => Promise<void> } {
    const { store, versjon, lagreMellomlagring } = useSøknadAppContext();
    const { søknadFormValues, getAllLiveFormValues } = useSøknadFormValues();

    const lagre = useCallback(async (): Promise<void> => {
        const { resumeStepId, søknadsdata } = store.getState();

        // Hent live verdier fra alle monterte steg (uavhengig av resumeStepId i storen)
        const allLiveValues = getAllLiveFormValues();

        // Bygg draftFormValues: unmount-lagrede verdier + live verdier for monterte steg
        const draftFormValues: Record<string, Record<string, unknown>> = {
            ...søknadFormValues,
            ...allLiveValues,
        };

        // Oppdater storen umiddelbart så back→forward-navigasjon får riktige defaultValues
        store.getState().setDraftFormValues(draftFormValues);

        // resumeStepId er "neste steg å fullføre" — kan avvike fra steget bruker ser på.
        // Fall tilbake til det monterte stegets ID hvis resumeStepId er undefined.
        const stepIdForBlob = resumeStepId ?? Object.keys(allLiveValues)[0];
        if (!stepIdForBlob) return;

        await lagreMellomlagring({ versjon, resumeStepId: stepIdForBlob, søknadsdata, draftFormValues });
    }, [store, versjon, lagreMellomlagring, søknadFormValues, getAllLiveFormValues]);

    return { lagre };
}
