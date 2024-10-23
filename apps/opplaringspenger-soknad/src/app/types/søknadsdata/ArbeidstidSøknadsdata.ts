import { ArbeidstidArbeidsgivereSøknadsdata } from './ArbeidstidArbeidsgivereSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from './ArbeidIPeriodeSøknadsdata';

export interface ArbeidstidSøknadsdata {
    arbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata;
    frilans?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
}
