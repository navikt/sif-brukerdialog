import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/deltBostedMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { omBarnetMessages } from '../søknad/steps/om-barnet/omBarnetMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';

const nb = {
    ...kvitteringMessages.nb,
    ...velkommenPageMessages.nb,
    ...deltBostedMessages.nb,
    ...legeerklæringMessages.nb,
    ...omBarnetMessages.nb,
    ...oppsummeringMessages.nb,

    'application.title':
        'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',

    'step.omBarnet.stepTitle': 'Barn',
    'step.deltBosted.stepTitle': 'Delt fast bosted',
    'step.legeerklaering.stepTitle': 'Legeerklæring',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',
    'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen avtale er lastet opp',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt fast bosted. ',
    'innsendingFeilet.tittel': 'Oops, noe gikk galt.',
    'innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil':
        'Beskrivelsen på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb inneholder tegn som ikke er tillatt. Gå tilbake til steg én og se over teksten.',
    'innsendingFeilet.tekst.generell.1': 'Søknaden din inneholder ugyldig informasjon.',
    'innsendingFeilet.tekst.generell.2':
        'Når du selv skriver inn tekst i et felt i søknaden, kan noen tegn være ugyldige ut fra informasjonen vi ber om. Dette skjer vanligvis hvis du kopierer og limer inn tekst fra andre steder. Du fikser dette ved å skrive inn teksten på ny, uten å kopiere den fra et annet sted.',
    'innsendingFeilet.tekst.generell.3':
        'Noen ganger vil de ugyldige tegnene være synlige som små firkanter inne i teksten. Da kan det være det holder å fjerne disse.',
    'innsendingFeilet.tekst.generell.4':
        'Hvis du har sjekket dette, og fortsatt ikke kommer videre, ber vi deg kontakte oss på <Telefon>55 55 33 33</Telefon> for videre veiledning.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...kvitteringMessages.nn,
    ...velkommenPageMessages.nn,
    ...deltBostedMessages.nn,
    ...legeerklæringMessages.nn,
    ...omBarnetMessages.nn,
    ...oppsummeringMessages.nn,

    'application.title':
        'Søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemning',
    'step.omBarnet.stepTitle': 'Barn',
    'step.deltBosted.stepTitle': 'Delt fast bustad',
    'step.legeerklaering.stepTitle': 'Legeerklæring',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lasta opp',
    'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen avtale er lasta opp',
    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver vennleg og prøv igjen seinare.',
    'resetMellomlagring.text.1': 'Dersom feilen held fram, kan du prøva å starta på nytt med eit tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det manglar avtale om delt fast bustad.',
};

export const appMessages = {
    nb,
    nn,
};
