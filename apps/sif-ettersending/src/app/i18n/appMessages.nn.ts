import { appMessagesNB } from './appMessages.nb';

export const appMessagesNN: Record<keyof typeof appMessagesNB, string> = {
    'step.button.gåVidere': 'Gå vidare',
    'page.form.ubesvarteSpørsmålInfo': 'For å kome vidare må du svare på spørsmålet ovanfor.',

    'ettersendelse.samtykkeForm.submitButtonLabel': 'Start ettersending',

    'banner.title': 'Ettersending av dokument',

    'søknadstype.pleiepenger': 'pleiepengesøknad',
    'søknadstype.omsorgspenger': 'omsorgspengesøknad',
    'søknadstype.pleiepengerLivetsSluttfase': 'pleiepengar i livets sluttfase',

    'banner.intro': 'Ettersending av dokumentasjon',

    'application.title': 'Ettersending av dokumentasjon',
    'application.title.pleiepenger': 'Ettersending av dokumentasjon til søknad om pleiepengar for sjukt barn',
    'application.title.pleiepengerLivetsSluttfase':
        'Ettersending av dokumentasjon til søknad om pleiepengar i livets sluttfase',
    'application.title.omsorgspenger': 'Ettersending av dokumentasjon for omsorgspengar',
    'application.title.ekstraomsorgsdager':
        'Ettersending av dokumentasjon til søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemming',
    'application.title.utbetaling':
        'Ettersending av dokumentasjon til søknad om utbetaling av omsorgspengar for sjølvstendig næringsdrivande og frilansarar',
    'application.title.utbetalingarbeidstaker':
        'Ettersending av dokumentasjon til søknad om utbetaling av omsorgspengar når arbeidsgjevar ikkje betaler ut',
    'application.title.regnetsomalene':
        'Ettersending av dokumentasjon til søknad om ekstra omsorgsdagar når den andre forelderen ikkje kan passe barnet',
    'application.title.opplaringspenger': 'Ettersending av dokumentasjon til søknad om opplæringspengar',

    'modal.personopplysninger.dialogtittel': 'Slik handsamar Nav personopplysningane dine',
    'modal.personopplysninger.1': 'Slik handsamar Nav personopplysningane dine',
    'modal.personopplysninger.2':
        'Me  innhentar og mottek opplysningar om deg for å handsame saka di. Det er naudsynt for at du skal få rett teneste. Delar av saka di kan bli handsama automatisk.',
    'modal.personopplysninger.3': 'Kva opplysningar hentar vi inn?',
    'modal.personopplysninger.4': 'Opplysningane vi hentar inn kjem anten frå deg eller frå offentlege register:',
    'modal.personopplysninger.4.1': 'kva barn du er registrert som forelder til',
    'modal.personopplysninger.4.1.pleiepengerLivetsSluttfase': 'opplysningar om helsa til den du skal pleie',
    'modal.personopplysninger.4.2': 'opplysninger om barnet si helse',
    'modal.personopplysninger.4.3': 'arbeidsforholda dine og inntekta di',
    'modal.personopplysninger.4.4': 'ytingar du mottar frå Nav',
    'modal.personopplysninger.4.5': 'tilknytinga di til Noreg',
    'modal.personopplysninger.4.6':
        'trygdeordningar du kan ha rett til i andre land. Me kan også senda opplysningar om deg til trygdestyresmakter i andre land.',
    'modal.personopplysninger.4.7':
        'Me lagrar opplysningar me får inn om personen du søkjer pleiepengar for. Dette gjer me for å kunne bruke opplysningane om att viss andre søkjer pleiepengar for same person.',
    'modal.personopplysninger.5.1': 'Vil du vite meir om korleis Nav handsamar personopplysningar? Sjå ',
    'modal.personopplysninger.5.2': 'nav.no/personvern',
    'modal.personopplysninger.5.3': '.',

    'modal.minePlikter.tittel': 'Mine plikter',
    'modal.minePlikter.part1': 'Eg forstår at det kan få konsekvensar for retten min til {søknadstype} dersom eg',
    'modal.minePlikter.part1a': 'gjev uriktige opplysningar eller',
    'modal.minePlikter.part1b': 'held tilbake opplysningar',
    'modal.minePlikter.part2': 'Eg har lese og forstått det som står på <Lenke>nav.no/rettogplikt</Lenke>.',

    'step.nextButtonLabel': 'Neste steg',
    'step.previousButtonLabel': 'Førre steg',
    'step.sendButtonLabel': 'Send inn',
    'step.sendButtonAriaLabel': 'Send inn',

    'step.beskrivelse.stepTitle': 'Ettersending av dokumentasjon',
    'step.beskrivelse.stepIndicatorLabel': 'Ettersending av dokumentasjon',
    'step.beskrivelse.nextButtonLabel': 'Fortset',
    'step.beskrivelse.hvaSendes.spm': 'Kva skal du ettersende?',
    'step.beskrivelse.intro.1':
        'Her skildrar du kva dokumentasjon du skal sende. Det er òg til hjelp for oss om du fortel at du ettersender fordi:',
    'step.beskrivelse.intro.li.1': 'vi har bede om meir dokumentasjon frå deg, eller',
    'step.beskrivelse.intro.li.2': 'om du ikkje hadde dokumentasjonen klar då du sende inn søknaden',
    'step.beskrivelse.intro.2':
        'Du kan ikkje skrive spørsmål til oss her. Sjå informasjon om korleis du kjem i {kontaktMedOssLink}.',
    'step.beskrivelse.intro.2.1': 'kontakt med oss',

    'step.dokumentType.stepTitle': 'Kva skal du ettersende?',
    'step.dokumentType.stepIndicatorLabel': 'Kva skal du ettersende?',

    'step.dokumentType.info': 'Her skildrar du kva dokumentasjon du skal sende oss.',
    'step.dokumentType.info.1':
        'Dersom ein annan søkjar har sendt inn same dokumentasjon for barnet i perioden du søkjer, treng du ikkje sende inn denne på nytt.',
    'step.dokumentType.info.2':
        'Skal du melde frå om endringar i jobb eller ferie i tillegg til ettersendinga, gå til <Lenke>endringsmelding for pleiepengar sjukt barn</Lenke>.',
    'step.dokumentType.info.3': 'For andre førespurnader, send oss ei melding via <Lenke>skriv til oss</Lenke>.',
    'step.dokumentType.dokumentType.spm': 'Kva skal du ettersende?',
    'step.dokumentType.dokumentType.LEGEERKLÆRING': 'Legeerklæring og andre medisinske opplysningar',
    'step.dokumentType.dokumentType.KURSINFORMASJON': 'Informasjon om kurs',
    'step.dokumentType.dokumentType.ANNET': 'Anna',
    'step.dokumentType.annet.info.1': 'Har vi bede om meir dokumentasjon frå deg?',
    'step.dokumentType.annet.info.2':
        'Ved sida av legeerklæring, er det berre naudsynt å ettersende meir dokumentasjon dersom ein sakshandsamar har bede om noko konkret frå deg.',

    'step.barn.stepTitle': 'Kva barn gjeld ettersendinga?',
    'step.barn.stepIndicatorLabel': 'Kva barn gjeld ettersendinga?',

    'formPart.registrertBarn.spm': 'Vel barnet ettersendinga gjeld',
    'formPart.registrertBarn.spm.description':
        'Vi må vite kva barn ettersendinga gjeld, for å kunne knyte dokumentet til rett sak',
    'formPart.registrertBarn.hvilketBarn.født': 'Fødd {dato}',
    'step.dokumentType.barn.info.tittel': 'Hugs søknad, også ved forlengingar',
    'step.dokumentType.barn.info.1.1':
        'For å handsame saka di om pleiepengar må vi ha både legeerklæring og {ppSyktBarnLenke}. Dette gjeld òg ved forlengingar.',
    'step.dokumentType.barn.info.lenke': 'søknad om pleiepengar for sjukt barn',
    'formPart.registrertBarn.gjelderAnnetBarn': 'Ettersending gjeld eit anna barn',
    'formPart.annetBarn.tittel': 'Anna barn',
    'formPart.annetBarn.fnr.spm': 'Barnet sitt fødselsnummer/D-nummer',
    'formPart.annetBarn.fnr.spm.description': 'Vi må vite dette for å knyte dokumentet til rett sak',
    'formPart.annetBarn.fnr.barnHarIkkeFnr': 'Barnet har ikkje fødselsnummer/D-nummer',

    'step.omsorgspenger_type.stepTitle': 'Kva skal du ettersende til?',
    'step.omsorgspenger_type.stepIndicatorLabel': 'Omsorgspengar type',
    'step.omsorgspenger_type.søknadstype.spm': 'Kva gjeld denne ettersendinga?',

    'step.dokumenter.stepTitle': 'No skal du laste opp dokumenta dine',
    'step.dokumenter.stepIndicatorLabel': 'Last opp dokument',
    'steg.dokumenter.vedlegg': 'Last opp dokument',
    'steg.dokumenter.infopanel.1':
        'Når du skal laste opp dokument, må du anten ta bilete av dokumenta eller skanne dei.',
    'steg.dokumenter.infopanel.2':
        'Du kan laste opp desse filtypane: JPG, JPEG, PNG og PDF. Det er ikkje mogleg å laste opp andre filtypar enn desse.',
    'steg.dokumenter.infopanel.3':
        'Du kan laste opp så mange dokument du vil, men kvart dokument kan ikkje vere større enn 10 MB, og den totale storleiken på alle dokumenta kan ikkje overstige 24 MB. Vi varslar deg om du når denne grensa.',

    'step.oppsummering.pageTitle': 'Oppsummering',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
    'step.oppsummering.nextButtonLabel': 'Send inn',
    'steg.oppsummering.info':
        'Les gjennom oppsummeringa før du sender inn dokumenta. Om du vil gjere endringar, kan du gå tilbake.',
    'steg.oppsummering.søker.header': 'Om deg',
    'steg.oppsummering.søker.fnr': 'Fødselsnummer',
    'steg.oppsummering.barn.header': 'Barn',
    'steg.oppsummering.barn.spm': 'Kva barn gjeld ettersendinga?',
    'steg.oppsummering.barn.registretBarnInfo': '{navn} (fødd {fødselsdato})',
    'steg.oppsummering.barn.fnr': 'Fødselsnummer: {fnr}',
    'steg.oppsummering.barn.harIkkefnr': 'Barnet har ikkje fødselsnummer/D-nummer',
    'steg.oppsummering.hvaGjelder.header': 'Kva gjeld ettersendinga?',
    'steg.oppsummering.dokumentType.header': 'Kva skal du ettersende?',
    'steg.oppsummering.dokumentType.LEGEERKLÆRING': 'Legeerklæring og andre medisinske opplysningar',
    'steg.oppsummering.dokumentType.KURSINFORMASJON': 'Informasjon om kurs',
    'steg.oppsummering.dokumentType.ANNET': 'Annen informasjon',
    'steg.oppsummering.dokumenter.header': 'Dokument',
    'steg.oppsummering.bekrefterOpplysninger':
        'Eg stadfestar at opplysningane eg har gjeve er rette, og at eg ikkje har halde tilbake opplysningar som har noko å seie for saka mi. ',
    'steg.oppsummering.navn': 'Namn',
    'steg.oppsummering.fødselsnummer': 'Fødselsnummer',

    'steg.oppsummering.ettersendelse.header': 'Ettersending',
    'steg.oppsummering.typeSøknad.tittel': 'Kva skal du ettersende til?',

    'steg.oppsummering.sendMelding.feilmelding.førsteGang':
        'Det oppstod ein feil under innsending. Ver venleg og prøv på nytt.',
    'steg.oppsummering.sendMelding.feilmelding.andreGang':
        'Det oppstod framleis ein feil under innsending. Ver venleg og prøv på nytt seinare.',

    'steg.oppsummering.validering.manglerVedlegg': 'Det er ikkje lasta opp nokre vedlegg.',
    'vedleggsliste.ingenVedleggLastetOpp': 'Ingen dokument er lasta opp',

    'page.intro.hvilkenTypeSøknad': 'Vel kva denne ettersendinga gjeld',
    'page.intro.type.pleiepenger': 'Pleiepengar for sjukt barn',
    'page.intro.type.pleiepenger_livets_sluttfase': 'Pleiepengar i livets sluttfase',
    'page.intro.type.omsorgspenger': 'Omsorgspengar',
    'page.intro.type.opplaringspenger': 'Opplæringspengar',

    'page.ikkeTilgang.tekst': 'Du har ikkje tilgang til denne sida.',

    'page.generalErrorPage.sidetittel': 'Feil',
    'page.generalErrorPage.tittel': 'Noko gjekk gale...',
    'page.generalErrorPage.tekst': 'Beklagar, her har det dessverre skjedd ein feil.',

    'page.unavailable.info.1':
        'Ettersending av dokument digitalt er dessverre ikkje tilgjengeleg grunna teknisk vedlikehald.',
    'page.unavailable.info.2': 'Vi beklagar.',

    'page.confirmation.psb.legeerklæring.sidetittel': 'Vi har motteke legeerklæring',
    'page.confirmation.psb.legeerklæring.tittel': 'Vi har motteke legeerklæring',
    'page.confirmation.psb.legeerklæring.info': 'Du kan følgje status i saka di på <Lenke>Dine pleiepengar</Lenke>.',

    'page.confirmation.generell.sidetittel': 'Vi har motteke ettersendinga av dokument',
    'page.confirmation.generell.tittel': 'Vi har motteke ettersendinga av dokument',
    'page.confirmation.generell.info':
        'Ein av våre sakshandsamarar vil snart gjennomgå dokumentet ditt, dette kan ta nokre dagar. Vi gjev deg beskjed dersom vi treng noko meir frå deg.',

    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må stadfeste at du har lese og forstått pliktene dine',
    'validation.registrertBarnAktørId.ANNET.noValue': 'Du må velje kva barn dokumentasjonen gjeld',
    'validation.registrertBarnAktørId.LEGEERKLÆRING.noValue': 'Du må velje kva barn legeerklæringa gjeld',
    'validation.dokumenter.noVedleggUploaded': 'Ingen dokument er lasta opp',
    'validation.dokumenter.tooManyVedlegg': 'For mange dokument er lasta opp',
    'validation.dokumenter.maxTotalSizeExceeded':
        'Den totale storleiken for dokumenta du har lasta opp overstig grensa på 24 MB.',
    'validation.beskrivelse.stringHasNoValue': 'Skildre ettersendinga',
    'validation.beskrivelse.stringIsTooLong': 'Skildringa kan ikkje innehalde meir enn {maks} teikn',
    'validation.beskrivelse.stringIsTooShort': 'Skildringa må innehalde minst {min} teikn',
    'validation.ytelse.noValue': 'Du må velje kva denne ettersendinga gjeld',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste opplysningane',
    'validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgjeve eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Du må oppgje fødselsnummeret til barnet',
    'validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgjeve eit fødselsnummer som du ikkje kan bruke. Kontroller at du har skrive inn barnets fødselsnummer.',
    'validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Du har oppgjeve eit ugyldig fødselsnummer. Kontroller at du har skrive inn rett.',
    'validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
        'Du har oppgjeve eit ugyldig fødselsnummer. Kontroller at du har skrive inn rett.',
    'validation.barnetLegeerklæringGjelder.noValue': 'Du må velje kva barn legeerklæringa gjeld',
    'validation.dokumentType.noValue': 'Du må velje kva du skal ettersende',

    'page.velkommen.guide.ingress':
        'Her lastar du opp dokument som høyrer til ein søknad du har sendt inn tidlegare. Har du dokumenta klare?',

    'page.velkommen.omSøknaden.tittel': 'Om ettersendinga',
    'page.velkommen.omSøknaden.1': 'Du får rettleiing undervegs om kva du skal fylle ut, og korleis.',
    'page.velkommen.omSøknaden.2':
        'Me held på svara dine i 72 timar. Om du innanfor den tida til dømes vil ta ein pause eller blir automatisk logga ut, held du fram der du var når du kjem tilbake.',
    'page.velkommen.omSøknaden.3': 'Du må svare på alle spørsmåla for å kunne gå vidare.',
    'page.velkommen.omSøknaden.4':
        'Du har rett til å sjå saka di. Vil du vite meir om korleis Nav handsamar personopplysningar? Sjå <Lenke>nav.no/personvern</Lenke>.',
};
