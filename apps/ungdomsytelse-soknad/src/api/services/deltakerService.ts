import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserResponseSchema } from '../schemas/deltakelserSchema';
import { Deltakelse, PeriodeMedInntekt } from '../types';

const getDeltakelser = async (): Promise<Deltakelse[]> => {
    const response = await ungDeltakelseOpplyserApiClient.get(`/deltakelse/register/hent/alle`);
    try {
        const deltakelse = deltakelserResponseSchema.parse(response.data);
        return deltakelse;
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        throw e;
    }
};

const putMarkerHarSøkt = async (deltakelseId: string): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.put(`/deltakelse/register/${deltakelseId}/marker-har-sokt`);
};

const rapporterInntekt = async (deltakelseId: string, periodeMedInntekt: PeriodeMedInntekt): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.post(
        `/deltakelse/register/${deltakelseId}/periode-med-inntekt`,
        periodeMedInntekt,
    );
};

export const deltakerService = {
    getDeltakelser,
    putMarkerHarSøkt,
    rapporterInntekt,
};
