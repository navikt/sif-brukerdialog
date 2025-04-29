import { DeltakelsePeriode, deltakelsePerioderSchema } from '@navikt/ung-common';
import { handleApiError } from '@navikt/ung-common';
import { DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';

export const getAlleMineDeltakelser = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await DeltakelseService.hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getAlleMineDeltakelser');
    }
};
