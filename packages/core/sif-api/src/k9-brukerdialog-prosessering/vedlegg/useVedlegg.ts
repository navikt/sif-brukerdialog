import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { sifApiQueryKeys } from '../../queryKeys';
import { ApiError } from '../../shared/errorHandlers';
import { finnesVedlegg, getVedleggIdFromResponseHeaderLocation, lagreVedlegg, slettVedlegg } from './vedleggApi';

// Re-export utility function
export { getVedleggIdFromResponseHeaderLocation };

// Hook for uploading an attachment
export const useLagreVedlegg = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: lagreVedlegg,
        onSuccess: () => {
            // Invalidate any vedlegg-related queries when upload succeeds
            queryClient.invalidateQueries({
                queryKey: sifApiQueryKeys.vedlegg,
            });
        },
    });
};

export type VedleggEksistens = Awaited<ReturnType<typeof finnesVedlegg>>[number];

/**
 * Henter ID-ene til vedlegg som ikke lenger finnes i backend, f.eks. når søknaden er hentet fra mellomlagring.
 * Kjøres én gang per visning av siden: ikke ved fokus, reconnect eller lagring/sletting av vedlegg.
 */
export const useManglendeVedlegg = (vedleggIder: string[], enabled = true) => {
    return useQuery<VedleggEksistens[], ApiError, string[]>({
        queryKey: sifApiQueryKeys.vedleggEksisterer(vedleggIder),
        queryFn: () => finnesVedlegg(vedleggIder),
        select: (data) => data.filter((v) => !v.finnes).map((v) => v.vedleggId),
        enabled: enabled && vedleggIder.length > 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
    });
};

// Hook for deleting an attachment
export const useSlettVedlegg = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: slettVedlegg,
        onSuccess: (_data, vedleggId) => {
            // Remove the specific vedlegg from cache
            queryClient.removeQueries({
                queryKey: [...sifApiQueryKeys.vedlegg, vedleggId],
            });
            // Invalidate any other vedlegg-related queries
            queryClient.invalidateQueries({
                queryKey: sifApiQueryKeys.vedlegg,
            });
        },
    });
};
