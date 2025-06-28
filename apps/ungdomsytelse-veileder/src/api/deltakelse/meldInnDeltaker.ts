import { handleApiError } from '@navikt/ung-common';
import {
    DeltakelseInnmeldingDto,
    Veileder,
    zDeltakelseInnmeldingDto,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { Deltakelse, deltakelseSchema } from '../../types/Deltakelse';

/**
 * Melder inn en bruker til deltakelse
 * @param dto DeltakelseInnmeldingDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiError}
 */
export const meldInnDeltaker = async (dto: DeltakelseInnmeldingDto): Promise<Deltakelse> => {
    try {
        const body = zDeltakelseInnmeldingDto.parse(dto);
        const { data } = await Veileder.meldInnDeltaker({ body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'meldInnDeltaker');
    }
};
