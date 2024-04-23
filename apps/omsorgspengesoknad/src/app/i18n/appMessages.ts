import { kvitteringMessages } from '../pages/kvittering/kvitteringMesssages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { deltBostedMessages } from '../søknad/steps/delt-bosted/deltBostedMessages';
import { legeerklæringMessages } from '../søknad/steps/legeerklæring/legeerklæringMessages';
import { omBarnetMessages } from '../søknad/steps/om-barnet/stegOmBarnetMessages';
import { oppsummeringMessages } from '../søknad/steps/oppsummering/oppsummeringMessages';

const nb = {
    ...kvitteringMessages.nb,
    ...velkommenPageMessages.nb,
    ...deltBostedMessages.nb,
    ...legeerklæringMessages.nb,
    ...omBarnetMessages.nb,
    ...oppsummeringMessages.nb,

    // Brukes av sif-common-soknad
    'application.title':
        'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',

    'step.omBarnet.stepTitle': 'Barn',
    'step.deltBosted.stepTitle': 'Delt fast bosted',
    'step.legeerklaering.stepTitle': 'Legeerklæring',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',
    'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen avtale er lastet opp',

    'dokumenter.advarsel.totalstørrelse':
        'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du <Lenke>ettersende flere dokumenter</Lenke>.',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt fast bosted. ',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const appMessages = {
    nb,
    nn,
};
