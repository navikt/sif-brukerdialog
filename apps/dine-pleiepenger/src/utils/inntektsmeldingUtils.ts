import { innsyn } from '@navikt/k9-sak-innsyn-api';

import { Inntektsmelding } from '../types';

const getArbeidsgiverNavn = (arbeidsgiver: innsyn.ArbeidsgiverDto): string => {
    if (arbeidsgiver.organisasjon) {
        return arbeidsgiver.organisasjon.navn || arbeidsgiver.organisasjon.organisasjonsnummer;
    }
    if (arbeidsgiver.privat) {
        return `${arbeidsgiver.privat.navn || 'Privat arbeidsgiver'}`;
    }
    return 'Arbeidsgiver hverken privatperson eller organisasjon';
};

export const getImUtils = (innteksmelding: Inntektsmelding) => {
    return {
        arbeidsgiverNavn: getArbeidsgiverNavn(innteksmelding.arbeidsgiver),
    };
};

export const sorterInntektsmeldingerPåInnsendingstidspunkt = (a: Inntektsmelding, b: Inntektsmelding): number => {
    return new Date(b.innsendingstidspunkt).getTime() - new Date(a.innsendingstidspunkt).getTime();
};
