import { DeltakelsePeriode, deltakelsePerioderSchema, handleApiError } from '@navikt/ung-common';
import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';

export const getDeltakelsePerioder = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await DeltakerApi.Deltakelse.hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getAlleMineDeltakelser');
    }
};
