import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { deleteMellomlagring } from '../../../api/mellomlagring/mellomlagring';
import { queries } from '../../../queries/queryKeys';

export const useCreateMellomlagring = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, null>({
        mutationFn: () => deleteMellomlagring(),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.getMellomlagring);
        },
    });
};
