import {
    UngdomsytelseControllerService,
    UngdomsytelseInntektsrapportering,
    UngdomsytelseOppgavebekreftelse,
    Ungdomsytelsesøknad,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { handleApiError } from '@navikt/ung-common';

/**
 * Påkrevde headers settes andre steder, dette er bare en mock for å tilfredstille typescript
 *  */

const k9RequestHeader = {} as any;

/**
 * Sender inn svar på en oppgave
 * @returns {Promise<void>}
 */
const sendOppgavebekreftelse = async (oppgave: UngdomsytelseOppgavebekreftelse): Promise<void> => {
    try {
        await UngdomsytelseControllerService.oppgavebekreftelse({ body: oppgave, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelse');
    }
};

const sendSøknad = async (data: Ungdomsytelsesøknad): Promise<any> => {
    try {
        await UngdomsytelseControllerService.innsendingUngdomsytelsesøknad({ body: data, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};

const rapporterInntekt = async (data: UngdomsytelseInntektsrapportering): Promise<void> => {
    try {
        await UngdomsytelseControllerService.inntektrapportering({ body: data, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'rapporterInntekt');
    }
};

export const deltakerApiService = {
    rapporterInntekt,
    sendOppgavebekreftelse,
    sendSøknad,
};
