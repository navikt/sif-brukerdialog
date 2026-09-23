import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { handleApiError } from '@sif/api';

/**
 * Sletter sluttdato på en deltakelse
 *
 * @param deltakelseId
 */

export const slettSluttdato = async (deltakelseId: string) => {
    try {
        await Veileder.slettSluttdato({ path: { deltakelseId } });
    } catch (e) {
        throw handleApiError(e, 'slettSluttdato');
    }
};
