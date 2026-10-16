import type { aktivitetspenger, ungdomsytelse } from '@sif/k9-brukerdialog-prosessering-api';
import { useMutation } from '@tanstack/react-query';

import { ApiError } from '../../shared/errorHandlers';
import { rapporterInntektAktivitetspenger, rapporterInntektUngdomsytelse } from './inntektApi';

/**
 * Inntektsrapportering knyttet til ytelsen sin, slik at hver ytelse sender sin egen DTO.
 * Verdiene i `ytelse` er de samme som i OppgaveYtelsetype fra ung-brukerdialog-api, slik at enumen kan sendes inn direkte.
 */
export type YtelseInntektsrapportering =
    | { ytelse: 'AKTIVITETSPENGER'; data: aktivitetspenger.AktivitetspengerInntektsrapportering }
    | { ytelse: 'UNGDOMSYTELSE'; data: ungdomsytelse.UngdomsytelseInntektsrapportering };

export const useRapporterInntekt = () => {
    return useMutation<void, ApiError, YtelseInntektsrapportering>({
        mutationFn: (rapportering) => {
            switch (rapportering.ytelse) {
                case 'AKTIVITETSPENGER':
                    return rapporterInntektAktivitetspenger(rapportering.data);
                case 'UNGDOMSYTELSE':
                    return rapporterInntektUngdomsytelse(rapportering.data);
                default: {
                    const ukjent: never = rapportering;
                    throw new Error(`Ukjent ytelse: ${JSON.stringify(ukjent)}`);
                }
            }
        },
    });
};
