import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';

export type ArbeidstidSøknadsdata = {
    arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata>;
    frilansarbeid?: ArbeidIPeriodeSøknadsdata;
    honorararbeid?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
};
