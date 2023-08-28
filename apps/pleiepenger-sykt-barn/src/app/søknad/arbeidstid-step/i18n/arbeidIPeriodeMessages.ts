import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

const arbeidIPeriodeValideringMessages: MessageFileFormat = {
    nb: {
        'arbeidIPeriode.validation.ANSATT.arbeiderIPerioden.noValue':
            'Du må svare på hvilken situasjon som gjelder for deg hos {arbeidsgiverNavn} i perioden du søker for.',
        'arbeidIPeriode.validation.ANSATT.erLiktHverUke.noValue':
            'Du må svare på om du jobber like mye hver uke {arbeidsgiverNavn} i perioden.',
        'arbeidIPeriode.validation.ANSATT.timerEllerProsent.noValue':
            'Du må svare på hvordan du ønsker å oppgi hvor mye du jobber hos {arbeidsgiverNavn}.',
        'arbeidIPeriode.validation.ANSATT.prosentAvNormalt.numberHasNoValue':
            'Du må oppgi hvor mange prosent du jobber hos {arbeidsgiverNavn}.',
        'arbeidIPeriode.validation.ANSATT.prosentAvNormalt.numberHasInvalidFormat':
            'Antall prosent du jobber hos {arbeidsgiverNavn} kan kun bestå av tall.',
        'arbeidIPeriode.validation.ANSATT.prosentAvNormalt.numberIsTooSmall':
            'Antall prosent du jobber hos {arbeidsgiverNavn} kan ikke være mindre enn {min}.',
        'arbeidIPeriode.validation.ANSATT.prosentAvNormalt.numberIsTooLarge':
            'Antall prosent du jobber hos {arbeidsgiverNavn} kan ikke være mer enn {max}.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.numberHasNoValue':
            'Du må oppgi hvor mange timer du jobber {arbeidsgiverNavn}.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.numberHasInvalidFormat':
            'Antall timer du jobber {arbeidsgiverNavn} kan kun bestå av tall.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.numberIsTooSmall':
            'Antall timer du jobber {arbeidsgiverNavn} kan ikke være mindre enn {min}.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.numberIsTooLarge':
            'Antall timer du jobber {arbeidsgiverNavn} kan ikke være mer enn hva du jobber normalt ({max}).',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.UKE.numberHasNoValue':
            'Du må oppgi hvor mange timer du jobber i uke {ukenummer} hos {arbeidsgiverNavn}.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.UKE.numberHasInvalidFormat':
            'Antall timer du jobber i uke {ukenummer} hos {arbeidsgiverNavn} kan kun bestå av tall.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.UKE.numberIsTooSmall':
            'Antall timer du jobber i uke {ukenummer} hos {arbeidsgiverNavn} kan ikke være mindre enn {min}.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.UKE.numberIsTooLarge':
            'Antall timer du jobber i uke {ukenummer} hos {arbeidsgiverNavn} kan ikke være mer enn {max}.',
        'arbeidIPeriode.validation.ANSATT.snittTimerPerUke.UKE.flereTimerEnnTilgjengeligIUke':
            'Antall timer du har oppgitt i uke {ukenummer} hos {arbeidsgiverNavn} kan ikke være mer enn det er timer i døgnet ({dagInfo}).',
    },
};

const arbeidIPeriodeSpørsmål: MessageFileFormat = {
    nb: {
        'arbeidIPeriode.spørsmål.ANSATT.arbeiderIPerioden':
            'Hvilken situasjon gjelder for deg hos (arbeidsgiverNavn) i søknadsperioden?',
        'arbeidIPeriode.spørsmål.ANSATT.erLiktHverUke':
            'Jobber du like mye hver uke hos {arbeidsgiverNavn} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.timerEllerProsent':
            'Hvordan vil du oppgi hvor mye du jobber hos {arbeidsgiverNavn} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.snittTimerPerUke':
            'Hvor mange timer jobber du hver uke hos {arbeidsgiverNavn} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.prosentAvNormalt':
            'Hvor mange prosent jobber du hos {arbeidsgiverNavn} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.arbeidsuker':
            'Oppgi hvor mange timer du jobber hos {arbeidsgiverNavn} i hver enkeltuke i perioden?',
        'arbeidIPeriode.spørsmål.FRILANSER.arbeiderIPerioden':
            'Hvilken situasjon gjelder for deg som frilanser i søknadsperioden?',
        'arbeidIPeriode.spørsmål.FRILANSER.erLiktHverUke': 'Jobber du like mye hver uke som frilanser i perioden?',
        'arbeidIPeriode.spørsmål.FRILANSER.timerEllerProsent':
            'Hvordan vil du oppgi hvor mye du jobber som frilanser i perioden?',
        'arbeidIPeriode.spørsmål.FRILANSER.snittTimerPerUke':
            'Hvor mange timer jobber du hver uke som frilanser i perioden?',
        'arbeidIPeriode.spørsmål.FRILANSER.prosentAvNormalt': 'Hvor mange prosent jobber du som frilanser i perioden?',
        'arbeidIPeriode.spørsmål.FRILANSER.arbeidsuker':
            'Oppgi hvor mange timer du jobber som frilanser i hver enkeltuke i perioden?',
        'arbeidIPeriode.spørsmål.SELVSTENDIG.arbeiderIPerioden':
            'Hvilken situasjon gjelder for deg som selvstendig næringsdrivende i søknadsperioden?',
        'arbeidIPeriode.spørsmål.SELVSTENDIG.erLiktHverUke':
            'Jobber du like mye hver uke som selvstendig næringsdrivende i perioden?',
        'arbeidIPeriode.spørsmål.SELVSTENDIG.timerEllerProsent':
            'Hvordan vil du oppgi hvor mye du jobber som selvstendig næringsdrivende i perioden?',
        'arbeidIPeriode.spørsmål.SELVSTENDIG.snittTimerPerUke':
            'Hvor mange timer jobber du hver uke som selvstendig næringsdrivende i perioden?',
        'arbeidIPeriode.spørsmål.SELVSTENDIG.prosentAvNormalt':
            'Hvor mange prosent jobber du som selvstendig næringsdrivende i perioden?',
        'arbeidIPeriode.spørsmål.SELVSTENDIG.arbeidsuker':
            'Oppgi hvor mange timer du jobber som selvstendig næringsdrivende i hver enkeltuke i perioden?',
    },
};

export const arbeidIPeriodeSvarAlternativer: MessageFileFormat = {
    nb: {
        'arbeidIPeriode.erLiktHverUke.ja': 'Ja',
        'arbeidIPeriode.erLiktHverUke.nei': 'Nei, det varierer',
        'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke': 'Jeg jobber ikke',
        'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
        'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig': 'Jeg jobber som normalt, og har ikke fravær',
        'arbeidIPeriode.timerEllerProsent.timer': 'I timer',
        'arbeidIPeriode.timerEllerProsent.prosent': 'I prosent',
    },
};

export const arbeidIPeriodeMessages: MessageFileFormat = {
    nb: {
        ...arbeidIPeriodeSpørsmål.nb,
        ...arbeidIPeriodeValideringMessages.nb,
        ...arbeidIPeriodeSvarAlternativer.nb,
        'arbeidIPeriode.arbeiderIPerioden.description':
            'Husk at du også skal ta med eventuell jobb som du mottar honorar for.',
        'arbeidIPeriode.uke.ukenummer': 'Uke {ukenummer}',
        'arbeidIPeriode.uke.ukedatoer': '{ukedatoer}',
        'arbeidstidPeriode.timer': '{timer, plural, one {# time} other {# timer}}',
        'arbeidstidPeriode.timer.ikkeTall': `{timer} timer`,
        'arbeidIPeriode.info.frilanser.tekst.1':
            'Nå trenger vi å vite hvor mange timer du jobber som frilanser i perioden du søker for.',
    },
};
