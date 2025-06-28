import { handleApiError } from '@navikt/ung-common';
import { Deltakelse } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const markerDeltakelseSomSøkt = async (deltakelseId: string): Promise<void> => {
    try {
        await Deltakelse.markerDeltakelseSomSøkt({ path: { id: deltakelseId }, headers: {} as any });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'markerDeltakelseSomSøkt');
    }
};
