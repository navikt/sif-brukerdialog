import { hentAlleMineDeltakelser } from '@navikt/ung-deltakelse-opplyser-api';
import { DeltakelsePeriode, deltakelsePerioderSchema } from '../types/DeltakelsePeriode';
import { handleError } from '../utils/errorHandlers';

/**
 * Henter alle deltakelser til innlogget bruker
 * @returns {Promise<DeltakelsePeriode[]>}
 * @throws {ApiErrorObject}
 */
const getAlleMineDeltakelser = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleError(e);
    }
};

export const deltakerApiService = {
    getAlleMineDeltakelser,
};
