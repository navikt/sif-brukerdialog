import { useMemo } from 'react';

import { MellomlagringYtelse, useYtelseMellomlagring } from '@navikt/sif-common-query';

/**
 * Internal structure for mellomlagring data.
 */
interface MellomlagringData {
    søknadsdata: object;
    currentStegId: string;
}

interface CreateMellomlagringHookConfig<TState extends { søknadsdata: object }> {
    /** Hook that returns søknadState */
    useSøknadState: () => TState | undefined;
    /** Hook that returns currentStegId */
    useCurrentStegId: () => string | undefined;
    /** Which ytelse/API endpoint to use */
    ytelse: MellomlagringYtelse;
    /** Function to extract metadata from state. Metadata is hashed for validation. */
    getMetadata: (state: TState) => object;
}

/**
 * Creates a mellomlagring hook with app-specific typing.
 *
 * @example
 * ```typescript
 * export const useMellomlagring = createMellomlagringHook({
 *     useSøknadState: () => useSøknadStore((s) => s.søknadState),
 *     useCurrentStegId: () => useSøknadStore((s) => s.currentStegId),
 *     ytelse: APP_YTELSE,
 *     getMetadata: (state) => ({
 *         MELLOMLAGRING_VERSJON,
 *         søker: state.søker,
 *     }),
 * });
 * ```
 */
export const createMellomlagringHook = <TState extends { søknadsdata: object }>(
    config: CreateMellomlagringHookConfig<TState>,
) => {
    const { useSøknadState, useCurrentStegId, ytelse, getMetadata } = config;

    return () => {
        const søknadState = useSøknadState();
        const currentStegId = useCurrentStegId();

        if (!søknadState) {
            throw new Error('useMellomlagring må brukes etter at søknadState er initialisert');
        }

        const metadata = useMemo(() => getMetadata(søknadState), [søknadState]);

        const mellomlagring = useYtelseMellomlagring<MellomlagringData, object>(ytelse, metadata);

        const lagreMellomlagring = async (): Promise<void> => {
            if (currentStegId) {
                const data: MellomlagringData = {
                    søknadsdata: søknadState.søknadsdata,
                    currentStegId,
                };
                await mellomlagring.lagre(data);
            }
        };

        return {
            lagreMellomlagring,
            slettMellomlagring: mellomlagring.slett,
            isPending: mellomlagring.isLagring,
        };
    };
};
