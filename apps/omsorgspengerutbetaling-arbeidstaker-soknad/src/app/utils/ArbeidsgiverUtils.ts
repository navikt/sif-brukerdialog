import { YesOrNo } from '@navikt/sif-common-formik-ds';

import { Arbeidsforhold, Utbetalingsårsak } from '../types/ArbeidsforholdTypes';
import { Arbeidsgiver } from '../types/Arbeidsgiver';

export const syncArbeidsforholdWithArbeidsgivere = (
    arbeidsgivere: Arbeidsgiver[],
    arbeidsforhold: Arbeidsforhold[],
): Arbeidsforhold[] => {
    const arbeidsforholdUpdatedList: Arbeidsforhold[] = arbeidsgivere.map((arbeidsgiver: Arbeidsgiver) => {
        const a: Arbeidsforhold | undefined = arbeidsforhold.find(
            (f) => f.organisasjonsnummer === arbeidsgiver.organisasjonsnummer,
        );

        return {
            ...arbeidsgiver,
            arbeidsgiverHarUtbetaltLønn: a ? a.arbeidsgiverHarUtbetaltLønn : YesOrNo.UNANSWERED,
            harHattFraværHosArbeidsgiver: a ? a.harHattFraværHosArbeidsgiver : YesOrNo.UNANSWERED,
            utbetalingsårsak: a ? a.utbetalingsårsak : Utbetalingsårsak.ikkeBesvart,
            årsakNyoppstartet: a ? a.årsakNyoppstartet : undefined,
            konfliktForklaring: a ? a.konfliktForklaring : undefined,
            dokumenter: a ? a.dokumenter : [],
        };
    });
    return arbeidsforholdUpdatedList;
};
