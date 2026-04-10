import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation } from '@tanstack/react-query';

import { rapporterInntektAktivitetspenger } from '../../api/aktivitetspenger/rapporterInntektAktivitetspenger';
import { ApiError } from '../../utils/errorHandlers';

export const useRapporterInntektAktivitetspenger = () => {
    return useMutation<void, ApiError, aktivitetspenger.AktivitetspengerInntektsrapportering>({
        mutationFn: (data) => rapporterInntektAktivitetspenger(data),
    });
};
