/**
 * Nøklene MÅ matche "app"-feltet i nais/prod-gcp.json for at telemetri (Faro/APM) skal vises i Grafana.
 * Nøklene brukes også i analytics og AppStatus (Sanity). Ikke endre uten å oppdatere NAIS-konfigurasjonen.
 */
export enum SifAppKeys {
    AktivitetspengerSøknadApp = 'aktivitetspenger-soknad',
    AktivitetspengerInnsyn = 'aktivitetspenger-innsyn',
    PleiepengerSyktBarn = 'pleiepengesoknad',
    EndringsmeldingPsb = 'endringsmelding-pleiepenger',
    PleiepengerLivetsSlutt = 'pleiepenger-i-livets-sluttfase-soknad',
    OmsorgsdagerKronisk = 'omsorgspengersoknad',
    OmsorgsdagerAleneomsorg = 'omsorgsdager-aleneomsorg-dialog',
    OmsorgsdagerAnnenForelderIkkeTilsyn = 'ekstra-omsorgsdager-andre-forelder-ikke-tilsyn',
    OmsorgspengerutbetalingArbeidstaker = 'omsorgspengerutbetaling-arbeidstaker-soknad',
    OmsorgspengerutbetalingSNFri = 'omsorgspengerutbetaling-soknad',
    Ettersendelse = 'ettersending',
    InnsynPsb = 'sif-innsyn',
    OmsorgsdagerKalkulator = 'omsorgsdagerkalkulator',
    OpplæringspengerApp = 'opplaringspenger-soknad',
    UngdomsytelseDeltakerApp = 'ungdomsytelse-deltaker',
    UngdomsytelseVeilederApp = 'ungdomsytelse-veileder',
}

interface AppInfo {
    /** Ikke synlig beskrivende navn - brukes i analytics */
    navn: string;
    /** Applikasjonsnøkkel som brukes i analytics */
    key: string;
    /** Tittel brukt i applikasjon, og dersom en skal lenke til applikasjon */
    tittel: {
        nb: string;
        nn: string;
    };
}

export const PleiepengerSyktBarnApp: AppInfo = {
    key: SifAppKeys.PleiepengerSyktBarn,
    navn: 'Pleiepenger for sykt barn',
    tittel: {
        nb: 'Søknad om pleiepenger for sykt barn',
        nn: 'Søknad om pleiepengar for sjukt barn',
    },
};

export const EndringsmeldingPsbApp: AppInfo = {
    key: SifAppKeys.EndringsmeldingPsb,
    navn: 'Endringsmelding pleiepenger sykt barn',
    tittel: {
        nb: 'Endringsmelding for pleiepenger sykt barn',
        nn: 'Endringsmelding for pleiepengar sjukt barn',
    },
};

export const PleiepengerLivetsSluttApp: AppInfo = {
    key: SifAppKeys.PleiepengerLivetsSlutt,
    navn: 'Pleiepenger i livets sluttfase',
    tittel: {
        nb: 'Søknad om pleiepenger i livets sluttfase',
        nn: 'Søknad om pleiepengar i livets sluttfase',
    },
};

export const OmsorgsdagerKroniskApp: AppInfo = {
    key: SifAppKeys.OmsorgsdagerKronisk,
    navn: 'Ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        nn: 'Søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemming',
    },
};

export const OmsorgsdagerAleneomsorgApp: AppInfo = {
    key: SifAppKeys.OmsorgsdagerAleneomsorg,
    navn: 'Ekstra omsorgsdager ved aleneomsorg',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
        nn: 'Søknad om ekstra omsorgsdagar ved åleineomsorg',
    },
};

export const OmsorgsdagerAnnenForelderIkkeTilsynApp: AppInfo = {
    key: SifAppKeys.OmsorgsdagerAnnenForelderIkkeTilsyn,
    navn: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        nn: 'Søknad om ekstra omsorgsdagar når den andre forelderen ikkje kan ha tilsyn med barn',
    },
};

export const OmsorgspengerutbetalingArbeidstakerApp: AppInfo = {
    key: SifAppKeys.OmsorgspengerutbetalingArbeidstaker,
    navn: 'Utbetaling av omsorgspenger for arbeidstaker',
    tittel: {
        nb: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        nn: 'Søknad om utbetaling av omsorgspengar når arbeidsgjevar ikkje utbetalar',
    },
};

export const OmsorgspengerutbetalingSNFriApp: AppInfo = {
    key: SifAppKeys.OmsorgspengerutbetalingSNFri,
    navn: 'Utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
    tittel: {
        nb: 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
        nn: 'Søknad om utbetaling av omsorgspengar til sjølvstendig næringsdrivande eller frilansarar',
    },
};

export const EttersendelseApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersending av dokumenter innenfor sykdom i familien',
    tittel: {
        nb: 'Ettersendelse',
        nn: 'Ettersending',
    },
};

export const EttersendelsePsbApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersendelse - Pleiepenger for sykt barn',
    tittel: {
        nb: 'Ettersendelse - Pleiepenger for sykt barn',
        nn: 'Ettersending - Pleiepengar for sjukt barn',
    },
};

export const EttersendelseLivetsSluttApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersendelse - Pleiepenger i livets sluttfase',
    tittel: {
        nb: 'Ettersendelse - Pleiepenger i livets sluttfase',
        nn: 'Ettersending - Pleiepengar i livets sluttfase',
    },
};
export const EttersendelseOmsorgspengerApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersendelse - Omsorgspenger',
    tittel: {
        nb: 'Ettersendelse - Omsorgspenger',
        nn: 'Ettersending - Omsorgspengar',
    },
};
export const InnsynPsbApp: AppInfo = {
    key: SifAppKeys.InnsynPsb,
    navn: 'Dine pleiepenger - sykt barn',
    tittel: {
        nb: 'Dine pleiepenger for sykt barn',
        nn: 'Dine pleiepengar for sjukt barn',
    },
};

export const OmsorgsdagerKalkulator: AppInfo = {
    key: SifAppKeys.OmsorgsdagerKalkulator,
    navn: 'Omsorgsdagerkalkulator',
    tittel: {
        nb: 'Kalkulator for omsorgsdager',
        nn: 'Kalkulator for omsorgsdagar',
    },
};

export const OpplæringspengerApp: AppInfo = {
    key: SifAppKeys.OpplæringspengerApp,
    navn: 'Søknad om opplæringspenger',
    tittel: {
        nb: 'Søknad om opplæringspenger',
        nn: 'Søknad om opplæringspengar',
    },
};

export const UngdomsytelseDeltakerApp: AppInfo = {
    key: SifAppKeys.UngdomsytelseDeltakerApp,
    navn: 'Søknad om deltakelse i ungdomsprogram',
    tittel: {
        nb: 'Søknad om deltakelse i ungdomsprogram',
        nn: 'Søknad om deltaking i ungdomsprogram',
    },
};

export const UngdomsytelseVeilederApp: AppInfo = {
    key: SifAppKeys.UngdomsytelseVeilederApp,
    navn: 'Veilederapplikasjon for ungdomsprogramytelsen',
    tittel: {
        nb: 'Veilederapplikasjon for ungdomsprogramytelsen',
        nn: 'Veileidarapplikasjon for ungdomsprogramytelsen',
    },
};

export const AktivitetspengerSoknadApp: AppInfo = {
    key: SifAppKeys.AktivitetspengerSøknadApp,
    navn: 'Aktivitetspenger søknad',
    tittel: {
        nb: 'Aktivitetspenger søknad',
        nn: 'Aktivitetspengar søknad',
    },
};

export const AktivitetspengerInnsynApp: AppInfo = {
    key: SifAppKeys.AktivitetspengerInnsyn,
    navn: 'Aktivitetspenger innsyn',
    tittel: {
        nb: 'Aktivitetspenger innsyn',
        nn: 'Aktivitetspengar innsyn',
    },
};

export const sifAppRegister = {
    OmsorgsdagerAleneomsorgApp,
};
