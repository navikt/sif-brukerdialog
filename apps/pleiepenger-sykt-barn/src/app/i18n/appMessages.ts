/* eslint-disable max-len */
import { sifCommonPleiepengerMessages } from '../local-sif-common-pleiepenger/i18n';
import { confirmationPageMessages } from '../pages/confirmation-page/confirmationPageMessages';
import { velkommenPageMessages } from '../pages/velkommen-page/velkommenPageMessages';
import { arbeidssituasjonMessages } from '../søknad/arbeidssituasjon-step/arbeidssituasjonMessages';
import { arbeidIPeriodeMessages } from '../søknad/arbeidstid-step/i18n/arbeidIPeriodeMessages';
import { legeerklæringMessages } from '../søknad/legeerklæring-step/legeerklæringMessages';
import { medlemskapMessages } from '../søknad/medlemskap-step/medlemskapMessages';
import { nattevåkOgBeredskapMessages } from '../søknad/nattevåk-og-beredskap-step/nattevåkOgBeredskapMessages';
import { omsorgstilbudMessages } from '../søknad/omsorgstilbud-step/omsorgstilbudMessages';
import { omBarnetMessages } from '../søknad/opplysninger-om-barnet-step/omBarnetMessages';
import { oppsummeringMessages } from '../søknad/oppsummering-step/oppsummeringMessages';
import { tidsromMessages } from '../søknad/tidsrom-step/tidsromMessages';

const nb = {
    ...sifCommonPleiepengerMessages.nb,
    ...arbeidIPeriodeMessages.nb,
    ...velkommenPageMessages.nb,
    ...confirmationPageMessages.nb,
    ...omBarnetMessages.nb,
    ...oppsummeringMessages.nb,
    ...tidsromMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...omsorgstilbudMessages.nb,
    ...nattevåkOgBeredskapMessages.nb,
    ...arbeidIPeriodeMessages.nb,
    ...legeerklæringMessages.nb,
    ...medlemskapMessages.nb,

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

    'validation.stønadGodtgjørelse.mottarStønadGodtgjørelse.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mottar omsorgsstønad eller fosterhjemsgodtgjørelse.',

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
        'Du har oppgitt at du startet startet å jobbe som frilanser etter perioden du søker for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilanser i perioden du søker for.',

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

    'validation.stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden.noValue':
        'Du må svare ja eller nei på om du mottar stønad/godtgjørelse i hele perioden du søker for.',

    'validation.stønadGodtgjørelse.starterUndeveis.noValue':
        'Du må svare Ja eller Nei på om du starter å motta stønad/godtgjørelse underveis i perioden du søker for.',
    'validation.stønadGodtgjørelse.starterUndeveis.starter_slutter_undeveis_nei':
        'Du kan ikke svare Nei samtidig på om du starter og slutter  å motta stønad/godtgjørelse underveis.',

    'validation.stønadGodtgjørelse.slutterUnderveis.noValue':
        'Du må svare Ja eller Nei på om du slutter å motta stønad/godtgjørelse underveis i perioden du søker for.',
    'validation.stønadGodtgjørelse.slutterUnderveis.starter_slutter_undeveis_nei':
        'Du kan ikke svare Nei både på at du starter og at du slutter å få stønad/godtgjørelse underveis.',

    'validation.stønadGodtgjørelse.startdato.dateHasNoValue':
        'Du må fylle ut dato når du startet å motta omsorgsstønad eller fosterhjemsgodtgjørelse.',
    'validation.stønadGodtgjørelse.startdato.dateIsAfterMax':
        'Start datoen kan ikke være etter søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.startdato.dateIsBeforeMin':
        'Start datoen kan ikke være før søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.startdato.dateHasInvalidFormat':
        'Du må oppgi start datoen i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.stønadGodtgjørelse.startdato.startetEtterSluttDato':
        'Start-datoen kan ikke være etter slutt-datoen. Skriv inn eller velg dato fra kalenderen.',

    'validation.stønadGodtgjørelse.sluttdato.dateHasNoValue':
        'Du må fylle ut dato når du sluttet å motta omsorgsstønad eller fosterhjemsgodtgjørelse.',
    'validation.stønadGodtgjørelse.sluttdato.dateIsAfterMax':
        'Slutt datoen kan ikke være etter søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.sluttdato.dateIsBeforeMin':
        'Slutt datoen kan ikke være før søknadsperioden. Skriv inn eller velg dato fra kalenderen.',
    'validation.stønadGodtgjørelse.sluttdato.dateHasInvalidFormat':
        'Du må oppgi slutt datoen i et gyldig datoformat. Gyldig format er dd.mm.åååå.',
    'validation.stønadGodtgjørelse.sluttdato.sluttetFørStartDato':
        'Slutt-datoen kan ikke være før start-datoen. Skriv inn eller velg dato fra kalenderen.',

    'psb.timer': '{timer, plural, one {# time} other {# timer}}',
    'psb.minutter': '{minutter, plural, one {# minutt} other {# minutter}}',
    'psb.timerOgMinutter':
        '{timer, plural, one {# time} other {# timer}} og {minutter, plural, one {# minutt} other {# minutter}}',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const appMessages = { nb, nn };
