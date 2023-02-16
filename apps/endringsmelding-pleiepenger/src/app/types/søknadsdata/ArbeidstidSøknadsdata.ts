import { ArbeidstidEndringMap } from '../ArbeidstidEndring';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [key: string]: ArbeidstidEndringMap;
    };
}
