import { ArbeiderIPeriodenSvar } from '../../søknad/steps/arbeidssituasjon/components/ArbeidsforholdForm';
import { ArbeidstidEndringMap } from '../ArbeidstidEndring';

export interface ArbeidAktivitetEndringMap {
    [aktivitetId: string]: {
        jobberIPerioden?: ArbeiderIPeriodenSvar;
        endringer: ArbeidstidEndringMap;
    };
}

export interface ArbeidstidSøknadsdata {
    arbeidAktivitet: ArbeidAktivitetEndringMap;
}
