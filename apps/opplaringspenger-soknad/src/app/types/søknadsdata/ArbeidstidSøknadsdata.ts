import { ArbeidstidArbeidsgivereSøknadsdata } from './ArbeidstidArbeidsgivereSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from './ArbeidIPeriodeSøknadsdata';

export interface ArbeidstidSøknadsdata {
    skalJobbe: boolean;
    arbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata;
    frilans?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
}
