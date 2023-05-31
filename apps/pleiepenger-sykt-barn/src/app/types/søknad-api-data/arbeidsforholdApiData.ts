import { ArbeidIPeriodeApiData } from './arbeidIPeriodeApiData';
import { NormalarbeidstidApiData } from './normalarbeidstidApiData';

export interface ArbeidsforholdApiData {
    normalarbeidstid: NormalarbeidstidApiData;
    arbeidIPeriode?: ArbeidIPeriodeApiData;
}
