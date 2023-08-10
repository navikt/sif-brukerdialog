import { ArbeidIPeriodeSøknadsdata } from './arbeidIPeriodeSøknadsdata';

export type ArbeidstidArbeidsgivereSøknadsdata = Map<string, ArbeidAnsattSøknadsdata>;

export interface ArbeidAnsattSøknadsdata {
    navn: 'string';
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata;
}
