import { Duration, durationToDecimalDuration } from '@navikt/sif-common-utils';

import { ArbeidstidFormFields, ArbeidstidFormValues } from '../ArbeidstidStep';
import { ArbeidIPeriode, JobberIPeriodeSvar } from '../ArbeidstidTypes';

type ArbeidFormValues = Pick<
    ArbeidstidFormValues,
    | ArbeidstidFormFields.frilansArbeidstid
    | ArbeidstidFormFields.selvstendigArbeidstid
    | ArbeidstidFormFields.ansattArbeidstid
>;

/**
 * Samler alle arbeidIPerioder fra alle arbeidsforhold i en liste
 */
export const getAlleArbeidIPerioder = ({
    ansattArbeidstid,
    frilansArbeidstid,
    selvstendigArbeidstid,
}: ArbeidFormValues): ArbeidIPeriode[] => {
    return [
        ...(ansattArbeidstid?.map((forhold) => forhold.arbeidIPeriode).filter(Boolean) || []),
        frilansArbeidstid?.arbeidIPeriode,
        selvstendigArbeidstid?.arbeidIPeriode,
    ].filter((periode): periode is ArbeidIPeriode => periode !== undefined);
};

export const cleanArbeidIPerioder = (arbeidIPerioder: ArbeidIPeriode[]): ArbeidIPeriode[] => {
    return arbeidIPerioder.map((periode) => {
        if (periode.jobberIPerioden !== JobberIPeriodeSvar.redusert) {
            return {
                ...periode,
                enkeltdager: undefined,
            };
        }
        return periode;
    });
};

/**
 * Sjekker om det er valgt "som vanlig" for alle arbeidsforhold som har arbeidIPeriode
 */
export const harKunValgtJobberSomNormalt = (arbeidIPerioder: ArbeidIPeriode[]): boolean => {
    // Hvis ingen arbeidsperioder eksisterer, returner false
    if (arbeidIPerioder.length === 0) {
        return false;
    }

    // Sjekk at ALLE arbeidsperioder har valgt "som vanlig"
    return arbeidIPerioder.every((periode) => periode.jobberIPerioden === JobberIPeriodeSvar.somVanlig);
};

/**
 * Sjekker at det er fravær (redusert arbeidstid) for alle enkeltdager i alle arbeidsforhold som har arbeidIPeriode
 */
export const getDagerMedArbeidstid = (arbeidIPerioder: ArbeidIPeriode[]): Duration[] => {
    return arbeidIPerioder
        .filter((periode) => periode.enkeltdager)
        .flatMap((periode) => Object.values(periode.enkeltdager!));
};

/**
 * Sjekker om det er fravær (redusert arbeidstid) for alle dager
 */
export const harFraværAlleDager = (dagerMedArbeid: Duration[]): boolean => {
    return dagerMedArbeid.length === 0 || (dagerMedArbeid.length > 0 && dagerMedArbeid.every(erRedusertArbeidstid));
};

/**
 * Sjekker om arbeidstiden er mindre enn en full arbeidsdag (7.5 timer)
 */
export const erRedusertArbeidstid = (duration: Duration): boolean => {
    return duration ? durationToDecimalDuration(duration) < 7.5 : false;
};
