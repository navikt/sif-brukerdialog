/* eslint-disable no-console */
import { dateToISODate } from '@navikt/sif-common-utils';
import { k9BrukerdialogApiClient } from '../apiClient';
import { Arbeidsgivere } from '../types';
import { arbeidsgivereResponseSchema } from '../schemas/arbeidsgivereSchema';

export const fetchArbeidsgivere = async ({ from, to }: { from: Date; to: Date }): Promise<Arbeidsgivere> => {
    try {
        const response = await k9BrukerdialogApiClient.get(`/oppslag/arbeidsgiver`, {
            params: { fra_og_med: dateToISODate(from), til_og_med: dateToISODate(to) },
        });
        return arbeidsgivereResponseSchema.parse(response.data);
    } catch (e) {
        console.error('Failed to fetch arbeidsgivere', e);
        return {
            organisasjoner: [],
            privatarbeidsgiver: [],
            frilansoppdrag: [],
        };
    }
};
