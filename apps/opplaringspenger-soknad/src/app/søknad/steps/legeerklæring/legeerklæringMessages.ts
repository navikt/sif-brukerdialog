const nb = {
    'steg.legeerklæring.counsellorPanel.info': 'Her skal du laste opp en legeerklæring som bekrefter at ...',

    'steg.legeerklæring.vedlegg.knappLabel': 'Last opp legeerklæringen',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',

    'dokumenter.advarsel.totalstørrelse.1':
        'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
    'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const legeerklæringMessages = { nb, nn };
