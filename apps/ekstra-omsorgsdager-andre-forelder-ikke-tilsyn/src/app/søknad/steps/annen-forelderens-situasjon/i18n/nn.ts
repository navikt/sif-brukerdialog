/* eslint-disable max-len */
import { annenForelderenSituasjonMessages_nb } from './nb';

export const annenForelderenSituasjonMessages_nn: Record<keyof typeof annenForelderenSituasjonMessages_nb, string> = {
    'step.annenForeldrensSituasjon.banner.1':
        'Her skal du gje informasjon om kva som er grunnen til at den andre forelderen ikkje kan ha tilsyn med barn i ein periode på minst 6 månadar.',

    'grunn.SYKDOM': 'Sjukdom, skade eller funksjonshemming',
    'grunn.INNLAGT_I_HELSEINSTITUSJON': 'Innlagd i helseinstitusjon',
    'grunn.FENGSEL': 'Fengsel',
    'grunn.UTØVER_VERNEPLIKT': 'Utøver verneplikt',
    'grunn.ANNET': 'Anna',

    'step.annenForeldrensSituasjon.grunn.spm':
        'Vel ein av desse grunnane til at den andre forelderen ikkje kan ha tilsyn med barn i ein periode på 6 månadar:',
    'step.annenForeldrensSituasjon.grunn.sykdom': 'Sjukdom, skade eller funksjonshemming',
    'step.annenForeldrensSituasjon.grunn.innlagtIHelseinstitusjon': 'Innlagd i helseinstitusjon',
    'step.annenForeldrensSituasjon.grunn.fengsel': 'Fengsel',
    'step.annenForeldrensSituasjon.grunn.utøverVerneplikt': 'Verneplikt',
    'step.annenForeldrensSituasjon.grunn.annet': 'Anna',
    'step.annenForeldrensSituasjon.grunn.annet.info':
        'For å få ekstra omsorgsdagar fordi den andre forelderen ikkje kan ha tilsyn med barn, må det skuldast forhold utanfor eigen kontroll. Dersom forelderen er mykje borte på grunn av jobb eller studiar, gir ikkje dette rett til ekstra omsorgsdagar.',

    'step.annenForeldrensSituasjon.beskrivelseAvSituasjonen.spm':
        'Skildr kva som gjer at den andre forelderen ikkje kan ha tilsyn med barn:',

    'step.annenForeldrensSituasjon.erVarighetMerEnn6Maneder.spm': 'Er perioden på minst 6 månadar?',

    'step.annenForeldrensSituasjon.periode.SYKDOM.spm':
        'I kva periode er den andre forelderen ute av stand til å ha tilsyn med barn?',
    'step.annenForeldrensSituasjon.periode.INNLAGT_I_HELSEINSTITUSJON.spm': 'I kva periode gjeld innlegginga?',
    'step.annenForeldrensSituasjon.periode.FENGSEL.spm': 'I kva periode gjeld soninga i fengsel?',
    'step.annenForeldrensSituasjon.periode.UTØVER_VERNEPLIKT.spm': 'I kva periode blir verneplikta utført?',
    'step.annenForeldrensSituasjon.periode.ANNET.spm': 'I kva periode gjeld dette?',

    'step.annenForeldrensSituasjon.periode.fra': 'Frå',
    'step.annenForeldrensSituasjon.periode.til': 'Til',

    'step.annenForeldrensSituasjon.periode.checkboxVetIkkeTom': 'Eg veit ikkje kor lenge perioden vil vare',

    'step.annenForeldrensSituasjon.vetLengdePåInnleggelseperioden.spm':
        'Er det avklart kor lenge innlegginga skal vare?',
    'step.annenForeldrensSituasjon.advarsel.1':
        'Dersom perioden den andre forelderen ikkje kan ha tilsyn med barn er på mindre enn 6 månadar, kan du få avslag på søknaden.',

    'step.annenForeldrensSituasjon.nextButtonLabel': 'Hald fram',

    'validation.annenForelderSituasjonBeskrivelse.stringHasNoValue':
        'Skriv inn kva som gjer at den andre forelderen ikkje kan ha tilsyn med barn.',
    'validation.annenForelderSituasjonBeskrivelse.stringIsTooLong':
        'Skildringa av kva som gjer at den andre forelderen ikkje kan ha tilsyn med barn, kan ikkje innehalde fleire enn {maks} teikn.',
    'validation.annenForelderSituasjonBeskrivelse.stringIsTooShort':
        'Skildringa av kva som gjer at den andre forelderen ikkje kan ha tilsyn med barn, må innehalde minst {min} teikn.',
    'validation.annenForelderSituasjonBeskrivelse.stringHasInvalidCharacters':
        'Skildringa inneheld ugyldige teikn. Ugyldige teikn kan til dømes vere emojar, spesialteikn som « », §, @, eller skjulte formateringsteikn som innrykk, tabulatorar og listeformatering. Dette kan mellom anna oppstå dersom tekst vert kopiert frå andre stader. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',

    'validation.annenForelderPeriodeFom.dateHasNoValue.SYKDOM':
        'Du må oppgje frå kva dato den andre forelderen ikkje kan ta seg av barn.',
    'validation.annenForelderPeriodeFom.dateHasNoValue.INNLAGT_I_HELSEINSTITUSJON':
        'Du må oppgje frå kva dato innlegginga gjeld.',
    'validation.annenForelderPeriodeFom.dateHasNoValue.FENGSEL': 'Du må oppgje frå kva dato soninga i fengsel gjeld.',
    'validation.annenForelderPeriodeFom.dateHasNoValue.UTØVER_VERNEPLIKT':
        'Du må oppgje frå kva dato verneplikta blir utført.',
    'validation.annenForelderPeriodeFom.dateHasNoValue.ANNET':
        'Du må oppgje frå kva dato den andre forelderen ikkje kan ta seg av barn.',

    'validation.annenForelderPeriodeFom.fromDateIsAfterToDate.SYKDOM':
        'Frå-datoen kan ikkje vere seinare enn til-datoen.',
    'validation.annenForelderPeriodeFom.fromDateIsAfterToDate.INNLAGT_I_HELSEINSTITUSJON':
        'Frå-datoen kan ikkje vere seinare enn til-datoen.',
    'validation.annenForelderPeriodeFom.fromDateIsAfterToDate.FENGSEL':
        'Frå-datoen kan ikkje vere seinare enn til-datoen.',
    'validation.annenForelderPeriodeFom.fromDateIsAfterToDate.UTØVER_VERNEPLIKT':
        'Frå-datoen kan ikkje vere seinare enn til-datoen.',
    'validation.annenForelderPeriodeFom.fromDateIsAfterToDate.ANNET':
        'Frå-datoen kan ikkje vere seinare enn til-datoen.',

    'validation.annenForelderPeriodeFom.dateHasInvalidFormat.SYKDOM':
        'Du må oppgje frå kva dato den andre forelderen ikkje kan ha tilsyn med barn i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeFom.dateHasInvalidFormat.INNLAGT_I_HELSEINSTITUSJON':
        'Du må oppgje frå kva dato innlegginga gjeld i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeFom.dateHasInvalidFormat.FENGSEL':
        'Du må oppgje frå kva dato soninga i fengsel gjeld i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeFom.dateHasInvalidFormat.UTØVER_VERNEPLIKT':
        'Du må oppgje frå kva dato verneplikta blir utført i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeFom.dateHasInvalidFormat.ANNET':
        'Du må oppgje frå kva dato den andre forelderen ikkje kan ha tilsyn med barn i eit gyldig format. Gyldig format er dd.mm.åååå.',

    'validation.annenForelderPeriodeTom.dateHasNoValue.SYKDOM':
        'Du må oppgje til kva dato den andre forelderen ikkje kan ta seg av barn.',
    'validation.annenForelderPeriodeTom.dateHasNoValue.INNLAGT_I_HELSEINSTITUSJON':
        'Du må oppgje til kva dato innlegginga gjeld.',
    'validation.annenForelderPeriodeTom.dateHasNoValue.FENGSEL': 'Du må oppgje til kva dato soninga i fengsel gjeld.',
    'validation.annenForelderPeriodeTom.dateHasNoValue.UTØVER_VERNEPLIKT':
        'Du må oppgje til kva dato verneplikta blir utført.',
    'validation.annenForelderPeriodeTom.dateHasNoValue.ANNET':
        'Du må oppgje til kva dato den andre forelderen ikkje kan ta seg av barn.',

    'validation.annenForelderPeriodeTom.toDateIsBeforeFromDate.SYKDOM':
        'Til-datoen kan ikkje vere tidlegare enn frå-datoen.',
    'validation.annenForelderPeriodeTom.toDateIsBeforeFromDate.INNLAGT_I_HELSEINSTITUSJON':
        'Til-datoen kan ikkje vere tidlegare enn frå-datoen.',
    'validation.annenForelderPeriodeTom.toDateIsBeforeFromDate.FENGSEL':
        'Til-datoen kan ikkje vere tidlegare enn frå-datoen.',
    'validation.annenForelderPeriodeTom.toDateIsBeforeFromDate.UTØVER_VERNEPLIKT':
        'Til-datoen kan ikkje vere tidlegare enn frå-datoen.',
    'validation.annenForelderPeriodeTom.toDateIsBeforeFromDate.ANNET':
        'Til-datoen kan ikkje vere tidlegare enn frå-datoen.',

    'validation.annenForelderPeriodeTom.dateHasInvalidFormat.SYKDOM':
        'Du må oppgje til kva dato den andre forelderen ikkje kan ha tilsyn med barn i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeTom.dateHasInvalidFormat.INNLAGT_I_HELSEINSTITUSJON':
        'Du må oppgje til kva dato innlegginga gjeld i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeTom.dateHasInvalidFormat.FENGSEL':
        'Du må oppgje til kva dato soninga i fengsel gjeld i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeTom.dateHasInvalidFormat.UTØVER_VERNEPLIKT':
        'Du må oppgje til kva dato verneplikta blir utført i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.annenForelderPeriodeTom.dateHasInvalidFormat.ANNET':
        'Du må oppgje til kva dato den andre forelderen ikkje kan ha tilsyn med barn i eit gyldig format. Gyldig format er dd.mm.åååå.',

    'validation.annenForelderPeriodeMer6Maneder.yesOrNoIsUnanswered':
        'Du må svare på om perioden er på minst 6 månadar eller ikkje.',
};
