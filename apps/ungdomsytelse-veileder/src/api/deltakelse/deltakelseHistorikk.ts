import { handleApiError } from '@navikt/ung-common';
import { DeltakelseHistorikkDto, VeilederService } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Henter historikk for en deltakelse
 * @param deltakerId deltaker-id
 * @returns {Promise<DeltakelseHistorikkDto>}
 * @throws {ApiError}
 */

export const getDeltakelseHistorikk = async (deltakelseId: string): Promise<DeltakelseHistorikkDto[]> => {
    try {
        const { data } = await VeilederService.deltakelseHistorikk({ path: { deltakelseId } });
        return data;
    } catch (e) {
        throw handleApiError(e, 'getDeltakelseHistorikk');
    }
};
