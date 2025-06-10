import { handleApiError } from '@navikt/ung-common';
import { Veileder as VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Sletter en deltaker
 *
 * @param deltakerId
 */

export const slettDeltaker = async (deltakerId: string) => {
    try {
        await VeilederService.fjernFraProgram({ path: { deltakerId } });
    } catch (e) {
        throw handleApiError(e, 'slettDeltaker');
    }
};
