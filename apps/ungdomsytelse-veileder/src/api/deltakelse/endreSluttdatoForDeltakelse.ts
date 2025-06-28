import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { EndrePeriodeDatoDto, Veileder, zEndrePeriodeDatoDto } from '@navikt/ung-deltakelse-opplyser-api-veileder';

/**
 * Lager en oppgave for å endre sluttdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiError}
 */
export const endreSluttdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const body = zEndrePeriodeDatoDto.parse(endrePeriodeData);
        const { data } = await Veileder.endreSluttdato({ path: { deltakelseId }, body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'endreSluttdatoForDeltakelse');
    }
};
