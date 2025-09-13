import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';
import { ArbeidstidArbeidsgivereSøknadsdata } from './ArbeidstidArbeidsgivereSøknadsdata';

export interface ArbeidstidSøknadsdata {
    arbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata;
    frilans?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
}
