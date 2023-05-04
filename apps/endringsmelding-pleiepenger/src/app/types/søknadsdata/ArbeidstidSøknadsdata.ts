import { ArbeidstidEndringMap } from '../ArbeidstidEndring';
import { ArbeidAktivitetArbeidstaker } from '../Sak';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [key: string]: ArbeidstidEndringMap;
    };
    nyeArbeidsaktiviteter?: ArbeidAktivitetArbeidstaker[];
}
