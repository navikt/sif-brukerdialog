import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';

import { k9BrukerdialogApiClient } from '../apiClient';
import { arbeidsgivereResponseSchema } from '../schemas/arbeidsgivereSchema';
import { Arbeidsgivere } from '../types';

export interface FetchArbeidsgivereParams {
    periode: DateRange;
    frilansoppdrag?: boolean;
}
export const fetchArbeidsgivere = async ({
    periode: { from, to },
    frilansoppdrag = true,
}: FetchArbeidsgivereParams): Promise<Arbeidsgivere> => {
    let response;
    try {
        response = await k9BrukerdialogApiClient.get(`/oppslag/arbeidsgiver`, {
            params: { fra_og_med: dateToISODate(from), til_og_med: dateToISODate(to), frilansoppdrag },
        });
    } catch (e) {
        getSentryLoggerForApp('sif-common-api', []).logError('fetchArbeidsgivere network error', e);
        throw e;
    }
    try {
        return arbeidsgivereResponseSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common-api', []).logError('fetchArbeidsgivere ZOD parse error', e);
        return {
            organisasjoner: [],
            privateArbeidsgivere: [],
            frilansoppdrag: [],
        };
    }
};
