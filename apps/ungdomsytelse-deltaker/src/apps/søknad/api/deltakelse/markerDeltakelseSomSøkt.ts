import { handleApiError } from '@navikt/ung-common';
import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';

export const markerDeltakelseSomSøkt = async (deltakelseId: string): Promise<void> => {
    try {
        await DeltakerApi.Deltakelse.markerDeltakelseSomSøkt({ path: { id: deltakelseId }, headers: {} as any });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'markerDeltakelseSomSøkt');
    }
};
