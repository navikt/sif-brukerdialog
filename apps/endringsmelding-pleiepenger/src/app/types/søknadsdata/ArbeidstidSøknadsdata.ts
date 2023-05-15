import { ArbeidstidEndringMap } from '../ArbeidstidEndring';

export interface ArbeidAktivitetEndringMap {
    [aktivitetId: string]: ArbeidstidEndringMap;
}

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: ArbeidAktivitetEndringMap;
}
