import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { EndrePeriodeDatoDto, VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Endrer startdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiError}
 */
export const endreStartdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const { data } = await VeilederService.endreStartdato({
            path: { deltakelseId },
            body: endrePeriodeData,
            throwOnError: true,
        });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'endreStartdatoForDeltakelse');
    }
};
