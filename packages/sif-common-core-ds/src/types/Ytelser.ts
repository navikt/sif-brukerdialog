export type YtelseKeyMap = {
    [key: string]: {
        /** Brukes ved i ettersending */
        ettersendelseYtelseApiKey: string;
        søknadstittel: string;
    };
};

export const Ytelser: YtelseKeyMap = {
    pleiepengerForSyktBarn: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_SYKT_BARN',
        søknadstittel: 'Søknad om pleiepenger for sykt barn',
    },
    pleiepengerLivetsSluttfase: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_LIVETS_SLUTTFASE',
        søknadstittel: 'Søknad om pleiepenger i livets sluttfase',
    },
    omsorgsdagerKroniskSyk: {
        ettersendelseYtelseApiKey: 'OMP_UTV_KS',
        søknadstittel: 'Søknad om pleiepenger for sykt barn',
    },
    omsorgsdagerAleneomsorg: {
        ettersendelseYtelseApiKey: 'OMP_ALENEOMSORG',
        søknadstittel: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    },
    omsorgsdagerAnnenForelderIkkeTilsyn: {
        ettersendelseYtelseApiKey: 'OMP_UTV_MA',
        søknadstittel: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    },
    omsorgspengerutbetalingSNFri: {
        ettersendelseYtelseApiKey: 'OMP_UT_SNF',
        søknadstittel: 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
    },
    omsorgspengerutbetalingArbeidstaker: {
        ettersendelseYtelseApiKey: 'OMP_UT_ARBEIDSTAKER',
        søknadstittel: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
    },
};
