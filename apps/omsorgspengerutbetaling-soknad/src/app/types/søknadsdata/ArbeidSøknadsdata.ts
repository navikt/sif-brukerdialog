import { ArbeidFrilansSøknadsdata } from './ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './ArbeidSelvstendigSøknadsdata';

export interface ArbeidSøknadsdata {
    frilans?: ArbeidFrilansSøknadsdata;
    selvstendig?: ArbeidSelvstendigSøknadsdata;
}
