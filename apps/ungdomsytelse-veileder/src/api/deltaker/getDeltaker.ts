import { handleApiError } from '@navikt/ung-common';
import { registrertDeltakerSchema } from '@navikt/ung-common/src/types';
import { VeilederApi } from '@navikt/ung-deltakelse-opplyser-api';

export const getDeltakerById = async (deltakerId: string) => {
    try {
        const { data } = await VeilederApi.Oppslag.hentDeltakerInfoGittDeltakerId({
            path: { id: deltakerId },
        });
        return registrertDeltakerSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakerById');
    }
};
