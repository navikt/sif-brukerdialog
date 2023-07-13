import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

export interface ArbeidsforholdSøknadsdata {
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    arbeidISøknadsperiode?: ArbeidIPeriodeSøknadsdata;
}
