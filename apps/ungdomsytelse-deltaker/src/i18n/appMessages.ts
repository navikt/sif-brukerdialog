const nb = {
    'samtykke.bekreftLabel': 'Jeg bekrefter at jeg har forstått mitt ansvar som søker.',
    'samtykke.ansvar.tittel': 'Ditt ansvar som søker',
    'samtykke.ansvar.list.1':
        'Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for retten min til det jeg søker om.',
    'samtykke.ansvar.list.2': 'Jeg har lest og forstått det som står på <Lenke>nav.no/rett og plikt</Lenke>.',
    'samtykke.ansvar.list.3':
        'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til ungdomsytelsen.',
    'samtykke.harForståttRettigheterOgPlikter.notChecked': 'Du må velge at du har forstått ditt ansvar som søker',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const appMessages = {
    nb,
    nn,
};
