/* eslint-disable max-len */
import { sifCommonPleiepengerMessages_nn } from '../local-sif-common-pleiepenger/i18n/nn';
import { confirmationPageMessages_nn } from '../pages/confirmation-page/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen-page/i18n/nn';
import { arbeidssituasjonMessages_nn } from '../søknad/arbeidssituasjon-step/i18n/nn';
import { arbeidIPeriodeMessages_nn } from '../søknad/arbeidstid-step/i18n/nn';
import { legeerklæringMessages_nn } from '../søknad/legeerklæring-step/i18n/nn';
import { medlemskapMessages_nn } from '../søknad/medlemskap-step/i18n/nn';
import { nattevåkOgBeredskapMessages_nn } from '../søknad/nattevåk-og-beredskap-step/i18n/nn';
import { omsorgstilbudMessages_nn } from '../søknad/omsorgstilbud-step/i18n/nn';
import { omBarnetMessages_nn } from '../søknad/opplysninger-om-barnet-step/i18n/nn';
import { oppsummeringMessages_nn } from '../søknad/oppsummering-step/i18n/nn';
import { tidsromMessages_nn } from '../søknad/tidsrom-step/i18n/nn';
import { appCommonMessages_nb, appMessages_nb } from './nb';

export const appCommonMessages_nn: Record<keyof typeof appCommonMessages_nb, string> = {
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
        'Du må svare ja eller nei på om du mottar omsorgsstønad eller fosterheimsgodtgjersle.',

    'validation.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mottar fosterheimsgodtgjersle.',
    'validation.fosterhjemsgodtgjørelse.erFrikjøptFraJobb.noValue':
        'Du må svare ja eller nei på om du er frikjøpt frå jobb',

    'validation.fosterhjemsgodtgjørelse.frikjøptBeskrivelse.stringHasNoValue':
        'Du må skrive inn detaljar om frikjøp og fosterheimsgodtgjersle',
    'validation.fosterhjemsgodtgjørelse.frikjøptBeskrivelse.stringIsTooLong':
        'Skildringa av frikjøp og fosterheimsgodtgjersle kan ikkje vera lengre enn 1000 teikn.',
    'validation.fosterhjemsgodtgjørelse.frikjøptBeskrivelse.stringHasInvalidCharacters':
        'Skildringa inneheld ugyldige teikn. Dette kan mellom anna skuldast tekst som er kopiert frå andre stader. Ugyldige teikn kan til dømes vere emojar, spesialteikn som « », §, @, eller skjulte formateringsteikn som innrykk, tabulatorar og listeformatering. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',

    'validation.fosterhjemsgodtgjørelse.frikjøptArbeidsgivere.listHasTooFewItems':
        'Du må velje kva for ein arbeidsgjevar du er frikjøpt frå',
    'validation.fosterhjemsgodtgjørelse.frikjøptArbeidsgivere.listIsEmpty':
        'Du må velje kva for ein arbeidsgjevar du er frikjøpt frå',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent.noValue':
        'Du må svare på om du ønskjer å oppgje kor mykje du er frikjøpt i timar eller prosent',
    'validation.fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden.noValue':
        'Du må svare på korleis du mottar denne godtgjersla gjennom heile perioden du søkjer om.',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberHasNoValue':
        'Du må oppgje kor mange prosent du er frikjøpt',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberHasInvalidFormat':
        'Oppgjeve prosent for kor mykje du er frikjøpt har ikkje gyldig format. Eit gyldig tal inneheld kun siffer og komma som desimaltegn.',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberIsTooSmall':
        'Oppgjeve prosent for kor mykje du er frikjøpt kan ikkje vere mindre enn {min}.',
    'validation.fosterhjemsgodtgjørelse.frikjøptProsent.numberIsTooLarge':
        'Oppgjeve prosent for kor mykje du er frikjøpt kan ikkje vere meir enn {max}.',
    'validation.fosterhjemsgodtgjørelse.slutterUnderveis.starter_slutter_undeveis_nei':
        'Du har svart nei på både om godtgjersla startar og sluttar undervegs i perioden du søkjer for. Då må du svare Ja på at du mottar denne godtgjersla for heile perioden du søkjer om.',

    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberHasNoValue': 'Du må oppgje kor mange timar du er frikjøpt',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberHasInvalidFormat':
        'Oppgjeve antal timar for kor mykje du er frikjøpt har ikkje gyldig format. Eit gyldig tal inneheld kun siffer og komma som desimaltegn.',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberIsTooSmall':
        'Oppgjeve antal timar for kor mykje du er frikjøpt kan ikkje vere mindre enn {min}.',
    'validation.fosterhjemsgodtgjørelse.frikjøptTimer.numberIsTooLarge':
        'Oppgjeve antal timar for kor mykje du er frikjøpt kan ikkje vere meir enn {max}.',

    'validation.fosterhjemsgodtgjørelse.starterUndeveis.noValue':
        'Du må svare på om godtgjersla startar undervegs i pleiepengeperioden din',
    'validation.fosterhjemsgodtgjørelse.startdato.dateHasNoValue':
        'Du må oppgje kva dato godtgjersla startar. Skriv inn eller vel dato frå kalenderen.',
    'validation.fosterhjemsgodtgjørelse.startdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når godtgjersla startar  i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.fosterhjemsgodtgjørelse.startdato.dateIsAfterMax':
        'Datoen for når godtgjersla startar kan ikkje vere etter dags dato, eller etter perioden du søkjer for.',
    'validation.fosterhjemsgodtgjørelse.startdato.dateIsBeforeMin':
        'Datoen for når godtgjersla startar kan ikkje vere før perioden du søkjer for. Viss den starta før dette, må du svare nei på om den startar undervegs i pleiepengeperioden.',
    'validation.fosterhjemsgodtgjørelse.startdato.startetEtterSluttDato':
        'Startdatoen for godtgjersla kan ikkje vere etter sluttdatoen. Skriv inn eller vel dato frå kalenderen.',
    'validation.fosterhjemsgodtgjørelse.startdato.sluttetFørStartDato':
        'Sluttdatoen for godtgjersla kan ikkje vere før startdatoen. Skriv inn eller vel dato frå kalenderen.',

    'validation.fosterhjemsgodtgjørelse.slutterUnderveis.noValue':
        'Du må svare på om godtgjersla sluttar undervegs i pleiepengeperioden din',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateHasNoValue':
        'Du må oppgje kva dato godtgjersla sluttar. Skriv inn eller vel dato frå kalenderen.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når godtgjersla sluttar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateIsAfterMax':
        'Hvis datoen for når godtgjersla sluttar er etter perioden du søkjer for, må du svare nei på om den sluttar undervegs i pleiepengeperioden.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.dateIsBeforeMin':
        'Datoen for når godtgjersla sluttar kan ikkje vere før perioden du søkjer for, eller før godtgjersla startar.',
    'validation.fosterhjemsgodtgjørelse.sluttdato.sluttetFørStartDato':
        'Datoen for når godtgjersla sluttar kan ikkje vere før godtgjersla startar.',

    'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er tilsett hos {navn} i perioden du søkjer pleiepengar.',
    'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du slutta hos {navn} før {fraDato}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasNoValue':
        'Du må oppgje kor mange timar du {jobber} per veke {hvor} i perioden når du ikkje har fråvær på grunn av pleiepengar.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberHasInvalidFormat':
        'Antal timar du normalt {jobber} per veke {hvor} har ikkje gyldig format. Eit gyldig tal inneheld berre siffer og komma som desimalskiljeteikn.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooSmall':
        'Antal timar du normalt {jobber} per veke {hvor} kan ikkje vere mindre enn {min}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.numberIsTooLarge':
        'Antal timar du normalt {jobber} per veke {hvor} kan ikkje vere meir enn {max}.',
    'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.frilansOgOmsorgsstønad.numberIsTooLarge':
        'Antal timar du normalt {jobber} per veke som frilansar og mottar i omsorgsstønad kan ikkje vere meir enn {max} timar til saman.',
    'validation.frilans.harHattInntektSomFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du jobbar som frilansar, eller om du mottar honorar.',
    'validation.frilans.frilanstype.notChecked': 'Du må velje kva som er situasjonen din som frilansar.',
    'validation.frilans.misterHonorar.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du mistar honorar i perioden du søkjer for.',
    'validation.frilans.startdato.dateHasNoValue':
        'Du må oppgje kva dato du starta å jobbe som frilansar. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.startdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når du starta å jobbe som frilansar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.startdato.dateIsAfterMax':
        'Datoen for når du starta å jobbe som frilansar kan ikkje vere etter dags dato.',
    'validation.frilans.startdato.dateIsBeforeMin':
        'Datoen for når du starta å jobbe som frilansar kan ikkje vere før {minDato}. Dersom du starta før dette, må du svare ja på at du starta før denne datoen.',
    'validation.frilans.startdato.startetEtterSøknadsperiode':
        'Du har oppgjeve at du starta å jobbe som frilansar etter perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilansar i perioden du søkjer for.',
    'validation.frilans.sluttdato.sluttetFørSøknadsperiode':
        'Du har oppgjeve at du slutta å jobbe som frilansar før perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var frilansar i perioden du søkjer for.',
    'validation.frilans.sluttdato.dateHasNoValue':
        'Du må oppgje kva dato du slutta å jobbe som frilansar. Skriv inn eller vel dato frå kalenderen.',
    'validation.frilans.sluttdato.dateHasInvalidFormat':
        'Du må oppgje datoen for når du slutta å jobbe som frilansar i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.frilans.sluttdato.dateIsAfterMax':
        'Datoen for når du slutta å jobbe som frilansar kan ikkje vere etter dags dato.',
    'validation.frilans.sluttdato.dateIsBeforeMin':
        'Datoen for når du slutta å jobbe som frilansar kan ikkje vere før datoen du starta.',
    'validation.frilans.startetFørSisteTreHeleMåneder.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du starta som frilansar før {dato}.',
    'validation.frilans.erFortsattFrilanser.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du framleis jobbar som frilansar.',

    'validation.selvstendig.harHattInntektSomSN.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du er sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.selvstendig.harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har fleire enn éi verksemd som er aktiv.',
    'validation.selvstendig.virksomhet.noValue':
        'Du må oppgje informasjon om verksemda di som sjølvstendig næringsdrivande.',
    'validation.harVærtEllerErVernepliktig.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du utførte verneplikt på tidspunktet du søkjer pleiepengar frå.',
    'validation.selvstendig.virksomhet.startetEtterSøknadsperiode':
        'Du har oppgjeve at du starta som sjølvstendig næringsdrivande etter perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.selvstendig.virksomhet.sluttetFørSøknadsperiode':
        'Du har oppgjeve at du slutta som sjølvstendig næringsdrivande før perioden du søkjer for. Dersom dette stemmer, kan du svare "Nei" på spørsmålet om du var sjølvstendig næringsdrivande i perioden du søkjer for.',
    'validation.harOpptjeningUtland.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobba som arbeidstakar eller frilansar i eit anna EØS-land i løpet av dei 3 siste månadane før første dag med pleiepengar.',
    'validation.opptjeningUtland.listIsEmpty': 'Du må leggje til jobb i eit anna EØS-land.',
    'validation.harUtenlandskNæring.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har jobba som sjølvstendig næringsdrivande i eit anna EØS-land i løpet av dei 3 siste åra før perioden du søkjer om.',
    'validation.utenlandskNæring.listIsEmpty':
        'Du må leggje til jobb som sjølvstendig næringsdrivande i eit anna EØS-land.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane du har gitt er riktige.',

    'validation.omsorgsstønad.antallTimer.numberHasNoValue':
        'Du må oppgje antal timar timer du mottar normalt i omsorgsstønad.',
    'validation.omsorgsstønad.antallTimer.numberHasInvalidFormat':
        'Oppgjeve antal timar for kor mykje du mottar normalt i omsorgsstønad har ikkje gyldig format. Eit gyldig tal inneheld kun siffer og komma som desimaltegn.',
    'validation.omsorgsstønad.antallTimer.numberIsTooSmall':
        'Oppgjeve antal timar for kor mykje du mottar normalt i omsorgsstønad kan ikkje vere mindre enn {min}.',
    'validation.omsorgsstønad.antallTimer.numberIsTooLarge':
        'Oppgjeve antal timar for kor mykje du mottar normalt i omsorgsstønad kan ikkje vere meir mer enn {max}.',

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

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...sifCommonPleiepengerMessages_nn,
    ...arbeidIPeriodeMessages_nn,
    ...velkommenPageMessages_nn,
    ...confirmationPageMessages_nn,
    ...omBarnetMessages_nn,
    ...oppsummeringMessages_nn,
    ...tidsromMessages_nn,
    ...arbeidssituasjonMessages_nn,
    ...omsorgstilbudMessages_nn,
    ...nattevåkOgBeredskapMessages_nn,
    ...legeerklæringMessages_nn,
    ...medlemskapMessages_nn,
    ...appCommonMessages_nn,
};
