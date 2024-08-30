const nb = {
    'page.kvittering.sidetittel': 'Vi har mottatt søknaden din',
    'page.kvittering.tittel': 'Vi har mottatt søknad om opplæringspenger',
    'page.kvittering.info.tittel': 'Hva skjer videre nå?',
    'page.kvittering.list.item.1': 'Først ...',
    'page.kvittering.list.item.2': 'Så ...',
    'page.kvittering.list.item.3': 'Til slutt ...',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kvitteringMessages = { nb, nn };
