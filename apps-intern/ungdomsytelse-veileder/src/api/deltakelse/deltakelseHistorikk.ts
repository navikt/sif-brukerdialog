import { DeltakelseHistorikkDto, Veileder } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { handleApiError } from '@sif/api';

/**
 * Henter historikk for en deltakelse
 * @param deltakerId deltaker-id
 * @returns {Promise<DeltakelseHistorikkDto>}
 * @throws {ApiError}
 */

export const getDeltakelseHistorikk = async (deltakelseId: string): Promise<DeltakelseHistorikkDto[]> => {
    try {
        const { data } = await Veileder.deltakelseHistorikk({ path: { deltakelseId } });
        return data;
    } catch (e) {
        throw handleApiError(e, 'getDeltakelseHistorikk');
    }
};
