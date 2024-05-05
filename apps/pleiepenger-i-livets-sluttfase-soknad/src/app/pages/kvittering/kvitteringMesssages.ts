const nb = {
    'page.kvittering.sidetittel': 'Vi har mottatt søknaden din',
    'page.kvittering.tittel': 'Vi har mottatt søknad om pleiepenger i livets sluttfase',
    'page.kvittering.info.tittel': 'Hva skjer videre nå?',
    'page.kvittering.list.item.1':
        'Du må be {antall, plural, one {arbeidsgiver} other {arbeidsgiverne}} om å sende inntektsmelding så snart som mulig hvis du søker for første gang eller det er mer enn 4 uker siden sist du hadde pleiepenger.',
    'page.kvittering.list.item.2':
        'Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi kontakter deg hvis vi trenger flere opplysninger.',
    'page.kvittering.list.item.3': 'Når søknaden er ferdig behandlet får du et svar fra oss på «Min side». ',
    'page.kvittering.list.item.3.lenke': 'Du kan sjekke saksbehandlingstiden her.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kvitteringMessages = { nb, nn };
