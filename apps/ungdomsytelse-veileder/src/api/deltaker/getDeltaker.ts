import { handleApiError } from '@navikt/ung-common';
import { registrertDeltakerSchema } from '@navikt/ung-common/src/types';
import { Oppslag } from '@navikt/ung-deltakelse-opplyser-api-veileder';

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
