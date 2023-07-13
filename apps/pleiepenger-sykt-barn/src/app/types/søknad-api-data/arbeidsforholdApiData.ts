import { ArbeidIPeriodeApiData } from './arbeidIPeriodeApiData';
import { NormalarbeidstidApiData } from './NormalarbeidstidApiData';

export interface ArbeidsforholdApiData {
    normalarbeidstid: NormalarbeidstidApiData;
    arbeidIPeriode?: ArbeidIPeriodeApiData;
}
