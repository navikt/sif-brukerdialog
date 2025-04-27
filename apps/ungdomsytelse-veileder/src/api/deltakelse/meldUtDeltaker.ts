import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { DeltakelseUtmeldingDto, VeilederService, zDeltakelseUtmeldingDto } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Melder ut en deltaker fra deltakelse
 * @param deltakelseId
 * @param utmeldingsdato
 * @returns {Promise<MeldUtDeltakerResponse>}
 * @throws {ApiError}
 */
export const meldUtDeltaker = async (deltakelseId: string, dto: DeltakelseUtmeldingDto): Promise<Deltakelse> => {
    try {
        const body = zDeltakelseUtmeldingDto.parse(dto);
        const { data } = await VeilederService.meldUtDeltaker({ path: { deltakelseId }, body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'meldUtDeltaker');
    }
};
