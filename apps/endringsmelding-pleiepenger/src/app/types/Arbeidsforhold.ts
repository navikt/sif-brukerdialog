import { Duration } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from './arbeiderIPeriodenSvar';

interface ArbeidsforholdBase {
    arbeidsgiverKey: string;
    erAnsatt: boolean;
}

export type ArbeidsforholdAktivt = ArbeidsforholdBase & {
    erAnsatt: true;
    arbeiderIPerioden: ArbeiderIPeriodenSvar;
    normalarbeidstid: {
        timerPerUke: Duration;
    };
};

export type ArbeidsforholdInaktivt = ArbeidsforholdBase & { erAnsatt: false };

export type Arbeidsforhold = ArbeidsforholdAktivt | ArbeidsforholdInaktivt;
