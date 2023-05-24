import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const ukjentArbeidsforholdFormMessages: MessageFileFormat = {
    nb: {
        'ukjentArbeidsforhold.validation.erAnsatt.yesOrNoIsUnanswered':
            'Du må svare på om det stemmer at du er ansatt hos {navn} i perioden med pleiepenger.',
        'ukjentArbeidsforhold.validation.timerPerUke.numberHasNoValue':
            'Du må oppgi hvor mange timer du jobber i normalt per uke hos {navn}.',
        'ukjentArbeidsforhold.validation.timerPerUke.numberIsTooSmall':
            'Du kan ikke oppgi mindre enn 0 timer for hvor mye du jobber normalt per uke hos {navn}.',
        'ukjentArbeidsforhold.validation.timerPerUke.numberIsTooLarge':
            'Du kan ikke oppgi mer enn {maksTimer} timer for hvor mye du jobber normalt per uke hos {navn}.',
        'ukjentArbeidsforhold.validation.timerPerUke.numberHasInvalidFormat':
            'Oppgitt timer for hvor mye du jobber normalt per uke hos {navn} er ikke et gyldig tall.',
        'ukjentArbeidsforhold.validation.arbeider.noValue':
            'Du må velge hvilken situasjon som gjelder for deg hos {navn} i perioden med pleiepenger.',
    },
};
