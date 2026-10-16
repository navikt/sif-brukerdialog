import { omsorgspenger } from '@sif/k9-brukerdialog-prosessering-api';
import { commonRequestHeaders, handleApiError } from '@sif/api';

import { SøknadApiData } from '../types/SoknadApiData';

export const sendSøknad = async (data: SøknadApiData): Promise<void> => {
    try {
        await omsorgspenger.OmsorgspengerUtvidetRettController.innsendingOmsorgspengerKroniskSyktBarnSøknad({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
