import { Arbeidsgiver } from '../Arbeidsgiver';
import { ArbeidsforholdSøknadsdata } from './ArbeidsforholdSøknadsdata';

export type ArbeidsgivereSøknadsdata = Map<string, ArbeidAnsattSøknadsdata>;

export interface ArbeidAnsattSøknadsdataSluttetFørSøknadsperiode {
    type: 'sluttetFørSøknadsperiode';
    index: number;
    erAnsattISøknadsperiode: false;
    arbeidsgiver: Arbeidsgiver;
}
export interface ArbeidAnsattSøknadsdataSluttetISøknadsperiode {
    type: 'sluttetISøknadsperiode';
    index: number;
    erAnsattISøknadsperiode: true;
    arbeidsgiver: Arbeidsgiver;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}
export interface ArbeidAnsattSøknadsdataPågående {
    type: 'pågående';
    index: number;
    erAnsattISøknadsperiode: true;
    arbeidsgiver: Arbeidsgiver;
    arbeidsforhold: ArbeidsforholdSøknadsdata;
}
export type ArbeidAnsattSøknadsdata =
    | ArbeidAnsattSøknadsdataSluttetFørSøknadsperiode
    | ArbeidAnsattSøknadsdataSluttetISøknadsperiode
    | ArbeidAnsattSøknadsdataPågående;
