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
 * Sjekker om det er valgt redusert eller fullt fravær i perioden for minst ett arbeidsforhold
 */
export const harFraværIPeriode = ({
    frilansArbeidstid,
    selvstendigArbeidstid,
    ansattArbeidstid,
}: ArbeidFormValues): boolean => {
    const harFraværSomAnsatt = ansattArbeidstid?.some((forhold) => harRedusertEllerHeltFravær(forhold.arbeidIPeriode));
    const harFraværSomFrilanser = harRedusertEllerHeltFravær(frilansArbeidstid?.arbeidIPeriode);
    const harFraværSomSelvstendig = harRedusertEllerHeltFravær(selvstendigArbeidstid?.arbeidIPeriode);
    return harFraværSomAnsatt || harFraværSomFrilanser || harFraværSomSelvstendig;
};

/**
 * Sjekker om en arbeidIPeriode har redusert arbeidstid eller helt fravær.
 * For redusert periode med 3 eller færre enkeltdager, sjekkes også om alle dager faktisk har fravær.
 * For flere enn 3 dager, er det nok at redusert periode er valgt.
 */
const harRedusertEllerHeltFravær = (arbeidIPeriode?: ArbeidIPeriode) => {
    if (!arbeidIPeriode) {
        return false;
    }

    // Helt fravær er alltid fravær
    if (arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær) {
        return true;
    }

    // For redusert periode
    if (arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert) {
        // Hvis det er enkeltdager, sjekk logikk basert på antall dager
        if (arbeidIPeriode.enkeltdager && Object.values(arbeidIPeriode.enkeltdager).length > 0) {
            const antallDager = Object.values(arbeidIPeriode.enkeltdager).length;

            // For 3 eller færre dager: sjekk at alle dager faktisk har fravær
            if (antallDager <= 3) {
                return Object.values(arbeidIPeriode.enkeltdager).every(erRedusertArbeidstid);
            }

            // For flere enn 3 dager: redusert periode er nok
            return true;
        }
        // Hvis ingen enkeltdager er spesifisert, returner true (redusert periode er valgt)
        return true;
    }

    return false;
};

/**
 * Samler alle arbeidIPerioder fra alle arbeidsforhold i en liste
 */
const getAlleArbeidIPerioder = ({
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

/**
 * Sjekker om alle enkeltdager har redusert arbeidstid i arbeidsforholdene med redusert periode
 */
export const harFraværAlleEnkeltdager = ({
    ansattArbeidstid,
    frilansArbeidstid,
    selvstendigArbeidstid,
}: ArbeidFormValues): boolean => {
    const redusertePerioder = getAlleArbeidIPerioder({
        ansattArbeidstid,
        frilansArbeidstid,
        selvstendigArbeidstid,
    }).filter((periode) => periode.jobberIPerioden === JobberIPeriodeSvar.redusert);

    // Hvis ingen reduserte perioder, returner false
    if (redusertePerioder.length === 0) {
        return false;
    }

    // Sjekk at alle reduserte perioder har enkeltdager hvor ALLE dager har redusert arbeidstid
    return redusertePerioder.every(
        (periode) =>
            periode.enkeltdager &&
            Object.values(periode.enkeltdager).length > 0 &&
            Object.values(periode.enkeltdager).every(erRedusertArbeidstid),
    );
};

/**
 * Sjekker om arbeidstiden er mindre enn en full arbeidsdag (7.5 timer)
 */
export const erRedusertArbeidstid = (duration: Duration): boolean => {
    return duration ? durationToDecimalDuration(duration) < 7.5 : false;
};
