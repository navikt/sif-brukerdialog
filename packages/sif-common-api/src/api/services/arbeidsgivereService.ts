import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { dateToISODate } from '@navikt/sif-common-utils';
import { getK9BrukerdialogApiClient } from '../k9BrukerdialogApiClient';
import { arbeidsgivereResponseSchema } from '../schemas/arbeidsgivereSchema';
import { Arbeidsgivere } from '../types';

export const fetchArbeidsgivere = async ({ from, to }: { from: Date; to: Date }): Promise<Arbeidsgivere> => {
    const response = await getK9BrukerdialogApiClient().get(`/oppslag/arbeidsgiver`, {
        params: { fra_og_med: dateToISODate(from), til_og_med: dateToISODate(to) },
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
