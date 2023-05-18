import { ArbeiderIPeriodenSvar } from './ArbeiderIPeriodenSvar';
import { ArbeidstidEndringMap } from './ArbeidstidEndring';

export interface ArbeidsaktivitetEndringMap {
    [aktivitetId: string]: {
        arbeiderIPerioden?: ArbeiderIPeriodenSvar;
        endringer: ArbeidstidEndringMap;
    };
}

export interface ArbeidstidSøknadsdata {
    arbeidsaktivitet: ArbeidsaktivitetEndringMap;
}
