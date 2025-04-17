import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { EndrePeriodeDatoDto, VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

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
        const { data } = await VeilederService.endreSluttdato({ path: { deltakelseId }, body: endrePeriodeData });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'enderSluttdatoForDeltakelse');
    }
};
