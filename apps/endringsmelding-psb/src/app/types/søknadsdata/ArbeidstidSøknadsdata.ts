import { ArbeidstidAktivitetEndringUkeMap } from '../ArbeidstidAktivitetEndring';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [key: string]: ArbeidstidAktivitetEndringUkeMap;
    };
}
