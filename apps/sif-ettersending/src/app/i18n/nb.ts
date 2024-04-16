import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types';

export const applicationMessages: MessageFileFormat = {
    nb: {
        'gotoApplicationLink.lenketekst': 'Gå til den digitale søknaden',
        'step.button.gåVidere': 'Gå videre',
        'step.button.startSøknad': 'Start ettersendelsen',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre må du svare på spørsmålet ovenfor.',

        'ettersendelse.samtykkeForm.submitButtonLabel': 'Start ettersendelse',

        'application.cancelOrContinueLaterLabel': 'Avbryt eller fortsett senere',

        'steg.footer.avbryt': 'Avbryt og slett ettersendelse',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'banner.title': 'Ettersending av dokumenter',
        'page.error.pageTitle': 'Det oppstod en feil',

        'søknadstype.pleiepenger': 'pleiepengesøknad',
        'søknadstype.omsorgspenger': 'omsorgspengesøknad',
        'søknadstype.pleiepengerLivetsSluttfase': 'pleiepenger i livets sluttfase',

        'banner.intro': 'Ettersendelse av dokumentasjon',

        'application.title': 'Ettersendelse av dokumentasjon',
        'application.title.pleiepenger': 'Ettersendelse av dokumentasjon til søknad om pleiepenger for sykt barn',
        'application.title.pleiepengerLivetsSluttfase':
            'Ettersendelse av dokumentasjon til søknad om pleiepenger i livets sluttfase',
        'application.title.omsorgspenger': 'Ettersendelse av dokumentasjon for omsorgspenger',
        'application.title.ekstraomsorgsdager':
            'Ettersendelse av dokumentasjon - Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        'application.title.utbetaling':
            'Ettersendelse av dokumentasjon  - Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        'application.title.utbetalingarbeidstaker':
            'Ettersendelse av dokumentasjon - Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        'application.title.regnetsomalene':
            'Ettersendelse av dokumentasjon - Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',

        'modal.personopplysninger.dialogtittel': 'Om behandling av personopplysninger',
        'modal.personopplysninger.1': 'Slik behandler NAV personopplysningene dine',
        'modal.personopplysninger.2':
            'Vi innhenter og mottar opplysninger om deg for å behandle saken din. Det er nødvendig for at du skal få riktig tjeneste.',
        'modal.personopplysninger.3': 'Hvilke opplysninger innhenter vi?',
        'modal.personopplysninger.4': 'Opplysningene vi innhenter kommer enten fra deg eller fra offentlige registre:',
        'modal.personopplysninger.4.1': 'hvilke barn du er registrert som forelder til',
        'modal.personopplysninger.4.1.pleiepengerLivetsSluttfase': 'opplysninger om helsen til den du skal pleie',
        'modal.personopplysninger.4.2': 'opplysninger om barnets helse',
        'modal.personopplysninger.4.3': 'arbeidsforholdene dine og inntekten din',
        'modal.personopplysninger.4.4': 'ytelser du mottar fra NAV',
        'modal.personopplysninger.4.5': 'tilknytningen din til Norge',
        'modal.personopplysninger.4.6':
            'trygdeordninger du kan ha rett til i andre land. Vi kan også sende opplysninger om deg til trygdemyndigheter i andre land.',
        'modal.personopplysninger.4.7':
            'Vi lagrer opplysninger vi får inn om personen du søker pleiepenger for. Dette gjør vi for å kunne gjenbruke opplysningene hvis andre søker pleiepenger for samme person.',
        'modal.personopplysninger.5.1': 'Vil du vite mer om hvordan NAV behandler personopplysninger? Se ',
        'modal.personopplysninger.5.2': 'nav.no/personvern',
        'modal.personopplysninger.5.3': '.',

        'modal.minePlikter.tittel': 'Mine plikter',
        'modal.minePlikter.part1': 'Jeg forstår at det kan få konsekvenser for retten min til {søknadstype} hvis jeg',
        'modal.minePlikter.part1a': 'gir uriktig informasjon eller',
        'modal.minePlikter.part1b': 'holder tilbake opplysninger',
        'modal.minePlikter.part2a': 'Jeg har lest og forstått det som står på',
        'modal.minePlikter.part2b': 'nav.no/rettogplikt',

        'step.nextButtonLabel': 'Neste steg',
        'step.previousButtonLabel': 'Forrige steg',
        'step.sendButtonLabel': 'Send inn',
        'step.sendButtonAriaLabel': 'Send inn',

        'step.beskrivelse.stepTitle': 'Ettersendelse av dokumentasjon',
        'step.beskrivelse.stepIndicatorLabel': 'Ettersendelse av dokumentasjon',
        'step.beskrivelse.nextButtonLabel': 'Fortsett',
        'step.beskrivelse.hvaSendes.spm': 'Hva skal du ettersende?',
        'step.beskrivelse.intro.1':
            'Her beskriver du hvilken dokumentasjon du skal sende. Det er også til hjelp for oss, om du forteller at du ettersender fordi:',
        'step.beskrivelse.intro.li.1': 'vi har etterspurt mer dokumentasjon fra deg, eller',
        'step.beskrivelse.intro.li.2': 'om du ikke hadde dokumentasjonen klar da du sendte inn søknaden',
        'step.beskrivelse.intro.2':
            'Du kan ikke skrive spørsmål til oss her. Se informasjon om hvordan du kommer i {kontaktMedOssLink}.',
        'step.beskrivelse.intro.2.1': 'kontakt med oss',

        'step.beskrivelse_pp.stepTitle': 'Hva skal du ettersende?',
        'step.beskrivelse_pp.stepIndicatorLabel': 'Hva skal du ettersende?',
        'step.beskrivelse_pp.nextButtonLabel': 'Fortsett',
        'step.beskrivelse_pp.info':
            'Her beskriver du hvilken dokumentasjon du skal sende oss. Hvis en annen søker har sendt inn samme dokumentasjon for barnet i perioden du søker, trenger du ikke sende inn disse på nytt.',
        'step.beskrivelse_pp.dokumentType.spm': 'Hva skal du ettersende?',
        'step.beskrivelse_pp.dokumentType.LEGEERKLÆRING': 'Legeerklæring',
        'step.beskrivelse_pp.registrertBarnPart.spm': 'Hvilket barn gjelder legeerklæringen?',
        'step.beskrivelse_pp.registrertBarnPart.hvilketBarn.født': 'Født {dato}',
        'step.beskrivelse_pp.barn.info.tittel': 'Husk søknad, også ved forlengelser',
        'step.beskrivelse_pp.barn.info.1.1':
            'For å behandle din pleiepengesak må vi ha både legeerklæring og {ppSyktBarnLenke}. Dette gjelder også ved forlengelser.',
        'step.beskrivelse_pp.barn.info.lenke': 'søknad om pleiepenger for sykt barn',
        'step.beskrivelse_pp.gjelderAnnetBarn': 'Legeerklæringen gjelder et annet barn',
        'step.beskrivelse_pp.annetBarn.tittel': 'Annet barn',
        'step.beskrivelse_pp.annetBarn.fnr.spm': 'Barnets fødselsnummer/D-nummer',
        'step.beskrivelse_pp.dokumentType.ANNET': 'Annet',
        'step.beskrivelse_pp.hvaSendes.spm': 'Beskriv hva slags dokumentasjon du skal sende',
        'step.beskrivelse_pp.intro':
            'Her beskriver du hvilken dokumentasjon du skal sende oss. Hvis en annen søker har sendt inn samme dokumentasjon for barnet i perioden du søker, trenger du ikke sende inn disse på nytt.',
        'step.beskrivelse_pp.annet.info.1': 'Har vi etterspurt mer dokumentasjon fra deg?',
        'step.beskrivelse_pp.annet.info.2':
            'Ved siden av legeerklæring, er det kun nødvendig å ettersende mer dokumentasjon hvis en saksbehandler har spurt om noe konkret fra deg.',

        'step.omsorgspenger_type.stepTitle': 'Hva skal du ettersende til?',
        'step.omsorgspenger_type.stepIndicatorLabel': 'Omsorgspenger type',
        'step.omsorgspenger_type.nextButtonLabel': 'Fortsett',
        'step.omsorgspenger_type.søknadstype.spm': 'Hva gjelder denne ettersendelsen?',

        'step.dokumenter.stepTitle': 'Nå skal du laste opp dokumentene dine',
        'step.dokumenter.stepIndicatorLabel': 'Last opp dokumenter',
        'step.dokumenter.nextButtonLabel': 'Fortsett',
        'steg.dokumenter.vedlegg': 'Last opp vedlegg',
        'steg.dokumenter.infopanel.1':
            'Når du skal laste opp dokumenter må du enten ta bilde av dokumentene, eller scanne dem.',
        'steg.dokumenter.infopanel.2':
            'Du kan laste opp disse filtypene: JPG, JPEG, PDF og PNG. Det er ikke mulig å laste opp andre filtyper enn disse.',
        'steg.dokumenter.infopanel.3':
            'Du kan laste opp så mange dokumenter du vil, men den totale størrelsen på alle dokumentene kan ikke overstige 24 Mb. Vi varsler deg hvis du når denne grensen.',
        'steg.dokumenter.advarsel.totalstørrelse':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du sende inn en ny ettersendelse når du er ferdig med denne.',

        'step.oppsummering.pageTitle': 'Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',
        'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
        'step.oppsummering.nextButtonLabel': 'Send inn',
        'steg.oppsummering.info':
            'Les gjennom oppsummeringen før du sender inn dokumentene. Hvis du vil gjøre endringer, kan du gå tilbake.',
        'steg.oppsummering.søker.header': 'Navn på søker',
        'steg.oppsummering.søker.fnr': 'Fødselsnummer',
        'steg.oppsummering.barn.header': 'Barn',
        'steg.oppsummering.barn.registretBarnInfo': '{navn} (født {fødselsdato})',
        'steg.oppsummering.barn.fnr': 'Fødselsnummer: {fnr}',
        'steg.oppsummering.barn.harIkkefnr': 'Barnet har ikke fødselsnummer/D-nummer',
        'steg.oppsummering.hvaGjelder.header': 'Hva gjelder ettersendelsen?',
        'steg.oppsummering.dokumentType.header': 'Hva skal du ettersende?',
        'steg.oppsummering.dokumentType.legeerklæring': 'Legeerklæring',
        'steg.oppsummering.dokumenter.header': 'Dokumenter',
        'steg.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min sak.',
        'steg.oppsummering.fødselsnummer': 'Fødselsnummer',

        'steg.oppsummering.typeSøknad.tittel': 'Hva skal du ettersende til?',

        'step.oppsummering.sendMelding.feilmelding.førsteGang':
            'Det oppstod en feil under innsending. Vennligst prøv på nytt.',
        'step.oppsummering.sendMelding.feilmelding.andreGang':
            'Det oppstod fortsatt en feil under innsending. Vennligst vent litt og prøv på nytt.',

        'vedleggsliste.ingenVedleggLastetOpp': 'Ingen dokumenter er lastet opp',

        'page.intro.hvilkenTypeSøknad': 'Velg hva denne ettersendelsen gjelder',
        'page.intro.type.pleiepenger': 'Pleiepenger for sykt barn',
        'page.intro.type.pleiepenger_livets_sluttfase': 'Pleiepenger i livets sluttfase',
        'page.intro.type.omsorgspenger': 'Omsorgspenger',
        'page.intro.gåVidere': 'Gå videre',
        'page.intro.søknadstype.noValue': 'Du må velge hva denne ettersendelsen gjelder',

        'page.ikkeTilgang.sidetittel': 'Ettersending av dokumenter',
        'page.ikkeTilgang.tekst': 'Du har ikke tilgang til denne siden.',

        'page.generalErrorPage.sidetittel': 'Feil',
        'page.generalErrorPage.tittel': 'Noe gikk galt...',
        'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',

        'page.unavailable.info.1':
            'Ettersendelse av dokumenter digitalt er dessverre ikke tilgjengelig på grunn av teknisk vedlikehold.',
        'page.unavailable.info.2': 'Vi beklager.',

        'page.confirmation.sidetittel': 'Vi har mottatt ettersendingen av dokumenter',
        'page.confirmation.tittel': 'Vi har mottatt ettersendingen av dokumenter',
        'page.confirmation.undertittel': 'Hva skjer videre nå?',
        'page.confirmation.check.1.pp': 'Dokumentene du har sendt finner du på',
        'page.confirmation.check.1.pp.lenke': 'Dine pleiepenger',

        'page.confirmation.check.2':
            'Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi kontakter deg hvis vi trenger flere opplysninger.',
        'page.confirmation.check.3.1': 'Når søknaden er ferdigbehandlet, får du et svar fra oss på «Min side».',
        'page.confirmation.check.3.2': 'Du kan sjekke saksbehandlingstiden her',

        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter',
        'validation.ingen_dokumenter': 'Ingen dokumenter er lastet opp',
        'validation.for_mange_dokumenter': 'For mange dokumenter er lastet opp',
        'validation.samlet_storrelse_for_hoy':
            'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24Mb.',
        'validation.beskrivelse.stringHasNoValue': 'Beskriv ettersendelsen',
        'validation.beskrivelse.stringIsTooLong': 'Beskrivelsen kan ikke inneholde mer enn {maks} tegn',
        'validation.beskrivelse.stringIsTooShort': 'Beskrivelsen må inneholde minst {min} tegn',
        'validation.ytelse.noValue': 'Du må velge hva denne ettersendelsen gjelder',
        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte opplysningene',
        'validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
            'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
        'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Du må oppgi fødselsnummeret til barnet',
        'validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
            'Du har oppgitt et fødselsnummer som du ikke kan bruke. Kontroller at du har tastet inn barnets fødselsnummer.',
        'validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
            'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
        'validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
            'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
        'validation.barnetLegeerklæringGjelder.noValue': 'Du må velge hvilket barn legeerklæringen gjelder',
        'validation.dokumentType.noValue': 'Du må velge hva du skal ettersende',
        'ekspanderbarPSG.title': 'Slik tar du et godt bilde av dokumentet',
    },
};

export type ApplicationMessageKeys = keyof typeof applicationMessages.nb;
