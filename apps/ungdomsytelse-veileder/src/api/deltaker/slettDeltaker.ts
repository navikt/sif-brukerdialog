import { handleApiError } from '@navikt/ung-common';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Sletter en deltaker
 *
 * @param deltakerId
 */

export const slettDeltaker = async (deltakerId: string) => {
    try {
        await VeilederApi.Veileder.fjernFraProgram({ path: { deltakerId } });
    } catch (e) {
        throw handleApiError(e, 'slettDeltaker');
    }
};
