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
    const { søknadFormValues, getLiveFormValuesForStep } = useSøknadFormValues();

    const lagre = useCallback(async (): Promise<void> => {
        const { currentStepId, søknadsdata } = store.getState();
        if (!currentStepId) return;

        // Bygg draftFormValues: unmount-lagrede verdier for andre steg + live verdier for aktivt steg
        const liveValues = getLiveFormValuesForStep(currentStepId);
        const draftFormValues: Record<string, Record<string, unknown>> = {
            ...søknadFormValues,
            ...(liveValues ? { [currentStepId]: liveValues } : {}),
        };

        await lagreMellomlagring({ versjon, currentStepId, søknadsdata, draftFormValues });
    }, [store, versjon, lagreMellomlagring, søknadFormValues, getLiveFormValuesForStep]);

    return { lagre };
}
