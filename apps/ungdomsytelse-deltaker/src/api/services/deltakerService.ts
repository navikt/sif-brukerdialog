import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { Deltakelser, InntektsrapporteringDTO, SøknadApiData } from '../types';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';
import { k9BrukerdialogApiClient } from '@navikt/sif-common-api/src/api/apiClient';

export const deltakerService = {
    getDeltakelser: async (): Promise<Deltakelser> => {
        const response = await ungDeltakelseOpplyserApiClient.get(`/deltakelse/register/hent/alle`);
        try {
            return deltakelserSchema.parse(response.data);
        } catch (e) {
            getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
            return Promise.reject(e);
        }
    },

    putMarkerHarSøkt: async (id: string): Promise<void> => {
        return await ungDeltakelseOpplyserApiClient.put(`/deltakelse/register/${id}/marker-har-sokt`);
    },

    sendSøknad: async (data: SøknadApiData): Promise<any> => {
        const isValid = await søknadApiDataSchema.parse(data);
        if (isValid) {
            return await k9BrukerdialogApiClient.post(`/ungdomsytelse/soknad/innsending`, data);
        }
        return Promise.reject('Invalid data');
    },

    rapporterInntekt: async (periodeMedInntekt: InntektsrapporteringDTO): Promise<void> => {
        return await k9BrukerdialogApiClient.post(`/ungdomsytelse/inntektsrapportering/innsending`, periodeMedInntekt);
    },
};
