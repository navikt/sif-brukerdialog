import { AnsattArbeidstid, FrilansSNArbeidstid } from '../ArbeidstidStep';
import { JobberIPeriodeSvar } from '../ArbeidstidTypes';

export const harFraværIPerioden = (
    frilansArbeidstid?: FrilansSNArbeidstid,
    selvstendigArbeidstid?: FrilansSNArbeidstid,
    ansattArbeidstid?: AnsattArbeidstid[],
): boolean => {
    const ansattArbeidIPeriode = ansattArbeidstid?.some(
        (forhold) =>
            forhold.arbeidIPeriode !== undefined &&
            forhold.arbeidIPeriode.jobberIPerioden !== JobberIPeriodeSvar.somVanlig,
    );
    const frilansArbeidIPeriode = frilansArbeidstid?.arbeidIPeriode?.jobberIPerioden;
    const selvstendigArbeidIPeriode = selvstendigArbeidstid?.arbeidIPeriode?.jobberIPerioden;

    return (
        (frilansArbeidIPeriode !== undefined && frilansArbeidIPeriode !== JobberIPeriodeSvar.somVanlig) ||
        (selvstendigArbeidIPeriode !== undefined && selvstendigArbeidIPeriode !== JobberIPeriodeSvar.somVanlig) ||
        (ansattArbeidIPeriode !== undefined && ansattArbeidIPeriode === true)
    );
};
