import { k9BrukerdialogApiClient } from '@navikt/sif-common/src/api/apiClient';
import { SøknadApiData } from '../types';

export const sendSøknadService = async (data: SøknadApiData): Promise<any> => {
    return await k9BrukerdialogApiClient.post(`/ungomdsytelse/soknad/innsending`, data);
};
