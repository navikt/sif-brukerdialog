import { handleApiError } from '@sif/api';
import { Veileder } from '@sif/ung-deltakelse-opplyser-api-veileder';

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
