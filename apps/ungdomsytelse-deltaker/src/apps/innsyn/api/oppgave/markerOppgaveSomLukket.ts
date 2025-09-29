import { handleApiError } from '@navikt/ung-common';
import { Deltakelse } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

/**
 * Markerer en oppgave som åpnet
 * @param oppgaveReferanse
 */
export const markerOppgaveSomLukket = async (oppgaveReferanse: string): Promise<void> => {
    try {
        await Deltakelse.markerOppgaveSomLukket({ path: { oppgaveReferanse } });
    } catch (e) {
        throw handleApiError(e, 'markerOppgaveSomLukket');
    }
};
