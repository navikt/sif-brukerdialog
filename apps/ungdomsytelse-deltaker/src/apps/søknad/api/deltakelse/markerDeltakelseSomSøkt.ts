import { commonRequestHeaders, handleApiError } from '@sif/api';
import { Deltakelse } from '@sif/ung-deltakelse-opplyser-api-deltaker';

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
