import { ArbeiderIPeriodenSvar } from './ArbeiderIPeriodenSvar';
import { ArbeidstidEndringMap } from './ArbeidstidEndring';

export interface ArbeidstidArbeidsaktivitetMap {
    [aktivitetId: string]: {
        arbeiderIPerioden?: ArbeiderIPeriodenSvar;
        endringer: ArbeidstidEndringMap;
    };
}

export interface ArbeidstidSøknadsdata {
    arbeidsaktivitet: ArbeidstidArbeidsaktivitetMap;
}
