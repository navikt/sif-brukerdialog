import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { createMellomlagring, MellomlagringDTO } from '../../../api/mellomlagring/mellomlagring';
import { queries } from '../../../queries/queryKeys';

export const useCreateMellomlagring = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, MellomlagringDTO>({
        mutationFn: (data) => createMellomlagring(data),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.getMellomlagring);
        },
    });
};
