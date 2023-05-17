import { ArbeiderIPeriodenSvar } from './_ArbeiderIPeriodenSvar';
import { ArbeidstidEndringMap } from './_ArbeidstidEndring';

export interface ArbeidAktivitetEndringMap {
    [aktivitetId: string]: {
        arbeiderIPerioden?: ArbeiderIPeriodenSvar;
        endringer: ArbeidstidEndringMap;
    };
}

export interface ArbeidstidSøknadsdata {
    arbeidAktivitet: ArbeidAktivitetEndringMap;
}
