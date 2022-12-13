import { ArbeidstidAktivitetEndringPeriodeMap } from '../ArbeidstidAktivitetEndring';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [key: string]: ArbeidstidAktivitetEndringPeriodeMap;
    };
}
