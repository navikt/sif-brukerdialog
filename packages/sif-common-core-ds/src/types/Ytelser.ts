export type YtelseKeyMap = {
    [key: string]: {
        /** Brukes i ettersending */
        ettersendelseYtelseApiKey: string;
        navn: string;
        titler?: {
            nb: string;
            nn?: string;
        };
    };
};

export const Ytelser: YtelseKeyMap = {
    pleiepengerForSyktBarn: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_SYKT_BARN',
        navn: 'Søknad om pleiepenger for sykt barn',
    },
    pleiepengerLivetsSluttfase: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_LIVETS_SLUTTFASE',
        navn: 'Søknad om pleiepenger i livets sluttfase',
    },
    omsorgsdagerKroniskSyk: {
        ettersendelseYtelseApiKey: 'OMP_UTV_KS',
        navn: 'Søknad om pleiepenger for sykt barn',
    },
    omsorgsdagerAleneomsorg: {
        ettersendelseYtelseApiKey: 'OMP_ALENEOMSORG',
        navn: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    },
    omsorgsdagerAnnenForelderIkkeTilsyn: {
        ettersendelseYtelseApiKey: 'OMP_UTV_MA',
        navn: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    },
    omsorgspengerutbetalingSNFri: {
        ettersendelseYtelseApiKey: 'OMP_UT_SNF',
        navn: 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
    },
    omsorgspengerutbetalingArbeidstaker: {
        ettersendelseYtelseApiKey: 'OMP_UT_ARBEIDSTAKER',
        navn: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
    },
};
