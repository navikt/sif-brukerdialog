import { commonRequestHeaders } from '@sif/api-client';
import { aktivitetspenger, ungdomsytelse } from '@sif/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';

/**
 * Inntektsrapportering knyttet til ytelsen sin, slik at hver ytelse sender sin egen DTO.
 * Verdiene i `ytelse` er de samme som i OppgaveYtelsetype fra ung-brukerdialog-api, slik at enumen kan sendes inn direkte.
 */
export type YtelseInntektsrapportering =
    | { ytelse: 'AKTIVITETSPENGER'; data: aktivitetspenger.AktivitetspengerInntektsrapportering }
    | { ytelse: 'UNGDOMSYTELSE'; data: ungdomsytelse.UngdomsytelseInntektsrapportering };

export const rapporterInntekt = async ({ ytelse, data }: YtelseInntektsrapportering): Promise<void> => {
    try {
        if (ytelse === 'AKTIVITETSPENGER') {
            await aktivitetspenger.AktivitetspengerController.inntektrapportering({
                body: data,
                headers: commonRequestHeaders,
            });
        } else if (ytelse === 'UNGDOMSYTELSE') {
            await ungdomsytelse.UngdomsytelseController.inntektrapportering({
                body: data,
                headers: commonRequestHeaders,
            });
        } else {
            const ukjent: never = ytelse;
            throw new Error(`Ukjent ytelse: ${ukjent}`);
        }
    } catch (e) {
        throw handleApiError(e, `rapporterInntekt-${ytelse}`);
    }
};
