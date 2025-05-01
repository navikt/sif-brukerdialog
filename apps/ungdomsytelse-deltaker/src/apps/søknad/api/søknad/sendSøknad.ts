import { UngdomsytelseControllerService, Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { handleApiError } from '@navikt/ung-common';

export const sendSøknad = async (data: Ungdomsytelsesøknad): Promise<any> => {
    try {
        await UngdomsytelseControllerService.innsendingUngdomsytelsesøknad({ body: data, headers: {} as any });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
