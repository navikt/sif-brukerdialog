import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../utils/errorHandlers';
import { commonRequestHeader } from '../utils/initApiClient';

export const rapporterInntekt = async (data: ungdomsytelse.UngdomsytelseInntektsrapportering): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.inntektrapportering({ body: data, headers: commonRequestHeader });
    } catch (e) {
        throw handleApiError(e, 'rapporterInntekt');
    }
};
