import { Deltakelse } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { commonRequestHeaders, handleApiError } from '@sif/api';

export const markerDeltakelseSomSøkt = async (deltakelseId: string): Promise<void> => {
    try {
        await Deltakelse.markerDeltakelseSomSøktV2({
            path: { id: deltakelseId },
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'markerDeltakelseSomSøkt');
    }
};
