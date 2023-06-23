import { ArbeidIPeriodeSøknadsdata } from './ArbeidIPeriodeSøknadsdata';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

export interface ArbeidsforholdSøknadsdata {
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    arbeidISøknadsperiode?: ArbeidIPeriodeSøknadsdata;
}
