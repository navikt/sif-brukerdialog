import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sifCommonQueryKeys } from '../queryKeys';
import { MellomlagringYtelse } from '../types/mellomlagring';
import {
    hentYtelseMellomlagring,
    opprettYtelseMellomlagring,
    oppdaterYtelseMellomlagring,
    slettYtelseMellomlagring,
} from '../api/ytelseMellomlagringApi';

// Hook for fetching mellomlagring data for a specific ytelse
export const useGetYtelseMellomlagring = (
    ytelse: MellomlagringYtelse,
    options?: {
        enabled?: boolean;
    },
) => {
    return useQuery({
        queryKey: [...sifCommonQueryKeys.mellomlagring, ytelse],
        queryFn: () => hentYtelseMellomlagring(ytelse),
        enabled: options?.enabled ?? !!ytelse,
        staleTime: 30 * 1000, // 30 seconds - intermediate storage is fairly dynamic
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for creating mellomlagring data
export const useCreateYtelseMellomlagring = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ ytelse, data }: { ytelse: MellomlagringYtelse; data: Record<string, unknown> }) => {
            return opprettYtelseMellomlagring(ytelse, data);
        },
        onSuccess: (_data, variables) => {
            // Invalidate and refetch the specific mellomlagring
            queryClient.invalidateQueries({
                queryKey: [...sifCommonQueryKeys.mellomlagring, variables.ytelse],
            });
        },
    });
};

// Hook for updating mellomlagring data
export const useUpdateYtelseMellomlagring = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ ytelse, data }: { ytelse: MellomlagringYtelse; data: Record<string, unknown> }) => {
            return oppdaterYtelseMellomlagring(ytelse, data);
        },
        onSuccess: (_data, variables) => {
            // Invalidate and refetch the specific mellomlagring
            queryClient.invalidateQueries({
                queryKey: [...sifCommonQueryKeys.mellomlagring, variables.ytelse],
            });
        },
    });
};

// Hook for deleting mellomlagring data
export const useDeleteYtelseMellomlagring = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: slettYtelseMellomlagring,
        onSuccess: (_data, ytelse) => {
            // Remove the specific mellomlagring from cache
            queryClient.removeQueries({
                queryKey: [...sifCommonQueryKeys.mellomlagring, ytelse],
            });
            // Invalidate other mellomlagring queries
            queryClient.invalidateQueries({
                queryKey: sifCommonQueryKeys.mellomlagring,
            });
        },
    });
};

/**
 * Convenience hook that provides a complete mellomlagring interface for a specific ytelse
 * Similar to the legacy getMellomlagringService but using React Query patterns
 *
 * The raw data from API is a JSON string. If you need to parse it, use JSON.parse() on the data.
 */
export const useYtelseMellomlagringService = (
    ytelse: MellomlagringYtelse,
    options?: {
        enabled?: boolean;
    },
) => {
    const fetch = useGetYtelseMellomlagring(ytelse, {
        enabled: options?.enabled,
    });

    const createMutation = useCreateYtelseMellomlagring();
    const updateMutation = useUpdateYtelseMellomlagring();
    const deleteMutation = useDeleteYtelseMellomlagring();

    return {
        // Data and query state
        data: fetch.data,
        isLoading: fetch.isLoading,
        isError: fetch.isError,
        error: fetch.error,

        // Actions
        fetch: () => fetch.refetch(),
        create: (data?: Record<string, unknown>) => {
            return createMutation.mutate({
                ytelse,
                data: data || {},
            });
        },
        update: (data: Record<string, unknown>) => {
            return updateMutation.mutate({
                ytelse,
                data,
            });
        },
        purge: () => deleteMutation.mutate(ytelse),

        // Mutation states
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        // Direct access to mutations for more control
        mutations: {
            create: createMutation,
            update: updateMutation,
            delete: deleteMutation,
        },
    };
};
