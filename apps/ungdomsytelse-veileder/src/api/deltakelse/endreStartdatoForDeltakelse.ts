import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import {
    Veileder as VeilederService,
    EndrePeriodeDatoDto,
    zEndrePeriodeDatoDto,
} from '@navikt/ung-deltakelse-opplyser-api';

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
        const body = zEndrePeriodeDatoDto.parse(endrePeriodeData);
        const { data } = await VeilederService.endreStartdato({
            path: { deltakelseId },
            body,
        });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'endreStartdatoForDeltakelse');
    }
};
