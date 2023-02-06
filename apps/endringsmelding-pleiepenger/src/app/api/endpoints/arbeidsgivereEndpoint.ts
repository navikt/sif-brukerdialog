import { DateRange, dateToISODate, ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types/Arbeidsgiver';
import api from '../api';
import { ApiEndpointPsb } from './';

type AAregArbeidsgiver = {
    organisasjoner?: {
        organisasjonsnummer: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }[];
};

export const arbeidsgivereEndpoint = {
    fetch: async (periode: DateRange): Promise<Arbeidsgiver[]> => {
        try {
            const { from, to } = periode;
            const { data } = await api.psb.get<AAregArbeidsgiver>(
                ApiEndpointPsb.arbeidsgiver,
                `ytelse=endringsmelding-pleiepenger&fra_og_med=${dateToISODate(from)}&til_og_med=${dateToISODate(to)}`
            );
            const aaArbeidsgivere: Arbeidsgiver[] = [];
            (data.organisasjoner || []).forEach((a) => {
                aaArbeidsgivere.push({
                    organisasjonsnummer: a.organisasjonsnummer,
                    type: ArbeidsgiverType.ORGANISASJON,
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
