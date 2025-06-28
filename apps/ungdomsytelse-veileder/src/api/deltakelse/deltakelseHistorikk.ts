import { handleApiError } from '@navikt/ung-common';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

/**
 * Henter historikk for en deltakelse
 * @param deltakerId deltaker-id
 * @returns {Promise<DeltakelseHistorikkDto>}
 * @throws {ApiError}
 */

export const getDeltakelseHistorikk = async (deltakelseId: string): Promise<VeilederApi.DeltakelseHistorikkDto[]> => {
    try {
        const { data } = await VeilederApi.Veileder.deltakelseHistorikk({ path: { deltakelseId } });
        return data;
    } catch (e) {
        throw handleApiError(e, 'getDeltakelseHistorikk');
    }
};
