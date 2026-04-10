import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation } from '@tanstack/react-query';

import { rapporterInntektUngdomsprogramytelse } from '../../api/ungdomsprogramytelse/rapporterInntektUngdomsprogramytelse';
import { ApiError } from '../../utils/errorHandlers';

export const useRapporterInntektUngdomsprogramytelse = () => {
    return useMutation<void, ApiError, ungdomsytelse.UngdomsytelseInntektsrapportering>({
        mutationFn: (data) => rapporterInntektUngdomsprogramytelse(data),
    });
};
