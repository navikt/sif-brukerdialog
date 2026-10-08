import type { aktivitetspenger, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { useMutation } from '@tanstack/react-query';

import { rapporterInntektAktivitetspenger } from '../api/aktivitetspenger/rapporterInntektAktivitetspenger';
import { rapporterInntektUngdomsytelse } from '../api/ungdomsytelse/rapporterInntektUngdomsytelse';
import { ApiError } from '../utils/errorHandlers';

/** Inntektsrapportering knyttet til ytelsen sin, slik at hver ytelse sender sin egen DTO. */
export type YtelseInntektsrapportering =
    | { ytelse: OppgaveYtelsetype.AKTIVITETSPENGER; data: aktivitetspenger.AktivitetspengerInntektsrapportering }
    | { ytelse: OppgaveYtelsetype.UNGDOMSYTELSE; data: ungdomsytelse.UngdomsytelseInntektsrapportering };

export const useRapporterInntekt = () => {
    return useMutation<void, ApiError, YtelseInntektsrapportering>({
        mutationFn: (rapportering) => {
            const ytelse = rapportering.ytelse;
            switch (rapportering.ytelse) {
                case OppgaveYtelsetype.AKTIVITETSPENGER:
                    return rapporterInntektAktivitetspenger(rapportering.data);
                case OppgaveYtelsetype.UNGDOMSYTELSE:
                    return rapporterInntektUngdomsytelse(rapportering.data);
                default: {
                    throw new Error(`Ukjent OppgaveYtelsetype: ${String(ytelse)}`);
                }
            }
        },
    });
};
