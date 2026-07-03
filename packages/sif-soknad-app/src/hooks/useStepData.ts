import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadStepFormContext } from '../consistency/SøknadStepFormContext';
import { useSøknadAppContext } from '../context/SøknadAppContext';
import { buildStepPath } from '../utils/routeUtils';

/**
 * Hoved-hook for steg-data og commit-flyt.
 *
 * ## Draft-verdier — tre lag
 *
 * RHF-skjemaverdier for et steg finnes potensielt på tre steder. Prioritet:
 *
 * 1. **`draftFormValues[stepId]`** (context state) — lagret ved unmount denne sesjonen.
 *    Fanger opp endringer via browser back/forward. Høyest prioritet.
 * 2. **`store.persistedFormValues[stepId]`** (Zustand) — lest fra mellomlagring-blob ved reload.
 *    Gjenoppretter verdier fra forrige sesjon.
 * 3. **`søknadsdata[stepId]`** — committet domendata. Brukes som fallback for `defaultValues`
 *    (`draftFormValues ?? toFormValues(lagretData)`).
 *
 * `draftFormValues` fra denne hooken er lag 1 hvis satt, ellers lag 2.
 *
 * ---
 *
 * - `lagretData` — committet domendata for steget (fra `søknadsdata[stepId]`)
 * - `commit(data)` — gjennomfører commit-algoritmen:
 *   1. Oppdaterer søknadsdata i storen
 *   2. Sletter data for steg som ikke lenger er inkludert
 *   3. Reberegner includedSteps og resumeStepId
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
    /** Midlertidige RHF-skjemaverdier (lag 1 eller 2, se JSDoc over). Bruk som defaultValues foran lagretData. */
    draftFormValues: Partial<TDraft> | undefined;
    commit: (data: TCommitted) => Promise<void>;
} {
    const { store, basePath, versjon, lagreMellomlagring } = useSøknadAppContext();
    const { markSkipNextUnmountSaveForStep, clearFormValuesForStep, draftFormValues: inSessionValues } =
        useSøknadStepFormContext();
    const navigate = useNavigate();

    const lagretData = store((s) => s.søknadsdata[stepId]) as TCommitted | undefined;
    const persistedFormValues = store((s) => s.persistedFormValues[stepId]) as Partial<TDraft> | undefined;

    // In-memory verdier (browser back/forward) tar prioritet over mellomlagring-blob
    const inMemoryValues = inSessionValues[stepId] as Partial<TDraft> | undefined;
    const draftFormValues = inMemoryValues ?? persistedFormValues;

    const commit = useCallback(
        async (data: TCommitted): Promise<void> => {
            // Trinn 1–6: oppdater state i storen
            const { newRoute } = store.getState().commitState(stepId, data);

            // Marker at unmount-handleren ikke skal lagre draft-verdier for dette steget,
            // og fjern eventuelt lagrede draft-verdier fra context
            markSkipNextUnmountSaveForStep(stepId);
            clearFormValuesForStep(stepId);
            store.getState().clearPersistedFormValues(stepId);

            // Lagre mellomlagring (fire-and-forget)
            const storeState = store.getState();
            lagreMellomlagring({
                versjon,
                resumeStepId: storeState.resumeStepId ?? stepId,
                søknadsdata: storeState.søknadsdata,
            }).catch(() => {});

            // Navigasjon: etter vellykket steg-submit — gå til neste steg i flyten.
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
