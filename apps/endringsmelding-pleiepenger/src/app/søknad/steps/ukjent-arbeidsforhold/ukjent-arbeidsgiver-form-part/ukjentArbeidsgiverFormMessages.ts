import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const ukjentArbeidsgiverFormMessages: MessageFileFormat = {
    nb: {
        'ukjentArbeidsgiver.validation.erAnsatt.yesOrNoIsUnanswered':
            'Du må svare på om det stemmer at du er ansatt hos {navn} i perioden med pleiepenger.',
        'ukjentArbeidsgiver.validation.timerPerUke.numberHasNoValue':
            'Du må oppgi hvor mange timer du jobber i normalt per uke hos {navn}.',
        'ukjentArbeidsgiver.validation.timerPerUke.numberIsTooSmall':
            'Du kan ikke oppgi mindre enn 0 timer for hvor mye du jobber normalt per uke hos {navn}.',
        'ukjentArbeidsgiver.validation.timerPerUke.numberIsTooLarge':
            'Du kan ikke oppgi mer enn {maksTimer} timer for hvor mye du jobber normalt per uke hos {navn}.',
        'ukjentArbeidsgiver.validation.timerPerUke.numberHasInvalidFormat':
            'Oppgitt timer for hvor mye du jobber normalt per uke hos {navn} er ikke et gyldig tall.',
        'ukjentArbeidsgiver.validation.arbeider.noValue':
            'Du må velge hvilken situasjon som gjelder for deg hos IKKE-I-SAK-AS i perioden med pleiepenger.',
    },
};
