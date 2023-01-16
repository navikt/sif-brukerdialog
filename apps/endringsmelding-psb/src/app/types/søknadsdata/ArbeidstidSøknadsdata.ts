import { ArbeidstidAktivitetEndringMap } from '../ArbeidstidAktivitetEndring';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [key: string]: ArbeidstidAktivitetEndringMap;
    };
}
