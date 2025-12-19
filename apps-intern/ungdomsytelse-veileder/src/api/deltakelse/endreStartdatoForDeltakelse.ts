import { handleApiError } from '@navikt/ung-common';
import { EndrePeriodeDatoDto, Veileder, zEndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { Deltakelse, deltakelseSchema } from '../../types/Deltakelse';

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
        const { data } = await Veileder.endreStartdato({
            path: { deltakelseId },
            body,
        });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'endreStartdatoForDeltakelse');
    }
};
