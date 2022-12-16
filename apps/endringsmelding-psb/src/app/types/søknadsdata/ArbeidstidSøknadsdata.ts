import { ArbeidstidAktivitetUkeEndringMap } from '../ArbeidstidAktivitetEndring';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [key: string]: ArbeidstidAktivitetUkeEndringMap;
    };
}
