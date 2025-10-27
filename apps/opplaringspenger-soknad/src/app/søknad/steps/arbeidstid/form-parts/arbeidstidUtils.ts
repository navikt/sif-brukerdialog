import { Duration, durationToDecimalDuration } from '@navikt/sif-common-utils';
import { KursSøknadsdata } from '../../../../types/søknadsdata/KursSøknadsdata';
import { EnkeltdagEllerPeriode } from '../../kurs/KursStep';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../ArbeidstidStep';
import { ArbeidIPeriode, JobberIPeriodeSvar } from '../ArbeidstidTypes';

type ArbeidFormValues = Pick<
    ArbeidstidFormValues,
    | ArbeidstidFormFields.frilansArbeidstid
    | ArbeidstidFormFields.selvstendigArbeidstid
    | ArbeidstidFormFields.ansattArbeidstid
>;

/**
 * Sjekker om det er valgt redusert eller fullt fravær i perioden
 * @param values ArbeidstidFormValues
 * @returns
 */
export const harValgtRedusertEllerFulltFraværIPerioden = ({
    frilansArbeidstid,
    selvstendigArbeidstid,
    ansattArbeidstid,
}: ArbeidFormValues): boolean => {
    const harFraværSomAnsatt = ansattArbeidstid?.some((forhold) => harValgtFravær(forhold.arbeidIPeriode));
    const harFraværSomFrilanser = harValgtFravær(frilansArbeidstid?.arbeidIPeriode);
    const harFraværSomSelvstendig = harValgtFravær(selvstendigArbeidstid?.arbeidIPeriode);
    return harFraværSomAnsatt || harFraværSomFrilanser || harFraværSomSelvstendig;
};

const harValgtFravær = (arbeidIPeriode?: ArbeidIPeriode) => {
    return arbeidIPeriode
        ? arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert ||
              arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.heltFravær
        : false;
};

/**
 * Legg all arbeidstid i perioden i en Array, og returner denne
 * @param values ArbeidstidFormValues
 * @returns ArbeidIPeriode[]
 */
const getAltArbeidIPeriode = ({
    ansattArbeidstid,
    frilansArbeidstid,
    selvstendigArbeidstid,
}: ArbeidFormValues): ArbeidIPeriode[] => {
    const arbeidIPeriode: ArbeidIPeriode[] = [];
    ansattArbeidstid?.forEach(
        (forhold) => forhold.arbeidIPeriode !== undefined && arbeidIPeriode.push(forhold.arbeidIPeriode),
    );
    if (frilansArbeidstid?.arbeidIPeriode) {
        arbeidIPeriode.push(frilansArbeidstid.arbeidIPeriode);
    }
    if (selvstendigArbeidstid?.arbeidIPeriode) {
        arbeidIPeriode.push(selvstendigArbeidstid.arbeidIPeriode);
    }
    return arbeidIPeriode;
};

export const søkerKunEnEnkeltdagArbeiderRedusertMenOppgirFullArbeidsdag = (
    kurs: KursSøknadsdata | undefined,
    values: ArbeidFormValues,
): boolean => {
    const kunEnkeltdag = kurs?.enkeltdagEllerPeriode === EnkeltdagEllerPeriode.ENKELTDAG;
    if (!kunEnkeltdag) {
        return false;
    }
    const alleEnkeltdager: Duration[] = [];
    getAltArbeidIPeriode(values)
        .filter((arbeidIPeriode) => arbeidIPeriode.jobberIPerioden === JobberIPeriodeSvar.redusert)
        .forEach((arbeidIPeriode) => {
            if (arbeidIPeriode.enkeltdager) {
                Object.values(arbeidIPeriode.enkeltdager).forEach((duration) => alleEnkeltdager.push(duration));
            }
        });
    return alleEnkeltdager.some((dag) => erRedusertArbeidstid(dag) === false);
};

/**
 * Sjekker om arbeidstiden er mindre enn en full arbeidsdag (7.5 timer)
 * @param duration Arbeidstid
 * @returns true hvis arbeidstiden er mindre enn en full arbeidsdag (7.5 timer)
 */
export const erRedusertArbeidstid = (duration: Duration): boolean => {
    return duration ? durationToDecimalDuration(duration) < 7.5 : false;
};
