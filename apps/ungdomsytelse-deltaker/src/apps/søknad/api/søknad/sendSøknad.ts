import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@sif/api';

export const sendSøknad = async (data: ungdomsytelse.Ungdomsytelsesøknad): Promise<any> => {
    try {
        await ungdomsytelse.UngdomsytelseController.innsendingUngdomsytelsesøknad({
            body: data,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
