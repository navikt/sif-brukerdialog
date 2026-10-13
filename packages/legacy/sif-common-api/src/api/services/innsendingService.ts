import { k9BrukerdialogApiClient } from '../apiClient';
import { InnsendingType } from '../types';

const getBackendRouteForInnsendingType = (innsendingType: InnsendingType) => {
    switch (innsendingType) {
        case InnsendingType.omsorgspenger_utbetaling_arbeidstaker:
            return 'omsorgspenger-utbetaling-arbeidstaker/innsending';
        case InnsendingType.omsorgspenger_utbetaling_snf:
            return 'omsorgspenger-utbetaling-snf/innsending';
        case InnsendingType.opplaringspenger:
            return 'opplaringspenger/innsending';
        case InnsendingType.pleiepenger_i_livets_sluttfase:
            return 'pleiepenger-livets-sluttfase/innsending';
    }
};

export function getInnsendingService<ApiData>(innsendingType: InnsendingType) {
    const backendRoute = getBackendRouteForInnsendingType(innsendingType);
    if (!backendRoute) {
        throw new Error(`InnsendingType ${innsendingType} is not supported`);
    }
    return {
        send: async (apiData: ApiData) => {
            return await k9BrukerdialogApiClient.post(backendRoute, apiData);
        },
    };
}
