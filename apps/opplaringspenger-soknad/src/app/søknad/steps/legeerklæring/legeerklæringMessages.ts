const nb = {
    'steg.legeerklæring.counsellorPanel.info.1':
        'Her skal du laste opp dokumentasjon på nødvendig opplæring. Denne dokumentasjonen får man ofte når man søker om opplæring/kurs, eller man får den på kursstedet.',
    'steg.legeerklæring.counsellorPanel.info.2.tittel': 'Det kan for eksempel være:',
    'steg.legeerklæring.counsellorPanel.info.2.1': 'Bekreftelse fra lege om at opplæringen er nødvendig',
    'steg.legeerklæring.counsellorPanel.info.2.2':
        'Informasjon om innhold og tidspunkt for opplæring/kurs (kursbekreftelse)',
    'steg.legeerklæring.counsellorPanel.info.3':
        'Send inn det du har fått av dokumentasjon, vi kontakter deg hvis vi trenger flere opplysninger. Hvis du ikke har dokumentasjonen nå, kan du ettersende den senere.',

    'steg.legeerklæring.vedlegg.label': 'Last opp dokumentasjon på nødvendig opplæring',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',

    'dokumenter.advarsel.totalstørrelse.1':
        'Du har totalt lastet opp mer enn grensen på 24 MB. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
    'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const legeerklæringMessages = { nb, nn };
