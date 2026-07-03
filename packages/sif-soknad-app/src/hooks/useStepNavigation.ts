import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const { store, config, basePath } = useSøknadAppContext();
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
                    // Navigasjon: bruker trykker forrige-knapp — gå ett steg tilbake.
                    navigate(buildStepPath(basePath, route));
                }
            }
        },
        [includedSteps, config, basePath, navigate],
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
