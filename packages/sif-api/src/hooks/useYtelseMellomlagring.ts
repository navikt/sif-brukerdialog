import { jsonSort } from '@navikt/sif-common-utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import objectHash from 'object-hash';

import {
    hentYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    opprettYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '../api/ytelseMellomlagringApi';
import { sifApiQueryKeys } from '../queryKeys';
import { MellomlagringYtelse } from '../types/MellomlagringYtelse';

interface MellomlagringPayload<State> extends Record<string, unknown> {
    søknadsdata: State;
    søknadHashString: string;
}

const createHash = <MetaData>(metaData: MetaData): string => {
    return objectHash(jsonSort(metaData));
};

const isValidPayload = <State>(payload: unknown): payload is MellomlagringPayload<State> => {
    if (typeof payload !== 'object' || payload === null) {
        return false;
    }
    const p = payload as MellomlagringPayload<State>;
    return 'søknadsdata' in p && 'søknadHashString' in p && typeof p.søknadHashString === 'string';
};

/**
 * Hook for mellomlagring med metadata-validering.
 * Returnerer `null` ved manglende/ugyldig payload eller når metadata-hash ikke matcher.
 */
export const useYtelseMellomlagring = <State, MetaData>(
    ytelse: MellomlagringYtelse,
    metadata: MetaData | undefined,
    options?: {
        enabled?: boolean;
    },
) => {
    const queryClient = useQueryClient();
    const queryKey = [...sifApiQueryKeys.mellomlagring, ytelse, 'validated'];

    const query = useQuery<State | null>({
        queryKey,
        queryFn: async () => {
            if (!metadata) return null;

            try {
                const payload = await hentYtelseMellomlagring(ytelse);

                if (!payload) {
                    return null;
                }

                if (!isValidPayload<State>(payload)) {
                    // eslint-disable-next-line no-console
                    console.log('Ugyldig mellomlagring payload, sletter mellomlagring');
                    await slettYtelseMellomlagring(ytelse);
                    return null;
                }

                const metadataHash = createHash(metadata);

                if (payload.søknadHashString !== metadataHash) {
                    await slettYtelseMellomlagring(ytelse);
                    return null;
                }

                return payload.søknadsdata;
            } catch {
                return null;
            }
        },
        enabled: (options?.enabled ?? true) && !!metadata,
        staleTime: Infinity,
        gcTime: 5 * 60 * 1000,
    });

    const createPayload = (data: State): MellomlagringPayload<State> => {
        if (!metadata) {
            throw new Error('Metadata mangler');
        }
        return {
            søknadsdata: data,
            søknadHashString: createHash(metadata),
        };
    };

    const opprettMutation = useMutation({
        mutationFn: (data: State) => opprettYtelseMellomlagring(ytelse, createPayload(data)),
    });

    const lagreMutation = useMutation({
        mutationFn: (data: State) => oppdaterYtelseMellomlagring(ytelse, createPayload(data)),
    });

    const slettMutation = useMutation({
        mutationFn: () => slettYtelseMellomlagring(ytelse),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey });
        },
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        isFetched: query.isFetched,
        isError: query.isError,
        error: query.error,

        lagre: lagreMutation.mutateAsync,
        opprett: opprettMutation.mutateAsync,
        slett: slettMutation.mutateAsync,

        isPending: opprettMutation.isPending || lagreMutation.isPending || slettMutation.isPending,

        refetch: () => query.refetch(),
    };
};
