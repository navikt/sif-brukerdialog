import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, Deltakelse } from '@navikt/ung-common';
import { EndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api';
import { endreStartdatoForDeltakelse } from '../api/deltakelse/endreStartdatoForDeltakelse';
import { queries } from '../queries/queryKeys';

export const useEndreStartdatoForDeltakelse = ({
    deltakerId,
    deltakelseId,
}: {
    deltakerId: string;
    deltakelseId: string;
}) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, EndrePeriodeDatoDto>({
        mutationFn: (payload: EndrePeriodeDatoDto) => endreStartdatoForDeltakelse(deltakelseId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
            queryClient.invalidateQueries(queries.deltakelseHistorikk(deltakerId));
        },
    });
};
