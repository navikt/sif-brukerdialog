import { handleApiError } from '@navikt/ung-common';
import { Deltakelse as DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';

export const markerDeltakelseSomSøkt = async (deltakelseId: string): Promise<void> => {
    try {
        await DeltakelseService.markerDeltakelseSomSøkt({ path: { id: deltakelseId }, headers: {} as any });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'markerDeltakelseSomSøkt');
    }
};
