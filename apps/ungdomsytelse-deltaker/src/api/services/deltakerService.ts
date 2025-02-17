import { k9BrukerdialogApiClient } from '@navikt/sif-common-api/src/api/apiClient';
import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { ungDeltakelseOpplyserApiClient } from '../apiClient';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { søknadApiDataSchema } from '../schemas/søknadApiDataSchema';
import { Deltakelser, InntektsrapporteringDTO, SøknadApiData } from '../types';
import { polyfillManglendeBackendLogikk } from '../utils/apiPolyfillUtils';

export const deltakerService = {
    getDeltakelser: async (): Promise<Deltakelser> => {
        const response = await ungDeltakelseOpplyserApiClient.get(`/deltakelse/register/hent/alle`);
        try {
            const deltakelser = deltakelserSchema.parse(response.data);
            console.log(deltakelser);
            return polyfillManglendeBackendLogikk(deltakelser);
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
