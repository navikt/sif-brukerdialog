import { ArbeidIPeriodeFormValues } from '../../søknad/steps/arbeidstid/arbeid-i-periode/ArbeidIPeriodeFormValues';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitet: {
        [key: string]: ArbeidIPeriodeFormValues;
    };
}
