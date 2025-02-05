const arbeidIPeriodeValideringMessages = {
    nb: {
        'arbeidIPeriode.validation.arbeiderIPerioden.noValue':
            'Du må svare på hvilken situasjon som gjelder for deg {hvor} i søknadsperioden.',
        'arbeidIPeriode.validation.erLiktHverUke.noValue':
            'Du må svare på om du jobber like mye hver uke {hvor} i perioden.',
        'arbeidIPeriode.validation.timerEllerProsent.noValue':
            'Du må svare på hvordan du ønsker å oppgi hvor mye du jobber {hvor}.',
        'arbeidIPeriode.validation.prosentAvNormalt.numberHasNoValue':
            'Du må oppgi hvor mange prosent du jobber {hvor}.',
        'arbeidIPeriode.validation.prosentAvNormalt.numberHasInvalidFormat':
            'Antall prosent du jobber {hvor} har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
        'arbeidIPeriode.validation.prosentAvNormalt.numberIsTooSmall':
            'Antall prosent du jobber {hvor} kan ikke være mindre enn {min}.',
        'arbeidIPeriode.validation.prosentAvNormalt.numberIsTooLarge':
            'Antall prosent du jobber {hvor} kan ikke være mer enn {max}.',
        'arbeidIPeriode.validation.snittTimerPerUke.numberHasNoValue': 'Du må oppgi hvor mange timer du jobber {hvor}.',
        'arbeidIPeriode.validation.snittTimerPerUke.numberHasInvalidFormat':
            'Antall timer du jobber {hvor} har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
        'arbeidIPeriode.validation.snittTimerPerUke.numberIsTooSmall':
            'Antall timer du jobber {hvor} kan ikke være mindre enn {min}.',
        'arbeidIPeriode.validation.snittTimerPerUke.numberIsTooLarge':
            'Antall timer du jobber {hvor} kan ikke være mer enn hva du jobber normalt ({max}).',
        'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberHasNoValue':
            'Du må oppgi hvor mange timer du jobber i uke {ukenummer} {hvor}.',
        'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberHasInvalidFormat':
            'Antall timer du jobber i uke {ukenummer} {hvor} har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
        'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberIsTooSmall':
            'Antall timer du jobber i uke {ukenummer} {hvor} kan ikke være mindre enn {min}.',
        'arbeidIPeriode.validation.snittTimerPerUke.UKE.numberIsTooLarge':
            'Antall timer du jobber i uke {ukenummer} {hvor} kan ikke være mer enn {max}.',
        'arbeidIPeriode.validation.snittTimerPerUke.UKE.flereTimerEnnTilgjengeligIUke':
            'Antall timer du har oppgitt i uke {ukenummer} {hvor} kan ikke være mer enn det er timer i døgnet ({dagInfo}).',
    },
};

const arbeidIPeriodeSpørsmål = {
    nb: {
        'arbeidIPeriode.spørsmål.ANSATT.arbeiderIPerioden':
            'Hvilken situasjon gjelder for deg {hvor} i søknadsperioden?',
        'arbeidIPeriode.spørsmål.ANSATT.erLiktHverUke': 'Jobber du like mye hver uke {hvor} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.timerEllerProsent':
            'Hvordan vil du oppgi hvor mye du jobber {hvor} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.snittTimerPerUke': 'Hvor mange timer jobber du hver uke {hvor} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.prosentAvNormalt': 'Hvor mange prosent jobber du {hvor} i perioden?',
        'arbeidIPeriode.spørsmål.ANSATT.arbeidsuker':
            'Oppgi hvor mange timer du jobber {hvor} i hver enkeltuke i perioden?',
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

const arbeidIPeriodeSvarAlternativer = {
    nb: {
        'arbeidIPeriode.erLiktHverUke.ja': 'Ja',
        'arbeidIPeriode.erLiktHverUke.nei': 'Nei, det varierer',
        'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke': 'Jeg jobber ikke',
        'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
        'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig':
            'Jeg jobber som normalt, og har ikke fravær på grunn av pleiepenger',
        'arbeidIPeriode.timerEllerProsent.timer': 'I timer',
        'arbeidIPeriode.timerEllerProsent.prosent': 'I prosent',
    },
};

const nb = {
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
        'Nå trenger vi å vite hvor mange timer du jobber som frilanser i søknadsperioden.',
    'step.arbeidstid.pageTitle': 'Pleiepengesøknad - opplysninger om arbeidstid',
    'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
    'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',

    'arbeidIPeriode.StepInfo.1':
        'Her skal du svare på om du jobber noe i perioden du søker om. Altså om du kombinerer pleiepenger med delvis jobb.',
    'arbeidIPeriode.StepInfo.2':
        'Pleiepengene graderes mot den tiden du jobber. Det vil si at hvis du for eksempel i søknadsperioden jobber 30 prosent, kan du ha rett til opptil 70 prosent pleiepenger.',
    'arbeidIPeriode.StepInfo.3':
        'Hvis du søker for første gang, eller du har hatt et opphold i pleiepengene i minst fire uker, vil vi kontakte arbeidsgivere som du har helt eller delvis fravær fra for å innhente inntektsmelding.',

    'arbeidIPeriode.redusert.info.tekst':
        'Hvis du er usikker på hvor mye du skal jobbe fremover i tid, legger du inn slik du tror du skal jobbe. Hvis det senere viser seg at du jobber mer eller mindre av hva du tror nå, melder du fra om endring i slutten av den aktuelle måneden.',

    'arbeidIPeriode.redusert.endring.tittel': 'Hvordan melder jeg fra om endring?',
    'arbeidIPeriode.redusert.endring.arb_frilans.tekst':
        'Du sender endringsmelding for pleiepenger som du finner under «Skjema og søknad» på nav.no, eller på «Dine pleiepenger» på innlogget side. I endringsmeldingen kan du enkelt registrere hvor mye du har jobbet.',
    'arbeidIPeriode.redusert.endring.sn.tekst':
        'Du sender en melding med hvor mye du har jobbet via «Skriv til oss»-tjenesten på innlogget side.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const arbeidIPeriodeMessages = {
    nb,
    nn,
};
