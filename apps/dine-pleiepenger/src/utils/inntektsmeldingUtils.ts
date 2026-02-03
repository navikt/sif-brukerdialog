import { innsyn } from '@navikt/k9-sak-innsyn-api';
import dayjs from 'dayjs';

import { Inntektsmelding } from '../types';
import { EndringRefusjon } from '../types/inntektsmeldingTypes';

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

interface GetRefusjonEndringListeParams {
    refusjonBeløpPerMnd: number;
    refusjonOpphører?: Date;
    startDatoPermisjon: Date;
    endringerRefusjon: EndringRefusjon[];
}

export const getRefusjonEndringListe = ({
    refusjonBeløpPerMnd,
    refusjonOpphører,
    startDatoPermisjon,
    endringerRefusjon,
}: GetRefusjonEndringListeParams): EndringRefusjon[] => {
    const alleEndringer: EndringRefusjon[] = [];
    const førsteEndring = endringerRefusjon[0];

    // Legg til info om refusjon før første endring hvis første endring er etter startdato
    if (førsteEndring && dayjs(førsteEndring.fom).isAfter(startDatoPermisjon, 'day')) {
        alleEndringer.push({ fom: startDatoPermisjon, refusjonBeløpPerMnd });
    }

    alleEndringer.push(...endringerRefusjon);

    // Legg til info om opphør av refusjon som siste element hvis det finnes opphør av refusjon.
    // refusjonOpphører utledes fra siste endring i refusjon.
    if (refusjonOpphører) {
        alleEndringer.push({ fom: dayjs(refusjonOpphører).add(1, 'day').toDate(), refusjonBeløpPerMnd: 0 });
    }

    return alleEndringer;
};

export type ArbeidsgiverMedInntektsmeldinger = {
    arbeidsgiverId: string;
    arbeidsgiverNavn: string;
    inntektsmeldinger: Inntektsmelding[];
};

const getArbeidsgiverId = (arbeidsgiver: innsyn.ArbeidsgiverDto): string => {
    if (arbeidsgiver.organisasjon) {
        return arbeidsgiver.organisasjon.organisasjonsnummer;
    }
    if (arbeidsgiver.privat) {
        return arbeidsgiver.privat.fødselsnummer;
    }
    return 'ukjent';
};

/** Grupperer inntektsmeldinger på arbeidsgiver, og for hver arbeidsgiver grupperes på erstattet-av. Sortert på dato, nyeste først. */
export const grupperInntektsmeldingerPåArbeidsgiver = (
    inntektsmeldinger: Inntektsmelding[],
): ArbeidsgiverMedInntektsmeldinger[] => {
    // Grupper på arbeidsgiver
    const gruppertPåArbeidsgiver = inntektsmeldinger.reduce<Record<string, Inntektsmelding[]>>((acc, im) => {
        const arbeidsgiverId = getArbeidsgiverId(im.arbeidsgiver);
        if (!acc[arbeidsgiverId]) {
            acc[arbeidsgiverId] = [];
        }
        acc[arbeidsgiverId].push(im);
        return acc;
    }, {});

    // For hver arbeidsgiver, grupper på erstattet-av
    return Object.entries(gruppertPåArbeidsgiver).map(([arbeidsgiverId, ims]) => {
        return {
            arbeidsgiverId,
            arbeidsgiverNavn: getArbeidsgiverNavn(ims[0].arbeidsgiver),
            inntektsmeldinger: ims.sort(sorterInntektsmeldingerPåInnsendingstidspunkt),
        };
    });
};
