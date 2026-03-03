import { useMemo } from 'react';

import { MellomlagringYtelse, useYtelseMellomlagring } from '@navikt/sif-common-query';

import { useSøknadFlyt } from '../state/useSøknadState';

/**
 * Standard structure for mellomlagring data.
 */
export interface MellomlagringData {
    søknadsdata: object;
    currentStegId: string | null;
}

interface CreateMellomlagringHookConfig<TState extends { søknadsdata: object }> {
    /** Hook that returns søknadState */
    useSøknadState: () => TState | undefined;
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
    const { useSøknadState, ytelse, getMetadata } = config;

    return () => {
        const søknadState = useSøknadState();
        const currentStegId = useSøknadFlyt((s) => s.currentStegId);

        if (!søknadState) {
            throw new Error('useMellomlagring må brukes etter at søknadState er initialisert');
        }

        const metadata = useMemo(() => getMetadata(søknadState), [søknadState]);

        const mellomlagring = useYtelseMellomlagring<MellomlagringData, object>(ytelse, metadata);

        const hentMellomlagring = (): MellomlagringData => ({
            søknadsdata: søknadState.søknadsdata,
            currentStegId,
        });

        return {
            hentMellomlagring,
            lagreMellomlagring: mellomlagring.lagre,
            slettMellomlagring: mellomlagring.slett,
            isPending: mellomlagring.isLagring,
        };
    };
};
