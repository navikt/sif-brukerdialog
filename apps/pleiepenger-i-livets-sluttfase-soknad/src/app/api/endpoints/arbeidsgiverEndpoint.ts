import { Arbeidsgiver, ArbeidsgiverType } from '../../types/Arbeidsgiver';
import api, { ApiEndpoint } from '../api';
import { DateRange, ISODate, ISODateToDate, dateToISODate } from '@navikt/sif-common-utils';

export type AAregArbeidsgiver = {
    organisasjoner?: Array<{
        organisasjonsnummer: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
    privatarbeidsgiver?: Array<{
        offentligIdent: string;
        navn: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
    frilansoppdrag?: Array<{
        type: string;
        organisasjonsnummer?: string;
        offentligIdent?: string;
        navn?: string;
        ansattFom?: ISODate;
        ansattTom?: ISODate;
    }>;
};
export const arbeidsgivereEndpoint = {
    fetch: async (periode: DateRange): Promise<Arbeidsgiver[]> => {
        try {
            const { from, to } = periode;
            const { data } = await api.get<AAregArbeidsgiver>(
                ApiEndpoint.arbeidsgiver,
                `fra_og_med=${dateToISODate(from)}&til_og_med=${dateToISODate(to)}`,
            );
            const aaArbeidsgivere: Arbeidsgiver[] = [];

            (data.organisasjoner || []).forEach((a) => {
                aaArbeidsgivere.push({
                    type: ArbeidsgiverType.ORGANISASJON,
                    id: a.organisasjonsnummer,
                    organisasjonsnummer: a.organisasjonsnummer,
                    navn: a.navn || a.organisasjonsnummer,
                });
            });
            (data.privatarbeidsgiver || []).forEach((a) => {
                aaArbeidsgivere.push({
                    type: ArbeidsgiverType.PRIVATPERSON,
                    id: a.offentligIdent,
                    offentligIdent: a.offentligIdent,
                    navn: a.navn,
                    ansattFom: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
                    ansattTom: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
                });
            });
            (data.frilansoppdrag || []).forEach((a) => {
                aaArbeidsgivere.push({
                    type: ArbeidsgiverType.FRILANSOPPDRAG,
                    id: a.offentligIdent || a.organisasjonsnummer || 'ukjent',
                    organisasjonsnummer: a.organisasjonsnummer,
                    offentligIdent: a.offentligIdent,
                    navn: a.navn || 'Frilansoppdrag',
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
