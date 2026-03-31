import { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@sif/api';

import { SøknadApiData } from '../types/SoknadApiData';

export const sendSøknad = async (data: SøknadApiData): Promise<void> => {
    try {
        await omsorgspenger.OmsorgspengerUtvidetRettController.innsendingOmsorgspengerKroniskSyktBarnSøknad({
            body: data,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
