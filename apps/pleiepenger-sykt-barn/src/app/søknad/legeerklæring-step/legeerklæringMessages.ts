const nb = {
    'step.legeerklaering.pageTitle': 'Pleiepengesøknad - legeerklæring',
    'step.legeerklaering.stepTitle': 'Last opp legeerklæring',
    'step.legeerklaering.stepIndicatorLabel': 'Last opp din legeerklæring',

    'steg.lege.vedlegg.legend': 'Dokumenter',
    'steg.lege.vedlegg': 'Last opp dokumentasjonen',
    'steg.legeerklaering.counsellorpanel.1':
        'Her skal du laste opp legeerklæringen. Det gjør du enten ved å ta bilde av leggerklæringen, eller ved å skanne den. Vennligst sjekk at bildet du laster opp er av god kvalitet slik at all tekst er leselig.',
    'steg.legeerklaering.counsellorpanel.2':
        'Vi kan ikke behandle søknaden din før vi mottar legeerklæringen. Hvis du ikke har legeerklæringen tilgjengelig nå, anbefaler vi at du venter med å søke til du har den tilgjengelig. Hvis du ikke kan vente med å sende søknaden, kan du fortsette uten legeerklæring, men da må du ettersende den så snart som mulig.',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const legeerklæringMessages = {
    nb,
    nn,
};
