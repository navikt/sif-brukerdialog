import { useCallback } from 'react';

import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å lagre mellomlagring manuelt.
 * Leser nåværende søknadsdata fra storen — appen trenger ikke kjenne til blob-strukturen.
 *
 * @example
 * ```tsx
 * const { lagre } = useMellomlagring();
 * await lagre(); // lagrer nåværende state til mellomlagring
 * ```
 */
export function useMellomlagring(): { lagre: () => Promise<void> } {
    const { store, versjon, lagreMellomlagring } = useSøknadAppContext();

    const lagre = useCallback(async (): Promise<void> => {
        const { currentStepId, søknadsdata } = store.getState();
        if (currentStepId) {
            await lagreMellomlagring({ versjon, currentStepId, søknadsdata });
        }
    }, [store, versjon, lagreMellomlagring]);

    return { lagre };
}
