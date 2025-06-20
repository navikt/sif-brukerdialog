import { Deltakelse, deltakelserSchema, handleApiError } from '@navikt/ung-common';
import { Veileder as VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Henter alle deltakelser som en deltaker har registrert
 * @param deltakerId deltaker-id
 * @returns {Promise<Deltakelse[]>}
 * @throws {ApiError}
 */

export const getDeltakelserForDeltaker = async (deltakerId: string): Promise<Deltakelse[]> => {
    try {
        const { data } = await VeilederService.hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
        return deltakelserSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakelserForDeltaker');
    }
};
