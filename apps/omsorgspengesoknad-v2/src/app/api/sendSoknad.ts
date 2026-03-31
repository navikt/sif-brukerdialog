import { AktivitetspengerController } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@sif/api';

import { SøknadApiData } from '../types/SoknadApiData';

export const sendSøknad = async (data: SøknadApiData): Promise<any> => {
    try {
        await AktivitetspengerController.innsendingAktivitetspengersøknad({
            body: data,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
