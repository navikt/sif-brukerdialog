export type LegeerklæringStegMessageKeys = keyof typeof legeerklæringStegMessages_nb;

export const legeerklæringStegMessages_nb = {
    'legeerklæringSteg.counsellorpanel.1':
        'Her skal du laste opp legeerklæringen. Det gjør du enten ved å ta bilde av legeerklæringen, eller ved å skanne den. Vær nøye med at all tekst er med, inkludert legens signatur.',
    'legeerklæringSteg.counsellorpanel.2':
        'Vi kan ikke behandle søknaden din før vi mottar legeerklæringen. Hvis du ikke har legeerklæringen tilgjengelig nå, anbefaler vi at du venter med å søke til du har den tilgjengelig.' +
        ' Hvis du ikke kan vente med å sende søknaden, kan du fortsette uten, men da må du ettersende legeerklæringen så snart som mulig.',
    'legeerklæringSteg.vedlegg.label': 'Last opp legeerklæringen',
    'legeerklæringForm.validation.vedlegg.noVedleggUploaded': 'Ingen dokumenter er lastet opp',
    'legeerklæringForm.validation.vedlegg.tooManyVedlegg': 'For mange dokumenter er lastet opp',
    'legeerklæringForm.validation.vedlegg.maxTotalSizeExceeded':
        'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24 MB.',
} as const;
