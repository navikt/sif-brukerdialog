import { handleApiError } from '@navikt/ung-common';
import { Deltakelse } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { DeltakelsePeriode, deltakelsePerioderSchema } from '../../types/DeltakelsePeriode';

export const getDeltakelsePerioder = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await Deltakelse.hentAlleMineDeltakelser();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getAlleMineDeltakelser');
    }
};
