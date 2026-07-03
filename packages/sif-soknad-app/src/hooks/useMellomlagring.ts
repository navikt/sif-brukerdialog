import { useCallback } from 'react';

import { useSøknadStepFormContext } from '../consistency/SøknadStepFormContext';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å lagre mellomlagring manuelt — inkluderer midlertidige skjemaverdier
 * for det aktive steget, slik at de kan gjenopprettes som defaultValues etter reload.
 *
 * Bygger persistedFormValues-blob ved å kombinere de to in-session draft-lagene:
 * - `draftFormValues` (context state): verdier for umonterte steg
 * - `getAllLiveFormValues()` (ref): verdier for montert steg
 * De er gjensidig utelukkende per stepId, så merge er trygt.
 *
 * @example
 * ```tsx
 * const { lagre } = useMellomlagring();
 * await lagre();
 * ```
 */
export function useMellomlagring(): { lagre: () => Promise<void> } {
    const { store, versjon, lagreMellomlagring } = useSøknadAppContext();
    const { draftFormValues, getAllLiveFormValues } = useSøknadStepFormContext();

    const lagre = useCallback(async (): Promise<void> => {
        const { resumeStepId, søknadsdata } = store.getState();

        // Hent live verdier fra alle monterte steg (uavhengig av resumeStepId i storen)
        const allLiveValues = getAllLiveFormValues();

        // Bygg persistedFormValues: unmount-lagrede verdier + live verdier for monterte steg
        const persistedFormValues: Record<string, Record<string, unknown>> = {
            ...draftFormValues,
            ...allLiveValues,
        };

        // Oppdater storen umiddelbart så back→forward-navigasjon får riktige defaultValues
        store.getState().setPersistedFormValues(persistedFormValues);

        // resumeStepId er "neste steg å fullføre" — kan avvike fra steget bruker ser på.
        // Fall tilbake til det monterte stegets ID hvis resumeStepId er undefined.
        const stepIdForBlob = resumeStepId ?? Object.keys(allLiveValues)[0];
        if (!stepIdForBlob) return;

        await lagreMellomlagring({ versjon, resumeStepId: stepIdForBlob, søknadsdata, persistedFormValues });
    }, [store, versjon, lagreMellomlagring, draftFormValues, getAllLiveFormValues]);

    return { lagre };
}
