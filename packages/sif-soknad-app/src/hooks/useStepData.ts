import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadAppContext } from '../context/SøknadAppContext';
import { buildStepPath } from '../utils/routeUtils';

/**
 * Hoved-hook for steg-data og commit-flyt.
 *
 * ```tsx
 * const { lagretData, commit, formData, setFormData } = useStepData<StartdatoFormData>(SøknadStepId.STARTDATO)
 * ```
 *
 * `commit(data)` gjennomfører trinn 1–8 i commit-algoritmen:
 *  - Oppdaterer søknadsdata i storen
 *  - Sletter data for steg som ikke lenger er inkludert
 *  - Reberegner includedSteps
 *  - Lagrer mellomlagring (debounset 500 ms)
 *  - Navigerer til neste steg
 */
export function useStepData<T = unknown>(
    stepId: string,
): {
    lagretData: T | undefined;
    commit: (data: T) => Promise<void>;
    formData: unknown | undefined;
    setFormData: (data: unknown) => void;
} {
    const { store, basePath, versjon, lagreMellomlagring } = useSøknadAppContext();
    const navigate = useNavigate();

    const lagretData = store((s) => s.søknadsdata[stepId]) as T | undefined;
    const formData = store((s) => s.formData[stepId]);

    const commit = useCallback(
        async (data: T): Promise<void> => {
            // Trinn 1–6: oppdater state i storen
            const { newRoute } = store.getState().commitState(stepId, data);

            // Trinn 7: debounset mellomlagring-PUT
            const storeState = store.getState();
            lagreMellomlagring({
                versjon,
                currentStepId: storeState.currentStepId ?? stepId,
                søknadsdata: storeState.søknadsdata,
            });

            // Trinn 8: naviger til neste steg
            if (newRoute) {
                navigate(buildStepPath(basePath, newRoute));
            }
        },
        [store, stepId, versjon, basePath, lagreMellomlagring, navigate],
    );

    const setFormData = useCallback(
        (data: unknown) => {
            store.getState().setFormData(stepId, data);
        },
        [store, stepId],
    );

    return { lagretData, commit, formData, setFormData };
}
