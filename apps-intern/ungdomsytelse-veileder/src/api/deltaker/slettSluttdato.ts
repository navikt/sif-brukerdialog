import { handleApiError } from '@navikt/ung-common';
import { Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';

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
