import { fetchArbeidsgivere } from '@navikt/sif-common';
import { Arbeidsgiver, ArbeidsgiverType } from '../types/Arbeidsgiver';
import { DateRange } from '@navikt/sif-common-utils';

export const appArbeidsgivereService = {
    fetch: async (periode: DateRange): Promise<Arbeidsgiver[]> => {
        try {
            const data = await fetchArbeidsgivere(periode);
            const aaArbeidsgivere: Arbeidsgiver[] = [];

            (data.organisasjoner || []).forEach((a) => {
                aaArbeidsgivere.push({
                    type: ArbeidsgiverType.ORGANISASJON,
                    id: a.organisasjonsnummer,
                    organisasjonsnummer: a.organisasjonsnummer,
                    navn: a.navn || a.organisasjonsnummer,
                });
            });
            (data.privateArbeidsgivere || []).forEach((a) => {
                aaArbeidsgivere.push({
                    type: ArbeidsgiverType.PRIVATPERSON,
                    id: a.offentligIdent,
                    offentligIdent: a.offentligIdent,
                    navn: a.navn,
                    ansattFom: a.ansattFom ? a.ansattFom : undefined,
                    ansattTom: a.ansattTom ? a.ansattTom : undefined,
                });
            });
            (data.frilansoppdrag || []).forEach((a) => {
                aaArbeidsgivere.push({
                    type: ArbeidsgiverType.FRILANSOPPDRAG,
                    id: a.offentligIdent || a.organisasjonsnummer || 'ukjent',
                    organisasjonsnummer: a.organisasjonsnummer ? a.organisasjonsnummer : undefined,
                    offentligIdent: a.offentligIdent ? a.offentligIdent : undefined,
                    navn: a.navn || 'Frilansoppdrag',
                    ansattFom: a.ansattFom ? a.ansattFom : undefined,
                    ansattTom: a.ansattTom ? a.ansattTom : undefined,
                });
            });
            return Promise.resolve(aaArbeidsgivere);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
