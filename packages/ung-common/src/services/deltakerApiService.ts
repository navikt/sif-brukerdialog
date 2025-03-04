import { DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';
import { DeltakelsePeriode, deltakelsePerioderSchema } from '../types/DeltakelsePeriode';
import { handleError } from '../utils/errorHandlers';
import { k9BrukerdialogApiClient } from '@navikt/sif-common-api';
import { SendSøknadDTO } from '../types/dto/SendSøknadDTO';
import { RapporterInntektDTO } from '../types/dto/RapporterinntektDTO';

/**
 * Henter alle deltakelser til innlogget bruker
 * @returns {Promise<DeltakelsePeriode[]>}
 * @throws {ApiErrorObject}
 */
const getAlleMineDeltakelser = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await DeltakelseService.hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

const markerDeltakelseSomSøkt = async (id: string): Promise<void> => {
    try {
        await DeltakelseService.markerDeltakelseSomSøkt({ path: { id } });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }
};

const sendSøknad = async (data: SendSøknadDTO): Promise<any> => {
    return await k9BrukerdialogApiClient.post(`/ungdomsytelse/soknad/innsending`, data);
};

const rapporterInntekt = async (data: RapporterInntektDTO): Promise<void> => {
    return await k9BrukerdialogApiClient.post(`/ungdomsytelse/inntektsrapportering/innsending`, data);
};

export const deltakerApiService = {
    getAlleMineDeltakelser,
    sendSøknad,
    markerDeltakelseSomSøkt,
    rapporterInntekt,
};
