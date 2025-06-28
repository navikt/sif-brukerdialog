import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Melder ut en deltaker fra deltakelse
 * @param deltakelseId
 * @param utmeldingsdato
 * @returns {Promise<MeldUtDeltakerResponse>}
 * @throws {ApiError}
 */
export const meldUtDeltaker = async (
    deltakelseId: string,
    dto: VeilederApi.DeltakelseUtmeldingDto,
): Promise<Deltakelse> => {
    try {
        const body = VeilederApi.zDeltakelseUtmeldingDto.parse(dto);
        const { data } = await VeilederApi.Veileder.meldUtDeltaker({ path: { deltakelseId }, body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'meldUtDeltaker');
    }
};
