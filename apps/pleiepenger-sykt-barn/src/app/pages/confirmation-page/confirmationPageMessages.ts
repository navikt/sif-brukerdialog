const nb = {
    'page.confirmation.sidetittel': 'Vi har mottatt søknaden din',
    'page.confirmation.tittel.1': 'Vi har mottatt søknaden din om pleiepenger for sykt barn',

    'page.confirmation.tittel.advarsel.list.tittel':
        'Vi kontakter arbeidsgivere du har fravær hos, for å informere om at de må sende inntektsmelding. Dette er aktuelt hvis:',
    'page.confirmation.tittel.advarsel.list.item.1': 'du søker for første gang, eller',
    'page.confirmation.tittel.advarsel.list.item.2': 'det er mer enn 4 uker siden du hadde pleiepenger sist',

    'page.confirmation.dinePP.info.tittel': 'Dine pleiepenger:',
    'page.confirmation.dinePP.info.1':
        'Det tar inntil 15 minutter før søknaden din vises på Dine Pleiepenger. Der kan du: ',
    'page.confirmation.dinePP.list.item.1':
        'Laste ned bekreftelse på at du har søkt pleiepenger som du kan gi til arbeidsgiver',
    'page.confirmation.dinePP.list.item.2': 'Ettersende dokumentasjon',
    'page.confirmation.dinePP.list.item.3': 'Melde fra om endring',
    'page.confirmation.dinePP.list.item.4': 'Følge status i sak',
    'page.confirmation.dinePP.lenke': 'Gå til Dine pleiepenger',
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
};

export const confirmationPageMessages = {
    nb,
    nn,
};
