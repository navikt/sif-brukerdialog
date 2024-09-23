import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { k9BrukerdialogApiClient } from '../apiClient';
import { søkerResponseSchema } from '../schemas/søkerSchema';
import { Søker } from '../types';

export const fetchSøker = async (): Promise<Søker> => {
    const response = await k9BrukerdialogApiClient.get(`/oppslag/soker`);
    try {
        return søkerResponseSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

export const fetchSøkerId = async (): Promise<string> => {
    const søker = await fetchSøker();
    return søker.fødselsnummer;
};
