import { ArbeidstidEndringMap } from '../ArbeidstidEndring';
import { ArbeidAktivitetArbeidstaker } from '../Sak';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitetEndring: {
        [uke: string]: ArbeidstidEndringMap;
    };
    nyeArbeidsaktiviteter?: ArbeidAktivitetArbeidstaker[];
}
