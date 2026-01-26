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

export const getRefusjonFørFørsteEndring = (
    refusjonBeløpPerMnd: number,
    startDatoPermisjon: Date,
    førsteEndring: EndringRefusjon,
): EndringRefusjon | undefined => {
    if (førsteEndring && dayjs(førsteEndring.fom).isAfter(startDatoPermisjon, 'day')) {
        return {
            fom: startDatoPermisjon,
            refusjonBeløpPerMnd: refusjonBeløpPerMnd,
        };
    }
    return undefined;
};

export type InntektsmeldingMedErstatter = Inntektsmelding & {
    erstatter: Inntektsmelding[];
};

export type ArbeidsgiverMedInntektsmeldinger = {
    arbeidsgiverId: string;
    arbeidsgiverNavn: string;
    inntektsmeldinger: InntektsmeldingMedErstatter[];
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
        const ikkeErstattede = ims
            .filter((im) => im.erstattetAv.length === 0)
            .sort(sorterInntektsmeldingerPåInnsendingstidspunkt);

        return {
            arbeidsgiverId,
            arbeidsgiverNavn: getArbeidsgiverNavn(ims[0].arbeidsgiver),
            inntektsmeldinger: ikkeErstattede.map((im) => ({
                ...im,
                erstatter: ims
                    .filter((i) => i.erstattetAv.includes(im.journalpostId))
                    .sort(sorterInntektsmeldingerPåInnsendingstidspunkt),
            })),
        };
    });
};
