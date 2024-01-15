import { getNMonthsAgo } from '../../søknad/steps/situasjon/SituasjonStepUtils';
import { Arbeidsgiver } from '../../types/Arbeidsgiver';
import api, { ApiEndpoint } from '../api';
import { dateToISODate, dateToday } from '@navikt/sif-common-utils/src/dateUtils';

type AAregArbeidsgiver = {
    organisasjoner?: {
        organisasjonsnummer: string;
        navn: string;
    }[];
};

const arbeidsgivereEndpoint = {
    fetch: async (): Promise<Arbeidsgiver[]> => {
        const threeMonthsAgo = getNMonthsAgo(3);
        const today: Date = dateToday;
        try {
            const { data } = await api.get<AAregArbeidsgiver>(
                ApiEndpoint.arbeidsgiver,
                `fra_og_med=${dateToISODate(threeMonthsAgo)}&til_og_med=${dateToISODate(today)}`,
            );
            const aaArbeidsgivere: Arbeidsgiver[] = [];
            (data.organisasjoner || []).forEach((a) => {
                aaArbeidsgivere.push({
                    organisasjonsnummer: a.organisasjonsnummer,
                    navn: a.navn,
                });
            });
            return Promise.resolve(aaArbeidsgivere);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default arbeidsgivereEndpoint;
