import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { dateToISODate } from '@navikt/sif-common-utils';
import { k9BrukerdialogApiClient } from '../apiClient';
import { arbeidsgivereResponseSchema } from '../schemas/arbeidsgivereSchema';
import { Arbeidsgivere } from '../types';

export const fetchArbeidsgivere = async ({ from, to }: { from: Date; to: Date }): Promise<Arbeidsgivere> => {
    const response = await k9BrukerdialogApiClient.get(`/oppslag/arbeidsgiver`, {
        params: { fra_og_med: dateToISODate(from), til_og_med: dateToISODate(to) },
    });
    try {
        return arbeidsgivereResponseSchema.parse(response.data);
    } catch (e) {
        getSentryLoggerForApp('sif-common', []).logError('ZOD parse error', e);
        return {
            organisasjoner: [],
            privatarbeidsgiver: [],
            frilansoppdrag: [],
        };
    }
};
