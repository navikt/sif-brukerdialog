import { handleApiError } from '@navikt/ung-common';
import { VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Sletter en deltakelse
 *
 * @param deltakelseId
 */

export const slettDeltakelse = async (deltakelseId: string) => {
    try {
        await VeilederService.fjernFraProgram({ path: { deltakelseId } });
    } catch (e) {
        throw handleApiError(e, 'slettDeltakelse');
    }
};
