const nb = {
    'kvittering.tittel': 'Vi har mottatt søknad om ekstra omsorgsdager',
    'kvittering.info.tittel': 'Hva skjer videre nå?',
    'kvittering.info.1': 'Vi behandler søknaden din.',
    'kvittering.info.2': 'Vi kontakter deg hvis vi trenger flere opplysninger.',
    'kvittering.info.3':
        'Når søknaden er ferdigbehandlet, får du et svar fra oss på «Min side». <Lenke>Du kan sjekke saksbehandlingstiden her.</Lenke>',
    'kvittering.info.3a': 'Når søknaden er ferdigbehandlet, får du et svar fra oss på «Min side».',
    'kvittering.info.3b': 'Du kan sjekke saksbehandlingstiden her.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kvitteringMessages = { nb, nn };
