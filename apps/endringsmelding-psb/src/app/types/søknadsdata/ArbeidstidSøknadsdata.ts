import { ArbeidsukeMap } from '../K9Sak';

export interface ArbeidstidSøknadsdata {
    arbeidAktivitet: {
        [key: string]: ArbeidsukeMap;
    };
}
