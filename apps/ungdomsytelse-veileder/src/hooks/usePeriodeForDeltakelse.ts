import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, Deltakelse } from '@navikt/ung-common';

import { endreSluttdatoForDeltakelse } from '../api/deltakelse/endreSluttdatoForDeltakelse';
import { queries } from '../queries/queryKeys';
import { endreStartdatoForDeltakelse } from '../api/deltakelse/endreStartdatoForDeltakelse';
import { EndrePeriodeVariant } from '../types/EndrePeriodeVariant';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Mutasjon for å endre startdato eller sluttdato for en deltakelse
 * @param deltakerId Trengs for at invalidere queryen for deltakelser
 * @returns Oppdatert Deltakelse
 */
export const usePeriodeForDeltakelse = ({
    variant,
    deltakerId,
    deltakelseId,
}: {
    variant: EndrePeriodeVariant;
    deltakerId: string;
    deltakelseId: string;
}) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, VeilederApi.EndrePeriodeDatoDto>({
        mutationFn: (data: VeilederApi.EndrePeriodeDatoDto) =>
            variant === EndrePeriodeVariant.startdato
                ? endreStartdatoForDeltakelse(deltakelseId, data)
                : endreSluttdatoForDeltakelse(deltakelseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
            queryClient.invalidateQueries(queries.deltakelseHistorikk(deltakelseId));
        },
    });
};
