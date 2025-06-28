import { Deltakelse, deltakelserSchema, handleApiError } from '@navikt/ung-common';
import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';

/**
 * Henter alle deltakelser som en deltaker har registrert
 * @param deltakerId deltaker-id
 * @returns {Promise<Deltakelse[]>}
 * @throws {ApiError}
 */

export const getDeltakelserForDeltaker = async (deltakerId: string): Promise<Deltakelse[]> => {
    try {
        const { data } = await Veileder.hentAlleDeltakelserGittDeltakerId({ path: { deltakerId } });
        return deltakelserSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakelserForDeltaker');
    }
};
