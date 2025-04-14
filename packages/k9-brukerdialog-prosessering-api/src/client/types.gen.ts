// This file is auto-generated by @hey-api/openapi-ts

export type ProblemDetail = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    properties?: {
        [key: string]: {
            [key: string]: unknown;
        };
    };
};

export type Friteksfelt = {
    verdi: string;
};

export type Ungdomsytelsesøknad = {
    språk: string;
    startdato: string;
    søkerNorskIdent: string;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
};

export type UngdomsytelseOppgaveDto = {
    oppgaveReferanse: string;
    uttalelse: UngdomsytelseOppgaveUttalelseDto;
};

export type UngdomsytelseOppgaveUttalelseDto = {
    bekreftelseSvar: 'GODTAR' | 'AVSLÅR';
    meldingFraDeltaker?: string;
};

export type UngdomsytelseOppgavebekreftelse = {
    oppgave: UngdomsytelseOppgaveDto;
};

export type OppgittInntektForPeriode = {
    arbeidstakerOgFrilansInntekt?: number;
    inntektFraYtelse?: number;
    periodeForInntekt: UngPeriode;
};

export type UngPeriode = {
    fraOgMed: string;
    tilOgMed: string;
};

export type UngdomsytelseInntektsrapportering = {
    oppgittInntektForPeriode: OppgittInntektForPeriode;
    harBekreftetInntekt: boolean;
};

export type ArbeidIPeriode = {
    type: 'ARBEIDER_VANLIG' | 'ARBEIDER_REDUSERT' | 'ARBEIDER_IKKE' | 'IKKE_BESVART';
    redusertArbeid?: ArbeidsRedusert;
};

export type ArbeidsRedusert = {
    type: 'PROSENT_AV_NORMALT' | 'TIMER_I_SNITT_PER_UKE' | 'ULIKE_UKER_TIMER';
    prosentAvNormalt?: number;
    timerPerUke?: string;
    arbeidsuker?: Array<ArbeidsUke>;
};

export type ArbeidsUke = {
    periode: Periode;
    timer: string;
};

export type Arbeidsforhold = {
    normalarbeidstid: NormalArbeidstid;
    arbeidIPeriode: ArbeidIPeriode;
};

export type Arbeidsgiver = {
    organisasjonsnummer: string;
    navn: string;
    erAnsatt: boolean;
    sluttetFørSøknadsperiode?: boolean;
    arbeidsforhold?: Arbeidsforhold;
};

export type BarnDetaljer = {
    fødselsnummer?: string;
    fødselsdato?: string;
    aktørId?: string;
    navn: string;
    getårsakManglerIdentitetsnummer?: 'NYFØDT' | 'BARNET_BOR_I_UTLANDET' | 'ANNET';
};

export type Beredskap = {
    beredskap: boolean;
    tilleggsinformasjon?: string;
};

export type Bosted = {
    fraOgMed: string;
    tilOgMed: string;
    landkode: string;
    landnavn: string;
};

export type Enkeltdag = {
    dato: string;
    tid: string;
};

export type Ferieuttak = {
    fraOgMed: string;
    tilOgMed: string;
};

export type FerieuttakIPerioden = {
    skalTaUtFerieIPerioden: boolean;
    ferieuttak: Array<Ferieuttak>;
};

export type Frilans = {
    harInntektSomFrilanser: boolean;
    startetFørSisteTreHeleMåneder?: boolean;
    startdato?: string;
    sluttdato?: string;
    misterHonorar?: boolean;
    type?: 'FRILANS' | 'FRILANS_HONORAR' | 'HONORAR';
    jobberFortsattSomFrilans?: boolean;
    arbeidsforhold?: Arbeidsforhold;
};

export type Land = {
    landkode: string;
    landnavn: string;
};

export type Medlemskap = {
    harBoddIUtlandetSiste12Mnd?: boolean;
    utenlandsoppholdSiste12Mnd: Array<Bosted>;
    skalBoIUtlandetNeste12Mnd?: boolean;
    utenlandsoppholdNeste12Mnd: Array<Bosted>;
};

export type Nattevåk = {
    harNattevåk: boolean;
    tilleggsinformasjon?: string;
};

export type NormalArbeidstid = {
    timerPerUkeISnitt: string;
};

export type Omsorgstilbud = {
    svarFortid?: 'JA' | 'NEI';
    svarFremtid?: 'JA' | 'NEI' | 'USIKKER';
    erLiktHverUke?: boolean;
    enkeltdager?: Array<Enkeltdag>;
    ukedager?: PlanUkedager;
};

export type OpptjeningIUtlandet = {
    navn: string;
    opptjeningType: 'ARBEIDSTAKER' | 'FRILANSER';
    land: Land;
    fraOgMed: string;
    tilOgMed: string;
};

export type Periode = {
    fraOgMed: string;
    tilOgMed: string;
};

export type PlanUkedager = {
    mandag?: string;
    tirsdag?: string;
    onsdag?: string;
    torsdag?: string;
    fredag?: string;
};

export type PleiepengerSyktBarnSøknad = {
    newVersion?: boolean;
    apiDataVersjon?: string;
    språk: 'nb' | 'nn';
    søkerNorskIdent?: string;
    barn: BarnDetaljer;
    arbeidsgivere: Array<Arbeidsgiver>;
    vedlegg: Array<string>;
    fødselsattestVedleggUrls?: Array<string>;
    fraOgMed: string;
    tilOgMed: string;
    medlemskap: Medlemskap;
    utenlandsoppholdIPerioden: UtenlandsoppholdIPerioden;
    ferieuttakIPerioden?: FerieuttakIPerioden;
    opptjeningIUtlandet: Array<OpptjeningIUtlandet>;
    utenlandskNæring: Array<UtenlandskNæring>;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
    omsorgstilbud?: Omsorgstilbud;
    nattevåk?: Nattevåk;
    beredskap?: Beredskap;
    frilans: Frilans;
    stønadGodtgjørelse?: StønadGodtgjørelse;
    selvstendigNæringsdrivende: SelvstendigNæringsdrivende;
    barnRelasjon?: 'MOR' | 'MEDMOR' | 'FAR' | 'FOSTERFORELDER' | 'ANNET';
    barnRelasjonBeskrivelse?: string;
    harVærtEllerErVernepliktig?: boolean;
    dataBruktTilUtledningAnnetData?: string;
};

export type Regnskapsfører = {
    navn?: string;
    telefon?: string;
};

export type SelvstendigNæringsdrivende = {
    harInntektSomSelvstendig: boolean;
    virksomhet?: Virksomhet;
    arbeidsforhold?: Arbeidsforhold;
};

export type StønadGodtgjørelse = {
    mottarStønadGodtgjørelse?: boolean;
    startdato?: string;
    sluttdato?: string;
};

export type UtenlandskNæring = {
    næringstype: 'FISKE' | 'JORDBRUK_SKOGBRUK' | 'DAGMAMMA' | 'ANNEN';
    navnPåVirksomheten: string;
    land: Land;
    organisasjonsnummer?: string;
    fraOgMed: string;
    tilOgMed?: string;
};

export type Utenlandsopphold = {
    fraOgMed: string;
    tilOgMed: string;
    landkode: string;
    landnavn: string;
    erUtenforEøs?: boolean;
    erSammenMedBarnet?: boolean;
    erBarnetInnlagt?: boolean;
    perioderBarnetErInnlagt: Array<Periode>;
    getårsak?: 'BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING' | 'BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD' | 'ANNET';
};

export type UtenlandsoppholdIPerioden = {
    skalOppholdeSegIUtlandetIPerioden?: boolean;
    opphold: Array<Utenlandsopphold>;
};

export type VarigEndring = {
    dato?: string;
    inntektEtterEndring?: number;
    forklaring?: string;
};

export type Virksomhet = {
    fraOgMed: string;
    tilOgMed?: string;
    næringstype: 'FISKE' | 'JORDBRUK_SKOGBRUK' | 'DAGMAMMA' | 'ANNEN';
    fiskerErPåBladB?: boolean;
    næringsinntekt?: number;
    navnPåVirksomheten: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertIUtlandet?: Land;
    yrkesaktivSisteTreFerdigliknedeÅrene?: YrkesaktivSisteTreFerdigliknedeArene;
    varigEndring?: VarigEndring;
    regnskapsfører?: Regnskapsfører;
    erNyoppstartet: boolean;
    harFlereAktiveVirksomheter: boolean;
};

export type YrkesaktivSisteTreFerdigliknedeArene = {
    oppstartsdato?: string;
};

export type AnnenAktivitet = {
    periode: string;
    annenAktivitetType: 'MILITÆR_ELLER_SIVILTJENESTE' | '-';
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

export type Endringsmelding = {
    språk: string;
    pleietrengendeNavn?: string;
    gyldigeEndringsPerioder?: Array<string>;
    søkerNorskIdent?: string;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
    ytelse: PleiepengerSyktBarn;
};

export type Frilanser = {
    startdato: string;
    sluttdato?: string;
};

export type InfoFraPunsj = {
    søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean;
    inneholderMedisinskeOpplysninger?: boolean;
};

export type LovbestemtFerie = {
    perioder: {
        [key: string]: LovbestemtFeriePeriodeInfo;
    };
};

export type LovbestemtFeriePeriodeInfo = {
    skalHaFerie?: boolean;
};

export type Omsorg = {
    relasjonTilBarnet?: 'MOR' | 'MEDMOR' | 'FAR' | 'FOSTERFORELDER' | 'ANNET';
    beskrivelseAvOmsorgsrollen?: string;
};

export type OpptjeningAktivitet = {
    selvstendigNæringsdrivende: Array<SelvstendigNæringsdrivende>;
    frilanser?: Frilanser;
    utenlandskeArbeidsforhold: Array<UtenlandskArbeidsforhold>;
    andreAktiviteter: Array<AnnenAktivitet>;
};

export type PleiepengerSyktBarn = {
    barn: Barn;
    søknadsperiode: Array<string>;
    /**
     * @deprecated
     */
    endringsperiode: Array<string>;
    trekkKravPerioder: Array<string>;
    opptjeningAktivitet?: OpptjeningAktivitet;
    dataBruktTilUtledning?: DataBruktTilUtledning;
    annetDataBruktTilUtledning?: DataBruktTilUtledning;
    /**
     * @deprecated
     */
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

export type TilsynPeriodeInfo = {
    etablertTilsynTimerPerDag: string;
};

export type Tilsynsordning = {
    perioder: {
        [key: string]: TilsynPeriodeInfo;
    };
};

export type UtenlandskArbeidsforhold = {
    ansettelsePeriode: string;
    land: string;
    arbeidsgiversnavn: string;
};

export type Uttak = {
    perioder: {
        [key: string]: UttakPeriodeInfo;
    };
};

export type UttakPeriodeInfo = {
    timerPleieAvBarnetPerDag: string;
};

export type PleiepengerILivetsSluttfaseSøknad = {
    språk: string;
    fraOgMed: string;
    tilOgMed: string;
    skalJobbeOgPleieSammeDag: boolean;
    dagerMedPleie: Array<string>;
    vedleggUrls: Array<string>;
    opplastetIdVedleggUrls: Array<string>;
    pleietrengende: Pleietrengende;
    medlemskap: Medlemskap;
    utenlandsoppholdIPerioden: UtenlandsoppholdIPerioden;
    arbeidsgivere: Array<Arbeidsgiver>;
    frilans?: Frilans;
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivende;
    opptjeningIUtlandet: Array<OpptjeningIUtlandet>;
    utenlandskNæring: Array<UtenlandskNæring>;
    harVærtEllerErVernepliktig?: boolean;
    pleierDuDenSykeHjemme?: boolean;
    søkerNorskIdent?: string;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
    flereSokere?: 'JA' | 'NEI' | 'USIKKER';
    dataBruktTilUtledningAnnetData?: string;
};

export type Pleietrengende = {
    norskIdentitetsnummer?: string;
    fødselsdato?: string;
    navn: string;
    getårsakManglerIdentitetsnummer?: 'BOR_I_UTLANDET' | 'ANNET';
};

export type FamiliePdfPostRequest = {
    label: string;
    verdiliste: Array<VerdilisteElement>;
    pdfConfig: PdfConfig;
    skjemanummer?: string;
};

export type PdfConfig = {
    harInnholdsfortegnelse: boolean;
    språk: string;
};

export type VerdilisteElement = {
    label: string;
    visningsVariant?: string;
    verdi?: string;
    alternativer?: string;
};

export type ArbeidsforholdOlp = {
    jobberNormaltTimer: number;
    arbeidIPeriode: ArbeidIPeriode;
};

export type ArbeidsgiverOlp = {
    organisasjonsnummer?: string;
    navn?: string;
    erAnsatt?: boolean;
    sluttetFørSøknadsperiode?: boolean;
    arbeidsforhold?: ArbeidsforholdOlp;
};

export type FrilansOlp = {
    startdato: string;
    sluttdato?: string;
    jobberFortsattSomFrilans: boolean;
    arbeidsforhold?: ArbeidsforholdOlp;
    harHattInntektSomFrilanser: boolean;
};

export type Kurs = {
    kursholder: Kursholder;
    kursperioder: Array<string>;
    reise: Reise;
};

export type Kursholder = {
    uuid?: string;
    navn: string;
};

export type OpplæringspengerSøknad = {
    newVersion?: boolean;
    apiDataVersjon?: string;
    språk: 'nb' | 'nn';
    søkerNorskIdent?: string;
    barn: BarnDetaljer;
    arbeidsgivere: Array<ArbeidsgiverOlp>;
    vedlegg: Array<string>;
    fraOgMed: string;
    tilOgMed: string;
    medlemskap: Medlemskap;
    ferieuttakIPerioden?: FerieuttakIPerioden;
    opptjeningIUtlandet: Array<OpptjeningIUtlandet>;
    utenlandskNæring: Array<UtenlandskNæring>;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
    frilans?: FrilansOlp;
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivendeOlp;
    stønadGodtgjørelse?: StønadGodtgjørelse;
    harVærtEllerErVernepliktig?: boolean;
    dataBruktTilUtledningAnnetData?: string;
    kurs: Kurs;
};

export type Reise = {
    reiserUtenforKursdager: boolean;
    reisedager?: Array<string>;
    reisedagerBeskrivelse?: string;
};

export type SelvstendigNæringsdrivendeOlp = {
    virksomhet: Virksomhet;
    arbeidsforhold: ArbeidsforholdOlp;
};

export type OmsorgspengerKroniskSyktBarnSøknad = {
    språk: string;
    barn: Barn;
    legeerklæring: Array<string>;
    samværsavtale?: Array<string>;
    relasjonTilBarnet?: 'MOR' | 'FAR' | 'FOSTERFORELDER' | 'ADOPTIVFORELDER';
    kroniskEllerFunksjonshemming: boolean;
    søkerNorskIdent?: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    sammeAdresse: 'JA' | 'JA_DELT_BOSTED' | 'NEI';
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
    dataBruktTilUtledningAnnetData?: string;
};

export type Bekreftelser = {
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
};

export type OmsorgspengerutbetalingSnfSøknad = {
    språk: string;
    søkerNorskIdent?: string;
    bosteder: Array<Bosted>;
    opphold: Array<Bosted>;
    spørsmål: Array<SpørsmålOgSvar>;
    harDekketTiFørsteDagerSelv?: boolean;
    harSyktBarn?: boolean;
    harAleneomsorg?: boolean;
    bekreftelser: Bekreftelser;
    utbetalingsperioder: Array<Utbetalingsperiode>;
    barn: Array<Barn>;
    frilans?: Frilans;
    selvstendigNæringsdrivende?: Virksomhet;
    erArbeidstakerOgså: boolean;
    vedlegg: Array<string>;
    dataBruktTilUtledningAnnetData?: string;
};

export type SpørsmålOgSvar = {
    spørsmål: string;
    svar: boolean;
};

export type Utbetalingsperiode = {
    fraOgMed?: string;
    tilOgMed?: string;
    antallTimerBorte?: string;
    antallTimerPlanlagt?: string;
    årsak?: 'STENGT_SKOLE_ELLER_BARNEHAGE' | 'SMITTEVERNHENSYN' | 'ORDINÆRT_FRAVÆR';
    aktivitetFravær?: Array<'ARBEIDSTAKER' | 'FRILANSER' | 'SELVSTENDIG_VIRKSOMHET'>;
};

export type DineBarn = {
    barn: Array<Barn>;
    harDeltBosted: boolean;
};

export type OmsorgspengerutbetalingArbeidstakerSøknad = {
    språk: string;
    vedlegg: Array<string>;
    søkerNorskIdent?: string;
    bosteder: Array<Bosted>;
    opphold: Array<Bosted>;
    bekreftelser?: Bekreftelser;
    arbeidsgivere?: Array<Arbeidsgiver>;
    dineBarn?: DineBarn;
    hjemmePgaSmittevernhensyn?: boolean;
    hjemmePgaStengtBhgSkole?: boolean;
    dataBruktTilUtledningAnnetData?: string;
};

export type AnnenForelder = {
    fnr: string;
    navn: string;
    situasjon: 'INNLAGT_I_HELSEINSTITUSJON' | 'UTØVER_VERNEPLIKT' | 'FENGSEL' | 'SYKDOM' | 'ANNET';
    situasjonBeskrivelse?: string;
    periodeOver6Måneder?: boolean;
    periodeFraOgMed: string;
    periodeTilOgMed?: string;
};

export type OmsorgspengerMidlertidigAleneSøknad = {
    id: string;
    språk: string;
    søkerNorskIdent?: string;
    annenForelder: AnnenForelder;
    barn: Array<Barn>;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
    dataBruktTilUtledningAnnetData?: string;
};

export type OmsorgsdagerAleneOmOmsorgenSøknad = {
    språk: string;
    søkerNorskIdent?: string;
    barn: Array<Barn>;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
    dataBruktTilUtledningAnnetData?: string;
};

export type Ettersendelse = {
    språk: string;
    vedlegg: Array<string>;
    beskrivelse?: string;
    søknadstype: 'PLEIEPENGER_SYKT_BARN' | 'PLEIEPENGER_LIVETS_SLUTTFASE' | 'OMP_UT_SNF' | 'OMP_UT_ARBEIDSTAKER' | 'OMP_UTV_KS' | 'OMP_UTV_MA' | 'OMP_UTV_AO' | 'OPPLÆRINGSPENGER';
    ettersendelsesType: 'LEGEERKLÆRING' | 'ANNET';
    søkerNorskIdent?: string;
    pleietrengende?: Pleietrengende;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
};

export type Søker = {
    aktørId: string;
    fødselsdato: string;
    fødselsnummer: string;
    fornavn?: string;
    mellomnavn?: string;
    etternavn?: string;
};

export type BarnOppslag = {
    fødselsdato: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktørId: string;
};

export type BarnOppslagListe = {
    barn: Array<BarnOppslag>;
};

export type ArbeidsgivereDto = {
    organisasjoner: Array<OrganisasjonDto>;
    privateArbeidsgivere?: Array<PrivatArbeidsgiverDto>;
    frilansoppdrag?: Array<FrilansoppdragDto>;
};

export type FrilansoppdragDto = {
    type: string;
    organisasjonsnummer?: string;
    navn?: string;
    offentligIdent?: string;
    ansattFom?: string;
    ansattTom?: string;
};

export type OrganisasjonDto = {
    organisasjonsnummer: string;
    navn?: string;
    ansattFom?: string;
    ansattTom?: string;
};

export type PrivatArbeidsgiverDto = {
    offentligIdent: string;
    ansattFom?: string;
    ansattTom?: string;
};

export type DeleteMellomlagringData = {
    body?: never;
    path: {
        ytelse: string;
    };
    query?: never;
    url: '/mellomlagring/{ytelse}';
};

export type DeleteMellomlagringErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type DeleteMellomlagringError = DeleteMellomlagringErrors[keyof DeleteMellomlagringErrors];

export type DeleteMellomlagringResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type GetMellomlagringData = {
    body?: never;
    path: {
        ytelse: string;
    };
    query?: never;
    url: '/mellomlagring/{ytelse}';
};

export type GetMellomlagringErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type GetMellomlagringError = GetMellomlagringErrors[keyof GetMellomlagringErrors];

export type GetMellomlagringResponses = {
    /**
     * OK
     */
    200: string;
};

export type GetMellomlagringResponse = GetMellomlagringResponses[keyof GetMellomlagringResponses];

export type CreateMellomlagringData = {
    body: {
        [key: string]: {
            [key: string]: unknown;
        };
    };
    path: {
        ytelse: string;
    };
    query?: never;
    url: '/mellomlagring/{ytelse}';
};

export type CreateMellomlagringErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type CreateMellomlagringError = CreateMellomlagringErrors[keyof CreateMellomlagringErrors];

export type CreateMellomlagringResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type UpdateMellomlagringData = {
    body: {
        [key: string]: {
            [key: string]: unknown;
        };
    };
    path: {
        ytelse: string;
    };
    query?: never;
    url: '/mellomlagring/{ytelse}';
};

export type UpdateMellomlagringErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type UpdateMellomlagringError = UpdateMellomlagringErrors[keyof UpdateMellomlagringErrors];

export type UpdateMellomlagringResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type LagreVedleggData = {
    body?: {
        vedlegg: Blob | File;
    };
    path?: never;
    query?: never;
    url: '/vedlegg';
};

export type LagreVedleggErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type LagreVedleggError = LagreVedleggErrors[keyof LagreVedleggErrors];

export type LagreVedleggResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type ValiderFriteksfeltData = {
    body: Friteksfelt;
    path?: never;
    query?: never;
    url: '/valider/friteksfelt';
};

export type ValiderFriteksfeltErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type ValiderFriteksfeltError = ValiderFriteksfeltErrors[keyof ValiderFriteksfeltErrors];

export type ValiderFriteksfeltResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type InnsendingUngdomsytelsesøknadData = {
    body: Ungdomsytelsesøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: {
        enabled?: boolean;
    };
    url: '/ungdomsytelse/soknad/innsending';
};

export type InnsendingUngdomsytelsesøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingUngdomsytelsesøknadError = InnsendingUngdomsytelsesøknadErrors[keyof InnsendingUngdomsytelsesøknadErrors];

export type InnsendingUngdomsytelsesøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type OppgavebekreftelseData = {
    body: UngdomsytelseOppgavebekreftelse;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: {
        enabled?: boolean;
    };
    url: '/ungdomsytelse/oppgavebekreftelse/innsending';
};

export type OppgavebekreftelseErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type OppgavebekreftelseError = OppgavebekreftelseErrors[keyof OppgavebekreftelseErrors];

export type OppgavebekreftelseResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InntektrapporteringData = {
    body: UngdomsytelseInntektsrapportering;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: {
        enabled?: boolean;
    };
    url: '/ungdomsytelse/inntektsrapportering/innsending';
};

export type InntektrapporteringErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InntektrapporteringError = InntektrapporteringErrors[keyof InntektrapporteringErrors];

export type InntektrapporteringResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingPleiepengerSyktBarnSøknadData = {
    body: PleiepengerSyktBarnSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/pleiepenger-sykt-barn/innsending';
};

export type InnsendingPleiepengerSyktBarnSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingPleiepengerSyktBarnSøknadError = InnsendingPleiepengerSyktBarnSøknadErrors[keyof InnsendingPleiepengerSyktBarnSøknadErrors];

export type InnsendingPleiepengerSyktBarnSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingEndringsmeldingData = {
    body: Endringsmelding;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/pleiepenger-sykt-barn/endringsmelding/innsending';
};

export type InnsendingEndringsmeldingErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingEndringsmeldingError = InnsendingEndringsmeldingErrors[keyof InnsendingEndringsmeldingErrors];

export type InnsendingEndringsmeldingResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingPleiepengerILivetsSluttfaseSøknadData = {
    body: PleiepengerILivetsSluttfaseSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/pleiepenger-livets-sluttfase/innsending';
};

export type InnsendingPleiepengerILivetsSluttfaseSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingPleiepengerILivetsSluttfaseSøknadError = InnsendingPleiepengerILivetsSluttfaseSøknadErrors[keyof InnsendingPleiepengerILivetsSluttfaseSøknadErrors];

export type InnsendingPleiepengerILivetsSluttfaseSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type LagPdfData = {
    body: FamiliePdfPostRequest;
    path?: never;
    query?: never;
    url: '/pdf';
};

export type LagPdfErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type LagPdfError = LagPdfErrors[keyof LagPdfErrors];

export type LagPdfResponses = {
    /**
     * OK
     */
    200: Blob | File;
};

export type LagPdfResponse = LagPdfResponses[keyof LagPdfResponses];

export type InnsendingOpplæringspengerSøknadData = {
    body: OpplæringspengerSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/opplaringspenger/innsending';
};

export type InnsendingOpplæringspengerSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingOpplæringspengerSøknadError = InnsendingOpplæringspengerSøknadErrors[keyof InnsendingOpplæringspengerSøknadErrors];

export type InnsendingOpplæringspengerSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingOmsorgspengerKroniskSyktBarnSøknadData = {
    body: OmsorgspengerKroniskSyktBarnSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/omsorgspenger-utvidet-rett/innsending';
};

export type InnsendingOmsorgspengerKroniskSyktBarnSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingOmsorgspengerKroniskSyktBarnSøknadError = InnsendingOmsorgspengerKroniskSyktBarnSøknadErrors[keyof InnsendingOmsorgspengerKroniskSyktBarnSøknadErrors];

export type InnsendingOmsorgspengerKroniskSyktBarnSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingOmsorgspengerutbetalingSnfSøknadData = {
    body: OmsorgspengerutbetalingSnfSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/omsorgspenger-utbetaling-snf/innsending';
};

export type InnsendingOmsorgspengerutbetalingSnfSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingOmsorgspengerutbetalingSnfSøknadError = InnsendingOmsorgspengerutbetalingSnfSøknadErrors[keyof InnsendingOmsorgspengerutbetalingSnfSøknadErrors];

export type InnsendingOmsorgspengerutbetalingSnfSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingOmsorgspengerutbetalingArbeidstakerSøknadData = {
    body: OmsorgspengerutbetalingArbeidstakerSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/omsorgspenger-utbetaling-arbeidstaker/innsending';
};

export type InnsendingOmsorgspengerutbetalingArbeidstakerSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingOmsorgspengerutbetalingArbeidstakerSøknadError = InnsendingOmsorgspengerutbetalingArbeidstakerSøknadErrors[keyof InnsendingOmsorgspengerutbetalingArbeidstakerSøknadErrors];

export type InnsendingOmsorgspengerutbetalingArbeidstakerSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingOmsorgspengerMidlertidigAleneSøknadData = {
    body: OmsorgspengerMidlertidigAleneSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/omsorgspenger-midlertidig-alene/innsending';
};

export type InnsendingOmsorgspengerMidlertidigAleneSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingOmsorgspengerMidlertidigAleneSøknadError = InnsendingOmsorgspengerMidlertidigAleneSøknadErrors[keyof InnsendingOmsorgspengerMidlertidigAleneSøknadErrors];

export type InnsendingOmsorgspengerMidlertidigAleneSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingOmsorgsdagerAleneOmOmsorgenSøknadData = {
    body: OmsorgsdagerAleneOmOmsorgenSøknad;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/omsorgsdager-aleneomsorg/innsending';
};

export type InnsendingOmsorgsdagerAleneOmOmsorgenSøknadErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingOmsorgsdagerAleneOmOmsorgenSøknadError = InnsendingOmsorgsdagerAleneOmOmsorgenSøknadErrors[keyof InnsendingOmsorgsdagerAleneOmOmsorgenSøknadErrors];

export type InnsendingOmsorgsdagerAleneOmOmsorgenSøknadResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type InnsendingEttersendelseData = {
    body: Ettersendelse;
    headers: {
        'X-Brukerdialog-Git-Sha': string;
    };
    path?: never;
    query?: never;
    url: '/ettersending/innsending';
};

export type InnsendingEttersendelseErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type InnsendingEttersendelseError = InnsendingEttersendelseErrors[keyof InnsendingEttersendelseErrors];

export type InnsendingEttersendelseResponses = {
    /**
     * Accepted
     */
    202: unknown;
};

export type SlettVedleggData = {
    body?: never;
    path: {
        vedleggId: string;
    };
    query?: never;
    url: '/vedlegg/{vedleggId}';
};

export type SlettVedleggErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type SlettVedleggError = SlettVedleggErrors[keyof SlettVedleggErrors];

export type SlettVedleggResponses = {
    /**
     * No Content
     */
    204: void;
};

export type SlettVedleggResponse = SlettVedleggResponses[keyof SlettVedleggResponses];

export type HentVedleggData = {
    body?: never;
    path: {
        vedleggId: string;
    };
    query?: never;
    url: '/vedlegg/{vedleggId}';
};

export type HentVedleggErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentVedleggError = HentVedleggErrors[keyof HentVedleggErrors];

export type HentVedleggResponses = {
    /**
     * OK
     */
    200: string;
};

export type HentVedleggResponse = HentVedleggResponses[keyof HentVedleggResponses];

export type HentSøkerData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/oppslag/soker';
};

export type HentSøkerErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentSøkerError = HentSøkerErrors[keyof HentSøkerErrors];

export type HentSøkerResponses = {
    /**
     * OK
     */
    200: Søker;
};

export type HentSøkerResponse = HentSøkerResponses[keyof HentSøkerResponses];

export type HentBarnData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/oppslag/barn';
};

export type HentBarnErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentBarnError = HentBarnErrors[keyof HentBarnErrors];

export type HentBarnResponses = {
    /**
     * OK
     */
    200: BarnOppslagListe;
};

export type HentBarnResponse = HentBarnResponses[keyof HentBarnResponses];

export type HentArbeidsgivereData = {
    body?: never;
    path?: never;
    query: {
        fra_og_med: string;
        til_og_med: string;
        inkluderAlleAnsettelsesperioder?: boolean;
        frilansoppdrag?: boolean;
        private_arbeidsgivere?: boolean;
    };
    url: '/oppslag/arbeidsgiver';
};

export type HentArbeidsgivereErrors = {
    /**
     * Bad Request
     */
    400: ProblemDetail;
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentArbeidsgivereError = HentArbeidsgivereErrors[keyof HentArbeidsgivereErrors];

export type HentArbeidsgivereResponses = {
    /**
     * OK
     */
    200: ArbeidsgivereDto;
};

export type HentArbeidsgivereResponse = HentArbeidsgivereResponses[keyof HentArbeidsgivereResponses];

export type ClientOptions = {
    baseURL: 'https://k9-brukerdialog-prosessering.intern.dev.nav.no' | (string & {});
};