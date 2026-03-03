import { useMemo } from 'react';

import { MellomlagringYtelse, useYtelseMellomlagring } from '@navikt/sif-common-query';

/**
 * Internal structure for mellomlagring data.
 */
interface MellomlagringData {
    søknadsdata: object;
    currentStepId: string;
}

interface CreateMellomlagringHookConfig<TState extends { søknadsdata: object }> {
    /** Hook that returns søknadState */
    useSøknadState: () => TState | undefined;
    /** Hook that returns currentStepId */
    useCurrentStepId: () => string | undefined;
    /** Which ytelse/API endpoint to use */
    ytelse: MellomlagringYtelse;
    /** Function to extract metadata from state. Metadata is hashed for validation. */
    getMetadata: (state: TState) => object;
}

export const createMellomlagringHook = <TState extends { søknadsdata: object }>(
    config: CreateMellomlagringHookConfig<TState>,
) => {
    const { useSøknadState, useCurrentStepId, ytelse, getMetadata } = config;

    return () => {
        const søknadState = useSøknadState();
        const currentStepId = useCurrentStepId();

        if (!søknadState) {
            throw new Error('useMellomlagring må brukes etter at søknadState er initialisert');
        }

        const metadata = useMemo(() => getMetadata(søknadState), [søknadState]);

        const mellomlagring = useYtelseMellomlagring<MellomlagringData, object>(ytelse, metadata);

        const lagreMellomlagring = async (): Promise<void> => {
            if (currentStepId) {
                const data: MellomlagringData = {
                    søknadsdata: søknadState.søknadsdata,
                    currentStepId: currentStepId,
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
