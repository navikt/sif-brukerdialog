import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { k9BrukerdialogApiClient } from '../apiClient';
import { barnResponseSchema } from '../schemas/barnSchema';
import { RegistrertBarn } from '../types';

export const fetchBarn = async (): Promise<RegistrertBarn[]> => {
    const response = await k9BrukerdialogApiClient.get(`/oppslag/barn`);
    try {
        const barn = barnResponseSchema.parse(response.data).barn;
        return barn;
    } catch (e) {
        getSentryLoggerForApp('sif-common-api', []).logError('ZOD parse error', e);
        throw e;
    }
};
