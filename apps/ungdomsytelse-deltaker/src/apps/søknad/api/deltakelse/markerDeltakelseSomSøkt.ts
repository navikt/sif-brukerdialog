import { Deltakelse } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { commonRequestHeader, handleApiError } from '@sif/api';

export const markerDeltakelseSomSøkt = async (deltakelseId: string): Promise<void> => {
    try {
        await Deltakelse.markerDeltakelseSomSøkt({ path: { id: deltakelseId }, headers: commonRequestHeader });
    } catch (e) {
        throw handleApiError(e, 'markerDeltakelseSomSøkt');
    }
};
