import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { søknadQueries, søknadQueryKeys } from '../../queries/søknadQueries';
import {
    createMellomlagring,
    deleteMellomlagring,
    getMellomlagring,
    MellomlagringDTO,
    updateMellomlagring,
} from '../../api/mellomlagring/mellomlagring';

export const useCreateMellomlagring = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, MellomlagringDTO>({
        mutationFn: (data) => createMellomlagring(data),
        onSuccess: () => {
            queryClient.invalidateQueries(søknadQueries.getMellomlagring);
        },
    });
};

export const useGetMellomlagring = () => {
    return useQuery<MellomlagringDTO, ApiError>({
        queryKey: søknadQueryKeys.getMellomlagring,
        queryFn: () => getMellomlagring(),
        enabled: true,
        retry: false,
    });
};

export const useUpdateMellomlagring = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, MellomlagringDTO>({
        mutationFn: (data) => updateMellomlagring(data),
        onSuccess: () => {
            queryClient.invalidateQueries(søknadQueries.getMellomlagring);
        },
    });
};

export const useDeleteMellomlagring = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, null>({
        mutationFn: () => deleteMellomlagring(),
        onSuccess: () => {
            queryClient.invalidateQueries(søknadQueries.getMellomlagring);
        },
    });
};
