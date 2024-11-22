const nb = {
    'page.kvittering.sidetittel': 'Vi har mottatt søknad om opplæringspenger',
    'page.kvittering.tittel': 'Vi har mottatt søknad om opplæringspenger',
    'page.kvittering.info.tittel': 'Hva skjer videre nå?',
    'page.kvittering.list.item.1': 'Du må be arbeidsgiver om å sende inntektsmelding ',
    'page.kvittering.list.item.2':
        'Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi kontakter deg hvis vi trenger flere opplysninger.',
    'page.kvittering.list.item.3':
        'Når søknaden er ferdig behandlet får du et svar fra oss på <MinSideLenke>Min side</MinSideLenke>. Du kan sjekke <SaksbehandlingstidLenke>saksbehandlingstiden her</SaksbehandlingstidLenke>.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const kvitteringMessages = { nb, nn };
