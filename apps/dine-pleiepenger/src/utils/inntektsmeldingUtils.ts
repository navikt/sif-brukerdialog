import { ArbeidsgiverDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';

import { Inntektsmelding } from '../types/Inntektsmelding';

const getArbeidsgiverNavn = (arbeidsgiver: ArbeidsgiverDto): string => {
    if (arbeidsgiver.organisasjon) {
        return arbeidsgiver.organisasjon.navn || arbeidsgiver.organisasjon.organisasjonsnummer;
    }
    if (arbeidsgiver.privat) {
        return `${arbeidsgiver.privat.navn || 'Privat arbeidsgiver'} `;
    }
    return 'Arbeidsgiver hverken privatperson eller organisasjon';
};

export const innntektsmeldingUtils = {
    getArbeidsgiverNavn,
};

export const getImUtils = (innteksmelding: Inntektsmelding) => {
    return {
        arbeidsgiverNavn: getArbeidsgiverNavn(innteksmelding.arbeidsgiver),
    };
};
