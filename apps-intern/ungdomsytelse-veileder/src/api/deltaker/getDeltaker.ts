import { Oppslag } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { handleApiError } from '@sif/api';

import { registrertDeltakerSchema } from '../../types/Deltaker';

export const getDeltakerById = async (deltakerId: string) => {
    try {
        const { data } = await Oppslag.hentDeltakerInfoGittDeltakerId({
            path: { id: deltakerId },
        });
        return registrertDeltakerSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakerById');
    }
};
