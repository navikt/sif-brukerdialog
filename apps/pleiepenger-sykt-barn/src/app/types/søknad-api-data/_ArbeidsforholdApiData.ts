import { ArbeidIPeriodeApiData } from './_ArbeidIPeriodeApiData';
import { NormalarbeidstidApiData } from './_NormalarbeidstidApiData';

export interface ArbeidsforholdApiData {
    normalarbeidstid: NormalarbeidstidApiData;
    arbeidIPeriode?: ArbeidIPeriodeApiData;
}
