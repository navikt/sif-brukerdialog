import { handleApiError } from '@navikt/ung-common';
import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { Deltakelse, deltakelseSchema } from '../../types/Deltakelse';

/**
 * Utvide en deltakelse
 * @param deltakelseId
 * @throws {ApiError}
 */

export const utvidKvote = async (deltakelseId: string): Promise<Deltakelse> => {
    try {
        const { data } = await Veileder.utvidKvote({ path: { deltakelseId } });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'utvidKvote');
    }
};
