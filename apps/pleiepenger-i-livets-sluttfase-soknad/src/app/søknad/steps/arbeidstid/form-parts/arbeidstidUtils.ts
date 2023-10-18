import { AnsattArbeidstid, FrilansSNArbeidstid } from '../ArbeidstidStep';
import { ArbeidIPeriode, JobberIPeriodeSvar } from '../ArbeidstidTypes';

export const harFraværIPerioden = (
    frilansArbeidstid?: FrilansSNArbeidstid,
    selvstendigArbeidstid?: FrilansSNArbeidstid,
    ansattArbeidstid?: AnsattArbeidstid[],
): boolean => {
    const harFraværSomAnsatt = ansattArbeidstid?.some(
        (forhold) =>
            forhold.arbeidIPeriode !== undefined && harHeltFraværEllerEnkeltdagerMedFravær(forhold.arbeidIPeriode),
    );
    const harFraværSomFrilanser = frilansArbeidstid?.arbeidIPeriode
        ? harHeltFraværEllerEnkeltdagerMedFravær(frilansArbeidstid?.arbeidIPeriode)
        : false;

    const harFraværSomSelvstendig = selvstendigArbeidstid?.arbeidIPeriode
        ? harHeltFraværEllerEnkeltdagerMedFravær(selvstendigArbeidstid?.arbeidIPeriode)
        : false;

    return harFraværSomAnsatt || harFraværSomFrilanser || harFraværSomSelvstendig;
};

export const harHeltFraværEllerEnkeltdagerMedFravær = (arbeidIPeriode: ArbeidIPeriode) => {
    switch (arbeidIPeriode.jobberIPerioden) {
        case JobberIPeriodeSvar.somVanlig:
            return false;
        case JobberIPeriodeSvar.heltFravær:
        case JobberIPeriodeSvar.redusert:
            return true;
    }
};
