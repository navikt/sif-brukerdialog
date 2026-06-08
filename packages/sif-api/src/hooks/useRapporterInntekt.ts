import { aktivitetspenger, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { useMutation } from '@tanstack/react-query';

import { rapporterInntektAktivitetspenger } from '../api/aktivitetspenger/rapporterInntektAktivitetspenger';
import { rapporterInntektUngdomsytelse } from '../api/ungdomsytelse/rapporterInntektUngdomsytelse';
import { ApiError } from '../utils/errorHandlers';

export type InntektsrapporteringDto =
    | aktivitetspenger.AktivitetspengerInntektsrapportering
    | ungdomsytelse.UngdomsytelseInntektsrapportering;

export const useRapporterInntekt = (ytelse: OppgaveYtelsetype) => {
    return useMutation<void, ApiError, InntektsrapporteringDto>({
        mutationFn: (data) => {
            switch (ytelse) {
                case OppgaveYtelsetype.AKTIVITETSPENGER:
                    return rapporterInntektAktivitetspenger(data);
                case OppgaveYtelsetype.UNGDOMSYTELSE:
                    return rapporterInntektUngdomsytelse(data);
            }
        },
    });
};
