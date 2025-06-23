import { DeltakelsePeriode, deltakelsePerioderSchema, handleApiError } from '@navikt/ung-common';
import { Deltakelse as DeltakelseService } from '@navikt/ung-deltakelse-opplyser-api';

export const getDeltakelsePerioder = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await DeltakelseService.hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getAlleMineDeltakelser');
    }
};
