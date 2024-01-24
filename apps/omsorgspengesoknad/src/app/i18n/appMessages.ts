import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const appMessages: MessageFileFormat = {
    nb: {
        'application.title':
            'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        'page.form.ubesvarteSpørsmålInfo': 'For å komme videre, må du svare på alle spørsmålene ovenfor',

        'step.omBarnet.stepTitle': 'Barn',
        'step.deltBosted.stepTitle': 'Delt fast bosted',
        'step.legeerklaering.stepTitle': 'Legeerklæring',
        'step.oppsummering.stepTitle': 'Oppsummering',

        'steg.footer.avbryt': 'Avbryt og slett søknad',
        'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',

        'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',
        'vedleggsliste.ingenBostedsavtaleLastetOpp': 'Ingen avtale er lastet opp',

        'dokumenter.advarsel.totalstørrelse.1':
            'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
        'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',

        'initialLoadError.pageTitle': 'Det oppstod en feil',
        'initialLoadError.text.1': 'Det oppstod en feil under oppstarten av søknaden. Vennligst prøv igjen senere.',

        'resetMellomlagring.text.1': 'Dersom feilen vedvarer, kan du prøve å starte på nytt med et tom skjema.',
        'resetMellomlagring.startPåNytt': 'Start på nytt',
    },
};
