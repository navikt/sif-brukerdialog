import { commonRequestHeaders, handleApiError } from '@sif/api';
import { omsorgspengerAleneomsorg } from '@sif/k9-brukerdialog-prosessering-api';

import { SøknadApiData } from '../types/SoknadApiData';

export const sendSoknad = async (data: SøknadApiData): Promise<void> => {
    try {
        await omsorgspengerAleneomsorg.OmsorgsdagerAleneomsorgController.innsendingOmsorgsdagerAleneOmOmsorgenSøknad({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (error) {
        throw handleApiError(error, 'sendSoknad');
    }
};
