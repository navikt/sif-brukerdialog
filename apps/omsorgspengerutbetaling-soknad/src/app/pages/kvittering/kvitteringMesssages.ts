const nb = {
    'page.kvittering.sidetittel': 'Vi har mottatt søknaden din',
    'page.kvittering.tittel': 'Vi har mottatt søknad om utbetaling av omsorgspenger',
    'page.kvittering.info.tittel': 'Hva skjer videre nå?',
    'page.kvittering.info.1': 'Vi behandler søknaden din.',
    'page.kvittering.info.2': 'Vi kontakter deg hvis vi trenger flere opplysninger.',
    'page.kvittering.info.3':
        'Når søknaden er ferdigbehandlet, får du et svar fra oss på «Min side». <Lenke>Du kan sjekke saksbehandlingstiden her</Lenke>.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kvitteringMessages = { nb, nn };
