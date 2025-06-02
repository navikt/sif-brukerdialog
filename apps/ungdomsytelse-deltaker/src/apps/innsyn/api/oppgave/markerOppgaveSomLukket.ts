import { handleApiError } from '@navikt/ung-common';
import { DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Markerer en oppgave som åpnet
 * @param oppgaveReferanse
 */
export const markerOppgaveSomLukket = async (oppgaveReferanse: string): Promise<void> => {
    try {
        await DeltakelseService.markerOppgaveSomLukket({ path: { oppgaveReferanse } });
    } catch (e) {
        throw handleApiError(e, 'markerOppgaveSomLukket');
    }
};
