import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation } from '@tanstack/react-query';

import { rapporterInntekt } from '../api/rapporterInntekt';
import { ApiError } from '../utils/errorHandlers';

export const useRapporterInntekt = () => {
    return useMutation<void, ApiError, ungdomsytelse.UngdomsytelseInntektsrapportering>({
        mutationFn: (data) => rapporterInntekt(data),
    });
};
