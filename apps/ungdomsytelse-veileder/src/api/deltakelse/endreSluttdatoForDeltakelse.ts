import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Lager en oppgave for å endre sluttdato for en deltakelse
 * @param deltakelseId
 * @param endrePeriodeData EndrePeriodeDatoDto
 * @returns {Promise<Deltakelse>}
 * @throws {ApiError}
 */
export const endreSluttdatoForDeltakelse = async (
    deltakelseId: string,
    endrePeriodeData: VeilederApi.EndrePeriodeDatoDto,
): Promise<Deltakelse> => {
    try {
        const body = VeilederApi.zEndrePeriodeDatoDto.parse(endrePeriodeData);
        const { data } = await VeilederApi.Veileder.endreSluttdato({ path: { deltakelseId }, body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'endreSluttdatoForDeltakelse');
    }
};
