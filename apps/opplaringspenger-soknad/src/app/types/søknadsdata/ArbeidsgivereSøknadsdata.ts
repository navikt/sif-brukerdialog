import { Arbeidsgiver } from '../Arbeidsgiver';

export type ArbeidsgivereSøknadsdata = {
    [organisasjonsnummer: string]: ArbeidAnsattSøknadsdata;
};

export interface ArbeidAnsattSøknadsdataAvsluttet {
    type: 'avsluttet';
    erAnsattISøknadsperiode: false;
    jobberNormaltTimer: number;
    arbeidsgiver: Arbeidsgiver;
}
export interface ArbeidAnsattSøknadsdataPågående {
    type: 'pågående';
    erAnsattISøknadsperiode: true;
    arbeidsgiver: Arbeidsgiver;
    jobberNormaltTimer: number;
}
export type ArbeidAnsattSøknadsdata = ArbeidAnsattSøknadsdataAvsluttet | ArbeidAnsattSøknadsdataPågående;
