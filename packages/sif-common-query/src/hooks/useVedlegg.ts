import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sifCommonQueryKeys } from '../queryKeys';
import { 
    lagreVedlegg, 
    slettVedlegg, 
    hentVedlegg, 
    getVedleggIdFromResponseHeaderLocation 
} from '../api/vedleggApi';

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
                queryKey: sifCommonQueryKeys.vedlegg,
            });
        },
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
                queryKey: [...sifCommonQueryKeys.vedlegg, vedleggId],
            });
            // Invalidate any other vedlegg-related queries
            queryClient.invalidateQueries({
                queryKey: sifCommonQueryKeys.vedlegg,
            });
        },
    });
};

// Hook for fetching a specific attachment
export const useHentVedlegg = (vedleggId: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: [...sifCommonQueryKeys.vedlegg, vedleggId],
        queryFn: () => hentVedlegg(vedleggId),
        enabled: options?.enabled ?? !!vedleggId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};
