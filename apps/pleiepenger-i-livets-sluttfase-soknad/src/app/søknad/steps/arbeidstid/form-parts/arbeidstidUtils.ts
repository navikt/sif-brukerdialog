import { AnsattArbeidstid, FrilansSNArbeidstid } from '../ArbeidstidStep';
import { JobberIPeriodeSvar } from '../ArbeidstidTypes';

export const harFraværIPerioden = (
    ansattArbeidstid: AnsattArbeidstid[],
    frilansArbeidstid: FrilansSNArbeidstid,
    selvstendigArbeidstid: FrilansSNArbeidstid,
): boolean => {
    const ansattArbeidIPeriode = ansattArbeidstid.some(
        (forhold) =>
            forhold.arbeidIPeriode !== undefined &&
            forhold.arbeidIPeriode.jobberIPerioden !== JobberIPeriodeSvar.somVanlig,
    );
    const frilansArbeidIPeriode = frilansArbeidstid.arbeidIPeriode?.jobberIPerioden;
    const selvstendigArbeidIPeriode = selvstendigArbeidstid.arbeidIPeriode?.jobberIPerioden;

    return (
        (frilansArbeidIPeriode !== undefined && frilansArbeidIPeriode !== JobberIPeriodeSvar.somVanlig) ||
        (selvstendigArbeidIPeriode !== undefined && selvstendigArbeidIPeriode !== JobberIPeriodeSvar.somVanlig) ||
        ansattArbeidIPeriode
    );
};
