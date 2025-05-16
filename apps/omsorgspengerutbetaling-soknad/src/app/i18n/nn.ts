import { kvitteringMessages_nn } from '../pages/kvittering/i18n/nn';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { arbeidssituasjonMessages_nn } from '../søknad/steps/arbeidssituasjon/i18n/nn';
import { dineBarnMessages_nn } from '../søknad/steps/dine-barn/i18n/nn';
import { fraværFraMessages_nn } from '../søknad/steps/fravær-fra/i18n/nn';
import { fraværStepMessages_nn } from '../søknad/steps/fravær/i18n/nn';
import { legeerklæringMessages_nn } from '../søknad/steps/legeerklæring/i18n/nn';
import { oppsummeringMessages_nn } from '../søknad/steps/oppsummering/i18n/nn';
import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...velkommenPageMessages_nn,
    ...dineBarnMessages_nn,
    ...fraværStepMessages_nn,
    ...arbeidssituasjonMessages_nn,
    ...fraværFraMessages_nn,
    ...legeerklæringMessages_nn,
    ...oppsummeringMessages_nn,
    ...kvitteringMessages_nn,

    'application.title': 'Søknad om utbetaling av omsorgspengar til sjølvstendig næringsdrivande eller frilansarar',

    time: 'time',
    timer: 'timar',

    'step.dineBarn.stepTitle': 'Barn og rett til omsorgspengar frå Nav',
    'step.dineBarn.stepIndicatorLabel': 'Barn og rett til omsorgspengar frå Nav',

    'step.fravaer.stepTitle': 'Dagar du søkjer om utbetaling for',

    'step.legeerklæring.stepTitle': 'Last opp legeerklæring',

    'step.legeerklæring.counsellorpanel.1':
        'Dersom du søkjer om utbetaling for meir enn 3 samanhengande dagar, må du laste opp ei legeerklæring som gjeld frå og med den 4. dagen.',
    'step.legeerklæring.counsellorpanel.2':
        'Dersom du søkjer for kortare periode eller for enkeltdagar, treng du ikkje legeerklæring. Du kan då fortsette søknaden utan å laste opp noko.',
    'step.legeerklæring.counsellorpanel.3':
        'Dersom du søkjer for meir enn 3 samanhengande dagar, men ikkje har legeerklæring tilgjengeleg no,',
    'step.legeerklæring.counsellorpanel.3.lenkeEttersending': 'kan du ettersende den her.',

    'step.legeerklæring.uploadBtn': 'Last opp legeerklæring',
    'step.legeerklæring.nextButtonLabel': 'Fortset',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen vedlegg er lasta opp',

    'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjon',

    'step.fravaerFra.stepTitle': 'Fråvær frå arbeid som sjølvstendig næringsdrivande og/eller frilansar',

    'step.medlemskap.stepTitle': 'Medlemskap i folketrygda',

    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen seinare.',

    'resetMellomlagring.text.1': 'Dersom feilen vare ved, kan du prøve å starte på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'page.ikkeTilgang.tekst':
        'Du har ikkje tilgang til denne sida. Dersom du er under 18 år, må ein av foreldra dine eller ein føresett skrive under på søknaden saman med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
    'page.ikkeTilgang.lastNed': 'Her kan du laste ned papirsøknaden',

    'validation.barn.ingenBarn': 'Du må leggje til minst eitt barn for å kunne gå vidare i søknaden.',
    'validation.harUtvidetRett.yesOrNoIsUnanswered':
        'Du må svare om du har fått ekstra omsorgsdagar for barn fordi barnet har kronisk sjukdom eller funksjonshemming.',
    'validation.harSyktBarn.yesOrNoIsUnanswered':
        'Du må svare om du har fått ekstra omsorgsdagar for eit barn som har ein sjukdom eller funksjonshemming som gjer at du oftare må vere borte frå jobb.',
    'validation.harAleneomsorg.yesOrNoIsUnanswered':
        'Du må svare på om du har fått ekstra omsorgsdagar fordi du er åleine om omsorga.',
    'validation.harDekketTiFørsteDagerSelv.notAnswered': 'Du må svare på om du har dekt dei 10 første dagane i år.',
    'validation.harDekketTiFørsteDagerSelv.yesOrNoIsUnanswered':
        'Du må svare på om du har dekt dei 10 første dagane i år.',
    'validation.harPerioderMedFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har hatt heile dagar med fråvær frå jobb.',
    'validation.fraværPerioder.listIsEmpty': 'Du har ikkje lagt til dagar med fullt fråvær.',
    'validation.fraværPerioder.ulikeÅrstall':
        'Du har lagt til fråvær som er i fleire år. Ein søknad kan berre innehalde fråvær i eitt år.',
    'validation.fraværDager.listIsEmpty': 'Du har ikkje lagt til dagar med delvis fråvær.',
    'validation.harDagerMedDelvisFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har hatt dagar med delvis fråvær frå jobb.',
    'validation.perioder_harVærtIUtlandet.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har vore i utlandet nokre av dagane du søkjer omsorgspengar for.',
    'validation.perioder_utenlandsopphold.listIsEmpty':
        'Du har svart at du har vore i utlandet i perioden du søkjer for, du må derfor leggje til utanlandsopphald.',

    'validation.frilans_erFrilanser.yesOrNoIsUnanswered': 'Du må svare ja eller nei på om du var frilansar.',
    'validation.frilans_startdato.dateHasNoValue': 'Du må fylle ut når du starta som frilansar.',
    'validation.frilans_startdato.dateHasInvalidFormat':
        'Datoen for når du starta som frilansar er ugyldig. Gyldig format er dd.mm.åååå.',
    'validation.frilans_startdato.dateIsAfterMax':
        'Datoen for når du starta som frilansar kan ikkje vere etter dagens dato eller siste dag du søkjer for.',
    'validation.frilans_sluttdato.dateHasNoValue': 'Du må fylle ut når du slutta som frilanser.',
    'validation.frilans_sluttdato.dateHasInvalidFormat':
        'Datoen for når du slutta som frilansar er ugyldig. Gyldig format er dd.mm.åååå.',
    'validation.frilans_sluttdato.dateIsAfterMax':
        'Datoen for når du slutta som frilansar kan ikkje vere etter dagens dato.',
    'validation.frilans_sluttdato.dateIsBeforeMin':
        'Datoen for når du slutta som frilansar kan ikkje vere før datoen du starta.',
    'validation.frilans_jobberFortsattSomFrilans.yesOrNoIsUnanswered':
        'Du må svare på om du framleis jobbar som frilansar.',

    'validation.selvstendig_erSelvstendigNæringsdrivende.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du var sjølvstendig næringsdrivande.',
    'validation.selvstendig_harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har fleire enn éi verksemd som er aktiv.',
    'validation.selvstendig_virksomhet.noValue': 'Du har ikkje registrert informasjon om verksemda di.',

    'validation.arbeidssituasjon.situasjon.frilanser': 'frilansar',
    'validation.arbeidssituasjon.situasjon.sn': 'sjølvstendig næringsdrivande',
    'validation.arbeidssituasjon.situasjon.frilanserOgSn': 'frilansar og sjølvstendig næringsdrivande',

    'validation.arbeidssituasjon_tidsrom.arbeidsperiodeStarterEtterFraværsperiode':
        'Du har registrert fråværsdagar utanfor perioden du har oppgitt som {situasjon}. Du kan berre søkje for dagar du har vore frilansar eller sjølvstendig næringsdrivande.',
    'validation.arbeidssituasjon_tidsrom.arbeidsperiodeSlutterFørEllerIFraværsperiode':
        'Du har registrert fråværsdagar utanfor perioden du har oppgitt som {situasjon}. Du kan berre søkje for dagar du har vore frilansar eller sjølvstendig næringsdrivande.',

    'validation.aktivitetFravær.noValue': 'Du må velje kva arbeid du hadde fråvær frå {dato}.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane er riktige.',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må stadfeste at du har lese og forstått dine plikter.',

    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
};
