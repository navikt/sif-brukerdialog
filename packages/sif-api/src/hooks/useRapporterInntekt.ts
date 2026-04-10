import { aktivitetspenger, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { useMutation } from '@tanstack/react-query';

import { rapporterInntektAktivitetspenger } from '../api/aktivitetspenger/rapporterInntektAktivitetspenger';
import { rapporterInntektUngdomsprogramytelse } from '../api/ungdomsprogramytelse/rapporterInntektUngdomsprogramytelse';
import { ApiError } from '../utils/errorHandlers';

export const useRapporterInntekt = (ytelse: OppgaveYtelsetype) => {
    return useMutation<
        void,
        ApiError,
        aktivitetspenger.AktivitetspengerInntektsrapportering | ungdomsytelse.UngdomsytelseInntektsrapportering
    >({
        mutationFn: (data) => {
            switch (ytelse) {
                case OppgaveYtelsetype.AKTIVITETSPENGER:
                    return rapporterInntektAktivitetspenger(data);
                case OppgaveYtelsetype.UNGDOMSYTELSE:
                    return rapporterInntektUngdomsprogramytelse(data);
            }
        },
    });
};
