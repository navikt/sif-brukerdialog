import { ArbeidIPeriodeSøknadsdata } from './ArbeidIPeriodeSøknadsdata';

export type ArbeidstidArbeidsgivereSøknadsdata = {
    [organisasjonsnummer: string]: ArbeidAnsattSøknadsdata;
};

export interface ArbeidAnsattSøknadsdata {
    navn: string;
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata;
}
