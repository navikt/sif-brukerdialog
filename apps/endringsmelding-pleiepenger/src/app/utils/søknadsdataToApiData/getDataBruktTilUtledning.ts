import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { durationToISODuration } from '@navikt/sif-common-utils/lib';
import {
    ArbeiderIPeriodenSvar,
    Arbeidsforhold,
    Arbeidsgiver,
    ArbeidstidSøknadsdata,
    DataBruktTilUtledningApiData,
    UkjentArbeidsforholdApiData,
    UkjentArbeidsforholdSøknadsdata,
    ValgteEndringer,
} from '@types';
import { getOrgNummerFromArbeidsgiverKey } from '../arbeidsgiverUtils';

export const getDataBruktTilUtledningApiData = (
    valgteEndringer: ValgteEndringer,
    ukjentArbeidsforhold: UkjentArbeidsforholdSøknadsdata | undefined,
    arbeidstid: ArbeidstidSøknadsdata | undefined,
    arbeidsgivere: Arbeidsgiver[]
): DataBruktTilUtledningApiData => {
    return {
        soknadDialogCommitSha: getCommitShaFromEnv() || '',
        valgteEndringer,
        ukjenteArbeidsforhold: getUkjentArbeidsforholdApiDataFromSøknadsdata(
            ukjentArbeidsforhold?.arbeidsforhold,
            arbeidstid,
            arbeidsgivere
        ),
    };
};

export const mapArbeidsforholdToArbeidsforholdApiData = (
    arbeidsforhold: Arbeidsforhold,
    arbeidsgiver: Arbeidsgiver,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar
): UkjentArbeidsforholdApiData => {
    const organisasjonsnummer = getOrgNummerFromArbeidsgiverKey(arbeidsforhold.arbeidsgiverKey);
    if (arbeidsforhold.erAnsatt) {
        if (!arbeiderIPerioden) {
            throw 'mapArbeidsforholdToArbeidsforholdApiData: arbeiderIPerioden er ikke besvart ukjent arbeidsforhold hvor en er ansatt';
        }
        return {
            organisasjonsnummer,
            organisasjonsnavn: arbeidsgiver.navn,
            erAnsatt: true,
            arbeiderIPerioden,
            normalarbeidstid: {
                timerPerUke: durationToISODuration(arbeidsforhold.normalarbeidstid.timerPerUke),
            },
        };
    }
    return {
        organisasjonsnummer,
        organisasjonsnavn: arbeidsgiver.navn,
        erAnsatt: false,
    };
};

export const getUkjentArbeidsforholdApiDataFromSøknadsdata = (
    ukjenteArbeidsforhold: Arbeidsforhold[] | undefined,
    arbeidstid: ArbeidstidSøknadsdata | undefined,
    arbeidsgivere: Arbeidsgiver[]
): UkjentArbeidsforholdApiData[] => {
    if (ukjenteArbeidsforhold === undefined) {
        return [];
    }
    return ukjenteArbeidsforhold.map((arbeidsforhold): UkjentArbeidsforholdApiData => {
        const arbeiderIPerioden = arbeidstid
            ? arbeidstid.arbeidsaktivitet[arbeidsforhold.arbeidsgiverKey]?.arbeiderIPerioden
            : undefined;
        const arbeidsgiver = arbeidsgivere.find((a) => a.key === arbeidsforhold.arbeidsgiverKey);
        if (!arbeidsgiver) {
            throw 'Arbeidsgiver ikke funnet for arbeidsforhold';
        }
        return mapArbeidsforholdToArbeidsforholdApiData(arbeidsforhold, arbeidsgiver, arbeiderIPerioden);
    });
};
