import { DateRange, dateToISODate, ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '@types';
import api from '../api';
import { ApiEndpointPsb } from './';
import { getArbeidsgiverKey } from '../../utils/arbeidsgiverUtils';

type AAregArbeidsgiver = {
    organisasjoner?: Array<{
        organisasjonsnummer: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
};

export const arbeidsgivereEndpoint = {
    fetch: async (periode: DateRange): Promise<Arbeidsgiver[]> => {
        try {
            const { from, to } = periode;
            const { data } = await api.psb.get<AAregArbeidsgiver>(
                ApiEndpointPsb.arbeidsgiver,
                `ytelse=endringsmelding-pleiepenger&fra_og_med=${dateToISODate(from)}&til_og_med=${dateToISODate(to)}`,
            );
            const aaArbeidsgivere: Arbeidsgiver[] = [];
            (data.organisasjoner || []).forEach((a) => {
                aaArbeidsgivere.push({
                    key: getArbeidsgiverKey(a.organisasjonsnummer),
                    organisasjonsnummer: a.organisasjonsnummer,
                    navn: a.navn,
                    ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
                    ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
                });
            });
            return Promise.resolve(aaArbeidsgivere);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
