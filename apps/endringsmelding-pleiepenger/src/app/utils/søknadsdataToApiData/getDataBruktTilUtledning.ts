import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { durationToISODuration } from '@navikt/sif-common-utils/lib';
import { DataBruktTilUtledningApiData, Søknadsdata, UkjentArbeidsforholdApiData, ValgteEndringer } from '@types';
import { getOrgNummerFromArbeidsgiverKey } from '../arbeidsgiverUtils';

export const getDataBruktTilUtledningApiData = (
    søknadsdata: Søknadsdata,
    valgteEndringer: ValgteEndringer
): DataBruktTilUtledningApiData => {
    return {
        soknadDialogCommitSha: getCommitShaFromEnv() || '',
        valgteEndringer,
        ukjentArbeidsforhold: getUkjentArbeidsforholdApiDataFromSøknadsdata(søknadsdata),
    };
};

export const getUkjentArbeidsforholdApiDataFromSøknadsdata = ({
    ukjentArbeidsforhold,
    arbeidstid,
}: Søknadsdata): UkjentArbeidsforholdApiData[] => {
    if (ukjentArbeidsforhold === undefined || arbeidstid === undefined) {
        return [];
    }
    return ukjentArbeidsforhold.arbeidsforhold.map((arbeidsforhold): UkjentArbeidsforholdApiData => {
        const organisasjonsnummer = getOrgNummerFromArbeidsgiverKey(arbeidsforhold.arbeidsgiverKey);
        if (arbeidsforhold.erAnsatt) {
            const arbeidstidForArbeidsforhold = arbeidstid.arbeidsaktivitet[arbeidsforhold.arbeidsgiverKey];
            if (!arbeidstidForArbeidsforhold || !arbeidstidForArbeidsforhold.arbeiderIPerioden) {
                throw 'getUkjentArbeidsforholdApiDataFromSøknadsdata: arbeidstidForArbeidsforhold ikke funnet';
            }

            return {
                organisasjonsnummer,
                erAnsatt: true,
                arbeiderIPerioden: arbeidstidForArbeidsforhold.arbeiderIPerioden,
                normalarbeidstid: {
                    timerPerUke: durationToISODuration(arbeidsforhold.normalarbeidstid.timerPerUke),
                },
            };
        }
        return {
            organisasjonsnummer,
            erAnsatt: false,
        };
    });
};
