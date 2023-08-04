import { ArbeidIPeriodeSøknadsdata } from './_ArbeidIPeriodeSøknadsdata';

export type ArbeidstidSøknadsdata = {
    arbeidsgivere: Map<string, ArbeidIPeriodeSøknadsdata>;
    frilansarbeid?: ArbeidIPeriodeSøknadsdata;
    honorararbeid?: ArbeidIPeriodeSøknadsdata;
    selvstendig?: ArbeidIPeriodeSøknadsdata;
};
