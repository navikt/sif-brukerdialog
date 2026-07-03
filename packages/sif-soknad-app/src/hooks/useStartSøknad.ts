import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAnalyticsInstance } from '../analytics/analytics';
import { useSøknadAppContext } from '../context/SøknadAppContext';
import { buildStepPath } from '../utils/routeUtils';

/**
 * Hook for å starte en ny søknad fra velkomst-siden.
 *
 * Initialiserer storen med `resumeStepId = stepOrder[0]` og valgfri startdata,
 * lagrer mellomlagring (fire-and-forget) og navigerer til første steg.
 *
 * ```tsx
 * const { startSøknad } = useStartSøknad()
 * await startSøknad({ harForståttRettigheterOgPlikter: true })
 * ```
 */
export function useStartSøknad() {
    const { store, config, stepOrder, basePath, versjon, lagreMellomlagring } = useSøknadAppContext();
    const navigate = useNavigate();
    const { logSkjemaStartet } = useAnalyticsInstance();

    const startSøknad = useCallback(
        async (initialSøknadsdata: Record<string, unknown> = {}): Promise<void> => {
            const firstStepId = stepOrder[0];
            if (!firstStepId) return;

            const firstRoute = config[firstStepId]?.route;

            store.getState().init({
                versjon,
                resumeStepId: firstStepId,
                søknadsdata: initialSøknadsdata,
            });

            lagreMellomlagring({
                versjon,
                resumeStepId: firstStepId,
                søknadsdata: initialSøknadsdata,
            });

            await logSkjemaStartet();

            if (firstRoute) {
                // Navigasjon: bruker starter søknad fra velkommensiden — gå til første steg.
                navigate(buildStepPath(basePath, firstRoute));
            }
        },
        [store, stepOrder, config, basePath, versjon, lagreMellomlagring, navigate, logSkjemaStartet],
    );

    return { startSøknad };
}
