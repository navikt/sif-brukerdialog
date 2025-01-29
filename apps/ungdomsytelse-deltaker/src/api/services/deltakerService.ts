import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { Deltakelser, PeriodeMedInntekt } from '../types';
import { SendSøknadApiData } from '../schemas/sendSøknadDto';

const getDeltakelser = async (): Promise<Deltakelser> => {
    const response = await ungDeltakelseOpplyserApiClient.get(`/deltakelse/register/hent/alle`);
    try {
        return deltakelserSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        return Promise.reject(e);
    }
};

const putMarkerHarSøkt = async (id: string): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.put(`/deltakelse/register/${id}/marker-har-sokt`);
};

const sendSøknad = async (deltakelseId: string, apiData: SendSøknadApiData): Promise<void> => {
    console.log(apiData);
    return putMarkerHarSøkt(deltakelseId);
    // avventer til backend er klar
    // return await ungDeltakelseOpplyserApiClient.post(`/deltakelse/register/${deltakelseId}/marker-har-sokt`, apiData);
};

const rapporterInntekt = async (periodeMedInntekt: PeriodeMedInntekt): Promise<void> => {
    return await ungDeltakelseOpplyserApiClient.post(
        `/deltakelse/register/registrer-inntekt-i-periode`,
        periodeMedInntekt,
    );
};

export const deltakerService = {
    getDeltakelser,
    putMarkerHarSøkt,
    rapporterInntekt,
    sendSøknad,
};
