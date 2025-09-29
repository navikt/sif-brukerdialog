import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@navikt/ung-common';

export const sendSøknad = async (data: ungdomsytelse.Ungdomsytelsesøknad): Promise<any> => {
    try {
        await ungdomsytelse.UngdomsytelseController.innsendingUngdomsytelsesøknad({
            body: data,
            headers: commonRequestHeader,
        });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
