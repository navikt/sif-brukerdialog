import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { handleApiError } from '@sif/api';

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
