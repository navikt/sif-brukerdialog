const nb = {
    'steg.legeerklaering.counsellorpanel.1':
        'Her skal du laste opp legeerklæringen. Det gjør du enten ved å ta bilde av legeerklæringen, eller ved å skanne den. Vær nøye med at all tekst er med, inkludert legens signatur.',
    'steg.legeerklaering.counsellorpanel.2':
        'Vi kan ikke behandle søknaden din før vi mottar legeerklæringen. Hvis du ikke har legeerklæringen tilgjengelig nå, anbefaler vi at du venter med å søke til du har den tilgjengelig. Hvis du ikke kan vente med å sende søknaden, kan du fortsette uten, men da må du ettersende legeerklæringen så snart som mulig.',
    'steg.legeerklaering.vedlegg.knappLabel': 'Last opp legeerklæringen',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const legeerklæringMessages = {
    nb,
    nn,
};
