import { ArbeiderIPeriodenSvar } from '../arbeiderIPeriodenSvar';
import { ArbeidstidEndringMap } from '../ArbeidstidEndring';

export interface ArbeidAktivitetEndringMap {
    [aktivitetId: string]: {
        arbeiderIPerioden?: ArbeiderIPeriodenSvar;
        endringer: ArbeidstidEndringMap;
    };
}

export interface ArbeidstidSøknadsdata {
    arbeidAktivitet: ArbeidAktivitetEndringMap;
}
