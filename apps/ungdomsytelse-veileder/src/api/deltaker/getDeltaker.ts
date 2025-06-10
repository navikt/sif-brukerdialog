import { handleApiError } from '@navikt/ung-common';
import { Oppslag as OppslagService } from '@navikt/ung-deltakelse-opplyser-api';
import { registrertDeltakerSchema } from '@navikt/ung-common/src/types';

export const getDeltakerById = async (deltakerId: string) => {
    try {
        const { data } = await OppslagService.hentDeltakerInfoGittDeltakerId({
            path: { id: deltakerId },
        });
        return registrertDeltakerSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakerById');
    }
};
