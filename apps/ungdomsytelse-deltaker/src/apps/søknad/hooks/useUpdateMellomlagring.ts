import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { MellomlagringDTO, updateMellomlagring } from '../../../api/mellomlagring/mellomlagring';
import { queries } from '../../../queries/queryKeys';

export const useUpdateMellomlagring = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, MellomlagringDTO>({
        mutationFn: (data) => updateMellomlagring(data),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.getMellomlagring);
        },
    });
};
