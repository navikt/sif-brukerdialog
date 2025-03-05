import { DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';
import { DeltakelsePeriode, deltakelsePerioderSchema } from '../types/DeltakelsePeriode';
import { handleError } from '../utils/errorHandlers';
import { k9BrukerdialogApiClient } from '@navikt/sif-common-api';
import { RapporterInntektDTO } from '../types/dto/RapporterinntektDTO';
import { UngdomsytelseControllerService, Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';

/**
 * Påkrevde headers settes andre steder, dette er bare en mock for å tilfredstille typescript
 *  */

const k9RequestHeader = {} as any;

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

const sendSøknad = async (data: Ungdomsytelsesøknad): Promise<any> => {
    try {
        await UngdomsytelseControllerService.innsending({ body: data, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleError(e);
    }

    // return await k9BrukerdialogApiClient.post(`/ungdomsytelse/soknad/innsending`, data);
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
