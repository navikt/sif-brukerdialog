import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserResponseSchema } from '../schemas/deltakelserSchema';
import { Deltakelse } from '../types';

const getDeltakelser = async (deltakerIdent: string): Promise<Deltakelse[]> => {
    const response = await ungDeltakelseOpplyserApiClient.post(`/deltakelse/register/hent/alle`, { deltakerIdent });
    try {
        const deltakelse = deltakelserResponseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const markerSomSøkt = async (deltakelseId: string): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.put(`/deltakelse/register/${deltakelseId}/marker-har-sokt`);
};

export const deltakerService = {
    getDeltakelser,
    markerSomSøkt,
};
