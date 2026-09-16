import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadStepFormContext } from '../consistency/SøknadStepFormContext';
import { useSøknadAppContext } from '../context/SøknadAppContext';
import { buildStepPath } from '../utils/routeUtils';
import { getPreviousNextStep } from '../utils/stepUtils';

/**
 * Hook for å navigere mellom steg uten å committe data (back-navigasjon og edit-navigasjon).
 *
 * ```tsx
 * const { canGoPrevious, navigateToPreviousStep, navigateToStep } = useStepNavigation()
 * const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined
 * // Hopp direkte til et steg (f.eks. fra oppsummering):
 * navigateToStep(SøknadStepId.STARTDATO)
 * ```
 */
export function useStepNavigation() {
    const { store, config, basePath, versjon, lagreMellomlagring } = useSøknadAppContext();
    const { draftFormValues, getAllLiveFormValues } = useSøknadStepFormContext();
    const navigate = useNavigate();
    const includedSteps = store((s) => s.includedSteps);

    const canGoPrevious = useCallback(
        (fromStepId: string): boolean => {
            const { previousStepId } = getPreviousNextStep(includedSteps, fromStepId);
            return previousStepId !== null;
        },
        [includedSteps],
    );

    const navigateToPreviousStep = useCallback(
        (fromStepId: string): void => {
            const { previousStepId } = getPreviousNextStep(includedSteps, fromStepId);
            if (previousStepId) {
                const route = config[previousStepId]?.route;
                if (route) {
                    // Oppdater resumeStepId til steget vi navigerer til, slik at reload
                    // lander brukeren på riktig steg.
                    store.getState().setResumeStepId(previousStepId);

                    // Lagre mellomlagring fire-and-forget med oppdatert resumeStepId.
                    const { søknadsdata, persistedFormValues: existingPersistedFormValues } = store.getState();
                    const persistedFormValues: Record<string, Record<string, unknown>> = {
                        ...existingPersistedFormValues,
                        ...draftFormValues,
                        ...getAllLiveFormValues(),
                    };
                    store.getState().setPersistedFormValues(persistedFormValues);
                    void lagreMellomlagring({
                        versjon,
                        resumeStepId: previousStepId,
                        søknadsdata,
                        persistedFormValues,
                    }).catch(() => {});

                    navigate(buildStepPath(basePath, route));
                }
            }
        },
        [
            includedSteps,
            config,
            basePath,
            navigate,
            store,
            versjon,
            lagreMellomlagring,
            draftFormValues,
            getAllLiveFormValues,
        ],
    );

    const navigateToStep = useCallback(
        (stepId: string): void => {
            const route = config[stepId]?.route;
            if (route) {
                // Navigasjon: hopp direkte til steg — brukes fra oppsummering (rediger).
                navigate(buildStepPath(basePath, route));
            }
        },
        [config, basePath, navigate],
    );

    return { canGoPrevious, navigateToPreviousStep, navigateToStep };
}
