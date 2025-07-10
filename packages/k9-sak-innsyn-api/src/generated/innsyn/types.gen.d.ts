export type ProblemDetail = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    properties?: {
        [key: string]: unknown;
    };
};
export type Adressebeskyttelse = {
    gradering: 'STRENGT_FORTROLIG_UTLAND' | 'STRENGT_FORTROLIG' | 'FORTROLIG' | 'UGRADERT';
};
export type AnnenAktivitet = {
    periode: string;
    annenAktivitetType: 'MILITÆR_ELLER_SIVILTJENESTE' | '-';
};
export type AnnenForelder = {
    norskIdentitetsnummer: string;
    situasjon: 'INNLAGT_I_HELSEINSTITUSJON' | 'UTØVER_VERNEPLIKT' | 'FENGSEL' | 'SYKDOM' | 'ANNET';
    situasjonBeskrivelse?: string;
    periode?: string;
};
export type Arbeidstaker = {
    norskIdentitetsnummer?: string;
    organisasjonsnummer?: string;
    organisasjonsnavn?: string;
    arbeidstidInfo: ArbeidstidInfo;
};
export type Arbeidstid = {
    arbeidstakerList: Array<Arbeidstaker>;
    frilanserArbeidstidInfo?: ArbeidstidInfo;
    selvstendigNæringsdrivendeArbeidstidInfo?: ArbeidstidInfo;
};
export type ArbeidstidInfo = {
    perioder: {
        [key: string]: ArbeidstidPeriodeInfo;
    };
};
export type ArbeidstidPeriodeInfo = {
    jobberNormaltTimerPerDag: string;
    faktiskArbeidTimerPerDag: string;
};
export type Barn = {
    norskIdentitetsnummer: string;
    fødselsdato?: string;
};
export type BarnOppslagDto = {
    fødselsdato: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktørId: string;
    identitetsnummer?: string;
    adressebeskyttelse$k9_sak_innsyn_api: Array<Adressebeskyttelse>;
};
export type BegrunnelseForInnsending = {
    tekst?: string;
};
export type Beredskap = {
    perioder: {
        [key: string]: BeredskapPeriodeInfo;
    };
    perioderSomSkalSlettes?: {
        [key: string]: BeredskapPeriodeInfo;
    };
};
export type BeredskapPeriodeInfo = {
    tilleggsinformasjon: string;
};
export type BostedPeriodeInfo = {
    land: string;
};
export type Bosteder = {
    perioder?: {
        [key: string]: BostedPeriodeInfo;
    };
    perioderSomSkalSlettes?: {
        [key: string]: BostedPeriodeInfo;
    };
};
export type DataBruktTilUtledning = {
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    soknadDialogCommitSha?: string;
    annetData?: string;
};
export type DelvisFravær = {
    normalarbeidstid: string;
    fravær: string;
};
export type FraværPeriode = {
    periode: string;
    duration?: string;
    delvisFravær?: DelvisFravær;
    årsak: 'STENGT_SKOLE_ELLER_BARNEHAGE' | 'SMITTEVERNHENSYN' | 'ORDINÆRT_FRAVÆR';
    søknadÅrsak?: 'ARBEIDSGIVER_KONKURS' | 'NYOPPSTARTET_HOS_ARBEIDSGIVER' | 'KONFLIKT_MED_ARBEIDSGIVER';
    aktivitetFravær: Array<'ARBEIDSTAKER' | 'FRILANSER' | 'SELVSTENDIG_VIRKSOMHET'>;
    organisasjonsnummer?: string;
    arbeidsforholdId?: string;
    arbeidsgiverOrgNr?: string;
};
export type Frilanser = {
    startdato: string;
    sluttdato?: string;
};
export type InfoFraPunsj = {
    søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean;
    inneholderMedisinskeOpplysninger?: boolean;
};
export type Journalpost = {
    inneholderInfomasjonSomIkkeKanPunsjes: boolean;
    inneholderInformasjonSomIkkeKanPunsjes: boolean;
    inneholderMedisinskeOpplysninger: boolean;
    journalpostId: string;
};
export type Kurs = {
    kursholder: Kursholder;
    kursperioder: Array<string>;
    reise: Reise;
};
export type Kursholder = {
    navn?: string;
    institusjonsidentifikator?: string;
};
export type LovbestemtFerie = {
    perioder: {
        [key: string]: LovbestemtFeriePeriodeInfo;
    };
};
export type LovbestemtFeriePeriodeInfo = {
    skalHaFerie?: boolean;
};
export type Nattevåk = {
    perioder: {
        [key: string]: NattevåkPeriodeInfo;
    };
    perioderSomSkalSlettes: {
        [key: string]: NattevåkPeriodeInfo;
    };
};
export type NattevåkPeriodeInfo = {
    tilleggsinformasjon: string;
};
export type Omsorg = {
    relasjonTilBarnet?: 'MOR' | 'MEDMOR' | 'FAR' | 'FOSTERFORELDER' | 'ANNET';
    beskrivelseAvOmsorgsrollen?: string;
};
export type OmsorgspengerAleneOmsorg = Ytelse & {
    type: 'OmsorgspengerAleneOmsorg';
} & {
    barn: Barn;
    periode: string;
    dataBruktTilUtledning?: DataBruktTilUtledning;
};
export type OmsorgspengerKroniskSyktBarn = Ytelse & {
    type: 'OmsorgspengerKroniskSyktBarn';
} & {
    barn: Barn;
    kroniskEllerFunksjonshemming: boolean;
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
    dataBruktTilUtledning?: DataBruktTilUtledning;
};
export type OmsorgspengerMidlertidigAlene = Ytelse & {
    type: 'OmsorgspengerMidlertidigAlene';
} & {
    barn: Array<Barn>;
    annenForelder: AnnenForelder;
    begrunnelse?: string;
    dataBruktTilUtledning?: DataBruktTilUtledning;
};
export type OmsorgspengerUtbetaling = Ytelse & {
    type: 'OmsorgspengerUtbetaling';
} & {
    fosterbarn?: Array<Barn>;
    aktivitet?: OpptjeningAktivitet;
    fraværsperioder?: Array<FraværPeriode>;
    fraværsperioderKorrigeringIm?: Array<FraværPeriode>;
    bosteder?: Bosteder;
    utenlandsopphold?: Utenlandsopphold;
    dataBruktTilUtledning?: DataBruktTilUtledning;
};
export type OppgittInntekt = {
    oppgittePeriodeinntekter: Array<OppgittInntektForPeriode>;
};
export type OppgittInntektForPeriode = {
    arbeidstakerOgFrilansInntekt?: number;
    næringsinntekt?: number;
    ytelse?: number;
    periode: string;
};
export type Opplæringspenger = Ytelse & {
    type: 'Opplæringspenger';
} & {
    barn: Barn;
    søknadsperiode: Array<string>;
    trekkKravPerioder: Array<string>;
    opptjeningAktivitet: OpptjeningAktivitet;
    dataBruktTilUtledning?: DataBruktTilUtledning;
    bosteder: Bosteder;
    utenlandsopphold: Utenlandsopphold;
    lovbestemtFerie: LovbestemtFerie;
    arbeidstid: Arbeidstid;
    uttak: Uttak;
    omsorg: Omsorg;
    kurs: Kurs;
};
export type OpptjeningAktivitet = {
    selvstendigNæringsdrivende: Array<SelvstendigNæringsdrivende>;
    frilanser?: Frilanser;
    utenlandskeArbeidsforhold: Array<UtenlandskArbeidsforhold>;
    andreAktiviteter: Array<AnnenAktivitet>;
};
export type PleiepengerSyktBarn = Ytelse & {
    type: 'PleiepengerSyktBarn';
} & {
    barn: Barn;
    søknadsperiode: Array<string>;
    endringsperiode: Array<string>;
    trekkKravPerioder: Array<string>;
    opptjeningAktivitet?: OpptjeningAktivitet;
    dataBruktTilUtledning?: DataBruktTilUtledning;
    annetDataBruktTilUtledning?: DataBruktTilUtledning;
    infoFraPunsj?: InfoFraPunsj;
    bosteder: Bosteder;
    utenlandsopphold: Utenlandsopphold;
    beredskap: Beredskap;
    nattevåk: Nattevåk;
    tilsynsordning: Tilsynsordning;
    lovbestemtFerie: LovbestemtFerie;
    arbeidstid: Arbeidstid;
    uttak: Uttak;
    omsorg: Omsorg;
    erSammenMedBarnet?: boolean;
};
export type Pleietrengende = {
    norskIdentitetsnummer?: string;
    fødselsdato?: string;
};
export type PleipengerLivetsSluttfase = Ytelse & {
    type: 'PleipengerLivetsSluttfase';
} & {
    pleietrengende: Pleietrengende;
    søknadsperiode: Array<string>;
    trekkKravPerioder: Array<string>;
    opptjeningAktivitet?: OpptjeningAktivitet;
    bosteder: Bosteder;
    utenlandsopphold: Utenlandsopphold;
    arbeidstid: Arbeidstid;
    uttak?: Uttak;
    lovbestemtFerie?: LovbestemtFerie;
    dataBruktTilUtledning?: DataBruktTilUtledning;
};
export type Reise = {
    reiserUtenforKursdager: boolean;
    reisedager?: Array<string>;
    reisedagerBeskrivelse?: string;
};
export type SelvstendigNæringsdrivende = {
    perioder: {
        [key: string]: SelvstendigNæringsdrivendePeriodeInfo;
    };
    organisasjonsnummer?: string;
    virksomhetNavn?: string;
};
export type SelvstendigNæringsdrivendePeriodeInfo = {
    virksomhetstyper: Array<'DAGMAMMA' | 'FISKE' | 'JORDBRUK_SKOGBRUK' | 'ANNEN' | '-'>;
    regnskapsførerNavn?: string;
    regnskapsførerTlf?: string;
    erVarigEndring?: boolean;
    erNyIArbeidslivet?: boolean;
    endringDato?: string;
    endringBegrunnelse?: string;
    bruttoInntekt?: number;
    erNyoppstartet?: boolean;
    registrertIUtlandet?: boolean;
    landkode?: string;
    erFiskerPåBladB?: boolean;
};
export type Søker = {
    norskIdentitetsnummer: string;
};
export type Søknad = {
    søknadId: string;
    versjon: string;
    mottattDato: string;
    søker: Søker;
    språk?: 'nb' | 'nn';
    ytelse: OmsorgspengerAleneOmsorg | OmsorgspengerKroniskSyktBarn | OmsorgspengerMidlertidigAlene | OmsorgspengerUtbetaling | Opplæringspenger | PleiepengerSyktBarn | PleipengerLivetsSluttfase | Ungdomsytelse;
    journalposter?: Array<Journalpost>;
    begrunnelseForInnsending?: BegrunnelseForInnsending;
    kildesystem?: string;
};
export type SøknadDto = {
    barn: BarnOppslagDto;
    søknad: Søknad;
    søknader?: Array<Søknad>;
};
export type TilsynPeriodeInfo = {
    etablertTilsynTimerPerDag: string;
};
export type Tilsynsordning = {
    perioder: {
        [key: string]: TilsynPeriodeInfo;
    };
};
export type Ungdomsytelse = Ytelse & {
    type: 'Ungdomsytelse';
} & {
    søknadType: 'DELTAKELSE_SØKNAD' | 'RAPPORTERING_SØKNAD';
    søktFraDatoer: Array<string>;
    inntekter?: OppgittInntekt;
    deltakelseId?: string;
};
export type UtenlandskArbeidsforhold = {
    ansettelsePeriode: string;
    land: string;
    arbeidsgiversnavn: string;
};
export type Utenlandsopphold = {
    perioder?: {
        [key: string]: UtenlandsoppholdPeriodeInfo;
    };
    perioderSomSkalSlettes?: {
        [key: string]: UtenlandsoppholdPeriodeInfo;
    };
};
export type UtenlandsoppholdPeriodeInfo = {
    land: string;
    årsak?: 'barnetInnlagtIHelseinstitusjonForNorskOffentligRegning' | 'barnetInnlagtIHelseinstitusjonDekketEtterAvtaleMedEtAnnetLandOmTrygd';
    erSammenMedBarnet?: boolean;
};
export type Uttak = {
    perioder: {
        [key: string]: UttakPeriodeInfo;
    };
};
export type UttakPeriodeInfo = {
    timerPleieAvBarnetPerDag: string;
};
export type Ytelse = {
    type: string;
};
export type AksjonspunktDto = {
    venteårsak: 'INNTEKTSMELDING' | 'MEDISINSK_DOKUMENTASJON' | 'FOR_TIDLIG_SOKNAD' | 'MELDEKORT';
    tidsfrist: string;
};
export type BehandlingDto = {
    status: 'OPPRETTET' | 'UNDER_BEHANDLING' | 'PÅ_VENT' | 'AVSLUTTET';
    opprettetTidspunkt: string;
    avsluttetTidspunkt?: string;
    innsendelser: Array<InnsendelserISakDto>;
    aksjonspunkter: Array<AksjonspunktDto>;
    utgåendeDokumenter: Array<DokumentDto>;
};
export type DokumentDto = {
    journalpostId: string;
    dokumentInfoId: string;
    saksnummer?: string;
    tittel: string;
    dokumentType?: 'PLEIEPENGER_SYKT_BARN_SOKNAD' | 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE' | 'ETTERLYST_INNTEKTSMELDING' | 'ETTERLYST_INNTEKTSMELDING_PURRING' | 'VEDTAK_INNVILGELSE' | 'VEDTAK_AVSLAG' | 'VEDTAK_FRITEKST' | 'VEDTAK_ENDRING' | 'VEDTAK_MANUELT' | 'VEDTAK_UENDRETUTFALL' | 'UKJENT';
    filtype: string;
    harTilgang: boolean;
    url: string;
    relevanteDatoer: Array<RelevantDatoDto>;
};
export type InnsendelserISakDto = {
    søknadId: string;
    mottattTidspunkt: string;
    innsendelsestype: 'SØKNAD' | 'ETTERSENDELSE' | 'ENDRINGSMELDING' | 'UKJENT';
    k9FormatInnsendelse?: Innsending;
    dokumenter: Array<DokumentDto>;
    arbeidsgivere?: Array<Organisasjon>;
};
export type Innsending = {
    mottattDato?: string;
    versjon?: string;
    søker?: Søker;
    søknadId?: string;
};
export type Organisasjon = {
    organisasjonsnummer: string;
    navn?: string;
};
export type PleietrengendeDto = {
    identitetsnummer: string;
    fødselsdato: string;
    aktørId: string;
    fornavn?: string;
    mellomnavn?: string;
    etternavn?: string;
};
export type PleietrengendeMedSak = {
    pleietrengende: PleietrengendeDto;
    sak: SakDto;
};
export type RelevantDatoDto = {
    dato: string;
    datotype: 'DATO_OPPRETTET' | 'DATO_SENDT_PRINT' | 'DATO_EKSPEDERT' | 'DATO_JOURNALFOERT' | 'DATO_REGISTRERT' | 'DATO_AVS_RETUR' | 'DATO_DOKUMENT' | 'UKJENT';
};
export type SakDto = {
    saksnummer: string;
    utledetStatus: UtledetStatus;
    saksbehandlingsFrist?: string;
    fagsakYtelseType: 'DAGPENGER' | 'FRISINN' | 'SYKEPENGER' | 'PLEIEPENGER_SYKT_BARN' | 'PLEIEPENGER_NÆRSTÅENDE' | 'OMSORGSPENGER' | 'OMSORGSPENGER_KS' | 'OMSORGSPENGER_MA' | 'OMSORGSPENGER_AO' | 'OPPLÆRINGSPENGER' | 'ARBEIDSAVKLARINGSPENGER' | 'ENGANGSTØNAD' | 'FORELDREPENGER' | 'SVANGERSKAPSPENGER' | 'ENSLIG_FORSØRGER' | 'OBSOLETE' | 'UDEFINERT';
    ytelseType: 'PSB' | 'PPN' | 'OMP_KS' | 'OMP_MA' | 'OMP_AO' | 'OLP';
    behandlinger: Array<BehandlingDto>;
};
export type UtledetStatus = {
    status: 'OPPRETTET' | 'UNDER_BEHANDLING' | 'PÅ_VENT' | 'AVSLUTTET';
    aksjonspunkter: Array<AksjonspunktDto>;
    saksbehandlingsFrist?: string;
};
export type SaksbehandlingtidDto = {
    saksbehandlingstidUker: number;
};
export type HentSøknaderData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/soknad';
};
export type HentSøknaderErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type HentSøknaderError = HentSøknaderErrors[keyof HentSøknaderErrors];
export type HentSøknaderResponses = {
    200: Array<SøknadDto>;
};
export type HentSøknaderResponse = HentSøknaderResponses[keyof HentSøknaderResponses];
export type LastNedArbeidsgivermeldingData = {
    body?: never;
    path: {
        søknadId: string;
    };
    query: {
        organisasjonsnummer: string;
    };
    url: '/soknad/{søknadId}/arbeidsgivermelding';
};
export type LastNedArbeidsgivermeldingErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type LastNedArbeidsgivermeldingError = LastNedArbeidsgivermeldingErrors[keyof LastNedArbeidsgivermeldingErrors];
export type LastNedArbeidsgivermeldingResponses = {
    200: Blob | File;
};
export type LastNedArbeidsgivermeldingResponse = LastNedArbeidsgivermeldingResponses[keyof LastNedArbeidsgivermeldingResponses];
export type HentMineSakerData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/saker';
};
export type HentMineSakerErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type HentMineSakerError = HentMineSakerErrors[keyof HentMineSakerErrors];
export type HentMineSakerResponses = {
    200: PleietrengendeMedSak;
};
export type HentMineSakerResponse = HentMineSakerResponses[keyof HentMineSakerResponses];
export type HentSaksbehandlingstidData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/saker/saksbehandlingstid';
};
export type HentSaksbehandlingstidErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type HentSaksbehandlingstidError = HentSaksbehandlingstidErrors[keyof HentSaksbehandlingstidErrors];
export type HentSaksbehandlingstidResponses = {
    200: SaksbehandlingtidDto;
};
export type HentSaksbehandlingstidResponse = HentSaksbehandlingstidResponses[keyof HentSaksbehandlingstidResponses];
export type HentDokumentData = {
    body?: never;
    path: {
        journalpostId: string;
        dokumentInfoId: string;
        variantFormat: string;
    };
    query: {
        dokumentTittel: string;
    };
    url: '/dokument/{journalpostId}/{dokumentInfoId}/{variantFormat}';
};
export type HentDokumentErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type HentDokumentError = HentDokumentErrors[keyof HentDokumentErrors];
export type HentDokumentResponses = {
    200: Blob | File;
};
export type HentDokumentResponse = HentDokumentResponses[keyof HentDokumentResponses];
export type ClientOptions = {
    baseURL: 'https://k9-sak-innsyn-api.intern.dev.nav.no' | (string & {});
};
//# sourceMappingURL=types.gen.d.ts.map