import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, Deltakelse } from '@navikt/ung-common';
import { EndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api';
import { endreSluttdatoForDeltakelse } from '../api/deltakelse/endreSluttdatoForDeltakelse';
import { queries } from '../queries/queryKeys';

/**
 * Mutasjon for å endre sluttdato for en deltakelse
 * @param deltakerId Trengs for at invalidere queryen for deltakelser
 * @returns Oppdatert Deltakelse
 */
export const useEndreSluttdatoForDeltakelse = ({
    deltakerId,
    deltakelseId,
}: {
    deltakerId: string;
    deltakelseId: string;
}) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, EndrePeriodeDatoDto>({
        mutationFn: (data: EndrePeriodeDatoDto) => endreSluttdatoForDeltakelse(deltakelseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
        },
    });
};
