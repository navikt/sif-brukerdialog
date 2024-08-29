import { ArbeidstidArbeidsgivereSøknadsdata } from './ArbeidstidArbeidsgivereSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';

export interface ArbeidstidSøknadsdata {
    arbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata;
    frilans?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
}
