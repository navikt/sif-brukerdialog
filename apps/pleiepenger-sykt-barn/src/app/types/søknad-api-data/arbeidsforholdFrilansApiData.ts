import { ArbeidIPeriodeFrilansApiData } from './arbeidIPeriodeFrilansApiData';
import { NormalarbeidstidApiData } from './normalarbeidstidApiData';

export interface ArbeidsforholdFrilansApiData {
    normalarbeidstid: NormalarbeidstidApiData;
    arbeidIPeriode?: ArbeidIPeriodeFrilansApiData;
}
