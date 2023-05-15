import { ArbeidstidEndringMap } from '../ArbeidstidEndring';
import { ArbeidAktivitetArbeidstaker } from '../Sak';

export interface ArbeidAktivitetEndringMap {
    [aktivitetId: string]: ArbeidstidEndringMap;
}

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: ArbeidAktivitetEndringMap;
    ukjenteArbeidsaktiviteter?: ArbeidAktivitetArbeidstaker[];
}
