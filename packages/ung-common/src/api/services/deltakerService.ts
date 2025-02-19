import { k9BrukerdialogApiClient } from '@navikt/sif-common-api/src/api/apiClient';
import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { Deltakelser, deltakelserSchema } from '../../types/Deltakelser';
import { RapporterInntektDTO } from '../../types/dto/RapporterInntektDTO';
import { SendSøknadDTO } from '../../types/dto/SendSøknadDTO';
import { ungDeltakelseOpplyserApiClient } from '../deltakelseOpplyserClient';
import { polyfillManglendeBackendLogikk } from '../utils/apiPolyfillUtils';

export const deltakerService = {
    fetchDeltakelser: async (): Promise<Deltakelser> => {
        const response = await ungDeltakelseOpplyserApiClient.get(`/deltakelse/register/hent/alle`);
        try {
            const deltakelser = deltakelserSchema.parse(response.data);
            return polyfillManglendeBackendLogikk(deltakelser);
        } catch (e) {
            getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
            return Promise.reject(e);
        }
    },

    markerDeltakelseSøkt: async (id: string): Promise<void> => {
        return await ungDeltakelseOpplyserApiClient.put(`/deltakelse/register/${id}/marker-har-sokt`);
    },

    sendSøknad: async (data: SendSøknadDTO): Promise<any> => {
        return await k9BrukerdialogApiClient.post(`/ungdomsytelse/soknad/innsending`, data);
    },

    rapporterInntekt: async (data: RapporterInntektDTO): Promise<void> => {
        return await k9BrukerdialogApiClient.post(`/ungdomsytelse/inntektsrapportering/innsending`, data);
    },
};
