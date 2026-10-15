import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeaders } from '@sif/api-client';

import { handleApiError } from '../../utils/errorHandlers';

export const rapporterInntektUngdomsytelse = async (
    data: ungdomsytelse.UngdomsytelseInntektsrapportering,
): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.inntektrapportering({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'rapporterInntektUngdomsytelse');
    }
};
