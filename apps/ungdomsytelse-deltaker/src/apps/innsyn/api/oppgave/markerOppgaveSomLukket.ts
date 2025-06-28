import { handleApiError } from '@navikt/ung-common';
import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Markerer en oppgave som åpnet
 * @param oppgaveReferanse
 */
export const markerOppgaveSomLukket = async (oppgaveReferanse: string): Promise<void> => {
    try {
        await DeltakerApi.Deltakelse.markerOppgaveSomLukket({ path: { oppgaveReferanse } });
    } catch (e) {
        throw handleApiError(e, 'markerOppgaveSomLukket');
    }
};
