import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadFormValues } from '../consistency/SøknadFormValuesContext';
import { useSøknadAppContext } from '../context/SøknadAppContext';
import { buildStepPath } from '../utils/routeUtils';

/**
 * Hoved-hook for steg-data og commit-flyt.
 *
 * - `lagretData` — committet domendata for steget (fra `søknadsdata[stepId]`)
 * - `draftFormValues` — midlertidige RHF-verdier fra mellomlagring; bruk som `defaultValues`
 *   foran `lagretData` ved reload: `defaultValues: draftFormValues ?? toXxxFormValues(lagretData)`
 * - `commit(data)` — gjennomfører trinn 1–8 i commit-algoritmen:
 *   1. Oppdaterer søknadsdata i storen
 *   2. Sletter data for steg som ikke lenger er inkludert
 *   3. Reberegner includedSteps
 *   4. Lagrer mellomlagring (fire-and-forget)
 *   5. Navigerer til neste steg
 *
 * @example
 * ```tsx
 * const { lagretData, draftFormValues, commit } = useStepData<StartdatoSøknadsdata, StartdatoFormValues>(stepId);
 * const methods = useForm({ defaultValues: draftFormValues ?? toStartdatoFormValues(lagretData) });
 * ```
 */
export function useStepData<TCommitted = unknown, TDraft = Record<string, unknown>>(
    stepId: string,
): {
    /** Committet domendata for steget — undefined før bruker har submittet steget */
    lagretData: TCommitted | undefined;
    /**
     * Midlertidige RHF-skjemaverdier fra mellomlagring — finnes etter reload hvis bruker
     * lagret manuelt (useMellomlagring) uten å ha submittet steget.
     * Bruk som defaultValues foran lagretData.
     */
    draftFormValues: Partial<TDraft> | undefined;
    commit: (data: TCommitted) => Promise<void>;
} {
    const { store, basePath, versjon, lagreMellomlagring } = useSøknadAppContext();
    const { markSkipNextUnmountSaveForStep, clearFormValuesForStep } = useSøknadFormValues();
    const navigate = useNavigate();

    const lagretData = store((s) => s.søknadsdata[stepId]) as TCommitted | undefined;
    const draftFormValues = store((s) => s.draftFormValues[stepId]) as Partial<TDraft> | undefined;

    const commit = useCallback(
        async (data: TCommitted): Promise<void> => {
            // Trinn 1–6: oppdater state i storen
            const { newRoute } = store.getState().commitState(stepId, data);

            // Marker at unmount-handleren ikke skal lagre draft-verdier for dette steget,
            // og fjern eventuelt lagrede draft-verdier fra context
            markSkipNextUnmountSaveForStep(stepId);
            clearFormValuesForStep(stepId);
            store.getState().clearDraftFormValues(stepId);

            // Lagre mellomlagring (fire-and-forget)
            const storeState = store.getState();
            lagreMellomlagring({
                versjon,
                resumeStepId: storeState.resumeStepId ?? stepId,
                søknadsdata: storeState.søknadsdata,
            }).catch(() => {});

            // Trinn 8: naviger til neste steg
            if (newRoute) {
                navigate(buildStepPath(basePath, newRoute));
            }
        },
        [
            store,
            stepId,
            versjon,
            basePath,
            lagreMellomlagring,
            navigate,
            markSkipNextUnmountSaveForStep,
            clearFormValuesForStep,
        ],
    );

    return { lagretData, draftFormValues, commit };
}
