const nb = {
    'application.title': 'Søknad om pleiepenger for sykt barn',
    HvaBetyrDette: 'Hva betyr dette?',

    uke: 'uke',
    Uke: 'Uke',
    måned: 'måned',
    Måned: 'Måned',

    mandag: 'mandag',
    tirsdag: 'tirsdag',
    onsdag: 'onsdag',
    torsdag: 'torsdag',
    fredag: 'fredag',

    monday: 'mandag',
    tuesday: 'tirsdag',
    wednesday: 'onsdag',
    thursday: 'torsdag',
    friday: 'fredag',

    'mandag.caps': 'Mandag',
    'tirsdag.caps': 'Tirsdag',
    'onsdag.caps': 'Onsdag',
    'torsdag.caps': 'Torsdag',
    'fredag.caps': 'Fredag',

    Mandag: 'Mandag',
    Tirsdag: 'Tirsdag',
    Onsdag: 'Onsdag',
    Torsdag: 'Torsdag',
    Fredag: 'Fredag',

    Mandager: 'Mandager',
    Tirsdager: 'Tirsdager',
    Onsdager: 'Onsdager',
    Torsdager: 'Torsdager',
    Fredager: 'Fredager',

    'dagerMedTid.uke': 'Uke {uke}',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dager registrert',

    'timer.ikkeTall': '{timer} timer',
    timerPerUke: '{timer, plural, one {# time} other {# timer}} per uke',

    'arbeidsperiode.avsluttet': 'Periode: {fra} - {til}',
    'arbeidsperiode.pågående': 'Periode: {fra} - pågående',

    'apiValidationError.tittel': 'Her har det skjedd en feil',

    'barnRelasjon.MOR': 'Mor',
    'barnRelasjon.MEDMOR': 'Medmor',
    'barnRelasjon.FOSTERFORELDER': 'Fosterforelder',
    'barnRelasjon.FAR': 'Far',
    'barnRelasjon.ANNET': 'Annet',

    'arbeidsgiver.tittel': '{navn} (organisasjonsnummer {organisasjonsnummer})',
    'frilans.tittel': 'Frilans og oppdrag som regnes som frilansoppdrag',
    'selvstendigNæringsdrivende.tittel': 'Selvstendig næringsdrivende',

    'page.unavailable.1':
        'Den digitale pleiepengesøknaden er dessverre ikke tilgjengelig akkurat nå. Vi jobber med saken, slik at du kan søke digitalt. Frem til vi får fikset dette, kan du fylle ut vårt',
    'page.unavailable.2': 'papirskjema for pleiepenger sykt barn',
    'page.unavailable.3': 'Vi beklager.',

    'page.generalErrorPage.sidetittel': 'Feil',
    'page.generalErrorPage.tittel': 'Noe gikk galt...',
    'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',

    'page.invalidStepPage.sidetittel': 'Oops, nå skjedde det en feil...',
    'page.invalidStepPage.tittel': 'Oops, nå skjedde det en feil...',
    'page.invalidStepPage.tekst':
        'Du er kommet til en side du ikke trenger å fylle ut. Dette kan skje hvis du går frem og tilbake i søknaden gjennom pilene i nettleseren (pilene helt øverst til venstre på siden). Du unngår dette problemet hvis du heller bruker knapper og lenker som ligger inne i selve søknaden for å gå frem eller tilbake.',
    'page.invalidStepPage.tilbakeLenke': 'Gå tilbake til forrige side',

    'page.ikkeTilgang.tekst':
        'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
    'page.ikkeTilgang.lastNed': 'Her kan du laste ned papirsøknaden',

    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',
    'validation.omsorgsstønad.mottarOmsorgsstønad.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mottar omsorgsstønad.',
    'validation.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mottar fosterhjemsgodtgjørelse.',
    'validation.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.noValue':
        'Du må svare ja eller nei på om du er frikjøpt fra jobb',
    'validation.fosterhjemsgodtgjørelse.frikjøptArbeidsgivere.listHasTooFewItems':
        'Du må velge hvilken arbeidsgiver du er frikjøpt fra',
    'validation.fosterhjemsgodtgjørelse.frikjøptArbeidsgivere.listIsEmpty':
        'Du må velge hvilken arbeidsgiver du er frikjøpt fra',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent.noValue':
        'Du må svare på om du ønsker å oppgi hvor mye du er frikjøpt i timer eller prosent',
    'validation.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden.noValue':
        'Du må svare på hvordan du mottar denne godtgjørelsen gjennom hele perioden du søker om.',

    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberHasNoValue':
        'Du må oppgi hvor mange prosent du er frikjøpt',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberHasInvalidFormat':
        'Oppgitt prosent for hvor mye du er frikjøpt har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberIsTooSmall':
        'Oppgitt prosent for hvor mye du er frikjøpt kan ikke være mindre enn {min}.',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberIsTooLarge':
        'Oppgitt prosent for hvor mye du er frikjøpt kan ikke være mer enn enn {max}.',
    'validation.fosterhjemsgodtgjørelse.slutterUnderveis.starter_slutter_undeveis_nei':
        'Du har svart nei på både om godtgjørelsen starter og slutter underveis i perioden du søker for. Da må du svare Ja på at du mottar denne godtgjørelsen for hele perioden du søker om.',

    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberHasNoValue': 'Du må oppgi hvor mange timer du er frikjøpt',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberHasInvalidFormat':
        'Oppgitt antall timer for hvor mye du er frikjøpt har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberIsTooSmall':
        'Oppgitt antall timer for hvor mye du er frikjøpt kan ikke være mindre enn {min}.',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberIsTooLarge':
        'Oppgitt antall timer for hvor mye du er frikjøpt kan ikke være mer enn enn {max}.',

    'validation.fosterhjemsgodtgjørelse.starterUndeveis.noValue':
        'Du må svare på om godtgjørelsen starter underveis i pleiepengeperioden din',
    'validation.fosterhjemsgodtgjørelse.startdato.dateHasNoValue':
        'Du må oppgi hvilken dato godtgjørelsen starter. Skriv inn eller velg dato fra kalenderen.',
    'validation.fosterhjemsgodtgjørelse.startdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når godtgjørelsen starter i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.fosterhjemsgodtgjørelse.startdato.dateIsAfterMax':
        'Datoen for når godtgjørelsen starter kan ikke være etter dagens dato, eller etter perioden du søker for.',
    'validation.fosterhjemsgodtgjørelse.startdato.dateIsBeforeMin':
        'Datoen for når godtgjørelsen starter kan ikke være før perioden du søker for. Dersom den startet før dette, må du svare nei på om den starter underveis i pleiepengeperioden.',
    'validation.fosterhjemsgodtgjørelse.startdato.startetEtterSluttDato':
        'Startdatoen for godtgjørelsen kan ikke være etter sluttdatoen. Skriv inn eller velg dato fra kalenderen.',
    'validation.fosterhjemsgodtgjørelse.startdato.sluttetFørStartDato':
        'Sluttdatoen for godtgjørelsen kan ikke være før startdatoen. Skriv inn eller velg dato fra kalenderen.',

    'validation.fosterhjemsgodtgjørelse.slutterUnderveis.noValue':
        'Du må svare på om godtgjørelsen slutter underveis i pleiepengeperioden din',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateHasNoValue':
        'Du må oppgi hvilken dato godtgjørelsen slutter. Skriv inn eller velg dato fra kalenderen.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når godtgjørelsen slutter i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateIsAfterMax':
        'Hvis datoen for når godtgjørelsen slutter er etter perioden du søker for, må du svare nei på om den slutter underveis i pleiepengeperioden.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateIsBeforeMin':
        'Datoen for når godtgjørelsen slutter kan ikke være før perioden du søker for, eller før godtgjørelsen starter.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.sluttetFørStartDato':
        'Datoen for når godtgjørelsen slutter kan ikke være før godtgjørelsen starter.',

    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er ansatt hos {navn} i perioden du søker pleiepenger.',
    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du sluttet hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasNoValue':
        'Du må oppgi hvor mange timer du {jobber} per uke {hvor} i perioden når du ikke har fravær på grunn av pleiepenger.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasInvalidFormat':
        'Antall timer du normalt {jobber} per uke {hvor} har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooSmall':
        'Antall timer du normalt {jobber} per uke {hvor} kan ikke være mindre enn {min}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooLarge':
        'Antall timer du normalt {jobber} per uke {hvor} kan ikke være mer enn {max}.',
    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du jobber som frilanser, eller om du mottar honorar.',
    'validation.frilans.frilanstype.notChecked': 'Du må velge hva som er din situasjon som frilanser.',
    'validation.frilans.misterHonorar.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mister honorar i perioden du søker for.',
    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgi hvilken dato du startet å jobbe som frilanser. Skriv inn eller velg dato fra kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du startet å jobbe som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du startet å jobbe som frilanser kan ikke være etter dagens dato.',
    'validation.frilans.startdato.dateIsBeforeMin':
        'Datoen for når du startet å jobbe som frilanser kan ikke være før {minDato}. Dersom du startet før dette, må du svare ja på at du startet før denne datoen.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        'Du har oppgitt at du startet å jobbe som frilanser etter perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        'Du har oppgitt at du sluttet å jobbe som frilanser før perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgi hvilken dato du sluttet å jobbe som frilanser. Skriv inn eller velg dato fra kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgi datoen for når du sluttet å jobbe som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du sluttet å jobbe som frilanser kan ikke være etter dagens dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du sluttet å jobbe som frilanser kan ikke være før datoen du startet.',
    'validation.frilans.startetFørSisteTreHeleMåneder.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du startet som frilanser før {dato}.',
    'validation.frilans.erFortsattFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du fortsatt jobber som frilanser.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er selvstendig næringsdrivende i perioden du søker for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har flere enn én virksomhet som er aktiv.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgi informasjon om virksomheten din som selvstendig næringsdrivende.',
    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du utøvde verneplikt på tidspunktet du søker pleiepenger fra.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        'Du har oppgitt at du startet som selvstendig næringsdrivende etter perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        'Du har oppgitt at du sluttet som selvstendig næringsdrivende før perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',
    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før første dag med pleiepenger.',
    'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i et annet EØS-land.',
    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om.',
    'validation.utenlandskNæring.listIsEmpty':
        'Du må legge til jobb som selvstendig næringsdrivende i et annet EØS-land.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',

    'validation.omsorgsstønad.mottarOmsorgsstønadIHelePerioden.noValue':
        'Du må svare ja eller nei på om du mottar stønad/godtgjørelse i hele perioden du søker for.',
    'validation.omsorgsstønad.starterUndeveis.noValue':
        'Du må svare Ja eller Nei på om du starter å motta stønad/godtgjørelse underveis i perioden du søker for.',
    'validation.omsorgsstønad.starterUndeveis.starter_slutter_undeveis_nei':
        'Du kan ikke svare Nei samtidig på om du starter og slutter  å motta stønad/godtgjørelse underveis.',
    'validation.omsorgsstønad.slutterUnderveis.noValue':
        'Du må svare Ja eller Nei på om du slutter å motta stønad/godtgjørelse underveis i perioden du søker for.',
    'validation.omsorgsstønad.slutterUnderveis.starter_slutter_undeveis_nei':
        'Du kan ikke svare Nei både på at du starter og at du slutter å få stønad/godtgjørelse underveis.',
    'validation.omsorgsstønad.startdato.dateHasNoValue': 'Du må fylle ut dato når du startet å motta omsorgsstønad.',
    'validation.omsorgsstønad.startdato.dateIsAfterMax':
        'Start datoen kan ikke være etter søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.omsorgsstønad.startdato.dateIsBeforeMin':
        'Start datoen kan ikke være før søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.omsorgsstønad.startdato.dateHasInvalidFormat':
        'Du må oppgi start datoen i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.omsorgsstønad.sluttdato.dateHasNoValue': 'Du må fylle ut dato når du sluttet å motta omsorgsstønad.',
    'validation.omsorgsstønad.sluttdato.dateIsAfterMax':
        'Sluttdatoen kan ikke være etter søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.omsorgsstønad.sluttdato.dateIsBeforeMin':
        'Sluttdatoen kan ikke være før søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.omsorgsstønad.sluttdato.dateHasInvalidFormat':
        'Du må oppgi sluttdatoen i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.omsorgsstønad.startdato.startetEtterSluttDato':
        'Startdatoen for omsorgstønad kan ikke være etter sluttdatoen. Skriv inn eller velg dato fra kalenderen.',
    'validation.omsorgsstønad.sluttdato.sluttetFørStartDato':
        'Sluttdatoen for omsorgstønad kan ikke være før startdatoen. Skriv inn eller velg dato fra kalenderen.',

    'validation.omsorgsstønad.antallTimer.numberHasNoValue':
        'Du må oppgi antall timer du mottar normalt i omsorgsstønad.',
    'validation.omsorgsstønad.antallTimer.numberHasInvalidFormat':
        'Oppgitt antall timer for hvor mye du mottar normalt i omsorgsstønad har ikke gyldig format. Et gyldig tall inneholder kun siffer og komma som desimaltegn.',
    'validation.omsorgsstønad.antallTimer.numberIsTooSmall':
        'Oppgitt antall timer for hvor mye du mottar normalt i omsorgsstønad kan ikke være mindre enn {min}.',
    'validation.omsorgsstønad.antallTimer.numberIsTooLarge':
        'Oppgitt antall timer for hvor mye du mottar normalt i omsorgsstønad kan ikke være mer enn enn {max}.',

    'psb.timer': '{timer, plural, one {# time} other {# timer}}',
    'psb.minutter': '{minutter, plural, one {# minutt} other {# minutter}}',
    'psb.timerOgMinutter':
        '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    'application.title': 'Søknad om pleiepengar for sjukt barn',
    HvaBetyrDette: 'Kva tyder dette?',

    uke: 'veke',
    Uke: 'Veke',
    måned: 'månad',
    Måned: 'Månad',

    mandag: 'måndag',
    tirsdag: 'tysdag',
    onsdag: 'onsdag',
    torsdag: 'torsdag',
    fredag: 'fredag',

    monday: 'måndag',
    tuesday: 'tysdag',
    wednesday: 'onsdag',
    thursday: 'torsdag',
    friday: 'fredag',

    'mandag.caps': 'Måndag',
    'tirsdag.caps': 'Tysdag',
    'onsdag.caps': 'Onsdag',
    'torsdag.caps': 'Torsdag',
    'fredag.caps': 'Fredag',

    Mandag: 'Måndag',
    Tirsdag: 'Tysdag',
    Onsdag: 'Onsdag',
    Torsdag: 'Torsdag',
    Fredag: 'Fredag',

    Mandager: 'Måndagar',
    Tirsdager: 'Tysdagar',
    Onsdager: 'Onsdagar',
    Torsdager: 'Torsdagar',
    Fredager: 'Fredagar',

    'dagerMedTid.uke': 'Veke {uke}',
    'dagerMedTid.ingenDagerRegistrert': 'Ingen dagar registrerte',

    'timer.ikkeTall': '{timer} timar',
    timerPerUke: '{timer, plural, one {# time} other {# timar}} per veke',

    'arbeidsperiode.avsluttet': 'Periode: {fra} - {til}',
    'arbeidsperiode.pågående': 'Periode: {fra} - pågåande',

    'apiValidationError.tittel': 'Her har det skjedd ein feil',

    'barnRelasjon.MOR': 'Mor',
    'barnRelasjon.MEDMOR': 'Medmor',
    'barnRelasjon.FOSTERFORELDER': 'Fosterforelder',
    'barnRelasjon.FAR': 'Far',
    'barnRelasjon.ANNET': 'Anna',

    'arbeidsgiver.tittel': '{navn} (organisasjonsnummer {organisasjonsnummer})',
    'frilans.tittel': 'Frilans og oppdrag som blir rekna som frilansoppdrag',
    'selvstendigNæringsdrivende.tittel': 'Sjølvstendig næringsdrivande',

    'page.unavailable.1':
        'Den digitale pleiepengesøknaden er dessverre ikkje tilgjengeleg akkurat no. Me jobbar med saka, slik at du kan søkje digitalt. Fram til me får fiksa dette, kan du fylle ut vårt',
    'page.unavailable.2': 'papirskjema for pleiepengar sjukt barn',
    'page.unavailable.3': 'Me beklagar.',

    'page.generalErrorPage.sidetittel': 'Feil',
    'page.generalErrorPage.tittel': 'Noko gjekk gale...',
    'page.generalErrorPage.tekst': 'Beklagar, her har det dessverre skjedd ein feil.',

    'page.invalidStepPage.sidetittel': 'Oops, no skjedde det ein feil...',
    'page.invalidStepPage.tittel': 'Oops, no skjedde det ein feil...',
    'page.invalidStepPage.tekst':
        'Du har kome til ei side du ikkje treng å fylle ut. Dette kan skje om du går fram og tilbake i søknaden gjennom pilene i nettlesaren (pilene heilt øvst til venstre på sida). Du unngår dette problemet om du heller brukar knappane og lenkjene i sjølve søknaden for å gå fram eller tilbake.',
    'page.invalidStepPage.tilbakeLenke': 'Gå tilbake til førre side',

    'page.ikkeTilgang.tekst':
        'Du har ikkje tilgang til denne sida. Dersom du er under 18 år, må ein av foreldra dine eller ein føresett skrive under på søknaden saman med deg. Du må derfor fylle ut søknaden på papir og sende han i posten.',
    'page.ikkeTilgang.lastNed': 'Her kan du laste ned papirsøknaden',

    'validation.harForståttRettigheterOgPlikter.notChecked':
        'Du må stadfeste at du har lese og forstått pliktene dine.',
    'validation.omsorgsstønad.mottarOmsorgsstønad.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mottek omsorgsstønad eller fosterheimgodtgjersle.',
    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er tilsett hos {navn} i perioden du søkjer pleiepengar.',
    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du slutta hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasNoValue':
        'Du må oppgje kor mange timar du {jobber} per veke {hvor} i perioden når du ikkje har fråvær på grunn av pleiepengar.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasInvalidFormat':
        'Antall timar du normalt {jobber} per veke {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalskiljeteikn.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooSmall':
        'Antall timar du normalt {jobber} per veke {hvor} kan ikkje vere mindre enn {min}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooLarge':
        'Antall timar du normalt {jobber} per veke {hvor} kan ikkje vere meir enn {max}.',
    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du jobbar som frilanser, eller om du mottek honorar.',
    'validation.frilans.frilanstype.notChecked': 'Du må velje kva som er situasjonen din som frilanser.',
    'validation.frilans.misterHonorar.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mistar honorar i perioden du søkjer for.',
    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgje kva dato du starta å jobbe som frilanser. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når du starta å jobbe som frilanser i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du starta å jobbe som frilanser kan ikkje vere etter dagens dato.',
    'validation.frilans.startdato.dateIsBeforeMin':
        'Datoen for når du starta å jobbe som frilanser kan ikkje vere før {minDato}. Dersom du starta før dette, må du svare ja på at du starta før denne datoen.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        'Du har oppgitt at du starta å jobbe som frilanser etter perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søkjer for.',
    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        'Du har oppgitt at du slutta å jobbe som frilanser før perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søkjer for.',
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgje kva dato du slutta å jobbe som frilanser. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når du slutta å jobbe som frilanser i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du slutta å jobbe som frilanser kan ikkje vere etter dagens dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du slutta å jobbe som frilanser kan ikkje vere før datoen du starta.',
    'validation.frilans.startetFørSisteTreHeleMåneder.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du starta som frilanser før {dato}.',
    'validation.frilans.erFortsattFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du framleis jobbar som frilanser.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har fleire enn éi verksemd som er aktiv.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgje informasjon om verksemda di som sjølvstendig næringsdrivande.',
    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du utførte verneplikt på tidspunktet du søkjer pleiepengar frå.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        'Du har oppgitt at du starta som sjølvstendig næringsdrivande etter perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        'Du har oppgitt at du slutta som sjølvstendig næringsdrivande før perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobba som arbeidstakar eller frilanser i eit anna EØS-land i løpet av dei 3 siste månadene før første dag med pleiepengar.',
    'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i eit anna EØS-land.',
    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden du søkjer om.',
    'validation.utenlandskNæring.listIsEmpty':
        'Du må legge til jobb som sjølvstendig næringsdrivande i eit anna EØS-land.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gitt er riktige.',
    'validation.omsorgsstønad.mottarOmsorgsstønadIHelePerioden.noValue':
        'Du må svare ja eller nei på om du mottek stønad/godtgjersle i heile perioden du søkjer for.',
    'validation.omsorgsstønad.starterUndeveis.noValue':
        'Du må svare ja eller nei på om du startar å motta stønad/godtgjersle undervegs i perioden du søkjer for.',
    'validation.omsorgsstønad.starterUndeveis.starter_slutter_undeveis_nei':
        'Du kan ikkje svare "Nei" både på om du startar og sluttar å motta stønad/godtgjersle undervegs.',
    'validation.omsorgsstønad.slutterUnderveis.noValue':
        'Du må svare ja eller nei på om du sluttar å motta stønad/godtgjersle undervegs i perioden du søkjer for.',
    'validation.omsorgsstønad.slutterUnderveis.starter_slutter_undeveis_nei':
        'Du kan ikkje svare "Nei" både på at du startar og at du sluttar å få stønad/godtgjersle undervegs.',
    'validation.omsorgsstønad.startdato.dateHasNoValue':
        'Du må fylle ut dato når du starta å motta omsorgsstønad eller fosterheimgodtgjersle.',
    'validation.omsorgsstønad.startdato.dateIsAfterMax':
        'Startdatoen kan ikkje vere etter søknadsperioden. Skriv inn eller vel dato frå kalenderen.',
    'validation.omsorgsstønad.startdato.dateIsBeforeMin':
        'Startdatoen kan ikkje vere før søknadsperioden. Skriv inn eller vel dato frå kalenderen.',
    'validation.omsorgsstønad.startdato.dateHasInvalidFormat':
        'Du må oppgje startdatoen i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.omsorgsstønad.startdato.startetEtterSluttDato':
        'Startdatoen kan ikkje vere etter sluttdatoen. Skriv inn eller vel dato frå kalenderen.',
    'validation.omsorgsstønad.sluttdato.dateHasNoValue':
        'Du må fylle ut dato når du slutta å motta omsorgsstønad eller fosterheimgodtgjersle.',
    'validation.omsorgsstønad.sluttdato.dateIsAfterMax':
        'Sluttdatoen kan ikkje vere etter søknadsperioden. Skriv inn eller vel dato frå kalenderen.',
    'validation.omsorgsstønad.sluttdato.dateIsBeforeMin':
        'Sluttdatoen kan ikkje vere før søknadsperioden. Skriv inn eller vel dato frå kalenderen.',
    'validation.omsorgsstønad.sluttdato.dateHasInvalidFormat':
        'Du må oppgje sluttdatoen i eit gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.omsorgsstønad.sluttdato.sluttetFørStartDato':
        'Sluttdatoen kan ikkje vere før startdatoen. Skriv inn eller vel dato frå kalenderen.',

    'psb.timer': '{timer, plural, one {# time} other {# timer}}',
    'psb.minutter': '{minutter, plural, one {# minutt} other {# minuttar}}',
    'psb.timerOgMinutter':
        '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minuttar}}',
};
export const appCommonMessages = {
    nb,
    nn,
};
