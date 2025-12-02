import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';

import { k9BrukerdialogApiClient } from '../apiClient';
import { arbeidsgivereResponseSchema } from '../schemas/arbeidsgivereSchema';
import { Arbeidsgivere } from '../types';

interface FetchArbeidsgivereParams {
    periode: DateRange;
    frilansoppdrag?: boolean;
}
export const fetchArbeidsgivere = async ({
    periode: { from, to },
    frilansoppdrag = true,
}: FetchArbeidsgivereParams): Promise<Arbeidsgivere> => {
    const response = await k9BrukerdialogApiClient.get(`/oppslag/arbeidsgiver`, {
        params: { fra_og_med: dateToISODate(from), til_og_med: dateToISODate(to), frilansoppdrag },
    });
    try {
        return arbeidsgivereResponseSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common-api', []).logError('ZOD parse error', e);
        return {
            organisasjoner: [],
            privateArbeidsgivere: [],
            frilansoppdrag: [],
        };
    }
};
