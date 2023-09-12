import { ArbeidIPeriodeSøknadsdata } from './ArbeidIPeriodeSøknadsdata';

export type ArbeidstidSøknadsdata = {
    arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata>;
    frilans?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
};
