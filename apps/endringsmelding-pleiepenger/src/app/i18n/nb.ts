import { infoNormalarbeidstidMessages_nb } from '../components/info-normalarbeidstid/i18n/nb';
import { arbeidstidUkerMessages_nb } from '../modules/arbeidstid-uker/i18n/nb';
import { endreArbeidstidFormMessages_nb } from '../modules/endre-arbeidstid-form/i18n/nb';
import { tilsynsordningMånedMessages_nb } from '../modules/tilsynsordning-måned/i18n/nb';
import { velgSakPageMessages_nb } from '../pages/velg-sak/i18n/nb';
import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { arbeidstidStepMessages_nb } from '../søknad/steps/arbeidstid/i18n/nb';
import { oppsummeringStepMessages_nb } from '../søknad/steps/oppsummering/i18n/nb';
import { tilsynsordningMessages_nb } from '../søknad/steps/tilsynsordning/i18n/nb';
import { ukjentArbeidsforholdStepMessages_nb } from '../søknad/steps/ukjent-arbeidsforhold/i18n/nb';
import { samtykkeFormOverrideMessages_nb } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages_nb } from './sifCommonSoknadOverrideMessages';

export const appMessages_nb = {
    ...arbeidstidStepMessages_nb,
    ...endreArbeidstidFormMessages_nb,
    ...infoNormalarbeidstidMessages_nb,
    ...samtykkeFormOverrideMessages_nb,
    ...ukjentArbeidsforholdStepMessages_nb,
    ...velkommenPageMessages_nb,
    ...velgSakPageMessages_nb,
    ...oppsummeringStepMessages_nb,
    ...sifCommonSoknadOverrideMessages_nb,
    ...arbeidstidUkerMessages_nb,
    ...tilsynsordningMessages_nb,
    ...tilsynsordningMånedMessages_nb,

    'step.oppdater': 'Neste',

    'psb.timerOgMinutter':
        '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',

    'mandag.caps': 'Mandag',
    'tirsdag.caps': 'Tirsdag',
    'onsdag.caps': 'Onsdag',
    'torsdag.caps': 'Torsdag',
    'fredag.caps': 'Fredag',

    samletSøknadsperiodeTekstVariant2: 'fra {fra} til {til}',
    samletSøknadsperiodeTekstVariant3: '{fra} til {til}',

    'lenke.skrivTilOss': 'Skriv til oss',
    'lenke.sendBeskjed': 'Send beskjed',

    'application.title': 'Endringsmelding for pleiepenger sykt barn',
    'step.ukjentArbeidsforhold.pageTitle': 'Nytt arbeidsforhold',
    'step.ukjentArbeidsforhold.stepTitle': 'Nytt arbeidsforhold',
    'step.aktivitet.stepTitle': 'Velg arbeidsforhold',
    'step.arbeidstid.stepTitle': 'Jobb i pleiepengeperioden',
    'step.lovbestemtFerie.stepTitle': 'Ferie i pleiepengeperioden',
    'step.tilsynsordning.stepTitle': 'Tid i omsorgstilbud',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'arbeidsaktivitetBlockHeader.nyttArbeidsforhold': 'Nytt arbeidsforhold',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.orgnummer': 'Organisasjonsnummer: {orgnr}',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansettelsesperioder': 'Ansettelsesperioder',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFomTom': 'Ansatt: {fom} - {tom}.',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFom': 'Ansatt: {dato} - pågående',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattTom': ' Sluttdato: {dato}.',

    'ikkeAnsattMelding.tekst':
        'Er du feilregistrert eller du har sluttet i dette arbeidsforholdet før perioden du søkte pleiepenger, må du be arbeidsgiveren om å sende en ny A-melding med sluttdato. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'startPåNyttDialog.tekst.1': 'Du har trykket deg tilbake til startsiden.',
    'startPåNyttDialog.tekst.2': 'Vil du starte utfyllingen på nytt eller fortsette der du var?',
    'startPåNyttDialog.tittel': 'Oops',
    'startPåNyttDialog.okLabel': 'Starte på nytt',
    'startPåNyttDialog.cancelLabel': 'Fortsette der jeg var',

    'tags.kortUke': 'Kort uke',
    'tags.nytt': 'Nytt',
    'tags.endret': 'Endret',

    'aaRegisteret.kort': 'Aa-registeret',
    'aaRegisteret.lang': 'Arbeidsgiver- og arbeidstakerregisteret',

    'arbeidsaktiviteterMedUkjentArbeidsgiver.tittel': 'Avsluttet arbeidsforhold',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.orgnummer': 'Org.nr. {orgnr}',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.aaRegisteret':
        'Du har arbeidsforhold i din pleiepengeperiode som er registrert som avsluttet av arbeidsgiver i {AAregisteret}. Dette kan være hvis du har sluttet i en jobb, byttet avdeling eller lignende.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreNoe':
        'Du kan ikke lenger endre arbeidstid for dette arbeidsforholdet.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreAlle':
        'Du kan ikke lenger endre arbeidstid for {antallUkjente, plural, one {dette arbeidsforholdet} other {disse arbeidsforholdene}}, men du kan fortsatt melde inn endringer for andre arbeidsforhold under.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.feil.tittel': 'Dette er feil, hva kan jeg gjøre?',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.feil.enUkjent':
        'Jobber du fremdeles i arbeidsforholdet og det er feil at arbeidsforholdet er avsluttet, må du be arbeidsgiveren din om å rette dette i {AAregisteret}. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.feil.flereUkjent':
        'Jobber du fremdeles i noen av arbeidsforholdene og det er feil at arbeidsforholdene er avsluttet, må du be arbeidsgiverene dine om å rette dette i {AAregisteret}. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'invalidStepSøknadsdataInfo.title': 'Oops, dette stemmer ikke helt',
    'invalidStepSøknadsdataInfo.info':
        'Vennligst gå tilbake til steget {Lenke}, og bruk knappene nederst i skjemaet for å gå videre. Ikke bruk frem og tilbake-funksjonaliteten i nettleseren.',

    'feriedagerISøknadsperiode.leggTilFerie': 'Legg til ferie',
    'feriedagerISøknadsperiode.modal.tittel': 'Ferie',

    'lovbestemtFerieListe.ingenFerieRegistrert': 'Ingen ferie registrert',
    'lovbestemtFerieListe.ferieLagtTil': 'Ferie lagt til',
    'lovbestemtFerieListe.ferieFjernet': 'Ferie fjernet',
    'lovbestemtFerieListe.angreFjern': 'Angre fjern',
    'lovbestemtFerieListe.endreFerie.label': 'Endre ferie',
    'lovbestemtFerieListe.endreFerie.ariaLabel': 'Endre ferie {periode}',
    'lovbestemtFerieListe.fjernFerie.label': 'Fjern ferie',
    'lovbestemtFerieListe.fjernFerie.ariaLabel': 'Fjern ferie {periode}',

    'ingenTilgangPage.pageTitle': 'Ingen tilgang - Endringsmelding for pleiepenger sykt barn',
    'ingenTilgangPage.tittel': 'Hei {navn}',
    'ingenTilgangPage.beskjedTilOssGenerell':
        'I mellomtiden bruker du tjenesten {SendBeskjedLink} for å melde fra om endringer.',
    'ingenTilgangPage.harUgyldigK9FormatSak.1':
        'Vi ser at du har en sak om pleiepenger hos oss, men foreløpig kan du ikke bruke denne tjenesten. Vi jobber for å få det til, slik at du også snart kan melde fra om endring her.',
    'ingenTilgangPage.harIngenSak.1':
        'Vi finner ingen sak om pleiepenger for sykt barn registrert på deg, derfor kan du heller ikke bruke denne tjenesten. Hvis du akkurat har sendt inn en søknad, tar det noen minutter før saken din kommer opp her.',
    'ingenTilgangPage.harIngenSak.2':
        'Hvis du har søkt om pleiepenger for en periode frem i tid, eller for barn som ikke er folkeregistrert på deg, kan det ta tid før du kan bruke endringsmeldingen. Du kan foreløpig melde endringer i pleiepengesaken din via {SendBeskjedLink}.',
    'ingenTilgangPage.harIngenSak.3':
        'Hvis du ønsker at en av våre veiledere skal undersøke hvorfor du ikke kan bruke endringsmeldingen, kan du kontakte oss på telefon 55 55 33 33.',
    'ingenTilgangPage.harFlereAnsettelsesforholdHosUkjentArbeidsgiver.1':
        'Du kan ikke bruke denne tjenesten. Dette er fordi vi har funnet arbeidsforhold på deg som ikke er registrert i pleiepengesaken din, og hvor du har flere ansettelsesforhold. Du må derfor sende en ny søknad, slik at saken og utbetalingene dine blir riktige.',

    'ingenTilgangPage.harFlereAnsettelsesforholdHosUkjentArbeidsgiver.2':
        'Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss {SkrivTilOssLink}.',
    'ingenTilgangPage.harArbeidstidSomSelvstendigNæringsdrivende.1':
        'Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot endringer fra selvstendig næringsdrivende. Vi jobber for å få det til, og selvstendig næringsdrivende blir også tilbudt denne tjenesten på et senere tidspunkt.',
    'ingenTilgangPage.harMerEnnEnSak.1':
        'Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot endringer når du har pleiepenger for flere barn. Vi jobber for å få det til, og du blir også tilbudt denne tjenesten på et senere tidspunkt',
    'ingenTilgangPage.utenforEndringsperiode.1':
        'Du kan ikke bruke denne tjenesten fordi siste søknadsperiode gikk ut for mer enn enn {ANTALL_MÅNEDER_TILLATT_FOR_ENDRING} måneder siden. Du kan melde fra om endring i tjenesten {SendBeskjedLink}, eller sende oss en ny søknad.',
    'ingenTilgangPage.utenforEndringsperiode.2':
        'Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss {SkrivTilOssLink}.',
    'ingenTilgangPage.slutterOgStarterInneforSammeUke':
        'Vi ser at du har to ansettelsesforhold hos samme arbeidsgiver som slutter og starter samme uke. Da kan du dessverre ikke bruke denne løsningen for å melde fra om endringer.',
    'ingenTilgangPage.barnManglerIdentitetsnummer.1':
        'Du kan ikke bruke denne tjenesten enda, fordi saken ikke er klar for endring enda.',

    'kvitteringPage.pageTitle': 'Endringsmelding er mottatt',
    'kvitteringPage.title': 'Melding om endring er lagt til saken din',
    'kvitteringPage.info.1':
        'Du kan se endringsmeldingen etter ca. 15 minutter på <Lenke>Dine Pleiepenger</Lenke>.  Der finner du svar på endringene, når meldingen er behandlet.',

    'lovbestemtFerieStep.guide.tittel': 'Slik endrer du ferie',
    'lovbestemtFerieStep.guide.tekst.1': 'Du kan endre, legge til eller fjerne ferie i pleiepengeperioden din.',
    'lovbestemtFerieStep.guide.tekst.2': 'Du skal kun registrere ferie for ukedager (mandag til fredag).',

    'lovbestemtFerieStep.heading.perioder':
        '{antallPerioder, plural, one {Uker med pleiepenger} other {Dine perioder med pleiepenger}}',
    'lovbestemtFerieStep.heading.registrertFerie': 'Registrert ferie',
    'lovbestemtFerieStep.tags.ferieEndret': 'Ferie endret',
    'lovbestemtFerieStep.ferieFjernet.melding':
        'Du har fjernet feriedager. Hvis du skal jobbe disse dagene, må du se over at jobb i perioden er riktig. Dette gjør du på steget Jobb i perioden.',
    'lovbestemtFerieStep.ferieFjernet.melding.arbeidstid':
        'Du har fjernet feriedager. Hvis du skal jobbe disse dagene, må du se over at jobb i perioden er riktig. Dette gjør du på neste steg.',
    'calendarGrid.Mandag': 'Mandag',
    'calendarGrid.Tirsdag': 'Tirsdag',
    'calendarGrid.Onsdag': 'Onsdag',
    'calendarGrid.Torsdag': 'Torsdag',
    'calendarGrid.Fredag': 'Fredag',
    'calendarGrid.uke': 'uke',
    'calendarGrid.Uke': 'Uke',
    'calendarGrid.måned': 'måned',
    'calendarGrid.Måned': 'Måned',

    'tidsbrukKalenderDag.endretFra': 'Endret fra:',
    'tidsbrukKalenderDag.ingenTid': 'Ingen tid',
    'tidsbrukKalenderDag.uendret': '(uendret)',

    'lovbestemtFerieModal.ariaLabel': 'Lovbestemt ferie',

    'søknad.ingenTilgang.pageTitle': 'Ingen tilgang',
    'søknad.ingenTilgang.tekst': 'Du har ikke tilgang til denne siden.',
    'søknad.feil.pageTitle': 'Det oppstod en feil',
    'søknad.feil.tekst': 'Det oppstod en feil under henting av informasjon. Vennligst prøv igjen litt senere.',

    'ukjentPathMelding.tekst': 'Oops, det oppstod en feil.',
    'ukjentPathMelding.startPåNytt': 'Start på nytt',
};
