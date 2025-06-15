import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import {
    DeltakelseInnmeldingDto,
    Veileder as VeilederService,
    zDeltakelseInnmeldingDto,
} from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Melder inn en bruker til deltakelse
 * @param dto DeltakelseInnmeldingDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiError}
 */
export const meldInnDeltaker = async (dto: DeltakelseInnmeldingDto): Promise<Deltakelse> => {
    try {
        const body = zDeltakelseInnmeldingDto.parse(dto);
        const { data } = await VeilederService.meldInnDeltaker({ body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'meldInnDeltaker');
    }
};
