import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@navikt/ung-common';

export const rapporterInntekt = async (data: ungdomsytelse.UngdomsytelseInntektsrapportering): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.inntektrapportering({ body: data, headers: commonRequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'rapporterInntekt');
    }
};
