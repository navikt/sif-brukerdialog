import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadAppContext } from '../context/SøknadAppContext';
import { buildStepPath } from '../utils/routeUtils';

/**
 * Hook for å starte en ny søknad fra velkomst-siden.
 *
 * Initialiserer storen med `currentStepId = stepOrder[0]` og valgfri startdata,
 * trigger debounset mellomlagring-PUT og navigerer til første steg.
 *
 * ```tsx
 * const { startSøknad } = useStartSøknad()
 * await startSøknad({ harForståttRettigheterOgPlikter: true })
 * ```
 */
export function useStartSøknad() {
    const { store, config, stepOrder, basePath, versjon, lagreMellomlagring } = useSøknadAppContext();
    const navigate = useNavigate();

    const startSøknad = useCallback(
        async (initialSøknadsdata: Record<string, unknown> = {}): Promise<void> => {
            const firstStepId = stepOrder[0];
            if (!firstStepId) return;

            const firstRoute = config[firstStepId]?.route;

            store.getState().init({
                versjon,
                currentStepId: firstStepId,
                søknadsdata: initialSøknadsdata,
            });

            lagreMellomlagring({
                versjon,
                currentStepId: firstStepId,
                søknadsdata: initialSøknadsdata,
            });

            if (firstRoute) {
                navigate(buildStepPath(basePath, firstRoute));
            }
        },
        [store, stepOrder, config, basePath, versjon, lagreMellomlagring, navigate],
    );

    return { startSøknad };
}
