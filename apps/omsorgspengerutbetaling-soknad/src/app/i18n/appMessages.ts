import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidssituasjonMessages } from '../søknad/steps/arbeidssituasjon/arbeidssituasjonMessages';
import { dineBarnMessages } from '../søknad/steps/dine-barn/dineBarnMessages';
import { fraværFraMessages } from '../søknad/steps/fravær-fra/fraværFraMessages';
import { fraværStepMessages } from '../søknad/steps/fravær/fraværStepMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';

const nb = {
    ...velkommenPageMessages.nb,
    ...dineBarnMessages.nb,
    ...fraværStepMessages.nb,
    ...arbeidssituasjonMessages.nb,
    ...fraværFraMessages.nb,
    ...legeerklæringMessages.nb,
    ...oppsummeringMessages.nb,
    ...kvitteringMessages.nb,

    'application.title': 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',

    time: 'time',
    timer: 'timer',

    'step.dineBarn.stepTitle': 'Barn og rett til omsorgspenger fra Nav',
    'step.dineBarn.stepIndicatorLabel': 'Barn og rett til omsorgspenger fra Nav',

    'step.fravaer.stepTitle': 'Dager du søker om utbetaling for',

    'step.legeerklæring.stepTitle': 'Last opp legeerklæring',

    'step.legeerklæring.counsellorpanel.1':
        'Hvis du søker om utbetaling for mer enn 3 sammenhengende dager, må du laste opp en legeerklæring som gjelder fra og med den 4. dagen.',
    'step.legeerklæring.counsellorpanel.2':
        'Hvis du søker for kortere periode eller for enkeltdager trenger du ikke legeerklæring. Du kan da fortsette søknaden uten å laste opp noe.',
    'step.legeerklæring.counsellorpanel.3':
        'Hvis du søker for mer enn 3 sammenhengende dager, men ikke har legeerklæring tilgjengelig nå,',
    'step.legeerklæring.counsellorpanel.3.lenkeEttersending': 'kan du ettersende den her.',

    'step.legeerklæring.uploadBtn': 'Last opp legeerklæring',
    'step.legeerklæring.nextButtonLabel': 'Fortsett',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen vedlegg er lastet opp',

    'step.arbeidssituasjon.stepTitle': 'Arbeidssituasjon',

    'step.fravaerFra.stepTitle': 'Fravær fra arbeid som selvstendig næringsdrivende og/eller frilanser',

    'step.medlemskap.stepTitle': 'Medlemskap i folketrygden',

    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'page.ikkeTilgang.tekst':
        'Du har ikke tilgang til denne siden. Dersom du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
    'page.ikkeTilgang.lastNed': 'Her kan du laste ned papirsøknaden',

    'validation.barn.ingenBarn': 'Du må legge til minst ett barn for å kunne gå videre i søknaden.',
    'validation.harUtvidetRett.yesOrNoIsUnanswered':
        'Du må svare at du har fått ekstra omsorgsdager for barn fordi barnet har kronisk sykdom eller funksjonshemning eller ikke.',
    'validation.harSyktBarn.yesOrNoIsUnanswered':
        'Du må svare at du har fått ekstra omsorgsdager for et barn som har en sykdom eller funksjonshemning som gjør at du oftere må være borte fra jobb.',
    'validation.harAleneomsorg.yesOrNoIsUnanswered':
        'Du må svare på om du fått ekstra omsorgsdager fordi du er alene om omsorgen.',
    'validation.harDekketTiFørsteDagerSelv.notAnswered': 'Du må svare på om du har dekket de 10 første dagene i år.',
    'validation.harDekketTiFørsteDagerSelv.yesOrNoIsUnanswered':
        'Du må svare på om du har dekket de 10 første dagene i år.',
    'validation.harPerioderMedFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har hatt hele dager med fravær fra jobb.',
    'validation.fraværPerioder.listIsEmpty': 'Du har ikke lagt til dager med fullt fravær.',
    'validation.fraværPerioder.ulikeÅrstall':
        'Du har lagt til fravær som er i flere år. En søknad kan kun inneholde fravær i ett år.',
    'validation.fraværDager.listIsEmpty': 'Du har ikke lagt til dager med delvis fravær.',
    'validation.harDagerMedDelvisFravær.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har hatt dager med delvis fravær fra jobb.',
    'validation.perioder_harVærtIUtlandet.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har vært i utlandet noen av dagene du søker omsorgspenger for.',
    'validation.perioder_utenlandsopphold.listIsEmpty':
        'Du har svart du har vært i utlandet i perioden du søker for, du må derfor legge til utenlandsopphold.',

    'validation.frilans_erFrilanser.yesOrNoIsUnanswered': 'Du må svare ja eller nei på om du var frilanser.',
    'validation.frilans_startdato.dateHasNoValue': 'Du må fylle ut når du startet som frilanser.',
    'validation.frilans_startdato.dateHasInvalidFormat':
        'Datoen for når du startet som frilanser er ugyldig. Gyldig format er dd.mm.åååå.',
    'validation.frilans_startdato.dateIsAfterMax':
        'Datoen for når du startet som frilanser kan ikke være etter dagens dato eller siste dag du søker for.',
    'validation.frilans_sluttdato.dateHasNoValue': 'Du må fylle ut når du sluttet som frilanser.',
    'validation.frilans_sluttdato.dateHasInvalidFormat':
        'Datoen for når du sluttet som frilanser er ugyldig. Gyldig format er dd.mm.åååå.',
    'validation.frilans_sluttdato.dateIsAfterMax':
        'Datoen for når du sluttet som frilanser kan ikke være etter dagens dato.',
    'validation.frilans_sluttdato.dateIsBeforeMin':
        'Datoen for når du sluttet som frilanser kan ikke være før datoen du startet.',
    'validation.frilans_jobberFortsattSomFrilans.yesOrNoIsUnanswered':
        'Du må svare på om du fortsatt jobber som frilanser.',

    'validation.selvstendig_erSelvstendigNæringsdrivende.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du var selvstendig næringsdrivende.',
    'validation.selvstendig_harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har flere enn én virksomhet som er aktiv.',
    'validation.selvstendig_virksomhet.noValue': 'Du har ikke registrert informasjon om virksomheten din.',

    'validation.arbeidssituasjon.situasjon.frilanser': 'frilanser',
    'validation.arbeidssituasjon.situasjon.sn': 'selvstendig næringsdrivende',
    'validation.arbeidssituasjon.situasjon.frilanserOgSn': 'frilanser og selvstendig næringsdrivende',

    'validation.arbeidssituasjon_tidsrom.arbeidsperiodeStarterEtterFraværsperiode':
        'Du har registrert fraværsdager utenfor perioden du har oppgitt som {situasjon}. Du kan kun søke for dager du har vært frilanser eller selvstendig næringsdrivende.',
    'validation.arbeidssituasjon_tidsrom.arbeidsperiodeSlutterFørEllerIFraværsperiode':
        'Du har registrert fraværsdager utenfor perioden du har oppgitt som {situasjon}. Du kan kun søke for dager du har vært frilanser eller selvstendig næringsdrivende.',

    'validation.aktivitetFravær.noValue': 'Du må velge hvilket arbeid du hadde fravær fra {dato}.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte at opplysningene er riktige.',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må bekrefte at du har lest og forstått dine plikter.',

    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
};

const nn: Record<keyof typeof nb, string> = {
    ...velkommenPageMessages.nn,
    ...dineBarnMessages.nn,
    ...fraværStepMessages.nn,
    ...arbeidssituasjonMessages.nn,
    ...fraværFraMessages.nn,
    ...legeerklæringMessages.nn,
    ...oppsummeringMessages.nn,
    ...kvitteringMessages.nn,

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

    'step.fravaerFra.stepTitle': 'Fråvær frå arbeid som sjølvstendig næringsdrivande og/eller frilanser',

    'step.medlemskap.stepTitle': 'Medlemskap i folketrygda',

    'step.oppsummering.stepTitle': 'Oppsummering',

    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver venleg og prøv igjen seinare.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med eit tomt skjema.',
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

    'validation.frilans_erFrilanser.yesOrNoIsUnanswered': 'Du må svare ja eller nei på om du var frilanser.',
    'validation.frilans_startdato.dateHasNoValue': 'Du må fylle ut når du starta som frilanser.',
    'validation.frilans_startdato.dateHasInvalidFormat':
        'Datoen for når du starta som frilanser er ugyldig. Gyldig format er dd.mm.åååå.',
    'validation.frilans_startdato.dateIsAfterMax':
        'Datoen for når du starta som frilanser kan ikkje vere etter dagens dato eller siste dag du søkjer for.',
    'validation.frilans_sluttdato.dateHasNoValue': 'Du må fylle ut når du slutta som frilanser.',
    'validation.frilans_sluttdato.dateHasInvalidFormat':
        'Datoen for når du slutta som frilanser er ugyldig. Gyldig format er dd.mm.åååå.',
    'validation.frilans_sluttdato.dateIsAfterMax':
        'Datoen for når du slutta som frilanser kan ikkje vere etter dagens dato.',
    'validation.frilans_sluttdato.dateIsBeforeMin':
        'Datoen for når du slutta som frilanser kan ikkje vere før datoen du starta.',
    'validation.frilans_jobberFortsattSomFrilans.yesOrNoIsUnanswered':
        'Du må svare på om du framleis jobbar som frilanser.',

    'validation.selvstendig_erSelvstendigNæringsdrivende.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du var sjølvstendig næringsdrivande.',
    'validation.selvstendig_harFlereVirksomheter.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om du har fleire enn éi verksemd som er aktiv.',
    'validation.selvstendig_virksomhet.noValue': 'Du har ikkje registrert informasjon om verksemda di.',

    'validation.arbeidssituasjon.situasjon.frilanser': 'frilanser',
    'validation.arbeidssituasjon.situasjon.sn': 'sjølvstendig næringsdrivande',
    'validation.arbeidssituasjon.situasjon.frilanserOgSn': 'frilanser og sjølvstendig næringsdrivande',

    'validation.arbeidssituasjon_tidsrom.arbeidsperiodeStarterEtterFraværsperiode':
        'Du har registrert fråværsdagar utanfor perioden du har oppgitt som {situasjon}. Du kan berre søkje for dagar du har vore frilanser eller sjølvstendig næringsdrivande.',
    'validation.arbeidssituasjon_tidsrom.arbeidsperiodeSlutterFørEllerIFraværsperiode':
        'Du har registrert fråværsdagar utanfor perioden du har oppgitt som {situasjon}. Du kan berre søkje for dagar du har vore frilanser eller sjølvstendig næringsdrivande.',

    'validation.aktivitetFravær.noValue': 'Du må velje kva arbeid du hadde fråvær frå {dato}.',
    'validation.harBekreftetOpplysninger.notChecked': 'Du må stadfeste at opplysningane er riktige.',
    'validation.harForståttRettigheterOgPlikter.notChecked': 'Du må stadfeste at du har lese og forstått dine plikter.',

    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
};
export const appMessages = { nb, nn };
