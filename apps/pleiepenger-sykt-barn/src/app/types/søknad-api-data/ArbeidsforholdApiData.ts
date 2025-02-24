import { ArbeidIPeriodeApiData } from './ArbeidIPeriodeApiData';
import { NormalarbeidstidApiData } from './NormalarbeidstidApiData';

export interface ArbeidsforholdApiData {
    normalarbeidstid: NormalarbeidstidApiData;
    arbeidIPeriode: ArbeidIPeriodeApiData;
}
