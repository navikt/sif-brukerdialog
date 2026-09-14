import { handleApiError } from '@sif/api';
import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';

/**
 * Sletter en deltaker
 *
 * @param deltakerId
 */

export const slettDeltaker = async (deltakerId: string) => {
    try {
        await Veileder.fjernFraProgram({ path: { deltakerId } });
    } catch (e) {
        throw handleApiError(e, 'slettDeltaker');
    }
};
