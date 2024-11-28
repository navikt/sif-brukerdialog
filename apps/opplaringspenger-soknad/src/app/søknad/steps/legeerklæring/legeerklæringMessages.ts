const nb = {
    'steg.legeerklæring.counsellorPanel.info.1':
        'Her skal du laste opp legeerklæring og kursbekreftelse, dette får du fra lege og/eller kursstedet.',
    'steg.legeerklæring.counsellorPanel.info.2':
        'For å vurdere om opplæringen er nødvendig, må en lege bekrefte at opplæringen er nødvendig for at du skal kunne ta deg av barnet. Vi må også ha informasjon om innhold og tidspunkt for opplæring.',
    'steg.legeerklæring.counsellorPanel.info.3':
        'Vi vurderer dokumentasjonen du laster opp, og kontakter deg hvis vi trenger flere opplysninger.',

    'steg.legeerklæring.vedlegg.label': 'Last opp dokumentasjon på nødvendig opplæring',

    'vedleggsliste.ingenLegeerklæringLastetOpp': 'Ingen legeerklæring er lastet opp',

    'dokumenter.advarsel.totalstørrelse.1':
        'Du har totalt lastet opp mer enn grensen på 24 MB. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du ',
    'dokumenter.advarsel.totalstørrelse.2': 'ettersende flere dokumenter.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const legeerklæringMessages = { nb, nn };
