import { ArbeidIPeriodeFrilansSøknadsdata } from './arbeidIPeriodeFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';
import { NormalarbeidstidSøknadsdata } from './normalarbeidstidSøknadsdata';

export interface ArbeidsforholdSøknadsdata {
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    arbeidISøknadsperiode?: ArbeidIPeriodeSøknadsdata | ArbeidIPeriodeFrilansSøknadsdata;
}
