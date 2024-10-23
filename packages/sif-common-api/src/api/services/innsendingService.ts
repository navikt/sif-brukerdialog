import { k9BrukerdialogApiClient } from '../apiClient';
import { InnsendingType } from '../types';

export function getInnsendingService<ApiData>(innsendingType: InnsendingType) {
    return {
        send: async (apiData: ApiData) => {
            return await k9BrukerdialogApiClient.post(innsendingType, apiData);
        },
    };
}
