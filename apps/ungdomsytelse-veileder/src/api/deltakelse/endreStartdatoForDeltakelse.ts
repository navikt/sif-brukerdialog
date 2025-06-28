import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Endrer startdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiError}
 */
export const endreStartdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: VeilederApi.EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const body = VeilederApi.zEndrePeriodeDatoDto.parse(endrePeriodeData);
        const { data } = await VeilederApi.Veileder.endreStartdato({
            path: { deltakelseId },
            body,
        });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'endreStartdatoForDeltakelse');
    }
};
