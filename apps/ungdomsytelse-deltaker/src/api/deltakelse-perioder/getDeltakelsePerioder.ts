import { Deltakelse } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { handleApiError } from '@sif/api';

import { logApiErrorFaro } from '../../apps/innsyn/utils/apiErrorLogger';
import { DeltakelsePeriode, deltakelsePerioderSchema } from '../../types/DeltakelsePeriode';

export const getDeltakelsePerioder = async (): Promise<DeltakelsePeriode[]> => {
    try {
        const { data } = await Deltakelse.hentAlleMineDeltakelserV2();
        return deltakelsePerioderSchema.parse(data);
    } catch (e) {
        const parsedApiError = handleApiError(e, 'getDeltakelsePerioder');
        logApiErrorFaro('getDeltakelsePerioder', parsedApiError);
        throw parsedApiError;
    }
};
