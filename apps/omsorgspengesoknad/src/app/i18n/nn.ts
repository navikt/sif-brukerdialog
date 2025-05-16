import { appMessages_nb } from './nb';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    'application.title':
        'Søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemming',
    'step.omBarnet.stepTitle': 'Barn',
    'step.deltBosted.stepTitle': 'Delt fast bustad',
    'step.legeerklaering.stepTitle': 'Legeerklæring',
    'step.oppsummering.stepTitle': 'Samandrag',
    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Inga legeerklæring er lasta opp',
    'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Inga avtale er lasta opp',
    'initialLoadError.pageTitle': 'Det oppstod ein feil',
    'initialLoadError.text.1': 'Det oppstod ein feil under oppstarten av søknaden. Ver vennleg og prøv igjen seinare.',
    'resetMellomlagring.text.1': 'Dersom feilen vare ved, kan du prøva å starta på nytt med eit tomt skjema.',
    'resetMellomlagring.startPåNytt': 'Start på nytt',
    'apiDataValidation.undefined': 'Det oppstod ein feil ved visninga av sida.',
    'apiDataValidation.omsorgsavtaleMangler': 'Det manglar avtale om delt fast bustad.',
};
