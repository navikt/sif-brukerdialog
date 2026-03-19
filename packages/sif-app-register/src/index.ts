export enum SifAppKeys {
    AktivitetspengerApp = 'aktivitetspenger',
    PleiepengerSyktBarn = 'pleiepengesoknad',
    EndringsmeldingPsb = 'endringsmelding-pleiepenger',
    PleiepengerLivetsSlutt = 'pleiepenger-i-livets-sluttfase-soknad',
    OmsorgsdagerKronisk = 'omsorgspengersoknad',
    OmsorgsdagerAleneomsorg = 'omsorgsdager-aleneomsorg-dialog',
    OmsorgsdagerAnnenForelderIkkeTilsyn = 'ekstra-omsorgsdager-andre-forelder-ikke-tilsyn',
    OmsorgspengerutbetalingArbeidstaker = 'omsorgspengerutbetaling-arbeidstaker',
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
    /** Applikasjonsnøkkel som brukes i analytics og sentry */
    key: string;
    /** Tittel brukt i applikasjon, og dersom en skal lenke til applikasjon */
    tittel: {
        nb: string;
        nn: string;
    };
    /** Lenker til applikasjon i Q og PROD */
    lenker: {
        q: string;
        prod: string;
    };
}

export const PleiepengerSyktBarnApp: AppInfo = {
    key: SifAppKeys.PleiepengerSyktBarn,
    navn: 'Pleiepenger for sykt barn',
    tittel: {
        nb: 'Søknad om pleiepenger for sykt barn',
        nn: 'Søknad om pleiepengar for sjukt barn',
    },
    lenker: {
        q: 'https://pleiepengesoknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/pleiepenger',
    },
};

export const EndringsmeldingPsbApp: AppInfo = {
    key: SifAppKeys.EndringsmeldingPsb,
    navn: 'Endringsmelding pleiepenger sykt barn',
    tittel: {
        nb: 'Endringsmelding for pleiepenger sykt barn',
        nn: 'Endringsmelding for pleiepengar sjukt barn',
    },
    lenker: {
        q: 'https://endringsmelding-pleiepenger.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
    },
};

export const PleiepengerLivetsSluttApp: AppInfo = {
    key: SifAppKeys.PleiepengerLivetsSlutt,
    navn: 'Pleiepenger i livets sluttfase',
    tittel: {
        nb: 'Søknad om pleiepenger i livets sluttfase',
        nn: 'Søknad om pleiepengar i livets sluttfase',
    },
    lenker: {
        q: 'https://pleiepenger-i-livets-sluttfase.intern.dev.nav.no',
        prod: 'https://nav.no/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase',
    },
};

export const OmsorgsdagerKroniskApp: AppInfo = {
    key: SifAppKeys.OmsorgsdagerKronisk,
    navn: 'Ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        nn: 'Søknad om ekstra omsorgsdagar for barn som har kronisk/langvarig sjukdom eller funksjonshemming',
    },
    lenker: {
        q: 'https://omsorgspengesoknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspenger',
    },
};

export const OmsorgsdagerAleneomsorgApp: AppInfo = {
    key: SifAppKeys.OmsorgsdagerAleneomsorg,
    navn: 'Ekstra omsorgsdager ved aleneomsorg',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
        nn: 'Søknad om ekstra omsorgsdagar ved åleineomsorg',
    },
    lenker: {
        q: 'https://omsorgsdager-aleneomsorg-dialog.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg',
    },
};

export const OmsorgsdagerAnnenForelderIkkeTilsynApp: AppInfo = {
    key: SifAppKeys.OmsorgsdagerAnnenForelderIkkeTilsyn,
    navn: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    tittel: {
        nb: 'Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
        nn: 'Søknad om ekstra omsorgsdagar når den andre forelderen ikkje kan ha tilsyn med barn',
    },
    lenker: {
        q: 'https://ekstra-omsorgsdager-andre-forelder-ikke-tilsyn.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn',
    },
};

export const OmsorgspengerutbetalingArbeidstakerApp: AppInfo = {
    key: SifAppKeys.OmsorgspengerutbetalingArbeidstaker,
    navn: 'Utbetaling av omsorgspenger for arbeidstaker',
    tittel: {
        nb: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
        nn: 'Søknad om utbetaling av omsorgspengar når arbeidsgjevar ikkje utbetalar',
    },
    lenker: {
        q: 'https://omsorgspengerutbetaling-arbeidstaker-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling-arbeidstaker',
    },
};

export const OmsorgspengerutbetalingSNFriApp: AppInfo = {
    key: SifAppKeys.OmsorgspengerutbetalingSNFri,
    navn: 'Utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
    tittel: {
        nb: 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
        nn: 'Søknad om utbetaling av omsorgspengar til sjølvstendig næringsdrivande eller frilansarar',
    },
    lenker: {
        q: 'https://omsorgspengerutbetaling-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling',
    },
};

export const EttersendelseApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersending av dokumenter innenfor sykdom i familien',
    tittel: {
        nb: 'Ettersendelse',
        nn: 'Ettersending',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending',
    },
};

export const EttersendelsePsbApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersendelse - Pleiepenger for sykt barn',
    tittel: {
        nb: 'Ettersendelse - Pleiepenger for sykt barn',
        nn: 'Ettersending - Pleiepengar for sjukt barn',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger/melding/velkommen',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger/melding/velkommen',
    },
};

export const EttersendelseLivetsSluttApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersendelse - Pleiepenger i livets sluttfase',
    tittel: {
        nb: 'Ettersendelse - Pleiepenger i livets sluttfase',
        nn: 'Ettersending - Pleiepengar i livets sluttfase',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger-livets-sluttfase/melding/velkommen',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger-livets-sluttfase/melding/velkommen',
    },
};
export const EttersendelseOmsorgspengerApp: AppInfo = {
    key: SifAppKeys.Ettersendelse,
    navn: 'Ettersendelse - Omsorgspenger',
    tittel: {
        nb: 'Ettersendelse - Omsorgspenger',
        nn: 'Ettersending - Omsorgspengar',
    },
    lenker: {
        q: 'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/omsorgspenger/melding/velkommen',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/omsorgspenger/melding/velkommen',
    },
};
export const InnsynPsbApp: AppInfo = {
    key: SifAppKeys.InnsynPsb,
    navn: 'Dine pleiepenger - sykt barn',
    tittel: {
        nb: 'Dine pleiepenger for sykt barn',
        nn: 'Dine pleiepengar for sjukt barn',
    },
    lenker: {
        q: 'https://sif-innsyn.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn',
    },
};

export const OmsorgsdagerKalkulator: AppInfo = {
    key: SifAppKeys.OmsorgsdagerKalkulator,
    navn: 'Omsorgsdagerkalkulator',
    tittel: {
        nb: 'Kalkulator for omsorgsdager',
        nn: 'Kalkulator for omsorgsdagar',
    },
    lenker: {
        q: 'https://omsorgsdager-kalkulator.intern.dev.nav.no',
        prod: 'https://www.nav.no/omsorgspenger/kalkulator-antall-omsorgsdager',
    },
};

export const OpplæringspengerApp: AppInfo = {
    key: SifAppKeys.OpplæringspengerApp,
    navn: 'Søknad om opplæringspenger',
    tittel: {
        nb: 'Søknad om opplæringspenger',
        nn: 'Søknad om opplæringspengar',
    },
    lenker: {
        q: 'https://opplaringspenger-soknad.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/soknad/opplaringspenger',
    },
};

export const UngdomsytelseDeltakerApp: AppInfo = {
    key: SifAppKeys.UngdomsytelseDeltakerApp,
    navn: 'Søknad om deltakelse i ungdomsprogram',
    tittel: {
        nb: 'Søknad om deltakelse i ungdomsprogram',
        nn: 'Søknad om deltaking i ungdomsprogram',
    },
    lenker: {
        q: 'https://ungdomsytelse-deltaker.intern.dev.nav.no',
        prod: 'https://www.nav.no/familie/sykdom-i-familien/ungdomsytelse-deltaker',
    },
};

export const UngdomsytelseVeilederApp: AppInfo = {
    key: SifAppKeys.UngdomsytelseVeilederApp,
    navn: 'Veilederapplikasjon for ungdomsprogramytelsen',
    tittel: {
        nb: 'Veilederapplikasjon for ungdomsprogramytelsen',
        nn: 'Veileidarapplikasjon for ungdomsprogramytelsen',
    },
    lenker: {
        q: 'https://ungdomsytelse-veileder.intern.dev.nav.no',
        prod: '',
    },
};

export const AktivitetspengerApp: AppInfo = {
    key: SifAppKeys.AktivitetspengerApp,
    navn: 'Aktivitetspenger',
    tittel: {
        nb: 'Aktivitetspenger',
        nn: 'Aktivitetspengar',
    },
    lenker: {
        q: 'https://aktivitetspenger.intern.dev.nav.no',
        prod: 'https://www.nav.no/aktivitetspenger/ytelse',
    },
};

export const sifAppRegister = {
    OmsorgsdagerAleneomsorgApp,
};
