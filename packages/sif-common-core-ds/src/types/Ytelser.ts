type YtelserMap = {
    [key: string]: {
        /** Brukes ved ettersending av dokumenter */
        ettersendelseYtelseApiKey: string;
        /** Internt navn på ytelse */
        navn: string;
        /** Tittel brukt i applikasjoner */
        applikasjonstittel?: {
            nb: string;
            nn?: string;
        };
    };
};

export enum YtelseKey {
    'pleiepengerForSyktBarn' = 'pleiepengerForSyktBarn',
    'pleiepengerLivetsSluttfase' = 'pleiepengerLivetsSluttfase',
    'omsorgsdagerKroniskSyk' = 'omsorgsdagerKroniskSyk',
    'omsorgsdagerAleneomsorg' = 'omsorgsdagerAleneomsorg',
    'omsorgsdagerAnnenForelderIkkeTilsyn' = 'omsorgsdagerAnnenForelderIkkeTilsyn',
    'omsorgspengerutbetalingSNFri' = 'omsorgspengerutbetalingSNFri',
    'omsorgspengerutbetalingArbeidstaker' = 'omsorgspengerutbetalingArbeidstaker',
}

export const Ytelser: YtelserMap = {
    [YtelseKey.pleiepengerForSyktBarn]: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_SYKT_BARN',
        navn: 'Pleiepenger for sykt barn',
        applikasjonstittel: {
            nb: 'Søknad om pleiepenger for sykt barn',
        },
    },
    [YtelseKey.pleiepengerLivetsSluttfase]: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_LIVETS_SLUTTFASE',
        navn: 'Pleiepenger i livets sluttfase',
        applikasjonstittel: {
            nb: 'Søknad om pleiepenger i livets sluttfase',
        },
    },
    [YtelseKey.omsorgsdagerKroniskSyk]: {
        ettersendelseYtelseApiKey: 'OMP_UTV_KS',
        navn: 'Ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        applikasjonstittel: {
            nb: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        },
    },
    [YtelseKey.omsorgsdagerAleneomsorg]: {
        ettersendelseYtelseApiKey: 'OMP_ALENEOMSORG',
        navn: 'Ekstra omsorgsdager ved aleneomsorg',
        applikasjonstittel: {
            nb: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
        },
    },
    [YtelseKey.omsorgsdagerAnnenForelderIkkeTilsyn]: {
        ettersendelseYtelseApiKey: 'OMP_UTV_MA',
        navn: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        applikasjonstittel: {
            nb: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        },
    },
    [YtelseKey.omsorgspengerutbetalingSNFri]: {
        ettersendelseYtelseApiKey: 'OMP_UT_SNF',
        navn: 'Utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        applikasjonstittel: {
            nb: 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        },
    },
    [YtelseKey.omsorgspengerutbetalingArbeidstaker]: {
        ettersendelseYtelseApiKey: 'OMP_UT_ARBEIDSTAKER',
        navn: 'Utbetaling av omsorgspenger for arbeidstaker',
        applikasjonstittel: {
            nb: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        },
    },
};
