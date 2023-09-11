export type YtelseKeyMap = {
    [key: string]: {
        /** Brukes i ettersending */
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

export const Ytelser: YtelseKeyMap = {
    pleiepengerForSyktBarn: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_SYKT_BARN',
        navn: 'Pleiepenger for sykt barn',
        applikasjonstittel: {
            nb: 'Søknad om pleiepenger for sykt barn',
        },
    },
    pleiepengerLivetsSluttfase: {
        ettersendelseYtelseApiKey: 'PLEIEPENGER_LIVETS_SLUTTFASE',
        navn: 'Pleiepenger i livets sluttfase',
        applikasjonstittel: {
            nb: 'Søknad om pleiepenger i livets sluttfase',
        },
    },
    omsorgsdagerKroniskSyk: {
        ettersendelseYtelseApiKey: 'OMP_UTV_KS',
        navn: 'Ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        applikasjonstittel: {
            nb: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        },
    },
    omsorgsdagerAleneomsorg: {
        ettersendelseYtelseApiKey: 'OMP_ALENEOMSORG',
        navn: 'Ekstra omsorgsdager ved aleneomsorg',
        applikasjonstittel: {
            nb: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
        },
    },
    omsorgsdagerAnnenForelderIkkeTilsyn: {
        ettersendelseYtelseApiKey: 'OMP_UTV_MA',
        navn: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        applikasjonstittel: {
            nb: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        },
    },
    omsorgspengerutbetalingSNFri: {
        ettersendelseYtelseApiKey: 'OMP_UT_SNF',
        navn: 'Utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        applikasjonstittel: {
            nb: 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
        },
    },
    omsorgspengerutbetalingArbeidstaker: {
        ettersendelseYtelseApiKey: 'OMP_UT_ARBEIDSTAKER',
        navn: 'Utbetaling av omsorgspenger for arbeidstaker',
        applikasjonstittel: {
            nb: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        },
    },
};
