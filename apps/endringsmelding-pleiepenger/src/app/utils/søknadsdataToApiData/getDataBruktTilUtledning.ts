import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { durationToISODuration } from '@navikt/sif-common-utils/lib';
import {
    ArbeiderIPeriodenSvar,
    Arbeidsforhold,
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
    arbeidstid: ArbeidstidSøknadsdata | undefined
): DataBruktTilUtledningApiData => {
    return {
        soknadDialogCommitSha: getCommitShaFromEnv() || '',
        valgteEndringer,
        ukjentArbeidsforhold: getUkjentArbeidsforholdApiDataFromSøknadsdata(
            ukjentArbeidsforhold?.arbeidsforhold,
            arbeidstid
        ),
    };
};

export const mapArbeidsforholdToArbeidsforholdApiData = (
    arbeidsforhold: Arbeidsforhold,
    arbeiderIPerioden?: ArbeiderIPeriodenSvar
): UkjentArbeidsforholdApiData => {
    const organisasjonsnummer = getOrgNummerFromArbeidsgiverKey(arbeidsforhold.arbeidsgiverKey);
    if (arbeidsforhold.erAnsatt) {
        if (!arbeiderIPerioden) {
            throw 'mapArbeidsforholdToArbeidsforholdApiData: arbeiderIPerioden er ikke besvart ukjent arbeidsforhold hvor en er ansatt';
        }
        return {
            organisasjonsnummer,
            erAnsatt: true,
            arbeiderIPerioden,
            normalarbeidstid: {
                timerPerUke: durationToISODuration(arbeidsforhold.normalarbeidstid.timerPerUke),
            },
        };
    }
    return {
        organisasjonsnummer,
        erAnsatt: false,
    };
};

export const getUkjentArbeidsforholdApiDataFromSøknadsdata = (
    ukjenteArbeidsforhold: Arbeidsforhold[] | undefined,
    arbeidstid: ArbeidstidSøknadsdata | undefined
): UkjentArbeidsforholdApiData[] => {
    if (ukjenteArbeidsforhold === undefined) {
        return [];
    }
    return ukjenteArbeidsforhold.map((arbeidsforhold): UkjentArbeidsforholdApiData => {
        const arbeiderIPerioden = arbeidstid
            ? arbeidstid.arbeidsaktivitet[arbeidsforhold.arbeidsgiverKey]?.arbeiderIPerioden
            : undefined;
        return mapArbeidsforholdToArbeidsforholdApiData(arbeidsforhold, arbeiderIPerioden);
    });
};
