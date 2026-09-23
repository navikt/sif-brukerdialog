import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { handleApiError } from '@sif/api';

import { Deltakelse, deltakelseSchema } from '../../types/Deltakelse';

/**
 * Forlenge en deltakelseperiode
 * @param deltakelseId
 * @throws {ApiError}
 */

export const forlengPeriode = async (deltakelseId: string): Promise<Deltakelse> => {
    try {
        const { data } = await Veileder.forlengPeriode({ path: { deltakelseId } });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'forlengPeriode');
    }
};
