import { ArbeidIPeriodeSøknadsdata } from './ArbeidIPeriodeSøknadsdata';
import { ArbeidstidArbeidsgivereSøknadsdata } from './ArbeidstidArbeidsgivereSøknadsdata';

export interface ArbeidstidSøknadsdata {
    arbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata;
    frilans?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
}
