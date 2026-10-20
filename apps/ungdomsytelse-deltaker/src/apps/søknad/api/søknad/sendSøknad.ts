import { commonRequestHeaders, handleApiError } from '@sif/api';
import { ungdomsytelse } from '@sif/k9-brukerdialog-prosessering-api';

export const sendSøknad = async (data: ungdomsytelse.Ungdomsytelsesøknad): Promise<any> => {
    try {
        await ungdomsytelse.UngdomsytelseController.innsendingUngdomsytelsesøknad({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
