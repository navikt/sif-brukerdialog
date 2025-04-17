import { Deltakelse, deltakelseSchema, handleApiError } from '@navikt/ung-common';
import { VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Melder ut en deltaker fra deltakelse
 * @param deltakelseId
 * @param utmeldingsdato
 * @returns {Promise<MeldUtDeltakerResponse>}
 * @throws {ApiError}
 */
export const meldUtDeltaker = async (deltakelseId: string, utmeldingsdato: string): Promise<Deltakelse> => {
    try {
        const { data } = await VeilederService.meldUtDeltaker({ path: { deltakelseId }, body: { utmeldingsdato } });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'meldUtDeltaker');
    }
};
