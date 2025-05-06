import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { ArbeiderIPeriodenSvar } from './ArbeiderIPeriodenSvar';
import { ArbeidstidEndringMap } from './ArbeidstidEndring';

export interface ArbeidstidArbeidsaktivitetMap {
    [aktivitetId: string]: {
        arbeiderIPerioden?: ArbeiderIPeriodenSvar;
        endringer: ArbeidstidEndringMap;
        /** Gjelder kun frilans og brukes for info til bruker pga praksisendring mai 2025 */
        mottarOmsorgsstønad?: YesOrNo;
    };
}

export interface ArbeidstidSøknadsdata {
    arbeidsaktivitet: ArbeidstidArbeidsaktivitetMap;
}
