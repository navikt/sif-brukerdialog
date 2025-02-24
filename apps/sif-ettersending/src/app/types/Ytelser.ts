type YtelserMap = {
    [key: string]: {
        /** Internt navn på ytelse */
        navn: string;
        /** Tittel brukt i applikasjoner */
        søknadstittel: {
            nb: string;
        };
    };
};

export enum YtelseKey {
    'pleiepengerSyktBarn' = 'pleiepengerSyktBarn',
    'pleiepengerLivetsSlutt' = 'pleiepengerLivetsSlutt',
    'omsorgsdagerKroniskSyk' = 'omsorgsdagerKroniskSyk',
    'omsorgsdagerAnnenForelderIkkeTilsyn' = 'omsorgsdagerAnnenForelderIkkeTilsyn',
    'omsorgspengerutbetalingSNFri' = 'omsorgspengerutbetalingSNFri',
    'omsorgspengerutbetalingArbeidstaker' = 'omsorgspengerutbetalingArbeidstaker',
    'opplaringspenger' = 'opplaringspenger',
}

export const Ytelser: YtelserMap = {
    [YtelseKey.pleiepengerSyktBarn]: {
        navn: 'Pleiepenger for sykt barn',
        søknadstittel: {
            nb: 'Søknad om pleiepenger for sykt barn',
        },
    },
    [YtelseKey.pleiepengerLivetsSlutt]: {
        navn: 'Pleiepenger i livets sluttfase',
        søknadstittel: {
            nb: 'Søknad om pleiepenger i livets sluttfase',
        },
    },
    [YtelseKey.omsorgsdagerKroniskSyk]: {
        navn: 'Ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        søknadstittel: {
            nb: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        },
    },
    // [YtelseKey.omsorgsdagerAleneomsorg]: {
    //     navn: 'Ekstra omsorgsdager ved aleneomsorg',
    //     søknadstittel: {
    //         nb: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    //     },
    // },
    [YtelseKey.omsorgsdagerAnnenForelderIkkeTilsyn]: {
        navn: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        søknadstittel: {
            nb: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        },
    },
    [YtelseKey.omsorgspengerutbetalingSNFri]: {
        navn: 'Utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        søknadstittel: {
            nb: 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        },
    },
    [YtelseKey.omsorgspengerutbetalingArbeidstaker]: {
        navn: 'Utbetaling av omsorgspenger for arbeidstaker',
        søknadstittel: {
            nb: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        },
    },
    [YtelseKey.opplaringspenger]: {
        navn: 'Opplæringspenger',
        søknadstittel: {
            nb: 'Søknad om opplæringspenger',
        },
    },
};
