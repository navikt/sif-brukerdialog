import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const arbeidsforholdFormMessages: MessageFileFormat = {
    nb: {
        'arbeidsforhold.validation.erAnsatt.yesOrNoIsUnanswered':
            'Du må svare på om det stemmer at du er ansatt hos {navn} i perioden med pleiepenger.',
        'arbeidsforhold.validation.timerPerUke.numberHasNoValue':
            'Du må oppgi hvor mange timer du jobber i normalt per uke hos {navn}.',
        'arbeidsforhold.validation.timerPerUke.numberIsTooSmall':
            'Du kan ikke oppgi mindre enn 0 timer for hvor mye du jobber normalt per uke hos {navn}.',
        'arbeidsforhold.validation.timerPerUke.numberIsTooLarge':
            'Du kan ikke oppgi mer enn {maksTimer} timer for hvor mye du jobber normalt per uke hos {navn}.',
        'arbeidsforhold.validation.timerPerUke.numberHasInvalidFormat':
            'Oppgitt timer for hvor mye du jobber normalt per uke hos {navn} er ikke et gyldig tall.',
        'validation.arbeidIPeriode.arbeider.noValue':
            'Du må velge hvilken situasjon som gjelder for deg hos IKKE-I-SAK-AS i perioden med pleiepenger.',
    },
};
