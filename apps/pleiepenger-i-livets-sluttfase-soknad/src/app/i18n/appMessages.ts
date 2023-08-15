import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.title': 'Søknad om pleiepenger i livets sluttfase',

        'application.loadError.title': 'Noe gikk galt ...',
        'application.loadError.message':
            'Beklager, her har det dessverre skjedd en feil. Dersom feilen fortsetter, prøv igjen litt senere.',

        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor.',
        'page.error.pageTitle': 'Noe gikk galt ...',
        'fileUploadErrors.part1': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
        'vedleggsliste.fjernKnapp': 'Fjern vedlegg',

        'backlink.label': 'Tilbake',
        hvaBetyrDette: 'Hva betyr dette?',
        fødselsnummer: 'Fødselsnummer:',
        apiVerdierMangler: 'Api verdier mangler',
        'page.loadingPage.tekst': 'Laster ...',

        ukeÅr: 'Uke {ukenummer}, {år}',
        'dagerMedTid.uke': 'Uke {uke}',
        'dagerMedTid.ingenDagerRegistrert': 'Ingen dager registrert',

        'page.confirmation.sidetittel': 'Vi har mottatt søknaden din',
        'page.confirmation.tittel': 'Vi har mottatt søknad om pleiepenger i livets sluttfase',
        'page.confirmation.info.tittel': 'Hva skjer videre nå?',
        'page.confirmation.list.item.1':
            'Du må be {antall, plural, one {arbeidsgiver} other {arbeidsgiverne}} om å sende inntektsmelding så snart som mulig hvis du søker for første gang eller det er mer enn 4 uker siden sist du hadde pleiepenger.',
        'page.confirmation.list.item.2':
            'Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi kontakter deg hvis vi trenger flere opplysninger.',
        'page.confirmation.list.item.3': 'Når søknaden er ferdig behandlet får du et svar fra oss på «Min side». ',
        'page.confirmation.list.item.3.lenke': 'Du kan sjekke saksbehandlingstiden her.',

        'page.generalErrorPage.sidetittel': 'Feil',
        'page.generalErrorPage.tittel': 'Noe gikk galt...',
        'page.generalErrorPage.tekst': 'Beklager, her har det dessverre skjedd en feil.',

        'page.invalidStepPage.sidetittel': 'Oops, nå skjedde det en feil...',
        'page.invalidStepPage.tittel': 'Oops, nå skjedde det en feil...',
        'page.invalidStepPage.tekst':
            'Du er kommet til en side du ikke trenger å fylle ut. Dette kan skje hvis du går frem og tilbake i søknaden gjennom pilene i nettleseren (pilene helt øverst til venstre på siden). Du unngår dette problemet hvis du heller bruker knapper og lenker som ligger inne i selve søknaden for å gå frem eller tilbake.:',
        'page.invalidStepPage.tilbakeLenke': 'Gå tilbake til forrige side',

        'page.ikkeTilgang.sidetittel': 'Søknad om pleiepenger i livets sluttfase',
        'page.ikkeTilgang.tekst':
            'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
        'page.ikkeTilgang.lastNed': 'Søknad om pleiepenger i livets sluttfase',

        'avbrytSøknadDialog.avbrytSøknadLabel': 'Ja, avbryt søknad',
        'avbrytSøknadDialog.fortsettSøknadLabel': 'Nei',
        'avbrytSøknadDialog.intro':
            'Det du har fylt ut i søknaden blir slettet, og du kommer tilbake til velkomstsiden.',
        'avbrytSøknadDialog.spørsmål': 'Ønsker du å slette søknaden?',
        'avbrytSøknadDialog.tittel': 'Avbryt og slett søknad',

        'fortsettSøknadSenereDialog.avbrytSøknadLabel': 'Ja, fortsett senere',
        'fortsettSøknadSenereDialog.fortsettSøknadLabel': 'Nei',
        'fortsettSøknadSenereDialog.intro':
            'Vi lagrer det du har fylt ut i 72 timer. Når du vil fortsette, starter du bare søknaden på nytt.',
        'fortsettSøknadSenereDialog.spørsmål': 'Vil du avslutte nå og fortsette senere?',
        'fortsettSøknadSenereDialog.tittel': 'Avslutt og fortsett senere',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'step.nextButtonLabel': 'Fortsett',
        'step.nextButtonAriaLabel': 'Gå til neste steg',
        'step.sendButtonLabel': 'Send inn søknaden',
        'step.sendButtonAriaLabel': 'Send inn søknaden',

        'step.opplysninger-om-pleietrengende.pageTitle': 'Om personen du pleier',
        'step.opplysninger-om-pleietrengende.stepTitle': 'Om personen du pleier',
        'step.opplysninger-om-pleietrengende.stepIndicatorLabel': 'Om personen du pleier',
        'step.opplysninger-om-pleietrengende.nextButtonLabel': 'Fortsett',
        'step.opplysninger-om-pleietrengende.counsellorPanel.info':
            'Her gir du opplysninger om personen som du pleier i livets sluttfase.',

        'step.opplysninger-om-pleietrengende.spm.navn': 'Navn',
        'step.opplysninger-om-pleietrengende.spm.fnr': 'Fødselsnummer/D-nummer',
        'step.opplysninger-om-pleietrengende.årsakManglerIdentitetsnummer.spm':
            'Hvorfor har ikke personen fødselsnummer eller D-nummer?',
        'step.opplysninger-om-pleietrengende.årsakManglerIdentitetsnummer.BOR_I_UTLANDET': 'Personen bor i utlandet',
        'step.opplysninger-om-pleietrengende.årsakManglerIdentitetsnummer.ANNET': 'Annet',
        'step.opplysninger-om-pleietrengende.id.tittel': 'ID for personen du pleier',
        'step.opplysninger-om-pleietrengende.id.info':
            'Når personen du pleier ikke har fødselsnummer eller D-nummer, må du legge ved en kopi av ID for personen. Godkjent ID kan være fødselsattest, dødsattest, førerkort, id-kort eller pass.',
        'step.opplysninger-om-pleietrengende.id.uploadButtonLabel': 'Last opp ID',

        'step.opplysninger-om-pleietrengende.fnr.harIkkeFnr': 'Personen har ikke fødselsnummer/D-nummer',
        'step.opplysninger-om-pleietrengende.fødselsdato': 'Fødselsdato',

        'step.legeerklæring.pageTitle': 'Legeerklæring',
        'step.legeerklæring.stepTitle': 'Legeerklæring',
        'step.legeerklæring.stepIndicatorLabel': 'Legeerklæring',
        'step.legeerklæring.nextButtonLabel': 'Fortsett',

        'step.legeerklæring.counsellorPanel.info':
            'Søker du for første gang må du laste opp en legeerklæring, som bekrefter at personen er i livets sluttfase. Vi trenger kun én legeerklæring. Det vil si at hvis du eller en annen søker allerede har sendt en slik legeerklæring, kan du bare gå videre uten å laste opp noe.',
        'step.opplysninger-om-pleietrengende.vedlegg.tittel': 'Legeerklæring',
        'step.opplysninger-om-pleietrengende.vedlegg': 'Last opp legeerklæringen',

        'vedleggsliste.ingenBekreftelseFraLegeLastetOpp': 'Ingen vedlegg er lastet opp',

        'dokumenter.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',

        'step.tidsrom.pageTitle': 'Pleiepengesøknad - periode',
        'step.tidsrom.stepTitle': 'Perioden med pleiepenger',
        'step.tidsrom.stepIndicatorLabel': 'Periode',
        'step.tidsrom.counsellorPanel.avsnit.1': 'Her skal du fylle inn når du skal ha pleiepenger.',
        'step.tidsrom.counsellorPanel.avsnit.2':
            'Pleiepenger i livets sluttfase gis i opptil 60 dager totalt. Hvis det er flere som deler på å pleie, har dere altså 60 dager å dele på til sammen.',
        'step.tidsrom.counsellorPanel.avsnit.3':
            'Du trenger ikke ta ut dagene sammenhengende. Det vil si at du for eksempel kan pleie den som er syk annen hver dag, annen hver uke, halve dager, eller slik det passer for deg i din situasjon.',
        'step.tidsrom.nextButtonLabel': 'Fortsett',
        'step.tidsrom.infotekst':
            'For å ha rett til pleiepenger må du ha omsorgen for pleietrengende i hele perioden du søker for.',
        'step.tidsrom.søkerKunHelgedager.alert':
            'Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb. Du kan derfor ikke søke pleiepenger kun for lørdag og/eller søndag.',
        'steg.tidsrom.veileder.utenlandsopphold':
            'Når du oppholder deg i et land utenfor EØS, kan du beholde pleiepengene i en begrenset periode på opptil 8 uker av en 12 måneder lang periode.',

        'steg.tidsrom.flereSokere.spm': 'Er dere flere som skal dele på pleiepengene?',
        'steg.tidsrom.flereSokere.spm.description.tittle': 'Hvorfor spør dere om dette?',
        'steg.tidsrom.flereSokere.spm.description':
            'Vi ønsker å vite om dere er flere som skal dele på pleiepengene slik at vi kan fordele pleiepengene riktig mellom dere. Hvis du er usikker på dette tidspunktet om dere er flere som skal dele er det helt greit, da velger du svaralternativet "Usikker".',

        'steg.tidsrom.iUtlandetIPerioden.spm': 'Oppholder du deg i utlandet i perioden du søker for?',
        'steg.tidsrom.iUtlandetIPerioden.listTitle': 'Utenlandsopphold i perioden',
        'steg.tidsrom.iUtlandetIPerioden.modalTitle': 'Utenlandsopphold',
        'steg.tidsrom.iUtlandetIPerioden.addLabel': 'Legg til utenlandsopphold',

        'steg.tidsrom.ferieuttakIPerioden.spm': 'Skal du ha ferie i perioden du søker for?',
        'steg.tidsrom.ferieuttakIPerioden.listTitle': 'Ferie i perioden',
        'steg.tidsrom.ferieuttakIPerioden.modalTitle': 'Ferie',
        'steg.tidsrom.ferieuttakIPerioden.addLabel': 'Legg til ferie',

        'steg.tidsrom.hjelpetekst.tittel': 'Kan jeg søke for flere perioder i samme søknad?',
        'steg.tidsrom.hjelpetekst.1':
            'Når du ikke tar ut dagene sammenhengende, kan du søke om flere perioder hvis du jobber i din fulle stilling mellom periodene du har pleiepenger.',
        'steg.tidsrom.hjelpetekst.2':
            'Da setter du fra og med dato til den første dagen du har pleiepenger. Til og med dato setter du til den siste dagen du har pleiepenger i den siste perioden.',
        'steg.tidsrom.hjelpetekst.3':
            'Når du senere i søknaden blir spurt om jobb, legger du inn at du jobber fullt i de periodene du ikke har pleiepenger. Du får ikke pleiepenger i periodene du jobber fullt.',
        'steg.tidsrom.hjelpetekst.4':
            'Hvis du ikke jobber i din fulle stilling mellom periodene med pleiepenger, kan du ikke søke om flere perioder i samme søknad. Da må du sende én søknad for hver periode.',

        'steg.tidsrom.hvilketTidsrom.spm': 'Hvilken periode søker du for?',
        'steg.tidsrom.hvilketTidsrom.fom': 'Fra og med',
        'steg.tidsrom.hvilketTidsrom.tom': 'Til og med',

        'steg.tidsrom.pleierDuDenSykeHjemme.spm': 'Pleier du personen i et privat hjem i perioden du søker for?',
        'steg.tidsrom.pleierDuDenSykeHjemme.alert':
            'For å ha rett på pleiepenger må du pleie personen i et privat hjem. Hvis det er noen dager personen har vært innlagt må du sende en søknad for hver av periodene med pleie i hjemmet.',
        'steg.tidsrom.pleierDuDenSykeHjemme.info.tittel': 'Hva menes med privat hjem?',
        'steg.tidsrom.pleierDuDenSykeHjemme.info':
            'Med privat hjem menes hjemme hos noen, for eksempel hjemme hos deg eller hjemme hos den som er syk. For at du skal ha rett til pleiepenger må altså den som er syk pleies hjemme hos noen, og ikke på sykehus eller en annen institusjon.',

        'step.arbeidssituasjon.pageTitle': 'Arbeidssituasjon',
        'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjon',
        'step.arbeidssituasjon.stepIndicatorLabel': 'Arbeidssituasjon',
        'step.arbeidssituasjon.nextButtonLabel': 'Fortsett',

        'steg.arbeidssituasjon.tittel': 'Arbeidsgivere',

        'steg.arbeidssituasjon.veileder.1':
            'Nå trenger vi å vite litt om arbeidssituasjonen din og hvor mye du normalt jobber når du ikke har fravær fra jobben din.',
        'steg.arbeidssituasjon.veileder.2':
            'Hvis du er arbeidstaker og er usikker på hva som er din normale arbeidstid, finner du svaret i arbeidskontrakten din. Eventuelt kan du forhøre deg med arbeidsgiveren din.',
        'steg.arbeidssituasjon.veileder.medArbeidsgiver':
            'Nedenfor ser du {antall, plural, one {arbeidsgiveren} other {arbeidsgivere}} du er registrert ansatt hos i AA-registeret i perioden du søker om pleiepenger. For at vi skal være sikre på at opplysningene er riktige må du bekrefte om du er, eller har vært, ansatt der.',
        'steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet':
            'Vi har ikke funnet noen arbeidsgivere registrert på deg i AA-registeret.',
        'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver':
            'Hvis du i perioden du søker for er, eller var, ansatt hos en arbeidsgiver som ikke vises her, må du be arbeidsgiveren om å sende en ny A-melding. Det gjør de enten via eget lønns- og personalsystem, eller via Altinn.',
        'steg.arbeidssituasjon.info.tekst':
            'Dersom det mangler en arbeidsgiver her, må du be arbeidsgiveren din sende ny A-melding, enten via lønns- og personalsystemet eller gjennom Altinn.',
        'steg.arbeidssituasjon.ingenOpplysninger': 'Vi har ikke funnet noen arbeidsgiver registrert på deg.',

        'steg.arbeidssituasjon.intro': 'Vi har funnet disse arbeidsforholdene registrert på deg.',
        'steg.arbeidssituasjon.info.tittel': 'Mangler det et arbeidsforhold her?',
        'steg.arbeidssituasjon.frilanser.tittel': 'Frilans',
        'steg.arbeidssituasjon.sn.tittel': 'Selvstendig næringsdrivende',
        'steg.arbeidssituasjon.verneplikt.tittel': 'Verneplikt',
        'steg.arbeidssituasjon.verneplikt.spm': 'Utøvde du verneplikt på tidspunktet du søker pleiepenger fra?',
        'steg.arbeidssituasjon.verneplikt.info.tittel': 'Hva betyr dette?',
        'steg.arbeidssituasjon.verneplikt.info.tekst':
            'Du skal svare ja på dette spørsmålet om du har utøvd verneplikt i minst 28 dager på starttidspunktet for perioden du søker for, eller om perioden med verneplikt var ment å vare i minst 28 dager.',

        'steg.arbeidssituasjon.opptjeningUtland.tittel': 'Jobbet i et annet EØS-land',
        'steg.arbeidssituasjon.opptjeningUtland.spm':
            'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',

        'steg.arbeidssituasjon.utenlandskNæring.spm':
            'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',
        'steg.arbeidssituasjon.utenlandskNæring.infoDialog.infoTittel': 'Virksomhet',
        'steg.arbeidssituasjon.utenlandskNæring.infoDialog.endreKnapp': 'Endre',
        'steg.arbeidssituasjon.utenlandskNæring.infoDialog.fjernKnapp': 'Fjern',
        'steg.arbeidssituasjon.utenlandskNæring.infoDialog.registrerKnapp':
            'Legg til næringsvirksomhet i et annet EØS-land',
        'steg.arbeidssituasjon.utenlandskNæring.infoDialog.modal.tittel': 'Virksomhet',

        'arbeidsforhold.part.jobber': 'jobber',
        'arbeidsforhold.part.jobbet': 'jobbet',
        'arbeidsforhold.part.hosArbeidsgiver': 'hos {navn}',
        'arbeidsforhold.part.som.ANSATT': 'hos {navn}',
        'arbeidsforhold.part.som.FRILANSER': 'som frilanser',
        'arbeidsforhold.part.som.SELVSTENDIG': 'som selvstendig næringsdrivende',

        'arbeidsforhold.ikkeAnsatt.info':
            'Når du ikke er ansatt her lenger, må du be denne arbeidsgiveren om å sende en ny A-melding med sluttdato. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',
        'arbeidsforhold.ikkeFrilansoppdragIPerioden.info': 'Informasjon når frilansoppdraget ikke gjelder perioden',

        'arbeidsforhold.erAnsatt.spm': 'Stemmer det at du er ansatt hos  {navn} i perioden du søker for?',
        'arbeidsforhold.harFrilansoppdrag.spm':
            'Stemmer det at du har et frilansoppdrag hos {navn} i perioden du søker for?',
        'arbeidsforhold.sluttetFørSøknadsperiode.spm': 'Sluttet du hos {navn} før {fraDato}?',
        'arbeidsforhold.avsluttet.info':
            'Sluttdato var innenfor perioden du søker om pleiepenger. Vi trenger derfor å vite hvordan normalarbeidstiden din var hos {navn}',

        'arbeidsforhold.jobberNormaltTimer.spm':
            'Hvor mange timer jobber du normalt per uke hos {navn} når du ikke har fravær?',
        'arbeidsforhold.jobberNormaltTimer.avsluttet.spm': 'Hvor mange timer jobbet du normalt per uke hos {navn}?',
        'arbeidsforhold.utledet': 'timer i uka',
        'arbeidsforhold.timer.suffix': 'timer per uke',

        'arbeidsforhold.normalTimer.info.tittel': 'Hva betyr dette?',
        'arbeidsforhold.ansatt.normalTimer.info':
            'Hvis du er usikker på hvor mange timer du jobber per uke, finner du som regel svaret i arbeidskontrakten din. Du kan også høre med arbeidsgiveren din.',
        'arbeidsforhold.frilanser.normalTimer.info':
            'Her skal du oppgi hvor mange timer du normalt jobber som frilanser når du ikke har fravær på grunn av for eksempel pleiepenger.',
        'arbeidsforhold.selvstendig.normalTimer.info':
            'Her skal du oppgi hvor mange timer du normalt jobber som selvstendig næringsdrivende når du ikke har fravær på grunn av for eksempel pleiepenger.',
        'arbeidsforhold.normalTimer.info.list.item.1':
            'Hvis du jobber like mange timer hver uke, er det disse timene du oppgir.',
        'arbeidsforhold.normalTimer.info.list.item.2':
            'Hvis du jobber turnus eller har en annen varierende arbeidstid, legger du inn et snitt per uke.',

        'arbeidsforhold.normalTimer.info.turnus.tittel': 'Hvordan regner jeg ut et snitt når jeg jobber turnus?',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.1':
            'Du regner ut snittet ved å legge sammen antall timer du jobber totalt i hele turnusperioden din, og deler det med antall uker som turnusperioden din består av.',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.2': 'Eksempel:',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.3':
            'Du har en turnus som går over 3 uker. Den første uka jobber du 20 timer, den andre 40 timer og den tredje uka jobber du 15 timer. Da legger du sammen antall timer du har jobbet og deler med antall uker i turnusperioden din.',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.4': 'Da blir regnestykket slik i dette eksempelet:',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a': '20 timer + 40 timer + 15 timer = 75 timer',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b':
            'Så deler du antall timer med antall uker i turnusperioden din: 75 / 3 = 25',
        'arbeidsforhold.normalTimer.info.turnus.avsnitt.5':
            'Du jobber altså i snitt 25 timer per uke, og det er dette tallet du oppgir.',

        'arbeidsforhold.normalTimer.info.varierende.tittel':
            'Hvordan regner jeg ut et snitt ved varierende arbeidstid?',
        'arbeidsforhold.normalTimer.info.varierende.avsnitt.1':
            'Du regner ut et snitt ved å legge sammen antall timer du totalt har jobbet de siste 12 ukene og deler det med 12. Hvis du ikke har jobbet i 12 uker, regner du ut snittet på samme måte ved å bruke de ukene du har jobbet.',
        'arbeidsforhold.normalTimer.info.varierende.avsnitt.2': 'Eksempel når du har jobbet de siste 12 ukene:',
        'arbeidsforhold.normalTimer.info.varierende.avsnitt.3':
            'De siste 12 ukene har du jobbet 250 timer. Da deler du antall timer du har jobbet med 12: 250 timer / 12 uker = 20,8',
        'arbeidsforhold.normalTimer.info.varierende.avsnitt.4':
            'Du jobber altså i snitt 20,8 timer per uke, og det er dette tallet du oppgir.',
        'arbeidsforhold.normalTimer.info.varierende.avsnitt.5':
            'Slik regner du ut et snitt når du har jobbet mindre enn 12 uker:',
        'arbeidsforhold.normalTimer.info.varierende.avsnitt.6':
            'Da deler du antall timer med antall uker du har jobbet. Hvis du for eksempel har jobbet i 7 uker, så deler du antall timer du har jobbet med 7.',

        'arbeidsforhold.normalTimer.info.utbetalingFraNAV.tittel': 'Hva om jeg får utbetaling fra NAV nå?',
        'arbeidsforhold.normalTimer.info.utbetalingFraNAV.avsnitt.1':
            'Hvis du for dette arbeidsforholdet for eksempel får foreldrepenger, sykepenger eller annet fra NAV nå, registrerer du det som var normalarbeidstiden din før du begynte å få denne utbetalingen fra NAV.',

        'arbeidstidPeriodeForm.tidFasteDagerEllerProsent.label': 'Hvordan vil du oppgi hvor mye du jobbet i perioden?',
        'arbeidstidPeriodeForm.tidFasteDager.label': 'Fyll ut hvor mye du jobbet i uken i perioden:',
        'arbeidstidPeriodeForm.prosent.label': 'Hvor mange prosent av din normale arbeidstid jobbet du i perioden?',
        'arbeidstidPeriodeForm.validation.tidFasteDagerEllerProsent.noValue':
            'Du må velge hvordan du ønsker å oppgi hvor mye du jobbet.',
        'arbeidstidPeriodeForm.validation.prosent.numberHasNoValue':
            'Du må oppgi hvor mange prosent du jobbet i perioden.',
        'arbeidstidPeriodeForm.validation.prosent.numberHasInvalidFormat':
            'Antall prosent du jobbet kan kun bestå av tall.',
        'arbeidstidPeriodeForm.validation.prosent.numberIsTooSmall':
            'Antall prosent du jobbet kan ikke være mindre enn {min}.',
        'arbeidstidPeriodeForm.validation.prosent.numberIsTooLarge':
            'Antall prosent du jobbet kan ikke være mer enn {max}.',
        'arbeidstidPeriodeForm.validation.fasteDager.gruppe.ingenTidRegistrert':
            'Du må oppgi hvor mange timer du jobbet i uken.',

        'arbeidsforhold.turnus.info.tittel': 'Hvordan regner jeg ut et snitt av turnusen min?',
        'arbeidsforhold.turnus.info.tekst.1':
            'Du regner ut snittet ved å legge sammen antall timer du jobber totalt i hele turnusperioden din, og deler det med antall uker som turnusperioden din består av.',
        'arbeidsforhold.turnus.info.tekst.2':
            'Du har en turnus som går over 3 uker. Den første uka jobber du 20 timer, den andre 40 timer og den tredje uka jobber du 15 timer. Da legger du sammen antall timer du har jobbet og deler med antall uker i turnusperioden din.',
        'arbeidsforhold.turnus.info.tekst.3': 'Da blir regnestykket slik i dette eksempelet:',
        'arbeidsforhold.turnus.info.tekst.4': '20 timer + 40 timer + 15 timer = 75 timer',
        'arbeidsforhold.turnus.info.tekst.5':
            'Så deler du antall timer med antall uker i turnusperioden din: 75 / 3 = 25',
        'arbeidsforhold.turnus.info.tekst.6':
            'Du jobber altså i snitt 25 timer per uke, og det er dette tallet du oppgir.',
        'arbeidsforhold.turnus.info.tekst.eksempel': 'Eksempel:',
        'arbeidsforhold.varierende': 'Deltid/varierende/tilkalling',
        'arbeidsforhold.varierende.1': 'Deltid',
        'arbeidsforhold.varierende.2': 'varierende',
        'arbeidsforhold.varierende.3': 'tilkalling',
        'arbeidsforhold.varierende.info.tittel': 'Hvordan regner jeg ut et snitt i min situasjon?',
        'arbeidsforhold.varierende.info.tekst.1':
            'Du regner ut et snitt ved å legge sammen antall timer du totalt har jobbet de siste 12 ukene og deler det med 12. Hvis du ikke har jobbet i 12 uker, regner du ut snittet på samme måte ved å bruke de ukene du har jobbet.',

        'frilanser.harDuHattInntekt.spm': 'Er du frilanser i perioden du søker for?',
        'frilanser.harDuAndreFrilansoppdrag.spm':
            'Har du andre frilansoppdrag du har fravær fra i perioden du søker for?',
        'frilanser.nårStartet.spm': 'Når startet du å jobbe som frilanser?',
        'frilanser.jobberFortsatt.spm': 'Jobber du fortsatt som frilanser?',
        'frilanser.nårSluttet.spm': 'Når sluttet du som frilanser?',
        'frilanser.jobberNormaltTimer.spm':
            'Hvor mange timer jobber du normalt per uke som frilanser når du ikke har fravær?',
        'frilanser.jobberNormaltTimer.avsluttet.spm':
            'Hvor mange timer jobbet du normalt per uke som frilanser da du ikke hadde fravær?',

        'frilanser.hjelpetekst.spm': 'Hva betyr det å være frilanser?',
        'frilanser.hjelpetekst':
            'Du er frilanser når du mottar lønn for enkeltstående oppdrag uten å være fast eller midlertidig ansatt hos den du utfører oppdraget for. Hvis du er usikker på om du er frilanser må du sjekke om oppdragene dine er registrert som frilansoppdrag på',
        'frilanser.hjelpetekst.skatteetatenLenke': 'skatteetaten sine nettsider.',

        'selvstendig.harDuHattInntekt.spm': 'Er du selvstendig næringsdrivende i perioden du søker for?',
        'selvstendig.harDuHattInntekt.hjelpetekst.tittel': 'Hva betyr det å være selvstendig næringsdrivende?',
        'selvstendig.harDuHattInntekt.hjelpetekst':
            'Du er selvstendig næringsdrivende når du enten har et enkeltpersonforetak (ENK), et ansvarlig selskap (ANS), eller et ansvarlig selskap med delt ansvar (DA).',
        'selvstendig.harDuHattInntekt.hjelpetekst.snSkatteetatenLenke':
            'I tillegg kan du lese på skatteetatens side om andre situasjoner hvor du kan regnes som selvstendig næringsdrivende.',
        'selvstendig.harFlereVirksomheter.spm': 'Har du flere enn én næringsvirksomhet som er aktiv?',
        'selvstendig.veileder.flereAktiveVirksomheter':
            'Når du har flere aktive næringsvirksomheter skal du kun legge inn den virksomheten som er eldst av dem. Har du for eksempel en virksomhet du startet i 2012 og en annen som du startet i 2020, skal du kun legge inn virksomheten du startet i 2012.',
        'selvstendig.list.tittel': 'Dine registrerte næringsvirksomheter',
        'selvstendig.list.leggTilLabel': 'Legg til næringsvirksomhet',
        'selvstendig.dialog.tittel': 'Næringsvirksomhet',

        'selvstendig.infoDialog.infoTittel': 'Næringsvirksomhet som du har lagt inn:',
        'selvstendig.infoDialog.registrerKnapp': 'Registrer virksomhet',
        'selvstendig.infoDialog.endreKnapp': 'Endre opplysninger',
        'selvstendig.infoDialog.fjernKnapp': 'Fjern virksomhet',
        'selvstendig.infoDialog.tittel.en': 'Opplysninger om virksomheten din',
        'selvstendig.infoDialog.tittel.flere': 'Opplysninger om den eldste virksomheten din',

        'sn.arbeidsforhold.spm':
            'Hvor mange timer jobber du normalt per uke som selvstendig næringsdrivende når du ikke har fravær?',
        'sn.arbeidsforhold.avsluttet.spm':
            'Hvor mange timer jobbet du normalt per uke som selvstendig næringsdrivende når du ikke hadde fravær?',
        'sn.arbeidsforhold.utledet': 'timer i uka',

        'snF.ArbeidsforholdDetaljer.hvaBetyr.spm': 'Hva betyr dette?',
        'snF.ArbeidsforholdDetaljer.hvaBetyr.frilanser.info':
            'Hvis du jobber som frilanser flere steder skal du her svare samlet for alle oppdragene. Hvis du f.eks. skal jobbe i en av to frilansforhold skal du her svare "Ja, men jeg skal jobbe mindre enn normalt".',
        'snF.ArbeidsforholdDetaljer.hvaBetyr.SN.info':
            'Hvis du jobber som selvstendig i flere virksomheter skal du her svare samlet for alle virksomhetene dine. Hvis du f.eks. skal jobbe i en av to virksomheter skal du her svare "Ja, men jeg skal jobbe mindre enn normalt".',

        'step.arbeidstid.pageTitle': 'Opplysninger om arbeidstid',
        'step.arbeidstid.stepTitle': 'Jobb i søknadsperioden',
        'step.arbeidstid.stepIndicatorLabel': 'Jobb i søknadsperioden',
        'step.arbeidstid.nextButtonLabel': 'Fortsett',

        'arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.1':
            'Du kan kun få utbetalt pleiepenger for hverdager. Det utbetales ikke pleiepenger for lørdag eller søndag selv om du har hatt fravær fra jobb for å pleie personen.',
        'arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.2':
            'Du kan derfor ikke registrere arbeid kun for lørdag og/eller søndag.',
        'arbeidIPeriode.søkerKunHelgedager.alert.avsnitt.3':
            'Vennligst gå tilbake til steg "Perioden med pleiepenger" og sjekk informasjonen du har fylt ut. Når du har gjort det, trykker du på "Fortsett"-knappen for å gå videre.',

        'arbeidIPeriode.StepInfo.1': 'Nå trenger vi å vite om du jobber noe i perioden du søker om å få pleiepenger.',
        'arbeidIPeriode.StepInfo.2':
            'Hvis du for eksempel pleier den som er syk en halv dag og jobber resten av dagen, bruker du også bare en halv dag med pleiepenger. De dagene du jobber fullt bruker du ikke av pleiepengedagene.',
        'arbeidIPeriode.FrilansLabel': 'Frilans',
        'arbeidIPeriode.SNLabel': 'Selvstendig næringsdrivende',
        'arbeidIPeriode.jobberIPerioden.spm': 'I perioden du søker for, hvilken situasjon gjelder for deg {hvor}?',
        'arbeidIPeriode.ukedager.tittel': 'Fyll ut hvor mye du jobbet i uken {hvor} i perioden:',
        'arbeidIPeriode.jobberIPerioden.jobberIkke': 'Jeg jobber ikke',
        'arbeidIPeriode.jobberIPerioden.jobberVanlig': 'Jeg jobber som normalt, og har ikke fravær',
        'arbeidIPeriode.jobberIPerioden.jobberRedusert': 'Jeg kombinerer delvis jobb med pleiepenger',
        'arbeidIPeriode.iDag.utledet': 'timer i uka',
        'arbeidIPeriode.prosent.utledet.medTimer': 'prosent av {timerNormalt} ({timerRedusert} per dag)',

        'step.medlemskap.pageTitle': 'Medlemskap i folketrygden',
        'step.medlemskap.stepTitle': 'Medlemskap i folketrygden',
        'step.medlemskap.stepIndicatorLabel': 'Om medlemskap i folketrygden',
        'step.medlemskap.nextButtonLabel': 'Fortsett',
        'step.medlemsskap.annetLandSiste12.spm': 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?',
        'step.medlemsskap.annetLandNeste12.spm':
            'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?',
        'step.medlemsskap.annetLandSiste12.hjelp':
            'Du svarer ja bare hvis du har oppholdt deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
        'step.medlemsskap.annetLandSiste12.listeTittel': 'Utenlandsopphold siste 12 måneder',
        'step.medlemsskap.annetLandNeste12.hjelp':
            'Du svarer ja bare hvis du planlegger å oppholde deg fast i et annet land enn Norge. Korte utlandsturer i forbindelse med for eksempel ferie regnes ikke med.',
        'step.medlemsskap.annetLandNeste12.listeTittel': 'Utenlandsopphold neste 12 måneder',
        'step.medlemsskap.annetLandSisteOgNeste12.listeTittel': 'Utenlandsopphold siste 12 måneder og neste 12 måneder',
        'step.medlemsskap.info.1':
            'Medlemskap i folketrygden er nøkkelen til rettigheter fra NAV. Hvis du bor eller jobber i Norge er du vanligvis medlem. Du kan lese mer om medlemskap på ',
        'step.medlemsskap.info.2': 'nav.no',
        'step.medlemsskap.hvaBetyrDette': 'Hva betyr dette?',
        'step.medlemsskap.utenlandsopphold.leggTilLabel': 'Legg til nytt utenlandsopphold',

        'step.oppsummering.pageTitle': 'Oppsummering',
        'step.oppsummering.stepTitle': 'Oppsummering',
        'step.oppsummering.stepIndicatorLabel': 'Oppsummering',
        'step.oppsummering.nextButtonLabel': 'Send inn søknad',
        'step.oppsummering.info':
            'Les gjennom oppsummeringen og sjekk at alt er riktig før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',

        'step.oppsummering.søker.header': 'Om deg',
        'step.oppsummering.pleietrengende.header': 'Om personen du pleier',
        'steg.oppsummering.pleietrengende.harIkkeFnr':
            'Oppgitt grunn for at han/hun ikke har fødselsnummer eller D-nummer: {årsak}',
        'steg.oppsummering.pleietrengende.fødselsdato': 'Fødselsdato: {dato}',
        'steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.BOR_I_UTLANDET': 'Personen bor i utlandet',
        'steg.oppsummering.pleietrengende.årsakManglerIdentitetsnummer.ANNET': 'Annet',
        'steg.oppsummering.pleietrengende.id': 'ID for personen du pleier',
        'step.oppsummering.pleietrengende.id.ingenId': 'Ingen ID er lastet opp',

        'steg.oppsummering.tidsrom.header': 'Perioden du søker pleiepenger for',
        'steg.oppsummering.søknadsperiode.header': 'Periode',
        'steg.oppsummering.tidsrom.fomtom': '{fom} - {tom}',

        'steg.oppsummering.pleierDuDenSykeHjemme.header':
            'Pleier du personen i et privat hjem i perioden du søker for?',

        'steg.oppsummering.flereSokere.header': 'Er dere flere som skal dele på pleiepengene?',

        'steg.oppsummering.JA': 'Ja',
        'steg.oppsummering.NEI': 'Nei',
        'steg.oppsummering.USIKKER': 'Usikker',

        'steg.oppsummering.utenlandsoppholdIPerioden.header': 'Utenlandsopphold i perioden du søker for?',
        'steg.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',

        'steg.oppsummering.ferieuttakIPerioden.header': 'Skal du ta ut ferie i perioden?',
        'steg.oppsummering.ferieuttakIPerioden.listetittel': 'Ferieuttak i perioden',

        'steg.oppsummering.arbeidssituasjon.header': 'Din arbeidssituasjon',
        'steg.oppsummering.vedlegg.header': 'Vedlegg',

        'arbeidsgiver.tittel': '{navn} (organisasjonsnummer {organisasjonsnummer})',
        'frilans.tittel': 'Frilans',
        'frilans.tittel.start': 'Frilanser hos {hvor} (startet {startdato})',
        'frilans.tittel.slutt': 'Frilanser hos {hvor} (sluttet {sluttdato})',
        'frilans.tittel.startOgSlutt': 'Frilanser hos {hvor} (startet {startdato}, sluttet {sluttdato})',
        'selvstendigNæringsdrivende.tittel': 'Selvstendig næringsdrivende',

        'oppsummering.arbeidssituasjon.arbeidsgiver.ansatt': 'Er ansatt i perioden',
        'oppsummering.arbeidssituasjon.avsluttet.arbeidsgiver.ansatt': 'Er ikke lenger ansatt',
        'oppsummering.arbeidssituasjon.tid': 'Jobber normalt {timer, plural, one {# time} other {# timer}} per uke',
        'oppsummering.arbeidssituasjon.avsluttet.tid':
            'Jobbet normalt {timer, plural, one {# time} other {# timer}} per uke',
        'oppsummering.arbeidssituasjon.avsluttet.sluttetFørSøknadsperiode': 'Sluttet før {periodeFra}',
        'oppsummering.arbeidssituasjon.avsluttet.sluttetISøknadsperiode': 'Sluttet etter {periodeFra}',

        'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.header': 'Arbeidsgivere',
        'oppsummering.arbeidssituasjon.arbeidsgivere.ingenIPeriode.tekst': 'Er ikke ansatt i perioden det søkes for',

        'oppsummering.arbeidssituasjon.frilanser.header': 'Frilanser',
        'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser': 'Er ikke frilanser i perioden det søkes for',
        'oppsummering.arbeidssituasjon.frilans.startet': 'Startet som frilanser {dato}',
        'oppsummering.arbeidssituasjon.frilans.fortsattFrilanser': 'Er fortsatt frilanser',
        'oppsummering.arbeidssituasjon.frilans.sluttet': 'Sluttet som frilanser {dato}',
        'oppsummering.arbeidssituasjon.frilans.frilansoppdrag': 'Frilansoppdrag registrert i perioden:',

        'oppsummering.arbeidssituasjon.selvstendig.header': 'Selvstendig næringsdrivende',
        'oppsummering.arbeidssituasjon.selvstendig.erIkkeSN':
            'Er ikke selvstendig næringsdrivende i perioden det søkes for',
        'oppsummering.arbeidssituasjon.selvstendig.erSn': 'Er selvstendig næringsdrivende i perioden',
        'oppsummering.arbeidssituasjon.selvstendig.flereVirksomheter': 'Har flere virksomheter',
        'oppsummering.arbeidssituasjon.selvstendig.enVirksomhet': 'Har 1 virksomhet',

        'oppsummering.arbeidssituasjon.verneplikt.header': 'Verneplikt',
        'oppsummering.arbeidssituasjon.verneplikt.harVærtVernepliktig':
            'Utøvde verneplikt på tidspunktet det søkes pleiepenger fra',
        'oppsummering.arbeidssituasjon.verneplikt.harIkkeVærtVernepliktig':
            'Utøvde ikke verneplikt på tidspunktet det søkes pleiepenger fra',

        'oppsummering.arbeidssituasjon.optjeningIUtlandet.listetittel': 'Jobbet i annet EØS-land',
        'oppsummering.arbeidssituasjon.optjeningIUtlandet.nei': 'Nei',

        'oppsummering.arbeidssituasjon.utenlandskNæring.listetittel':
            'Jobbet som selvstendig næringsdrivende i et annet EØS-land',
        'oppsummering.arbeidssituasjon.utenlandskNæring.nei': 'Nei',

        'oppsummering.arbeidIPeriode.jobbIPerioden.header': 'Jobb i søknadsperioden',
        'oppsummering.arbeidIPeriode.jobbIPerioden': 'Jobb i søknadsperioden',
        'oppsummering.arbeidIPeriode.jobberIPerioden.ja': 'jobber',
        'oppsummering.arbeidIPeriode.jobberIPerioden.HELT_FRAVÆR': 'Jeg jobber ikke',
        'oppsummering.arbeidIPeriode.jobberIPerioden.REDUSERT': 'Jeg kombinerer delvis jobb med pleiepenger',
        'oppsummering.arbeidIPeriode.jobberIPerioden.SOM_VANLIG': 'Jeg jobber som normalt, og har ikke fravær',
        'oppsummering.arbeidIPeriode.jobberIPerioden.liktHverUke': 'Jobber likt hver uke',
        'oppsummering.arbeidIPeriode.jobberIPerioden.prosent': 'Jobber {prosent} prosent, i snitt {timer} hver ukedag',

        'summary.virksomhet.virksomhetInfo.tittel': 'Næringsvirksomhet som du har lagt inn:',

        'step.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',

        'step.oppsummering.sendMelding.feilmelding.førsteGang':
            'Det oppstod en feil under innsending. Vennligst prøv på nytt.',
        'step.oppsummering.sendMelding.feilmelding.andreGang':
            'Det oppstod fortsatt en feil under innsending. Vennligst vent litt og prøv på nytt.',

        'step.oppsummering.medlemskap.header': 'Medlemskap i folketrygden',
        'step.oppsummering.utenlandsoppholdIPerioden.listetittel': 'Utenlandsopphold i perioden',
        'step.oppsummering.utlandetSiste12.header': 'Har du bodd i utlandet i de siste 12 månedene?',
        'step.oppsummering.utlandetNeste12.header': 'Skal du bo i utlandet i de neste 12 månedene?',
        'step.oppsummering.utlandetSiste12.liste.header': 'Utenlandsopphold siste 12 måneder',
        'step.oppsummering.utlandetNeste12.liste.header': 'Utenlandsopphold neste 12 måneder',
        'step.oppsummering.legeerklæring.header': 'Legeerklæring',
        'step.oppsummering.samværsavtale.header': 'Avtale om delt bosted',

        'step.oppsummering.fravær.aktivitet.1': 'Fravær som {aktivitet}.',
        'step.oppsummering.fravær.aktivitet.2': 'Fravær som {aktivitet1} og {aktivitet2}.',

        'step.oppsummering.dokumenter.header': 'Vedlegg',
        'step.oppsummering.dokumenter.ingenVedlegg': 'Ingen vedlegg er lastet opp',
        'steg.oppsummering.bekreftelseFraLege.header': 'Legeerklæring',

        'step.oppsummering.apiValideringFeil.tittel': 'Noe av informasjonen mangler',

        'step.oppsummering.bekrefterOpplysninger.ikkeBekreftet': 'Du må bekrefte opplysningene',

        'fieldvalidation.mottakersFnrErSøkersFnr': 'Du har tastet inn ditt eget fødselsnummer',

        'validation.harForståttRettigheterOgPlikter.notChecked':
            'Du må bekrefte at du har lest og forstått dine plikter.',
        'validation.pleietrengende.navn.stringHasNoValue': 'Du må skrive inn navnet til personen du  pleier.',
        'validation.pleietrengende.norskIdentitetsnummer.fødselsnummerHasNoValue':
            'Du må skrive inn fødselsnummeret til personen du  pleier. Et fødselsnummer består av 11 siffer.',
        'validation.pleietrengende.norskIdentitetsnummer.fødselsnummerIsInvalid':
            ' Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
        'validation.pleietrengende.norskIdentitetsnummer.fødselsnummerIsNot11Chars':
            'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
        'validation.pleietrengende.norskIdentitetsnummer.fødselsnummerIsNotAllowed':
            'Du har oppgitt ditt eget fødselsnummer. Du må skrive inn fødselsnummeret til personen du pleier.',
        'validation.pleietrengende.norskIdentitetsnummer.fødselsnummerAsHnrIsNotAllowed':
            'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
        'validation.pleietrengende.fødselsdato.dateHasNoValue':
            'Du må oppgi fødselsdatoen til personen du  pleier. Skriv inn, eller velg dato fra datovelgeren.',
        'validation.pleietrengende.fødselsdato.dateIsAfterMax': 'Fødselsdatoen kan ikke være etter dagens dato.',
        'validation.pleietrengende.fødselsdato.dateHasInvalidFormat':
            'Du må oppgi fødselsdatoen i et gyldig format. Gyldig format er dd.mm.åååå.',
        'validation.pleietrengende.årsakManglerIdentitetsnummer.noValue':
            'Du må svare på hvorfor den du pleier ikke har fødselsnummer eller D-nummer.',

        'validation.periodeFra.dateHasNoValue': 'Du må fylle ut periodens fra-dato.',
        'validation.periodeFra.dateHasInvalidFormat':
            'Du må oppgi periodens fra-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'validation.periodeFra.fromDateIsAfterToDate':
            'Fra-datoen kan ikke være etter til-datoen. Skriv inn eller velg dato fra kalenderen.',
        'validation.periodeFra.dateIsBeforeMin':
            'Du kan ikke søke om pleiepenger for en periode som er lenger enn 3 år tilbake i tid.',
        'validation.periodeFra.dateIsNotWeekday':
            'Periodens fra-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'validation.periodeTil.dateHasNoValue': 'Du må fylle ut periodens til-dato.',
        'validation.periodeTil.dateHasInvalidFormat':
            'Du må oppgi periodens til-dato i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
        'validation.periodeTil.dateIsBeforeMin':
            'Du kan ikke søke om pleiepenger for en periode som er lenger enn 3 år tilbake i tid.',
        'validation.periodeTil.dateIsNotWeekday':
            'Periodens til-dato må være en ukedag, det kan ikke være en lørdag eller søndag. Skriv inn eller velg dato fra kalenderen.',
        'validation.periodeTil.dateIsAfterMax': 'Du kan kun søke pleiepenger for opptil ett år av gangen.',
        'validation.periodeTil.toDateIsBeforeFromDate':
            'Til-datoen kan ikke være før fra-datoen. Skriv inn eller velg dato fra kalenderen.',

        'validation.pleierDuDenSykeHjemme.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du pleier personen i et privat hjem i perioden du søker for.',

        'validation.flereSokere.yesOrNoIsUnanswered':
            'Du må svare ja, nei eller usikker på om dere er flere som skal dele på pleiepengene.',

        'validation.skalOppholdeSegIUtlandetIPerioden.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du oppholder deg i utlandet i perioden du søker for',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_ikke_registrert':
            'Du har svart ja til at du oppholder deg i utlandet i perioden du søker for. Legg til minst ett utenlandsopphold.',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper':
            'Du har lagt inn utenlandsopphold med datoer som overlapper hverandre.',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_utenfor_periode':
            'Du har lagt inn utenlandsopphold som er utenfor søknadsperioden.',
        'validation.utenlandsoppholdIPerioden.utenlandsopphold_overlapper_samme_start_slutt':
            'Et utenlandsopphold kan ikke starte samme dag som et annet avsluttes.',

        'validation.ferieuttakIPerioden.ferieuttak_ikke_registrert':
            'Du har svart ja til at du skal ha ferie i perioden med pleiepenger. Legg til minst ett ferieuttak.',
        'validation.ferieuttakIPerioden.ferieuttak_utenfor_periode':
            'Du har lagt inn ferie som er utenfor søknadsperioden.',
        'validation.ferieuttakIPerioden.ferieuttak_overlapper': 'Du har lagt inn ferier som overlapper hverandre.',
        'validation.skalTaUtFerieIPerioden.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du skal ha ferie i perioden du søker for.',

        'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er ansatt hos {navn} i perioden du søker pleiepenger.',

        'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er frilanser i perioden du søker for.',
        'validation.frilans.startdato.dateHasNoValue':
            'Du må oppgi hvilken dato du startet som frilanser. Skriv inn eller velg dato fra kalenderen.',
        'validation.frilans.startdato.dateHasInvalidFormat':
            'Du må oppgi datoen for når du startet som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
        'validation.frilans.startdato.dateIsAfterMax':
            'Datoen for når du startet som frilanser kan ikke være etter dagens dato.',
        'validation.frilans.startdato.startetEtterSøknadsperiode':
            'Du har oppgitt at du startet som frilanser etter perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
        'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
            'Du har oppgitt at du sluttet som frilanser før perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',
        'validation.frilans.sluttdato.dateHasNoValue':
            'Oppgi når du sluttet som frilanser. Skriv inn eller velg dato fra kalenderen.',
        'validation.frilans.sluttdato.dateHasInvalidFormat':
            'Du må oppgi datoen for når du sluttet som frilanser i et gyldig format. Gyldig format er dd.mm.åååå.',
        'validation.frilans.sluttdato.dateIsAfterMax':
            'Datoen for når du sluttet som frilanser kan ikke være etter dagens dato.',
        'validation.frilans.sluttdato.dateIsBeforeMin':
            'Datoen for når du sluttet som frilanser kan ikke være før datoen du startet.',
        'validation.frilans.jobberFortsattSomFrilans.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du fortsatt jobber som frilanser.',

        'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er selvstendig næringsdrivende i perioden du søker for.',
        'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har flere enn én virksomhet som er aktiv.',
        'validation.selvstendig.virksomhet.noValue':
            'Du må oppgi informasjon om virksomheten din som selvstendig næringsdrivende.',
        'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
            'Du har oppgitt at du startet som selvstendig næringsdrivende etter perioden du søker for. Dersom dette stemmer,  svarer du "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',
        'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
            'Du har oppgitt at du sluttet som selvstendig næringsdrivende før perioden du søker for. Dersom dette stemmer,  svarer du "Nei" på spørsmålet om du var selvstendig næringsdrivende i perioden du søker for.',

        'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du utøvde verneplikt på tidspunktet du søker pleiepenger fra.',
        'virksomhetForm.næringstype.noValue': 'Du må velge hvilken type virksomhet du har.',

        'validation.opptjeningUtland.listIsEmpty': 'Du må legge til jobb i et annet EØS-land.',
        'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før første dag med pleiepenger.',

        'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om.',
        'validation.utenlandskNæring.listIsEmpty':
            'Du må legge til jobb som selvstendig næringsdrivende i et annet EØS-land.',

        'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
            'Du må svare på om du sluttet hos {navn} før {fraDato}.',
        'validation.arbeidsforhold.jobberNormaltTimer.numberHasNoValue':
            'Du må oppgi hvor mange timer per uke du {jobber} {hvor} i perioden.',
        'validation.arbeidsforhold.jobberNormaltTimer.numberHasInvalidFormat':
            'Antall timer du {jobber} per uke {hvor} kan kun bestå av tall.',

        'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooSmall':
            'Antall timer du {jobber} per uke {hvor} kan ikke være mindre enn {min}.',
        'validation.arbeidsforhold.jobberNormaltTimer.numberIsTooLarge':
            'Antall timer du {jobber} per uke {hvor} kan ikke være mer enn {max}.',

        'validation.arbeidIPeriode.fast.prosent.måSvareNeiPåJobbIPerioden':
            'Dersom du ikke skal jobbe {hvor}, må du svare Nei på spørsmålet ovenfor om jobb i perioden.',
        'validation.arbeidIPeriode.fast.prosent.numberHasNoValue':
            'Du må oppgi hvor mange prosent av din normale arbeidstid du jobber {hvor}.',
        'validation.arbeidIPeriode.fast.prosent.numberHasInvalidFormat':
            'Antall prosent du jobber {hvor} kan kun bestå av tall.',
        'validation.arbeidIPeriode.fast.prosent.numberIsTooSmall':
            'Antall prosent du jobber {hvor} kan ikke være mindre enn {min}.',
        'validation.arbeidIPeriode.fast.prosent.numberIsTooLarge':
            'Antall prosent du jobber {hvor} kan ikke være mer enn {max}.',
        'validation.arbeidIPeriode.fast.prosent.ingenTidRegistrert':
            'Du må oppgi hvor mange timer du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.fast.tid.timeHasNoValue': 'Du må fylle ut timer og minutter for {dag} {hvor}.',
        'validation.arbeidIPeriode.fast.tid.hoursAreInvalid': 'Antall timer på {dag} {hvor} er ikke et gyldig tall.',
        'validation.arbeidIPeriode.fast.tid.minutesAreInvalid':
            'Antall minutter på {dag} {hvor} er ikke et gyldig tall.',
        'validation.arbeidIPeriode.fast.tid.tooManyHours': 'Antall timer på {dag}  {hvor} kan ikke overstige 24 timer.',
        'validation.arbeidIPeriode.fast.tid.tooManyMinutes':
            'Antall minutter på {dag}  {hvor} kan ikke overstige 59 minutter.',
        'validation.arbeidIPeriode.fast.tid.durationIsTooLong':
            'Antall timer og minutter registrert {dag} {hvor} er for høyt. Tiden kan ikke overstige 24 timer hver ukedag.',
        'validation.arbeidIPeriode.fast.tid.durationIsTooShort':
            'Antall timer og minutter {dag} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'validation.arbeidIPeriode.fast.tid.hoursAreNegative':
            'Antall timer og minutter {dag} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'validation.arbeidIPeriode.fast.tid.minutesAreNegative':
            'Antall timer og minutter {dag} {hvor} kan ikke være mindre enn 0 timer og 0 minutter.',
        'validation.arbeidIPeriode.timer.ingenTidRegistrert':
            'Du må fylle ut hvor mye du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.timer.forMangeTimer':
            'Du har oppgitt for mange timer du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.jobber':
            'Du må svare på om hvilken situasjon gjelder for deg {hvor} i perioden du søker for.',
        'validation.arbeidIPeriode.timerEllerProsent.noValue':
            'Du må svare på hvordan du ønsker å oppgi hvor mye du jobber {hvor} i perioden.',
        'validation.arbeidIPeriode_prosentUgyldig':
            'Prosenten du kan oppgi er fra 1 til 100 prosent for hvor mye du jobber {hvor} i perioden.',
        'validation.arbeidIPeriode.fasteDager.ingenTidRegistrert':
            'Du må fylle ut hvor mye du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.fasteDager.forMangeTimer':
            'Du har oppgitt for mange timer du jobber i uken {hvor} i perioden.',
        'validation.arbeidIPeriode.enkeltdager.ingenTidRegistrert': 'Du må oppgi hvor mye du jobber {hvor} i perioden.',

        'validation.harBoddUtenforNorgeSiste12Mnd.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har bodd i utlandet i hele eller deler av de siste 12 månedene.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har oppgitt at du har vært i utlandet de siste 12 månedene. Du må registrere dette utenlandsoppholdet.',
        'validation.utenlandsoppholdSiste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene du har lagt inn for de siste 12 månedene, har datoer som overlapper hverandre.',
        'validation.skalBoUtenforNorgeNeste12Mnd.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du planlegger å bo i utlandet i hele eller deler av de neste 12 månedene.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_ikke_registrert':
            'Du har oppgitt at du skal oppholde deg i utlandet de neste 12 månedene. Du må registrere dette utenlandsoppholdet.',
        'validation.utenlandsoppholdNeste12Mnd.utenlandsopphold_overlapper':
            'Ett eller flere av utenlandsoppholdene du har lagt inn for de neste 12 månedene, har datoer som overlapper hverandre.',

        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene du har gitt er riktige.',

        'page.unavailable.1':
            'Den digitale pleiepengesøknaden er dessverre ikke tilgjengelig akkurat nå. Vi jobber med saken, slik at du kan søke digitalt. Frem til vi får fikset dette, kan du fylle ut vårt',
        'page.unavailable.2': 'papirskjema for pleiepenger i livets sluttfase',
        'page.unavailable.3': 'Vi beklager.',

        'arbeidssituasjonFrilanser.frilanserPart.tittel': 'Om deg som frilanser',
        'frilansoppdragListe.oppdrag': 'Periode: {tidsrom}',
        'frilansoppdragListe.tidsrom.avsluttet': 'fra {fra} til {til}',
        'frilansoppdragListe.tidsrom.pågående': 'fra {fra} - pågående',
        'frilansoppdragInfo.tittel': 'Registrerte frilansoppdrag i perioden:',
        'frilansoppdragInfo.tekst':
            'Dette er frilansoppdrag registrert i AA-registeret i perioden du søker om pleiepenger. Dersom informasjonen ikke stemmer, må du ta kontakt med oppdragsgiver og be de oppdatere informasjonen i AA-registeret.',
    },
};
