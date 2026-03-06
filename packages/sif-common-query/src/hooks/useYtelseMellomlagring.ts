import { jsonSort } from '@navikt/sif-common-utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import objectHash from 'object-hash';

import {
    hentYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '../api/ytelseMellomlagringApi';
import { sifCommonQueryKeys } from '../queryKeys';
import { MellomlagringYtelse } from '../types/MellomlagringYtelse';

interface MellomlagringPayload<State> {
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
 *
 * Henter mellomlagret data og validerer at metadata-hash matcher.
 * Hvis metadata har endret seg siden lagring, returneres null og mellomlagring slettes automatisk.
 *
 * @param ytelse - Hvilken ytelse mellomlagringen gjelder
 * @param metadata - App-spesifikk metadata for hash-validering (søker, barn, versjon, etc.)
 * @param options - Query options
 *
 * @example
 * ```tsx
 * const metadata = { MELLOMLAGRING_VERSJON, søker, barn };
 * const mellomlagring = useYtelseMellomlagring<Mellomlagring, typeof metadata>(
 *     MellomlagringYtelse.AKTIVITETSPENGER,
 *     metadata,
 * );
 *
 * // Hent data
 * const data = mellomlagring.data;
 *
 * // Lagre data
 * mellomlagring.lagre({ søknadsdata: {...}, currentStegId: 'steg1' });
 *
 * // Slett
 * mellomlagring.slett();
 * ```
 */
export const useYtelseMellomlagring = <State, MetaData>(
    ytelse: MellomlagringYtelse,
    metadata: MetaData | undefined,
    options?: {
        enabled?: boolean;
    },
) => {
    const queryClient = useQueryClient();
    const queryKey = [...sifCommonQueryKeys.mellomlagring, ytelse, 'validated'];

    const query = useQuery<State | null>({
        queryKey,
        queryFn: async () => {
            if (!metadata) return null;

            try {
                const payload = await hentYtelseMellomlagring(ytelse);

                if (!isValidPayload<State>(payload)) {
                    return null;
                }

                const metadataHash = createHash(metadata);

                if (payload.søknadHashString !== metadataHash) {
                    await slettYtelseMellomlagring(ytelse);
                    return null;
                }

                return payload.søknadsdata;
            } catch {
                await slettYtelseMellomlagring(ytelse).catch(() => {});
                return null;
            }
        },
        enabled: (options?.enabled ?? true) && !!metadata,
        staleTime: Infinity,
        gcTime: 5 * 60 * 1000,
    });

    const lagreMutation = useMutation({
        mutationFn: async (data: State) => {
            if (!metadata) {
                throw new Error('Metadata mangler');
            }
            const payload: MellomlagringPayload<State> = {
                søknadsdata: data,
                søknadHashString: createHash(metadata),
            };
            return oppdaterYtelseMellomlagring(ytelse, payload as unknown as Record<string, unknown>);
        },
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

        lagre: async (data: State): Promise<void> => {
            await lagreMutation.mutateAsync(data);
        },

        slett: async (): Promise<void> => {
            await slettMutation.mutateAsync();
        },

        isPending: lagreMutation.isPending || slettMutation.isPending,

        refetch: () => query.refetch(),
    };
};
