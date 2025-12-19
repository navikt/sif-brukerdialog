import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { EndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { endreSluttdatoForDeltakelse } from '../api/deltakelse/endreSluttdatoForDeltakelse';
import { endreStartdatoForDeltakelse } from '../api/deltakelse/endreStartdatoForDeltakelse';
import { meldUtDeltaker } from '../api/deltakelse/meldUtDeltaker';
import { queryKeys } from '../queries/queryKeys';
import { Deltakelse } from '../types/Deltakelse';
import { EndrePeriodeVariant } from '../types/EndrePeriodeVariant';

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

    return useMutation<Deltakelse, ApiError, EndrePeriodeDatoDto>({
        mutationFn: (data: EndrePeriodeDatoDto) => {
            switch (variant) {
                case EndrePeriodeVariant.startdato:
                    return endreStartdatoForDeltakelse(deltakelseId, data);
                case EndrePeriodeVariant.endreSluttdato:
                    return endreSluttdatoForDeltakelse(deltakelseId, data);
                case EndrePeriodeVariant.meldUtDeltaker:
                    return meldUtDeltaker(deltakelseId, {
                        utmeldingsdato: data.dato,
                    });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelseHistorikk(deltakelseId) });
        },
    });
};
