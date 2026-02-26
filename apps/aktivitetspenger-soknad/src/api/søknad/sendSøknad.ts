import { handleApiError } from '@navikt/sif-common-query';

import { SøknadApiData } from '../../søknad/types/SøknadApiData';

export const sendSøknad = async (data: SøknadApiData): Promise<any> => {
    try {
        // eslint-disable-next-line no-console
        console.log(data);
        await Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
