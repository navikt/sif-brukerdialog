const nb = {
    'application.title':
        'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',

    'step.omBarnet.stepTitle': 'Barn',
    'step.deltBosted.stepTitle': 'Delt fast bosted',
    'step.legeerklaering.stepTitle': 'Legeerklæring',
    'step.oppsummering.stepTitle': 'Oppsummering',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',
    'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen avtale er lastet opp',

    'dokumenter.advarsel.totalstørrelse':
        'Du har lastet opp meir enn grensa på 24 Mb til saman. Det tyder på at du må fjerne noko av det du har lastet opp. Dersom du ikkje får plass til alt du vil sende no, kan du <Lenke>ettersende flere dokumenter</Lenke>.',

    'initialLoadError.pageTitle': 'Det oppstod en feil',
    'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

    'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',

    'apiDataValidation.undefined': 'Det oppstod en feil ved visningen av siden.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det mangler avtale om delt fast bosted. ',
};

const nn: Record<keyof typeof nb, string> = {
    'application.title':
        'Søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemning',
    'step.omBarnet.stepTitle': 'Barn',
    'step.deltBosted.stepTitle': 'Delt fast bustad',
    'step.legeerklaering.stepTitle': 'Legeerklæring',
    'step.oppsummering.stepTitle': 'Samandrag',
    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lasta opp',
    'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen avtale er lasta opp',
    'dokumenter.advarsel.totalstørrelse':
        'Du har totalt lasta opp meir enn grensa på 24 Mb. Det betyr at du må fjerne noko av det du har lasta opp. Viss det betyr at du ikkje får plass til alt du ønskjer å senda no, kan du <Lenke>ettersenda fleire dokument</Lenke>.',
    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver vennleg og prøv igjen seinare.',
    'resetMellomlagring.text.1': 'Dersom feilen held fram, kan du prøva å starta på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det manglar avtale om delt fast bustad.',
};

export const appMessages = {
    nb,
    nn,
};
