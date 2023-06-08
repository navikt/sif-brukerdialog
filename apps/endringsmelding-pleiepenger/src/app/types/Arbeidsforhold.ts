import { Duration } from '@navikt/sif-common-utils/lib';

interface ArbeidsforholdBase {
    arbeidsgiverKey: string;
    erAnsatt: boolean;
}

export type ArbeidsforholdAktivt = ArbeidsforholdBase & {
    erAnsatt: true;
    normalarbeidstid: {
        timerPerUke: Duration;
    };
};

export type ArbeidsforholdInaktivt = ArbeidsforholdBase & { erAnsatt: false };

export type Arbeidsforhold = ArbeidsforholdAktivt | ArbeidsforholdInaktivt;
