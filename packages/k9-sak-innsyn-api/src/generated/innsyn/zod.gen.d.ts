import { z } from 'zod';
export declare const zProblemDetail: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNumber>;
    detail: z.ZodOptional<z.ZodString>;
    instance: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    properties?: {} | undefined;
}, {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    properties?: {} | undefined;
}>;
export declare const zAdressebeskyttelse: z.ZodObject<{
    gradering: z.ZodEnum<["STRENGT_FORTROLIG_UTLAND", "STRENGT_FORTROLIG", "FORTROLIG", "UGRADERT"]>;
}, "strip", z.ZodTypeAny, {
    gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
}, {
    gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
}>;
export declare const zAnnenAktivitet: z.ZodObject<{
    periode: z.ZodString;
    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
}, "strip", z.ZodTypeAny, {
    periode: string;
    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
}, {
    periode: string;
    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
}>;
export declare const zAnnenForelder: z.ZodObject<{
    norskIdentitetsnummer: z.ZodString;
    situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
    situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
    periode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    norskIdentitetsnummer: string;
    situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
    periode?: string | undefined;
    situasjonBeskrivelse?: string | undefined;
}, {
    norskIdentitetsnummer: string;
    situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
    periode?: string | undefined;
    situasjonBeskrivelse?: string | undefined;
}>;
export declare const zArbeidstidInfo: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
}, {
    perioder: {};
}>;
export declare const zArbeidstaker: z.ZodObject<{
    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
    organisasjonsnummer: z.ZodOptional<z.ZodString>;
    organisasjonsnavn: z.ZodOptional<z.ZodString>;
    arbeidstidInfo: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>;
}, "strip", z.ZodTypeAny, {
    arbeidstidInfo: {
        perioder: {};
    };
    norskIdentitetsnummer?: string | undefined;
    organisasjonsnummer?: string | undefined;
    organisasjonsnavn?: string | undefined;
}, {
    arbeidstidInfo: {
        perioder: {};
    };
    norskIdentitetsnummer?: string | undefined;
    organisasjonsnummer?: string | undefined;
    organisasjonsnavn?: string | undefined;
}>;
export declare const zArbeidstid: z.ZodObject<{
    arbeidstakerList: z.ZodArray<z.ZodObject<{
        norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
        organisasjonsnummer: z.ZodOptional<z.ZodString>;
        organisasjonsnavn: z.ZodOptional<z.ZodString>;
        arbeidstidInfo: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>;
    }, "strip", z.ZodTypeAny, {
        arbeidstidInfo: {
            perioder: {};
        };
        norskIdentitetsnummer?: string | undefined;
        organisasjonsnummer?: string | undefined;
        organisasjonsnavn?: string | undefined;
    }, {
        arbeidstidInfo: {
            perioder: {};
        };
        norskIdentitetsnummer?: string | undefined;
        organisasjonsnummer?: string | undefined;
        organisasjonsnavn?: string | undefined;
    }>, "many">;
    frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>>;
    selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>>;
}, "strip", z.ZodTypeAny, {
    arbeidstakerList: {
        arbeidstidInfo: {
            perioder: {};
        };
        norskIdentitetsnummer?: string | undefined;
        organisasjonsnummer?: string | undefined;
        organisasjonsnavn?: string | undefined;
    }[];
    frilanserArbeidstidInfo?: {
        perioder: {};
    } | undefined;
    selvstendigNæringsdrivendeArbeidstidInfo?: {
        perioder: {};
    } | undefined;
}, {
    arbeidstakerList: {
        arbeidstidInfo: {
            perioder: {};
        };
        norskIdentitetsnummer?: string | undefined;
        organisasjonsnummer?: string | undefined;
        organisasjonsnavn?: string | undefined;
    }[];
    frilanserArbeidstidInfo?: {
        perioder: {};
    } | undefined;
    selvstendigNæringsdrivendeArbeidstidInfo?: {
        perioder: {};
    } | undefined;
}>;
export declare const zArbeidstidPeriodeInfo: z.ZodObject<{
    jobberNormaltTimerPerDag: z.ZodString;
    faktiskArbeidTimerPerDag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    jobberNormaltTimerPerDag: string;
    faktiskArbeidTimerPerDag: string;
}, {
    jobberNormaltTimerPerDag: string;
    faktiskArbeidTimerPerDag: string;
}>;
export declare const zBarn: z.ZodObject<{
    norskIdentitetsnummer: z.ZodString;
    fødselsdato: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    norskIdentitetsnummer: string;
    fødselsdato?: string | undefined;
}, {
    norskIdentitetsnummer: string;
    fødselsdato?: string | undefined;
}>;
export declare const zBarnOppslagDto: z.ZodObject<{
    fødselsdato: z.ZodString;
    fornavn: z.ZodString;
    mellomnavn: z.ZodOptional<z.ZodString>;
    etternavn: z.ZodString;
    aktørId: z.ZodString;
    identitetsnummer: z.ZodOptional<z.ZodString>;
    adressebeskyttelse$k9_sak_innsyn_api: z.ZodArray<z.ZodObject<{
        gradering: z.ZodEnum<["STRENGT_FORTROLIG_UTLAND", "STRENGT_FORTROLIG", "FORTROLIG", "UGRADERT"]>;
    }, "strip", z.ZodTypeAny, {
        gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
    }, {
        gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    fødselsdato: string;
    fornavn: string;
    etternavn: string;
    aktørId: string;
    adressebeskyttelse$k9_sak_innsyn_api: {
        gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
    }[];
    mellomnavn?: string | undefined;
    identitetsnummer?: string | undefined;
}, {
    fødselsdato: string;
    fornavn: string;
    etternavn: string;
    aktørId: string;
    adressebeskyttelse$k9_sak_innsyn_api: {
        gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
    }[];
    mellomnavn?: string | undefined;
    identitetsnummer?: string | undefined;
}>;
export declare const zBegrunnelseForInnsending: z.ZodObject<{
    tekst: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tekst?: string | undefined;
}, {
    tekst?: string | undefined;
}>;
export declare const zBeredskap: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
    perioderSomSkalSlettes?: {} | undefined;
}, {
    perioder: {};
    perioderSomSkalSlettes?: {} | undefined;
}>;
export declare const zBeredskapPeriodeInfo: z.ZodObject<{
    tilleggsinformasjon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tilleggsinformasjon: string;
}, {
    tilleggsinformasjon: string;
}>;
export declare const zBostedPeriodeInfo: z.ZodObject<{
    land: z.ZodString;
}, "strip", z.ZodTypeAny, {
    land: string;
}, {
    land: string;
}>;
export declare const zBosteder: z.ZodObject<{
    perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    perioder?: {} | undefined;
    perioderSomSkalSlettes?: {} | undefined;
}, {
    perioder?: {} | undefined;
    perioderSomSkalSlettes?: {} | undefined;
}>;
export declare const zDataBruktTilUtledning: z.ZodObject<{
    harForståttRettigheterOgPlikter: z.ZodBoolean;
    harBekreftetOpplysninger: z.ZodBoolean;
    soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
    annetData: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    soknadDialogCommitSha?: string | undefined;
    annetData?: string | undefined;
}, {
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    soknadDialogCommitSha?: string | undefined;
    annetData?: string | undefined;
}>;
export declare const zDelvisFravær: z.ZodObject<{
    normalarbeidstid: z.ZodString;
    fravær: z.ZodString;
}, "strip", z.ZodTypeAny, {
    normalarbeidstid: string;
    fravær: string;
}, {
    normalarbeidstid: string;
    fravær: string;
}>;
export declare const zFraværPeriode: z.ZodObject<{
    periode: z.ZodString;
    duration: z.ZodOptional<z.ZodString>;
    delvisFravær: z.ZodOptional<z.ZodObject<{
        normalarbeidstid: z.ZodString;
        fravær: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        normalarbeidstid: string;
        fravær: string;
    }, {
        normalarbeidstid: string;
        fravær: string;
    }>>;
    årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
    søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
    aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
    organisasjonsnummer: z.ZodOptional<z.ZodString>;
    arbeidsforholdId: z.ZodOptional<z.ZodString>;
    arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    periode: string;
    årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
    aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
    organisasjonsnummer?: string | undefined;
    duration?: string | undefined;
    delvisFravær?: {
        normalarbeidstid: string;
        fravær: string;
    } | undefined;
    søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
    arbeidsforholdId?: string | undefined;
    arbeidsgiverOrgNr?: string | undefined;
}, {
    periode: string;
    årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
    aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
    organisasjonsnummer?: string | undefined;
    duration?: string | undefined;
    delvisFravær?: {
        normalarbeidstid: string;
        fravær: string;
    } | undefined;
    søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
    arbeidsforholdId?: string | undefined;
    arbeidsgiverOrgNr?: string | undefined;
}>;
export declare const zFrilanser: z.ZodObject<{
    startdato: z.ZodString;
    sluttdato: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startdato: string;
    sluttdato?: string | undefined;
}, {
    startdato: string;
    sluttdato?: string | undefined;
}>;
export declare const zInfoFraPunsj: z.ZodObject<{
    søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
    inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
    inneholderMedisinskeOpplysninger?: boolean | undefined;
}, {
    søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
    inneholderMedisinskeOpplysninger?: boolean | undefined;
}>;
export declare const zJournalpost: z.ZodObject<{
    inneholderInfomasjonSomIkkeKanPunsjes: z.ZodBoolean;
    inneholderInformasjonSomIkkeKanPunsjes: z.ZodBoolean;
    inneholderMedisinskeOpplysninger: z.ZodBoolean;
    journalpostId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    inneholderMedisinskeOpplysninger: boolean;
    inneholderInfomasjonSomIkkeKanPunsjes: boolean;
    inneholderInformasjonSomIkkeKanPunsjes: boolean;
    journalpostId: string;
}, {
    inneholderMedisinskeOpplysninger: boolean;
    inneholderInfomasjonSomIkkeKanPunsjes: boolean;
    inneholderInformasjonSomIkkeKanPunsjes: boolean;
    journalpostId: string;
}>;
export declare const zKursholder: z.ZodObject<{
    navn: z.ZodOptional<z.ZodString>;
    institusjonsidentifikator: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    navn?: string | undefined;
    institusjonsidentifikator?: string | undefined;
}, {
    navn?: string | undefined;
    institusjonsidentifikator?: string | undefined;
}>;
export declare const zReise: z.ZodObject<{
    reiserUtenforKursdager: z.ZodBoolean;
    reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reiserUtenforKursdager: boolean;
    reisedager?: string[] | undefined;
    reisedagerBeskrivelse?: string | undefined;
}, {
    reiserUtenforKursdager: boolean;
    reisedager?: string[] | undefined;
    reisedagerBeskrivelse?: string | undefined;
}>;
export declare const zKurs: z.ZodObject<{
    kursholder: z.ZodObject<{
        navn: z.ZodOptional<z.ZodString>;
        institusjonsidentifikator: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        navn?: string | undefined;
        institusjonsidentifikator?: string | undefined;
    }, {
        navn?: string | undefined;
        institusjonsidentifikator?: string | undefined;
    }>;
    kursperioder: z.ZodArray<z.ZodString, "many">;
    reise: z.ZodObject<{
        reiserUtenforKursdager: z.ZodBoolean;
        reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reiserUtenforKursdager: boolean;
        reisedager?: string[] | undefined;
        reisedagerBeskrivelse?: string | undefined;
    }, {
        reiserUtenforKursdager: boolean;
        reisedager?: string[] | undefined;
        reisedagerBeskrivelse?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    kursholder: {
        navn?: string | undefined;
        institusjonsidentifikator?: string | undefined;
    };
    kursperioder: string[];
    reise: {
        reiserUtenforKursdager: boolean;
        reisedager?: string[] | undefined;
        reisedagerBeskrivelse?: string | undefined;
    };
}, {
    kursholder: {
        navn?: string | undefined;
        institusjonsidentifikator?: string | undefined;
    };
    kursperioder: string[];
    reise: {
        reiserUtenforKursdager: boolean;
        reisedager?: string[] | undefined;
        reisedagerBeskrivelse?: string | undefined;
    };
}>;
export declare const zLovbestemtFerie: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
}, {
    perioder: {};
}>;
export declare const zLovbestemtFeriePeriodeInfo: z.ZodObject<{
    skalHaFerie: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    skalHaFerie?: boolean | undefined;
}, {
    skalHaFerie?: boolean | undefined;
}>;
export declare const zNattevåk: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
    perioderSomSkalSlettes: {};
}, {
    perioder: {};
    perioderSomSkalSlettes: {};
}>;
export declare const zNattevåkPeriodeInfo: z.ZodObject<{
    tilleggsinformasjon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tilleggsinformasjon: string;
}, {
    tilleggsinformasjon: string;
}>;
export declare const zOmsorg: z.ZodObject<{
    relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
    beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
    beskrivelseAvOmsorgsrollen?: string | undefined;
}, {
    relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
    beskrivelseAvOmsorgsrollen?: string | undefined;
}>;
export declare const zYtelse: z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>;
export declare const zOmsorgspengerAleneOmsorg: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"OmsorgspengerAleneOmsorg">;
}, "strip", z.ZodTypeAny, {
    type: "OmsorgspengerAleneOmsorg";
}, {
    type: "OmsorgspengerAleneOmsorg";
}>>, z.ZodObject<{
    barn: z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }>;
    periode: z.ZodString;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    periode: string;
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
}, {
    periode: string;
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
}>>;
export declare const zOmsorgspengerKroniskSyktBarn: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"OmsorgspengerKroniskSyktBarn">;
}, "strip", z.ZodTypeAny, {
    type: "OmsorgspengerKroniskSyktBarn";
}, {
    type: "OmsorgspengerKroniskSyktBarn";
}>>, z.ZodObject<{
    barn: z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }>;
    kroniskEllerFunksjonshemming: z.ZodBoolean;
    høyereRisikoForFravær: z.ZodOptional<z.ZodBoolean>;
    høyereRisikoForFraværBeskrivelse: z.ZodOptional<z.ZodString>;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    kroniskEllerFunksjonshemming: boolean;
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    høyereRisikoForFravær?: boolean | undefined;
    høyereRisikoForFraværBeskrivelse?: string | undefined;
}, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    kroniskEllerFunksjonshemming: boolean;
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    høyereRisikoForFravær?: boolean | undefined;
    høyereRisikoForFraværBeskrivelse?: string | undefined;
}>>;
export declare const zOmsorgspengerMidlertidigAlene: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"OmsorgspengerMidlertidigAlene">;
}, "strip", z.ZodTypeAny, {
    type: "OmsorgspengerMidlertidigAlene";
}, {
    type: "OmsorgspengerMidlertidigAlene";
}>>, z.ZodObject<{
    barn: z.ZodArray<z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }>, "many">;
    annenForelder: z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
        situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
        periode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
        periode?: string | undefined;
        situasjonBeskrivelse?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
        periode?: string | undefined;
        situasjonBeskrivelse?: string | undefined;
    }>;
    begrunnelse: z.ZodOptional<z.ZodString>;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }[];
    annenForelder: {
        norskIdentitetsnummer: string;
        situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
        periode?: string | undefined;
        situasjonBeskrivelse?: string | undefined;
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    begrunnelse?: string | undefined;
}, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }[];
    annenForelder: {
        norskIdentitetsnummer: string;
        situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
        periode?: string | undefined;
        situasjonBeskrivelse?: string | undefined;
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    begrunnelse?: string | undefined;
}>>;
export declare const zSelvstendigNæringsdrivende: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    organisasjonsnummer: z.ZodOptional<z.ZodString>;
    virksomhetNavn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
    organisasjonsnummer?: string | undefined;
    virksomhetNavn?: string | undefined;
}, {
    perioder: {};
    organisasjonsnummer?: string | undefined;
    virksomhetNavn?: string | undefined;
}>;
export declare const zUtenlandskArbeidsforhold: z.ZodObject<{
    ansettelsePeriode: z.ZodString;
    land: z.ZodString;
    arbeidsgiversnavn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    land: string;
    ansettelsePeriode: string;
    arbeidsgiversnavn: string;
}, {
    land: string;
    ansettelsePeriode: string;
    arbeidsgiversnavn: string;
}>;
export declare const zOpptjeningAktivitet: z.ZodObject<{
    selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        organisasjonsnummer: z.ZodOptional<z.ZodString>;
        virksomhetNavn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
        organisasjonsnummer?: string | undefined;
        virksomhetNavn?: string | undefined;
    }, {
        perioder: {};
        organisasjonsnummer?: string | undefined;
        virksomhetNavn?: string | undefined;
    }>, "many">;
    frilanser: z.ZodOptional<z.ZodObject<{
        startdato: z.ZodString;
        sluttdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        startdato: string;
        sluttdato?: string | undefined;
    }, {
        startdato: string;
        sluttdato?: string | undefined;
    }>>;
    utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
        ansettelsePeriode: z.ZodString;
        land: z.ZodString;
        arbeidsgiversnavn: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        land: string;
        ansettelsePeriode: string;
        arbeidsgiversnavn: string;
    }, {
        land: string;
        ansettelsePeriode: string;
        arbeidsgiversnavn: string;
    }>, "many">;
    andreAktiviteter: z.ZodArray<z.ZodObject<{
        periode: z.ZodString;
        annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
    }, "strip", z.ZodTypeAny, {
        periode: string;
        annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
    }, {
        periode: string;
        annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    selvstendigNæringsdrivende: {
        perioder: {};
        organisasjonsnummer?: string | undefined;
        virksomhetNavn?: string | undefined;
    }[];
    utenlandskeArbeidsforhold: {
        land: string;
        ansettelsePeriode: string;
        arbeidsgiversnavn: string;
    }[];
    andreAktiviteter: {
        periode: string;
        annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
    }[];
    frilanser?: {
        startdato: string;
        sluttdato?: string | undefined;
    } | undefined;
}, {
    selvstendigNæringsdrivende: {
        perioder: {};
        organisasjonsnummer?: string | undefined;
        virksomhetNavn?: string | undefined;
    }[];
    utenlandskeArbeidsforhold: {
        land: string;
        ansettelsePeriode: string;
        arbeidsgiversnavn: string;
    }[];
    andreAktiviteter: {
        periode: string;
        annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
    }[];
    frilanser?: {
        startdato: string;
        sluttdato?: string | undefined;
    } | undefined;
}>;
export declare const zUtenlandsopphold: z.ZodObject<{
    perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    perioder?: {} | undefined;
    perioderSomSkalSlettes?: {} | undefined;
}, {
    perioder?: {} | undefined;
    perioderSomSkalSlettes?: {} | undefined;
}>;
export declare const zOmsorgspengerUtbetaling: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"OmsorgspengerUtbetaling">;
}, "strip", z.ZodTypeAny, {
    type: "OmsorgspengerUtbetaling";
}, {
    type: "OmsorgspengerUtbetaling";
}>>, z.ZodObject<{
    fosterbarn: z.ZodOptional<z.ZodArray<z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }>, "many">>;
    aktivitet: z.ZodOptional<z.ZodObject<{
        selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            virksomhetNavn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }>, "many">;
        frilanser: z.ZodOptional<z.ZodObject<{
            startdato: z.ZodString;
            sluttdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            startdato: string;
            sluttdato?: string | undefined;
        }, {
            startdato: string;
            sluttdato?: string | undefined;
        }>>;
        utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
            ansettelsePeriode: z.ZodString;
            land: z.ZodString;
            arbeidsgiversnavn: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }>, "many">;
        andreAktiviteter: z.ZodArray<z.ZodObject<{
            periode: z.ZodString;
            annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }>>;
    fraværsperioder: z.ZodOptional<z.ZodArray<z.ZodObject<{
        periode: z.ZodString;
        duration: z.ZodOptional<z.ZodString>;
        delvisFravær: z.ZodOptional<z.ZodObject<{
            normalarbeidstid: z.ZodString;
            fravær: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            normalarbeidstid: string;
            fravær: string;
        }, {
            normalarbeidstid: string;
            fravær: string;
        }>>;
        årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
        søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
        aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
        organisasjonsnummer: z.ZodOptional<z.ZodString>;
        arbeidsforholdId: z.ZodOptional<z.ZodString>;
        arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }, {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }>, "many">>;
    fraværsperioderKorrigeringIm: z.ZodOptional<z.ZodArray<z.ZodObject<{
        periode: z.ZodString;
        duration: z.ZodOptional<z.ZodString>;
        delvisFravær: z.ZodOptional<z.ZodObject<{
            normalarbeidstid: z.ZodString;
            fravær: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            normalarbeidstid: string;
            fravær: string;
        }, {
            normalarbeidstid: string;
            fravær: string;
        }>>;
        årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
        søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
        aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
        organisasjonsnummer: z.ZodOptional<z.ZodString>;
        arbeidsforholdId: z.ZodOptional<z.ZodString>;
        arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }, {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }>, "many">>;
    bosteder: z.ZodOptional<z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>>;
    utenlandsopphold: z.ZodOptional<z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>>;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    fosterbarn?: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }[] | undefined;
    aktivitet?: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    } | undefined;
    fraværsperioder?: {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }[] | undefined;
    fraværsperioderKorrigeringIm?: {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }[] | undefined;
    bosteder?: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    } | undefined;
    utenlandsopphold?: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    } | undefined;
}, {
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    fosterbarn?: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }[] | undefined;
    aktivitet?: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    } | undefined;
    fraværsperioder?: {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }[] | undefined;
    fraværsperioderKorrigeringIm?: {
        periode: string;
        årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
        aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
        organisasjonsnummer?: string | undefined;
        duration?: string | undefined;
        delvisFravær?: {
            normalarbeidstid: string;
            fravær: string;
        } | undefined;
        søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
        arbeidsforholdId?: string | undefined;
        arbeidsgiverOrgNr?: string | undefined;
    }[] | undefined;
    bosteder?: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    } | undefined;
    utenlandsopphold?: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    } | undefined;
}>>;
export declare const zOppgittInntektForPeriode: z.ZodObject<{
    arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
    næringsinntekt: z.ZodOptional<z.ZodNumber>;
    ytelse: z.ZodOptional<z.ZodNumber>;
    periode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    periode: string;
    arbeidstakerOgFrilansInntekt?: number | undefined;
    næringsinntekt?: number | undefined;
    ytelse?: number | undefined;
}, {
    periode: string;
    arbeidstakerOgFrilansInntekt?: number | undefined;
    næringsinntekt?: number | undefined;
    ytelse?: number | undefined;
}>;
export declare const zOppgittInntekt: z.ZodObject<{
    oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
        arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
        næringsinntekt: z.ZodOptional<z.ZodNumber>;
        ytelse: z.ZodOptional<z.ZodNumber>;
        periode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        periode: string;
        arbeidstakerOgFrilansInntekt?: number | undefined;
        næringsinntekt?: number | undefined;
        ytelse?: number | undefined;
    }, {
        periode: string;
        arbeidstakerOgFrilansInntekt?: number | undefined;
        næringsinntekt?: number | undefined;
        ytelse?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    oppgittePeriodeinntekter: {
        periode: string;
        arbeidstakerOgFrilansInntekt?: number | undefined;
        næringsinntekt?: number | undefined;
        ytelse?: number | undefined;
    }[];
}, {
    oppgittePeriodeinntekter: {
        periode: string;
        arbeidstakerOgFrilansInntekt?: number | undefined;
        næringsinntekt?: number | undefined;
        ytelse?: number | undefined;
    }[];
}>;
export declare const zUttak: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
}, {
    perioder: {};
}>;
export declare const zOpplæringspenger: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"Opplæringspenger">;
}, "strip", z.ZodTypeAny, {
    type: "Opplæringspenger";
}, {
    type: "Opplæringspenger";
}>>, z.ZodObject<{
    barn: z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }>;
    søknadsperiode: z.ZodArray<z.ZodString, "many">;
    trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
    opptjeningAktivitet: z.ZodObject<{
        selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            virksomhetNavn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }>, "many">;
        frilanser: z.ZodOptional<z.ZodObject<{
            startdato: z.ZodString;
            sluttdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            startdato: string;
            sluttdato?: string | undefined;
        }, {
            startdato: string;
            sluttdato?: string | undefined;
        }>>;
        utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
            ansettelsePeriode: z.ZodString;
            land: z.ZodString;
            arbeidsgiversnavn: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }>, "many">;
        andreAktiviteter: z.ZodArray<z.ZodObject<{
            periode: z.ZodString;
            annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }>;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
    bosteder: z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    utenlandsopphold: z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    lovbestemtFerie: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>;
    arbeidstid: z.ZodObject<{
        arbeidstakerList: z.ZodArray<z.ZodObject<{
            norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            organisasjonsnavn: z.ZodOptional<z.ZodString>;
            arbeidstidInfo: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
        }, "strip", z.ZodTypeAny, {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }, {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }>, "many">;
        frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
        selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
    }, "strip", z.ZodTypeAny, {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    }, {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    }>;
    uttak: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>;
    omsorg: z.ZodObject<{
        relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
        beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    }, {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    }>;
    kurs: z.ZodObject<{
        kursholder: z.ZodObject<{
            navn: z.ZodOptional<z.ZodString>;
            institusjonsidentifikator: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            navn?: string | undefined;
            institusjonsidentifikator?: string | undefined;
        }, {
            navn?: string | undefined;
            institusjonsidentifikator?: string | undefined;
        }>;
        kursperioder: z.ZodArray<z.ZodString, "many">;
        reise: z.ZodObject<{
            reiserUtenforKursdager: z.ZodBoolean;
            reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            reiserUtenforKursdager: boolean;
            reisedager?: string[] | undefined;
            reisedagerBeskrivelse?: string | undefined;
        }, {
            reiserUtenforKursdager: boolean;
            reisedager?: string[] | undefined;
            reisedagerBeskrivelse?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        kursholder: {
            navn?: string | undefined;
            institusjonsidentifikator?: string | undefined;
        };
        kursperioder: string[];
        reise: {
            reiserUtenforKursdager: boolean;
            reisedager?: string[] | undefined;
            reisedagerBeskrivelse?: string | undefined;
        };
    }, {
        kursholder: {
            navn?: string | undefined;
            institusjonsidentifikator?: string | undefined;
        };
        kursperioder: string[];
        reise: {
            reiserUtenforKursdager: boolean;
            reisedager?: string[] | undefined;
            reisedagerBeskrivelse?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    bosteder: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    utenlandsopphold: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    søknadsperiode: string[];
    trekkKravPerioder: string[];
    opptjeningAktivitet: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    };
    lovbestemtFerie: {
        perioder: {};
    };
    arbeidstid: {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    };
    uttak: {
        perioder: {};
    };
    omsorg: {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    };
    kurs: {
        kursholder: {
            navn?: string | undefined;
            institusjonsidentifikator?: string | undefined;
        };
        kursperioder: string[];
        reise: {
            reiserUtenforKursdager: boolean;
            reisedager?: string[] | undefined;
            reisedagerBeskrivelse?: string | undefined;
        };
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
}, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    bosteder: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    utenlandsopphold: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    søknadsperiode: string[];
    trekkKravPerioder: string[];
    opptjeningAktivitet: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    };
    lovbestemtFerie: {
        perioder: {};
    };
    arbeidstid: {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    };
    uttak: {
        perioder: {};
    };
    omsorg: {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    };
    kurs: {
        kursholder: {
            navn?: string | undefined;
            institusjonsidentifikator?: string | undefined;
        };
        kursperioder: string[];
        reise: {
            reiserUtenforKursdager: boolean;
            reisedager?: string[] | undefined;
            reisedagerBeskrivelse?: string | undefined;
        };
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
}>>;
export declare const zTilsynsordning: z.ZodObject<{
    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    perioder: {};
}, {
    perioder: {};
}>;
export declare const zPleiepengerSyktBarn: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PleiepengerSyktBarn">;
}, "strip", z.ZodTypeAny, {
    type: "PleiepengerSyktBarn";
}, {
    type: "PleiepengerSyktBarn";
}>>, z.ZodObject<{
    barn: z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    }>;
    søknadsperiode: z.ZodArray<z.ZodString, "many">;
    endringsperiode: z.ZodArray<z.ZodString, "many">;
    trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
    opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
        selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            virksomhetNavn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }>, "many">;
        frilanser: z.ZodOptional<z.ZodObject<{
            startdato: z.ZodString;
            sluttdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            startdato: string;
            sluttdato?: string | undefined;
        }, {
            startdato: string;
            sluttdato?: string | undefined;
        }>>;
        utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
            ansettelsePeriode: z.ZodString;
            land: z.ZodString;
            arbeidsgiversnavn: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }>, "many">;
        andreAktiviteter: z.ZodArray<z.ZodObject<{
            periode: z.ZodString;
            annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }>>;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
    annetDataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
    infoFraPunsj: z.ZodOptional<z.ZodObject<{
        søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
        inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
        inneholderMedisinskeOpplysninger?: boolean | undefined;
    }, {
        søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
        inneholderMedisinskeOpplysninger?: boolean | undefined;
    }>>;
    bosteder: z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    utenlandsopphold: z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    beredskap: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder: {};
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    nattevåk: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
        perioderSomSkalSlettes: {};
    }, {
        perioder: {};
        perioderSomSkalSlettes: {};
    }>;
    tilsynsordning: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>;
    lovbestemtFerie: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>;
    arbeidstid: z.ZodObject<{
        arbeidstakerList: z.ZodArray<z.ZodObject<{
            norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            organisasjonsnavn: z.ZodOptional<z.ZodString>;
            arbeidstidInfo: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
        }, "strip", z.ZodTypeAny, {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }, {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }>, "many">;
        frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
        selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
    }, "strip", z.ZodTypeAny, {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    }, {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    }>;
    uttak: z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>;
    omsorg: z.ZodObject<{
        relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
        beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    }, {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    }>;
    erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    bosteder: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    utenlandsopphold: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    søknadsperiode: string[];
    trekkKravPerioder: string[];
    lovbestemtFerie: {
        perioder: {};
    };
    arbeidstid: {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    };
    uttak: {
        perioder: {};
    };
    omsorg: {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    };
    endringsperiode: string[];
    beredskap: {
        perioder: {};
        perioderSomSkalSlettes?: {} | undefined;
    };
    nattevåk: {
        perioder: {};
        perioderSomSkalSlettes: {};
    };
    tilsynsordning: {
        perioder: {};
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    opptjeningAktivitet?: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    } | undefined;
    annetDataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    infoFraPunsj?: {
        søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
        inneholderMedisinskeOpplysninger?: boolean | undefined;
    } | undefined;
    erSammenMedBarnet?: boolean | undefined;
}, {
    barn: {
        norskIdentitetsnummer: string;
        fødselsdato?: string | undefined;
    };
    bosteder: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    utenlandsopphold: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    søknadsperiode: string[];
    trekkKravPerioder: string[];
    lovbestemtFerie: {
        perioder: {};
    };
    arbeidstid: {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    };
    uttak: {
        perioder: {};
    };
    omsorg: {
        relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
        beskrivelseAvOmsorgsrollen?: string | undefined;
    };
    endringsperiode: string[];
    beredskap: {
        perioder: {};
        perioderSomSkalSlettes?: {} | undefined;
    };
    nattevåk: {
        perioder: {};
        perioderSomSkalSlettes: {};
    };
    tilsynsordning: {
        perioder: {};
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    opptjeningAktivitet?: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    } | undefined;
    annetDataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    infoFraPunsj?: {
        søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
        inneholderMedisinskeOpplysninger?: boolean | undefined;
    } | undefined;
    erSammenMedBarnet?: boolean | undefined;
}>>;
export declare const zPleietrengende: z.ZodObject<{
    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
    fødselsdato: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    norskIdentitetsnummer?: string | undefined;
    fødselsdato?: string | undefined;
}, {
    norskIdentitetsnummer?: string | undefined;
    fødselsdato?: string | undefined;
}>;
export declare const zPleipengerLivetsSluttfase: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PleipengerLivetsSluttfase">;
}, "strip", z.ZodTypeAny, {
    type: "PleipengerLivetsSluttfase";
}, {
    type: "PleipengerLivetsSluttfase";
}>>, z.ZodObject<{
    pleietrengende: z.ZodObject<{
        norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
        fødselsdato: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer?: string | undefined;
        fødselsdato?: string | undefined;
    }, {
        norskIdentitetsnummer?: string | undefined;
        fødselsdato?: string | undefined;
    }>;
    søknadsperiode: z.ZodArray<z.ZodString, "many">;
    trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
    opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
        selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            virksomhetNavn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }, {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }>, "many">;
        frilanser: z.ZodOptional<z.ZodObject<{
            startdato: z.ZodString;
            sluttdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            startdato: string;
            sluttdato?: string | undefined;
        }, {
            startdato: string;
            sluttdato?: string | undefined;
        }>>;
        utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
            ansettelsePeriode: z.ZodString;
            land: z.ZodString;
            arbeidsgiversnavn: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }, {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }>, "many">;
        andreAktiviteter: z.ZodArray<z.ZodObject<{
            periode: z.ZodString;
            annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }, {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }, {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    }>>;
    bosteder: z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    utenlandsopphold: z.ZodObject<{
        perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }, {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    }>;
    arbeidstid: z.ZodObject<{
        arbeidstakerList: z.ZodArray<z.ZodObject<{
            norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            organisasjonsnavn: z.ZodOptional<z.ZodString>;
            arbeidstidInfo: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
        }, "strip", z.ZodTypeAny, {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }, {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }>, "many">;
        frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
        selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
    }, "strip", z.ZodTypeAny, {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    }, {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    }>;
    uttak: z.ZodOptional<z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>>;
    lovbestemtFerie: z.ZodOptional<z.ZodObject<{
        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        perioder: {};
    }, {
        perioder: {};
    }>>;
    dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
        harForståttRettigheterOgPlikter: z.ZodBoolean;
        harBekreftetOpplysninger: z.ZodBoolean;
        soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
        annetData: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }, {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    bosteder: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    utenlandsopphold: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    søknadsperiode: string[];
    trekkKravPerioder: string[];
    arbeidstid: {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    };
    pleietrengende: {
        norskIdentitetsnummer?: string | undefined;
        fødselsdato?: string | undefined;
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    opptjeningAktivitet?: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    } | undefined;
    lovbestemtFerie?: {
        perioder: {};
    } | undefined;
    uttak?: {
        perioder: {};
    } | undefined;
}, {
    bosteder: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    utenlandsopphold: {
        perioder?: {} | undefined;
        perioderSomSkalSlettes?: {} | undefined;
    };
    søknadsperiode: string[];
    trekkKravPerioder: string[];
    arbeidstid: {
        arbeidstakerList: {
            arbeidstidInfo: {
                perioder: {};
            };
            norskIdentitetsnummer?: string | undefined;
            organisasjonsnummer?: string | undefined;
            organisasjonsnavn?: string | undefined;
        }[];
        frilanserArbeidstidInfo?: {
            perioder: {};
        } | undefined;
        selvstendigNæringsdrivendeArbeidstidInfo?: {
            perioder: {};
        } | undefined;
    };
    pleietrengende: {
        norskIdentitetsnummer?: string | undefined;
        fødselsdato?: string | undefined;
    };
    dataBruktTilUtledning?: {
        harForståttRettigheterOgPlikter: boolean;
        harBekreftetOpplysninger: boolean;
        soknadDialogCommitSha?: string | undefined;
        annetData?: string | undefined;
    } | undefined;
    opptjeningAktivitet?: {
        selvstendigNæringsdrivende: {
            perioder: {};
            organisasjonsnummer?: string | undefined;
            virksomhetNavn?: string | undefined;
        }[];
        utenlandskeArbeidsforhold: {
            land: string;
            ansettelsePeriode: string;
            arbeidsgiversnavn: string;
        }[];
        andreAktiviteter: {
            periode: string;
            annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
        }[];
        frilanser?: {
            startdato: string;
            sluttdato?: string | undefined;
        } | undefined;
    } | undefined;
    lovbestemtFerie?: {
        perioder: {};
    } | undefined;
    uttak?: {
        perioder: {};
    } | undefined;
}>>;
export declare const zSelvstendigNæringsdrivendePeriodeInfo: z.ZodObject<{
    virksomhetstyper: z.ZodArray<z.ZodEnum<["DAGMAMMA", "FISKE", "JORDBRUK_SKOGBRUK", "ANNEN", "-"]>, "many">;
    regnskapsførerNavn: z.ZodOptional<z.ZodString>;
    regnskapsførerTlf: z.ZodOptional<z.ZodString>;
    erVarigEndring: z.ZodOptional<z.ZodBoolean>;
    erNyIArbeidslivet: z.ZodOptional<z.ZodBoolean>;
    endringDato: z.ZodOptional<z.ZodString>;
    endringBegrunnelse: z.ZodOptional<z.ZodString>;
    bruttoInntekt: z.ZodOptional<z.ZodNumber>;
    erNyoppstartet: z.ZodOptional<z.ZodBoolean>;
    registrertIUtlandet: z.ZodOptional<z.ZodBoolean>;
    landkode: z.ZodOptional<z.ZodString>;
    erFiskerPåBladB: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    virksomhetstyper: ("-" | "DAGMAMMA" | "FISKE" | "JORDBRUK_SKOGBRUK" | "ANNEN")[];
    regnskapsførerNavn?: string | undefined;
    regnskapsførerTlf?: string | undefined;
    erVarigEndring?: boolean | undefined;
    erNyIArbeidslivet?: boolean | undefined;
    endringDato?: string | undefined;
    endringBegrunnelse?: string | undefined;
    bruttoInntekt?: number | undefined;
    erNyoppstartet?: boolean | undefined;
    registrertIUtlandet?: boolean | undefined;
    landkode?: string | undefined;
    erFiskerPåBladB?: boolean | undefined;
}, {
    virksomhetstyper: ("-" | "DAGMAMMA" | "FISKE" | "JORDBRUK_SKOGBRUK" | "ANNEN")[];
    regnskapsførerNavn?: string | undefined;
    regnskapsførerTlf?: string | undefined;
    erVarigEndring?: boolean | undefined;
    erNyIArbeidslivet?: boolean | undefined;
    endringDato?: string | undefined;
    endringBegrunnelse?: string | undefined;
    bruttoInntekt?: number | undefined;
    erNyoppstartet?: boolean | undefined;
    registrertIUtlandet?: boolean | undefined;
    landkode?: string | undefined;
    erFiskerPåBladB?: boolean | undefined;
}>;
export declare const zSøker: z.ZodObject<{
    norskIdentitetsnummer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    norskIdentitetsnummer: string;
}, {
    norskIdentitetsnummer: string;
}>;
export declare const zUngdomsytelse: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"Ungdomsytelse">;
}, "strip", z.ZodTypeAny, {
    type: "Ungdomsytelse";
}, {
    type: "Ungdomsytelse";
}>>, z.ZodObject<{
    søknadType: z.ZodEnum<["DELTAKELSE_SØKNAD", "RAPPORTERING_SØKNAD"]>;
    søktFraDatoer: z.ZodArray<z.ZodString, "many">;
    inntekter: z.ZodOptional<z.ZodObject<{
        oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
            arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
            næringsinntekt: z.ZodOptional<z.ZodNumber>;
            ytelse: z.ZodOptional<z.ZodNumber>;
            periode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            arbeidstakerOgFrilansInntekt?: number | undefined;
            næringsinntekt?: number | undefined;
            ytelse?: number | undefined;
        }, {
            periode: string;
            arbeidstakerOgFrilansInntekt?: number | undefined;
            næringsinntekt?: number | undefined;
            ytelse?: number | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        oppgittePeriodeinntekter: {
            periode: string;
            arbeidstakerOgFrilansInntekt?: number | undefined;
            næringsinntekt?: number | undefined;
            ytelse?: number | undefined;
        }[];
    }, {
        oppgittePeriodeinntekter: {
            periode: string;
            arbeidstakerOgFrilansInntekt?: number | undefined;
            næringsinntekt?: number | undefined;
            ytelse?: number | undefined;
        }[];
    }>>;
    deltakelseId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
    søktFraDatoer: string[];
    inntekter?: {
        oppgittePeriodeinntekter: {
            periode: string;
            arbeidstakerOgFrilansInntekt?: number | undefined;
            næringsinntekt?: number | undefined;
            ytelse?: number | undefined;
        }[];
    } | undefined;
    deltakelseId?: string | undefined;
}, {
    søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
    søktFraDatoer: string[];
    inntekter?: {
        oppgittePeriodeinntekter: {
            periode: string;
            arbeidstakerOgFrilansInntekt?: number | undefined;
            næringsinntekt?: number | undefined;
            ytelse?: number | undefined;
        }[];
    } | undefined;
    deltakelseId?: string | undefined;
}>>;
export declare const zSøknad: z.ZodObject<{
    søknadId: z.ZodString;
    versjon: z.ZodString;
    mottattDato: z.ZodString;
    søker: z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
    }, {
        norskIdentitetsnummer: string;
    }>;
    språk: z.ZodOptional<z.ZodEnum<["nb", "nn"]>>;
    ytelse: z.ZodUnion<[z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OmsorgspengerAleneOmsorg">;
    }, "strip", z.ZodTypeAny, {
        type: "OmsorgspengerAleneOmsorg";
    }, {
        type: "OmsorgspengerAleneOmsorg";
    }>>, z.ZodObject<{
        barn: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }>;
        periode: z.ZodString;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        periode: string;
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }, {
        periode: string;
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OmsorgspengerKroniskSyktBarn">;
    }, "strip", z.ZodTypeAny, {
        type: "OmsorgspengerKroniskSyktBarn";
    }, {
        type: "OmsorgspengerKroniskSyktBarn";
    }>>, z.ZodObject<{
        barn: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }>;
        kroniskEllerFunksjonshemming: z.ZodBoolean;
        høyereRisikoForFravær: z.ZodOptional<z.ZodBoolean>;
        høyereRisikoForFraværBeskrivelse: z.ZodOptional<z.ZodString>;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        kroniskEllerFunksjonshemming: boolean;
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        høyereRisikoForFravær?: boolean | undefined;
        høyereRisikoForFraværBeskrivelse?: string | undefined;
    }, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        kroniskEllerFunksjonshemming: boolean;
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        høyereRisikoForFravær?: boolean | undefined;
        høyereRisikoForFraværBeskrivelse?: string | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OmsorgspengerMidlertidigAlene">;
    }, "strip", z.ZodTypeAny, {
        type: "OmsorgspengerMidlertidigAlene";
    }, {
        type: "OmsorgspengerMidlertidigAlene";
    }>>, z.ZodObject<{
        barn: z.ZodArray<z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }>, "many">;
        annenForelder: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
            situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
            periode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
            periode?: string | undefined;
            situasjonBeskrivelse?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
            periode?: string | undefined;
            situasjonBeskrivelse?: string | undefined;
        }>;
        begrunnelse: z.ZodOptional<z.ZodString>;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[];
        annenForelder: {
            norskIdentitetsnummer: string;
            situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
            periode?: string | undefined;
            situasjonBeskrivelse?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        begrunnelse?: string | undefined;
    }, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[];
        annenForelder: {
            norskIdentitetsnummer: string;
            situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
            periode?: string | undefined;
            situasjonBeskrivelse?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        begrunnelse?: string | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OmsorgspengerUtbetaling">;
    }, "strip", z.ZodTypeAny, {
        type: "OmsorgspengerUtbetaling";
    }, {
        type: "OmsorgspengerUtbetaling";
    }>>, z.ZodObject<{
        fosterbarn: z.ZodOptional<z.ZodArray<z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }>, "many">>;
        aktivitet: z.ZodOptional<z.ZodObject<{
            selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                virksomhetNavn: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }>, "many">;
            frilanser: z.ZodOptional<z.ZodObject<{
                startdato: z.ZodString;
                sluttdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                startdato: string;
                sluttdato?: string | undefined;
            }, {
                startdato: string;
                sluttdato?: string | undefined;
            }>>;
            utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                ansettelsePeriode: z.ZodString;
                land: z.ZodString;
                arbeidsgiversnavn: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }>, "many">;
            andreAktiviteter: z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }>>;
        fraværsperioder: z.ZodOptional<z.ZodArray<z.ZodObject<{
            periode: z.ZodString;
            duration: z.ZodOptional<z.ZodString>;
            delvisFravær: z.ZodOptional<z.ZodObject<{
                normalarbeidstid: z.ZodString;
                fravær: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                normalarbeidstid: string;
                fravær: string;
            }, {
                normalarbeidstid: string;
                fravær: string;
            }>>;
            årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
            søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
            aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            arbeidsforholdId: z.ZodOptional<z.ZodString>;
            arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }, {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }>, "many">>;
        fraværsperioderKorrigeringIm: z.ZodOptional<z.ZodArray<z.ZodObject<{
            periode: z.ZodString;
            duration: z.ZodOptional<z.ZodString>;
            delvisFravær: z.ZodOptional<z.ZodObject<{
                normalarbeidstid: z.ZodString;
                fravær: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                normalarbeidstid: string;
                fravær: string;
            }, {
                normalarbeidstid: string;
                fravær: string;
            }>>;
            årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
            søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
            aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
            organisasjonsnummer: z.ZodOptional<z.ZodString>;
            arbeidsforholdId: z.ZodOptional<z.ZodString>;
            arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }, {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }>, "many">>;
        bosteder: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>>;
        utenlandsopphold: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>>;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        fosterbarn?: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[] | undefined;
        aktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        fraværsperioder?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        fraværsperioderKorrigeringIm?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        bosteder?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
        utenlandsopphold?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
    }, {
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        fosterbarn?: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[] | undefined;
        aktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        fraværsperioder?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        fraværsperioderKorrigeringIm?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        bosteder?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
        utenlandsopphold?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"Opplæringspenger">;
    }, "strip", z.ZodTypeAny, {
        type: "Opplæringspenger";
    }, {
        type: "Opplæringspenger";
    }>>, z.ZodObject<{
        barn: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }>;
        søknadsperiode: z.ZodArray<z.ZodString, "many">;
        trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
        opptjeningAktivitet: z.ZodObject<{
            selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                virksomhetNavn: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }>, "many">;
            frilanser: z.ZodOptional<z.ZodObject<{
                startdato: z.ZodString;
                sluttdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                startdato: string;
                sluttdato?: string | undefined;
            }, {
                startdato: string;
                sluttdato?: string | undefined;
            }>>;
            utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                ansettelsePeriode: z.ZodString;
                land: z.ZodString;
                arbeidsgiversnavn: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }>, "many">;
            andreAktiviteter: z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }>;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
        bosteder: z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        utenlandsopphold: z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        lovbestemtFerie: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>;
        arbeidstid: z.ZodObject<{
            arbeidstakerList: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                organisasjonsnavn: z.ZodOptional<z.ZodString>;
                arbeidstidInfo: z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>;
            }, "strip", z.ZodTypeAny, {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }, {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }>, "many">;
            frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
        }, "strip", z.ZodTypeAny, {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        }, {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        }>;
        uttak: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>;
        omsorg: z.ZodObject<{
            relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
            beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        }, {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        }>;
        kurs: z.ZodObject<{
            kursholder: z.ZodObject<{
                navn: z.ZodOptional<z.ZodString>;
                institusjonsidentifikator: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            }, {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            }>;
            kursperioder: z.ZodArray<z.ZodString, "many">;
            reise: z.ZodObject<{
                reiserUtenforKursdager: z.ZodBoolean;
                reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            }, {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            kursholder: {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            };
            kursperioder: string[];
            reise: {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            };
        }, {
            kursholder: {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            };
            kursperioder: string[];
            reise: {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        opptjeningAktivitet: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        };
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        kurs: {
            kursholder: {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            };
            kursperioder: string[];
            reise: {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            };
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        opptjeningAktivitet: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        };
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        kurs: {
            kursholder: {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            };
            kursperioder: string[];
            reise: {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            };
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PleiepengerSyktBarn">;
    }, "strip", z.ZodTypeAny, {
        type: "PleiepengerSyktBarn";
    }, {
        type: "PleiepengerSyktBarn";
    }>>, z.ZodObject<{
        barn: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }>;
        søknadsperiode: z.ZodArray<z.ZodString, "many">;
        endringsperiode: z.ZodArray<z.ZodString, "many">;
        trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
        opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
            selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                virksomhetNavn: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }>, "many">;
            frilanser: z.ZodOptional<z.ZodObject<{
                startdato: z.ZodString;
                sluttdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                startdato: string;
                sluttdato?: string | undefined;
            }, {
                startdato: string;
                sluttdato?: string | undefined;
            }>>;
            utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                ansettelsePeriode: z.ZodString;
                land: z.ZodString;
                arbeidsgiversnavn: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }>, "many">;
            andreAktiviteter: z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }>>;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
        annetDataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
        infoFraPunsj: z.ZodOptional<z.ZodObject<{
            søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
            inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
            inneholderMedisinskeOpplysninger?: boolean | undefined;
        }, {
            søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
            inneholderMedisinskeOpplysninger?: boolean | undefined;
        }>>;
        bosteder: z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        utenlandsopphold: z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        beredskap: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder: {};
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        nattevåk: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
            perioderSomSkalSlettes: {};
        }, {
            perioder: {};
            perioderSomSkalSlettes: {};
        }>;
        tilsynsordning: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>;
        lovbestemtFerie: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>;
        arbeidstid: z.ZodObject<{
            arbeidstakerList: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                organisasjonsnavn: z.ZodOptional<z.ZodString>;
                arbeidstidInfo: z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>;
            }, "strip", z.ZodTypeAny, {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }, {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }>, "many">;
            frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
        }, "strip", z.ZodTypeAny, {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        }, {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        }>;
        uttak: z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>;
        omsorg: z.ZodObject<{
            relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
            beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        }, {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        }>;
        erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        endringsperiode: string[];
        beredskap: {
            perioder: {};
            perioderSomSkalSlettes?: {} | undefined;
        };
        nattevåk: {
            perioder: {};
            perioderSomSkalSlettes: {};
        };
        tilsynsordning: {
            perioder: {};
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        annetDataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        infoFraPunsj?: {
            søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
            inneholderMedisinskeOpplysninger?: boolean | undefined;
        } | undefined;
        erSammenMedBarnet?: boolean | undefined;
    }, {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        endringsperiode: string[];
        beredskap: {
            perioder: {};
            perioderSomSkalSlettes?: {} | undefined;
        };
        nattevåk: {
            perioder: {};
            perioderSomSkalSlettes: {};
        };
        tilsynsordning: {
            perioder: {};
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        annetDataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        infoFraPunsj?: {
            søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
            inneholderMedisinskeOpplysninger?: boolean | undefined;
        } | undefined;
        erSammenMedBarnet?: boolean | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PleipengerLivetsSluttfase">;
    }, "strip", z.ZodTypeAny, {
        type: "PleipengerLivetsSluttfase";
    }, {
        type: "PleipengerLivetsSluttfase";
    }>>, z.ZodObject<{
        pleietrengende: z.ZodObject<{
            norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
            fødselsdato: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer?: string | undefined;
            fødselsdato?: string | undefined;
        }, {
            norskIdentitetsnummer?: string | undefined;
            fødselsdato?: string | undefined;
        }>;
        søknadsperiode: z.ZodArray<z.ZodString, "many">;
        trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
        opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
            selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                virksomhetNavn: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }, {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }>, "many">;
            frilanser: z.ZodOptional<z.ZodObject<{
                startdato: z.ZodString;
                sluttdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                startdato: string;
                sluttdato?: string | undefined;
            }, {
                startdato: string;
                sluttdato?: string | undefined;
            }>>;
            utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                ansettelsePeriode: z.ZodString;
                land: z.ZodString;
                arbeidsgiversnavn: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }, {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }>, "many">;
            andreAktiviteter: z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }, {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }, {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        }>>;
        bosteder: z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        utenlandsopphold: z.ZodObject<{
            perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }, {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        }>;
        arbeidstid: z.ZodObject<{
            arbeidstakerList: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                organisasjonsnavn: z.ZodOptional<z.ZodString>;
                arbeidstidInfo: z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>;
            }, "strip", z.ZodTypeAny, {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }, {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }>, "many">;
            frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
        }, "strip", z.ZodTypeAny, {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        }, {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        }>;
        uttak: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
        lovbestemtFerie: z.ZodOptional<z.ZodObject<{
            perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        }, "strip", z.ZodTypeAny, {
            perioder: {};
        }, {
            perioder: {};
        }>>;
        dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
            harForståttRettigheterOgPlikter: z.ZodBoolean;
            harBekreftetOpplysninger: z.ZodBoolean;
            soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
            annetData: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }, {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        pleietrengende: {
            norskIdentitetsnummer?: string | undefined;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        lovbestemtFerie?: {
            perioder: {};
        } | undefined;
        uttak?: {
            perioder: {};
        } | undefined;
    }, {
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        pleietrengende: {
            norskIdentitetsnummer?: string | undefined;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        lovbestemtFerie?: {
            perioder: {};
        } | undefined;
        uttak?: {
            perioder: {};
        } | undefined;
    }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"Ungdomsytelse">;
    }, "strip", z.ZodTypeAny, {
        type: "Ungdomsytelse";
    }, {
        type: "Ungdomsytelse";
    }>>, z.ZodObject<{
        søknadType: z.ZodEnum<["DELTAKELSE_SØKNAD", "RAPPORTERING_SØKNAD"]>;
        søktFraDatoer: z.ZodArray<z.ZodString, "many">;
        inntekter: z.ZodOptional<z.ZodObject<{
            oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
                arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
                næringsinntekt: z.ZodOptional<z.ZodNumber>;
                ytelse: z.ZodOptional<z.ZodNumber>;
                periode: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }, {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            oppgittePeriodeinntekter: {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }[];
        }, {
            oppgittePeriodeinntekter: {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }[];
        }>>;
        deltakelseId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
        søktFraDatoer: string[];
        inntekter?: {
            oppgittePeriodeinntekter: {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }[];
        } | undefined;
        deltakelseId?: string | undefined;
    }, {
        søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
        søktFraDatoer: string[];
        inntekter?: {
            oppgittePeriodeinntekter: {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }[];
        } | undefined;
        deltakelseId?: string | undefined;
    }>>]>;
    journalposter: z.ZodOptional<z.ZodArray<z.ZodObject<{
        inneholderInfomasjonSomIkkeKanPunsjes: z.ZodBoolean;
        inneholderInformasjonSomIkkeKanPunsjes: z.ZodBoolean;
        inneholderMedisinskeOpplysninger: z.ZodBoolean;
        journalpostId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        inneholderMedisinskeOpplysninger: boolean;
        inneholderInfomasjonSomIkkeKanPunsjes: boolean;
        inneholderInformasjonSomIkkeKanPunsjes: boolean;
        journalpostId: string;
    }, {
        inneholderMedisinskeOpplysninger: boolean;
        inneholderInfomasjonSomIkkeKanPunsjes: boolean;
        inneholderInformasjonSomIkkeKanPunsjes: boolean;
        journalpostId: string;
    }>, "many">>;
    begrunnelseForInnsending: z.ZodOptional<z.ZodObject<{
        tekst: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tekst?: string | undefined;
    }, {
        tekst?: string | undefined;
    }>>;
    kildesystem: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ytelse: ({
        type: string;
    } & {
        type: "OmsorgspengerAleneOmsorg";
    } & {
        periode: string;
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "OmsorgspengerKroniskSyktBarn";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        kroniskEllerFunksjonshemming: boolean;
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        høyereRisikoForFravær?: boolean | undefined;
        høyereRisikoForFraværBeskrivelse?: string | undefined;
    }) | ({
        type: string;
    } & {
        type: "OmsorgspengerMidlertidigAlene";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[];
        annenForelder: {
            norskIdentitetsnummer: string;
            situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
            periode?: string | undefined;
            situasjonBeskrivelse?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        begrunnelse?: string | undefined;
    }) | ({
        type: string;
    } & {
        type: "OmsorgspengerUtbetaling";
    } & {
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        fosterbarn?: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[] | undefined;
        aktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        fraværsperioder?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        fraværsperioderKorrigeringIm?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        bosteder?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
        utenlandsopphold?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "Opplæringspenger";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        opptjeningAktivitet: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        };
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        kurs: {
            kursholder: {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            };
            kursperioder: string[];
            reise: {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            };
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "PleiepengerSyktBarn";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        endringsperiode: string[];
        beredskap: {
            perioder: {};
            perioderSomSkalSlettes?: {} | undefined;
        };
        nattevåk: {
            perioder: {};
            perioderSomSkalSlettes: {};
        };
        tilsynsordning: {
            perioder: {};
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        annetDataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        infoFraPunsj?: {
            søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
            inneholderMedisinskeOpplysninger?: boolean | undefined;
        } | undefined;
        erSammenMedBarnet?: boolean | undefined;
    }) | ({
        type: string;
    } & {
        type: "PleipengerLivetsSluttfase";
    } & {
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        pleietrengende: {
            norskIdentitetsnummer?: string | undefined;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        lovbestemtFerie?: {
            perioder: {};
        } | undefined;
        uttak?: {
            perioder: {};
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "Ungdomsytelse";
    } & {
        søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
        søktFraDatoer: string[];
        inntekter?: {
            oppgittePeriodeinntekter: {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }[];
        } | undefined;
        deltakelseId?: string | undefined;
    });
    søknadId: string;
    versjon: string;
    mottattDato: string;
    søker: {
        norskIdentitetsnummer: string;
    };
    språk?: "nb" | "nn" | undefined;
    journalposter?: {
        inneholderMedisinskeOpplysninger: boolean;
        inneholderInfomasjonSomIkkeKanPunsjes: boolean;
        inneholderInformasjonSomIkkeKanPunsjes: boolean;
        journalpostId: string;
    }[] | undefined;
    begrunnelseForInnsending?: {
        tekst?: string | undefined;
    } | undefined;
    kildesystem?: string | undefined;
}, {
    ytelse: ({
        type: string;
    } & {
        type: "OmsorgspengerAleneOmsorg";
    } & {
        periode: string;
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "OmsorgspengerKroniskSyktBarn";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        kroniskEllerFunksjonshemming: boolean;
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        høyereRisikoForFravær?: boolean | undefined;
        høyereRisikoForFraværBeskrivelse?: string | undefined;
    }) | ({
        type: string;
    } & {
        type: "OmsorgspengerMidlertidigAlene";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[];
        annenForelder: {
            norskIdentitetsnummer: string;
            situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
            periode?: string | undefined;
            situasjonBeskrivelse?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        begrunnelse?: string | undefined;
    }) | ({
        type: string;
    } & {
        type: "OmsorgspengerUtbetaling";
    } & {
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        fosterbarn?: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        }[] | undefined;
        aktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        fraværsperioder?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        fraværsperioderKorrigeringIm?: {
            periode: string;
            årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
            aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
            organisasjonsnummer?: string | undefined;
            duration?: string | undefined;
            delvisFravær?: {
                normalarbeidstid: string;
                fravær: string;
            } | undefined;
            søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
            arbeidsforholdId?: string | undefined;
            arbeidsgiverOrgNr?: string | undefined;
        }[] | undefined;
        bosteder?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
        utenlandsopphold?: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "Opplæringspenger";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        opptjeningAktivitet: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        };
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        kurs: {
            kursholder: {
                navn?: string | undefined;
                institusjonsidentifikator?: string | undefined;
            };
            kursperioder: string[];
            reise: {
                reiserUtenforKursdager: boolean;
                reisedager?: string[] | undefined;
                reisedagerBeskrivelse?: string | undefined;
            };
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "PleiepengerSyktBarn";
    } & {
        barn: {
            norskIdentitetsnummer: string;
            fødselsdato?: string | undefined;
        };
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        lovbestemtFerie: {
            perioder: {};
        };
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        uttak: {
            perioder: {};
        };
        omsorg: {
            relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
            beskrivelseAvOmsorgsrollen?: string | undefined;
        };
        endringsperiode: string[];
        beredskap: {
            perioder: {};
            perioderSomSkalSlettes?: {} | undefined;
        };
        nattevåk: {
            perioder: {};
            perioderSomSkalSlettes: {};
        };
        tilsynsordning: {
            perioder: {};
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        annetDataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        infoFraPunsj?: {
            søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
            inneholderMedisinskeOpplysninger?: boolean | undefined;
        } | undefined;
        erSammenMedBarnet?: boolean | undefined;
    }) | ({
        type: string;
    } & {
        type: "PleipengerLivetsSluttfase";
    } & {
        bosteder: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        utenlandsopphold: {
            perioder?: {} | undefined;
            perioderSomSkalSlettes?: {} | undefined;
        };
        søknadsperiode: string[];
        trekkKravPerioder: string[];
        arbeidstid: {
            arbeidstakerList: {
                arbeidstidInfo: {
                    perioder: {};
                };
                norskIdentitetsnummer?: string | undefined;
                organisasjonsnummer?: string | undefined;
                organisasjonsnavn?: string | undefined;
            }[];
            frilanserArbeidstidInfo?: {
                perioder: {};
            } | undefined;
            selvstendigNæringsdrivendeArbeidstidInfo?: {
                perioder: {};
            } | undefined;
        };
        pleietrengende: {
            norskIdentitetsnummer?: string | undefined;
            fødselsdato?: string | undefined;
        };
        dataBruktTilUtledning?: {
            harForståttRettigheterOgPlikter: boolean;
            harBekreftetOpplysninger: boolean;
            soknadDialogCommitSha?: string | undefined;
            annetData?: string | undefined;
        } | undefined;
        opptjeningAktivitet?: {
            selvstendigNæringsdrivende: {
                perioder: {};
                organisasjonsnummer?: string | undefined;
                virksomhetNavn?: string | undefined;
            }[];
            utenlandskeArbeidsforhold: {
                land: string;
                ansettelsePeriode: string;
                arbeidsgiversnavn: string;
            }[];
            andreAktiviteter: {
                periode: string;
                annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
            }[];
            frilanser?: {
                startdato: string;
                sluttdato?: string | undefined;
            } | undefined;
        } | undefined;
        lovbestemtFerie?: {
            perioder: {};
        } | undefined;
        uttak?: {
            perioder: {};
        } | undefined;
    }) | ({
        type: string;
    } & {
        type: "Ungdomsytelse";
    } & {
        søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
        søktFraDatoer: string[];
        inntekter?: {
            oppgittePeriodeinntekter: {
                periode: string;
                arbeidstakerOgFrilansInntekt?: number | undefined;
                næringsinntekt?: number | undefined;
                ytelse?: number | undefined;
            }[];
        } | undefined;
        deltakelseId?: string | undefined;
    });
    søknadId: string;
    versjon: string;
    mottattDato: string;
    søker: {
        norskIdentitetsnummer: string;
    };
    språk?: "nb" | "nn" | undefined;
    journalposter?: {
        inneholderMedisinskeOpplysninger: boolean;
        inneholderInfomasjonSomIkkeKanPunsjes: boolean;
        inneholderInformasjonSomIkkeKanPunsjes: boolean;
        journalpostId: string;
    }[] | undefined;
    begrunnelseForInnsending?: {
        tekst?: string | undefined;
    } | undefined;
    kildesystem?: string | undefined;
}>;
export declare const zSøknadDto: z.ZodObject<{
    barn: z.ZodObject<{
        fødselsdato: z.ZodString;
        fornavn: z.ZodString;
        mellomnavn: z.ZodOptional<z.ZodString>;
        etternavn: z.ZodString;
        aktørId: z.ZodString;
        identitetsnummer: z.ZodOptional<z.ZodString>;
        adressebeskyttelse$k9_sak_innsyn_api: z.ZodArray<z.ZodObject<{
            gradering: z.ZodEnum<["STRENGT_FORTROLIG_UTLAND", "STRENGT_FORTROLIG", "FORTROLIG", "UGRADERT"]>;
        }, "strip", z.ZodTypeAny, {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }, {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    }, {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    }>;
    søknad: z.ZodObject<{
        søknadId: z.ZodString;
        versjon: z.ZodString;
        mottattDato: z.ZodString;
        søker: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
        }, {
            norskIdentitetsnummer: string;
        }>;
        språk: z.ZodOptional<z.ZodEnum<["nb", "nn"]>>;
        ytelse: z.ZodUnion<[z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerAleneOmsorg">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerAleneOmsorg";
        }, {
            type: "OmsorgspengerAleneOmsorg";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            periode: z.ZodString;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerKroniskSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerKroniskSyktBarn";
        }, {
            type: "OmsorgspengerKroniskSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            kroniskEllerFunksjonshemming: z.ZodBoolean;
            høyereRisikoForFravær: z.ZodOptional<z.ZodBoolean>;
            høyereRisikoForFraværBeskrivelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerMidlertidigAlene">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerMidlertidigAlene";
        }, {
            type: "OmsorgspengerMidlertidigAlene";
        }>>, z.ZodObject<{
            barn: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">;
            annenForelder: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
                situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
                periode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }>;
            begrunnelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerUtbetaling">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerUtbetaling";
        }, {
            type: "OmsorgspengerUtbetaling";
        }>>, z.ZodObject<{
            fosterbarn: z.ZodOptional<z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">>;
            aktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            fraværsperioder: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            fraværsperioderKorrigeringIm: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            bosteder: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            utenlandsopphold: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Opplæringspenger">;
        }, "strip", z.ZodTypeAny, {
            type: "Opplæringspenger";
        }, {
            type: "Opplæringspenger";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            kurs: z.ZodObject<{
                kursholder: z.ZodObject<{
                    navn: z.ZodOptional<z.ZodString>;
                    institusjonsidentifikator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }>;
                kursperioder: z.ZodArray<z.ZodString, "many">;
                reise: z.ZodObject<{
                    reiserUtenforKursdager: z.ZodBoolean;
                    reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleiepengerSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "PleiepengerSyktBarn";
        }, {
            type: "PleiepengerSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            endringsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            annetDataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            infoFraPunsj: z.ZodOptional<z.ZodObject<{
                søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
                inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            beredskap: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            nattevåk: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }>;
            tilsynsordning: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleipengerLivetsSluttfase">;
        }, "strip", z.ZodTypeAny, {
            type: "PleipengerLivetsSluttfase";
        }, {
            type: "PleipengerLivetsSluttfase";
        }>>, z.ZodObject<{
            pleietrengende: z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            lovbestemtFerie: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Ungdomsytelse">;
        }, "strip", z.ZodTypeAny, {
            type: "Ungdomsytelse";
        }, {
            type: "Ungdomsytelse";
        }>>, z.ZodObject<{
            søknadType: z.ZodEnum<["DELTAKELSE_SØKNAD", "RAPPORTERING_SØKNAD"]>;
            søktFraDatoer: z.ZodArray<z.ZodString, "many">;
            inntekter: z.ZodOptional<z.ZodObject<{
                oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
                    arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
                    næringsinntekt: z.ZodOptional<z.ZodNumber>;
                    ytelse: z.ZodOptional<z.ZodNumber>;
                    periode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }>>;
            deltakelseId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }>>]>;
        journalposter: z.ZodOptional<z.ZodArray<z.ZodObject<{
            inneholderInfomasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderInformasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderMedisinskeOpplysninger: z.ZodBoolean;
            journalpostId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }>, "many">>;
        begrunnelseForInnsending: z.ZodOptional<z.ZodObject<{
            tekst: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tekst?: string | undefined;
        }, {
            tekst?: string | undefined;
        }>>;
        kildesystem: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }>;
    søknader: z.ZodOptional<z.ZodArray<z.ZodObject<{
        søknadId: z.ZodString;
        versjon: z.ZodString;
        mottattDato: z.ZodString;
        søker: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
        }, {
            norskIdentitetsnummer: string;
        }>;
        språk: z.ZodOptional<z.ZodEnum<["nb", "nn"]>>;
        ytelse: z.ZodUnion<[z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerAleneOmsorg">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerAleneOmsorg";
        }, {
            type: "OmsorgspengerAleneOmsorg";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            periode: z.ZodString;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerKroniskSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerKroniskSyktBarn";
        }, {
            type: "OmsorgspengerKroniskSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            kroniskEllerFunksjonshemming: z.ZodBoolean;
            høyereRisikoForFravær: z.ZodOptional<z.ZodBoolean>;
            høyereRisikoForFraværBeskrivelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerMidlertidigAlene">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerMidlertidigAlene";
        }, {
            type: "OmsorgspengerMidlertidigAlene";
        }>>, z.ZodObject<{
            barn: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">;
            annenForelder: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
                situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
                periode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }>;
            begrunnelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerUtbetaling">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerUtbetaling";
        }, {
            type: "OmsorgspengerUtbetaling";
        }>>, z.ZodObject<{
            fosterbarn: z.ZodOptional<z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">>;
            aktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            fraværsperioder: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            fraværsperioderKorrigeringIm: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            bosteder: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            utenlandsopphold: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Opplæringspenger">;
        }, "strip", z.ZodTypeAny, {
            type: "Opplæringspenger";
        }, {
            type: "Opplæringspenger";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            kurs: z.ZodObject<{
                kursholder: z.ZodObject<{
                    navn: z.ZodOptional<z.ZodString>;
                    institusjonsidentifikator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }>;
                kursperioder: z.ZodArray<z.ZodString, "many">;
                reise: z.ZodObject<{
                    reiserUtenforKursdager: z.ZodBoolean;
                    reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleiepengerSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "PleiepengerSyktBarn";
        }, {
            type: "PleiepengerSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            endringsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            annetDataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            infoFraPunsj: z.ZodOptional<z.ZodObject<{
                søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
                inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            beredskap: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            nattevåk: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }>;
            tilsynsordning: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleipengerLivetsSluttfase">;
        }, "strip", z.ZodTypeAny, {
            type: "PleipengerLivetsSluttfase";
        }, {
            type: "PleipengerLivetsSluttfase";
        }>>, z.ZodObject<{
            pleietrengende: z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            lovbestemtFerie: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Ungdomsytelse">;
        }, "strip", z.ZodTypeAny, {
            type: "Ungdomsytelse";
        }, {
            type: "Ungdomsytelse";
        }>>, z.ZodObject<{
            søknadType: z.ZodEnum<["DELTAKELSE_SØKNAD", "RAPPORTERING_SØKNAD"]>;
            søktFraDatoer: z.ZodArray<z.ZodString, "many">;
            inntekter: z.ZodOptional<z.ZodObject<{
                oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
                    arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
                    næringsinntekt: z.ZodOptional<z.ZodNumber>;
                    ytelse: z.ZodOptional<z.ZodNumber>;
                    periode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }>>;
            deltakelseId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }>>]>;
        journalposter: z.ZodOptional<z.ZodArray<z.ZodObject<{
            inneholderInfomasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderInformasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderMedisinskeOpplysninger: z.ZodBoolean;
            journalpostId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }>, "many">>;
        begrunnelseForInnsending: z.ZodOptional<z.ZodObject<{
            tekst: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tekst?: string | undefined;
        }, {
            tekst?: string | undefined;
        }>>;
        kildesystem: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    barn: {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    };
    søknad: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    };
    søknader?: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }[] | undefined;
}, {
    barn: {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    };
    søknad: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    };
    søknader?: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }[] | undefined;
}>;
export declare const zTilsynPeriodeInfo: z.ZodObject<{
    etablertTilsynTimerPerDag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    etablertTilsynTimerPerDag: string;
}, {
    etablertTilsynTimerPerDag: string;
}>;
export declare const zUtenlandsoppholdPeriodeInfo: z.ZodObject<{
    land: z.ZodString;
    årsak: z.ZodOptional<z.ZodEnum<["barnetInnlagtIHelseinstitusjonForNorskOffentligRegning", "barnetInnlagtIHelseinstitusjonDekketEtterAvtaleMedEtAnnetLandOmTrygd"]>>;
    erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    land: string;
    årsak?: "barnetInnlagtIHelseinstitusjonForNorskOffentligRegning" | "barnetInnlagtIHelseinstitusjonDekketEtterAvtaleMedEtAnnetLandOmTrygd" | undefined;
    erSammenMedBarnet?: boolean | undefined;
}, {
    land: string;
    årsak?: "barnetInnlagtIHelseinstitusjonForNorskOffentligRegning" | "barnetInnlagtIHelseinstitusjonDekketEtterAvtaleMedEtAnnetLandOmTrygd" | undefined;
    erSammenMedBarnet?: boolean | undefined;
}>;
export declare const zUttakPeriodeInfo: z.ZodObject<{
    timerPleieAvBarnetPerDag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    timerPleieAvBarnetPerDag: string;
}, {
    timerPleieAvBarnetPerDag: string;
}>;
export declare const zAksjonspunktDto: z.ZodObject<{
    venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
    tidsfrist: z.ZodString;
}, "strip", z.ZodTypeAny, {
    venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
    tidsfrist: string;
}, {
    venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
    tidsfrist: string;
}>;
export declare const zInnsending: z.ZodObject<{
    mottattDato: z.ZodOptional<z.ZodString>;
    versjon: z.ZodOptional<z.ZodString>;
    søker: z.ZodOptional<z.ZodObject<{
        norskIdentitetsnummer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        norskIdentitetsnummer: string;
    }, {
        norskIdentitetsnummer: string;
    }>>;
    søknadId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    søknadId?: string | undefined;
    versjon?: string | undefined;
    mottattDato?: string | undefined;
    søker?: {
        norskIdentitetsnummer: string;
    } | undefined;
}, {
    søknadId?: string | undefined;
    versjon?: string | undefined;
    mottattDato?: string | undefined;
    søker?: {
        norskIdentitetsnummer: string;
    } | undefined;
}>;
export declare const zRelevantDatoDto: z.ZodObject<{
    dato: z.ZodString;
    datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
}, "strip", z.ZodTypeAny, {
    dato: string;
    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
}, {
    dato: string;
    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
}>;
export declare const zDokumentDto: z.ZodObject<{
    journalpostId: z.ZodString;
    dokumentInfoId: z.ZodString;
    saksnummer: z.ZodOptional<z.ZodString>;
    tittel: z.ZodString;
    dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
    filtype: z.ZodString;
    harTilgang: z.ZodBoolean;
    url: z.ZodString;
    relevanteDatoer: z.ZodArray<z.ZodObject<{
        dato: z.ZodString;
        datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
    }, "strip", z.ZodTypeAny, {
        dato: string;
        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
    }, {
        dato: string;
        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    url: string;
    journalpostId: string;
    dokumentInfoId: string;
    tittel: string;
    filtype: string;
    harTilgang: boolean;
    relevanteDatoer: {
        dato: string;
        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
    }[];
    saksnummer?: string | undefined;
    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
}, {
    url: string;
    journalpostId: string;
    dokumentInfoId: string;
    tittel: string;
    filtype: string;
    harTilgang: boolean;
    relevanteDatoer: {
        dato: string;
        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
    }[];
    saksnummer?: string | undefined;
    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
}>;
export declare const zOrganisasjon: z.ZodObject<{
    organisasjonsnummer: z.ZodString;
    navn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    organisasjonsnummer: string;
    navn?: string | undefined;
}, {
    organisasjonsnummer: string;
    navn?: string | undefined;
}>;
export declare const zInnsendelserISakDto: z.ZodObject<{
    søknadId: z.ZodString;
    mottattTidspunkt: z.ZodString;
    innsendelsestype: z.ZodEnum<["SØKNAD", "ETTERSENDELSE", "ENDRINGSMELDING", "UKJENT"]>;
    k9FormatInnsendelse: z.ZodOptional<z.ZodObject<{
        mottattDato: z.ZodOptional<z.ZodString>;
        versjon: z.ZodOptional<z.ZodString>;
        søker: z.ZodOptional<z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
        }, {
            norskIdentitetsnummer: string;
        }>>;
        søknadId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        søknadId?: string | undefined;
        versjon?: string | undefined;
        mottattDato?: string | undefined;
        søker?: {
            norskIdentitetsnummer: string;
        } | undefined;
    }, {
        søknadId?: string | undefined;
        versjon?: string | undefined;
        mottattDato?: string | undefined;
        søker?: {
            norskIdentitetsnummer: string;
        } | undefined;
    }>>;
    dokumenter: z.ZodArray<z.ZodObject<{
        journalpostId: z.ZodString;
        dokumentInfoId: z.ZodString;
        saksnummer: z.ZodOptional<z.ZodString>;
        tittel: z.ZodString;
        dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
        filtype: z.ZodString;
        harTilgang: z.ZodBoolean;
        url: z.ZodString;
        relevanteDatoer: z.ZodArray<z.ZodObject<{
            dato: z.ZodString;
            datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
        }, "strip", z.ZodTypeAny, {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }, {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }, {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }>, "many">;
    arbeidsgivere: z.ZodOptional<z.ZodArray<z.ZodObject<{
        organisasjonsnummer: z.ZodString;
        navn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        organisasjonsnummer: string;
        navn?: string | undefined;
    }, {
        organisasjonsnummer: string;
        navn?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    søknadId: string;
    mottattTidspunkt: string;
    innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
    dokumenter: {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }[];
    k9FormatInnsendelse?: {
        søknadId?: string | undefined;
        versjon?: string | undefined;
        mottattDato?: string | undefined;
        søker?: {
            norskIdentitetsnummer: string;
        } | undefined;
    } | undefined;
    arbeidsgivere?: {
        organisasjonsnummer: string;
        navn?: string | undefined;
    }[] | undefined;
}, {
    søknadId: string;
    mottattTidspunkt: string;
    innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
    dokumenter: {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }[];
    k9FormatInnsendelse?: {
        søknadId?: string | undefined;
        versjon?: string | undefined;
        mottattDato?: string | undefined;
        søker?: {
            norskIdentitetsnummer: string;
        } | undefined;
    } | undefined;
    arbeidsgivere?: {
        organisasjonsnummer: string;
        navn?: string | undefined;
    }[] | undefined;
}>;
export declare const zBehandlingDto: z.ZodObject<{
    status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
    opprettetTidspunkt: z.ZodString;
    avsluttetTidspunkt: z.ZodOptional<z.ZodString>;
    innsendelser: z.ZodArray<z.ZodObject<{
        søknadId: z.ZodString;
        mottattTidspunkt: z.ZodString;
        innsendelsestype: z.ZodEnum<["SØKNAD", "ETTERSENDELSE", "ENDRINGSMELDING", "UKJENT"]>;
        k9FormatInnsendelse: z.ZodOptional<z.ZodObject<{
            mottattDato: z.ZodOptional<z.ZodString>;
            versjon: z.ZodOptional<z.ZodString>;
            søker: z.ZodOptional<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
            }, {
                norskIdentitetsnummer: string;
            }>>;
            søknadId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            søknadId?: string | undefined;
            versjon?: string | undefined;
            mottattDato?: string | undefined;
            søker?: {
                norskIdentitetsnummer: string;
            } | undefined;
        }, {
            søknadId?: string | undefined;
            versjon?: string | undefined;
            mottattDato?: string | undefined;
            søker?: {
                norskIdentitetsnummer: string;
            } | undefined;
        }>>;
        dokumenter: z.ZodArray<z.ZodObject<{
            journalpostId: z.ZodString;
            dokumentInfoId: z.ZodString;
            saksnummer: z.ZodOptional<z.ZodString>;
            tittel: z.ZodString;
            dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
            filtype: z.ZodString;
            harTilgang: z.ZodBoolean;
            url: z.ZodString;
            relevanteDatoer: z.ZodArray<z.ZodObject<{
                dato: z.ZodString;
                datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
            }, "strip", z.ZodTypeAny, {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }, {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }, {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }>, "many">;
        arbeidsgivere: z.ZodOptional<z.ZodArray<z.ZodObject<{
            organisasjonsnummer: z.ZodString;
            navn: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            organisasjonsnummer: string;
            navn?: string | undefined;
        }, {
            organisasjonsnummer: string;
            navn?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        søknadId: string;
        mottattTidspunkt: string;
        innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
        dokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        k9FormatInnsendelse?: {
            søknadId?: string | undefined;
            versjon?: string | undefined;
            mottattDato?: string | undefined;
            søker?: {
                norskIdentitetsnummer: string;
            } | undefined;
        } | undefined;
        arbeidsgivere?: {
            organisasjonsnummer: string;
            navn?: string | undefined;
        }[] | undefined;
    }, {
        søknadId: string;
        mottattTidspunkt: string;
        innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
        dokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        k9FormatInnsendelse?: {
            søknadId?: string | undefined;
            versjon?: string | undefined;
            mottattDato?: string | undefined;
            søker?: {
                norskIdentitetsnummer: string;
            } | undefined;
        } | undefined;
        arbeidsgivere?: {
            organisasjonsnummer: string;
            navn?: string | undefined;
        }[] | undefined;
    }>, "many">;
    aksjonspunkter: z.ZodArray<z.ZodObject<{
        venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
        tidsfrist: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }, {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }>, "many">;
    utgåendeDokumenter: z.ZodArray<z.ZodObject<{
        journalpostId: z.ZodString;
        dokumentInfoId: z.ZodString;
        saksnummer: z.ZodOptional<z.ZodString>;
        tittel: z.ZodString;
        dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
        filtype: z.ZodString;
        harTilgang: z.ZodBoolean;
        url: z.ZodString;
        relevanteDatoer: z.ZodArray<z.ZodObject<{
            dato: z.ZodString;
            datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
        }, "strip", z.ZodTypeAny, {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }, {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }, {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
    opprettetTidspunkt: string;
    innsendelser: {
        søknadId: string;
        mottattTidspunkt: string;
        innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
        dokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        k9FormatInnsendelse?: {
            søknadId?: string | undefined;
            versjon?: string | undefined;
            mottattDato?: string | undefined;
            søker?: {
                norskIdentitetsnummer: string;
            } | undefined;
        } | undefined;
        arbeidsgivere?: {
            organisasjonsnummer: string;
            navn?: string | undefined;
        }[] | undefined;
    }[];
    aksjonspunkter: {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }[];
    utgåendeDokumenter: {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }[];
    avsluttetTidspunkt?: string | undefined;
}, {
    status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
    opprettetTidspunkt: string;
    innsendelser: {
        søknadId: string;
        mottattTidspunkt: string;
        innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
        dokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        k9FormatInnsendelse?: {
            søknadId?: string | undefined;
            versjon?: string | undefined;
            mottattDato?: string | undefined;
            søker?: {
                norskIdentitetsnummer: string;
            } | undefined;
        } | undefined;
        arbeidsgivere?: {
            organisasjonsnummer: string;
            navn?: string | undefined;
        }[] | undefined;
    }[];
    aksjonspunkter: {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }[];
    utgåendeDokumenter: {
        url: string;
        journalpostId: string;
        dokumentInfoId: string;
        tittel: string;
        filtype: string;
        harTilgang: boolean;
        relevanteDatoer: {
            dato: string;
            datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
        }[];
        saksnummer?: string | undefined;
        dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
    }[];
    avsluttetTidspunkt?: string | undefined;
}>;
export declare const zPleietrengendeDto: z.ZodObject<{
    identitetsnummer: z.ZodString;
    fødselsdato: z.ZodString;
    aktørId: z.ZodString;
    fornavn: z.ZodOptional<z.ZodString>;
    mellomnavn: z.ZodOptional<z.ZodString>;
    etternavn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fødselsdato: string;
    aktørId: string;
    identitetsnummer: string;
    fornavn?: string | undefined;
    mellomnavn?: string | undefined;
    etternavn?: string | undefined;
}, {
    fødselsdato: string;
    aktørId: string;
    identitetsnummer: string;
    fornavn?: string | undefined;
    mellomnavn?: string | undefined;
    etternavn?: string | undefined;
}>;
export declare const zUtledetStatus: z.ZodObject<{
    status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
    aksjonspunkter: z.ZodArray<z.ZodObject<{
        venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
        tidsfrist: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }, {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }>, "many">;
    saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
    aksjonspunkter: {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }[];
    saksbehandlingsFrist?: string | undefined;
}, {
    status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
    aksjonspunkter: {
        venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
        tidsfrist: string;
    }[];
    saksbehandlingsFrist?: string | undefined;
}>;
export declare const zSakDto: z.ZodObject<{
    saksnummer: z.ZodString;
    utledetStatus: z.ZodObject<{
        status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
        aksjonspunkter: z.ZodArray<z.ZodObject<{
            venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
            tidsfrist: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }, {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }>, "many">;
        saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        saksbehandlingsFrist?: string | undefined;
    }, {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        saksbehandlingsFrist?: string | undefined;
    }>;
    saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
    fagsakYtelseType: z.ZodEnum<["DAGPENGER", "FRISINN", "SYKEPENGER", "PLEIEPENGER_SYKT_BARN", "PLEIEPENGER_NÆRSTÅENDE", "OMSORGSPENGER", "OMSORGSPENGER_KS", "OMSORGSPENGER_MA", "OMSORGSPENGER_AO", "OPPLÆRINGSPENGER", "ARBEIDSAVKLARINGSPENGER", "ENGANGSTØNAD", "FORELDREPENGER", "SVANGERSKAPSPENGER", "ENSLIG_FORSØRGER", "OBSOLETE", "UDEFINERT"]>;
    ytelseType: z.ZodEnum<["PSB", "PPN", "OMP_KS", "OMP_MA", "OMP_AO", "OLP"]>;
    behandlinger: z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
        opprettetTidspunkt: z.ZodString;
        avsluttetTidspunkt: z.ZodOptional<z.ZodString>;
        innsendelser: z.ZodArray<z.ZodObject<{
            søknadId: z.ZodString;
            mottattTidspunkt: z.ZodString;
            innsendelsestype: z.ZodEnum<["SØKNAD", "ETTERSENDELSE", "ENDRINGSMELDING", "UKJENT"]>;
            k9FormatInnsendelse: z.ZodOptional<z.ZodObject<{
                mottattDato: z.ZodOptional<z.ZodString>;
                versjon: z.ZodOptional<z.ZodString>;
                søker: z.ZodOptional<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    norskIdentitetsnummer: string;
                }, {
                    norskIdentitetsnummer: string;
                }>>;
                søknadId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            }, {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            }>>;
            dokumenter: z.ZodArray<z.ZodObject<{
                journalpostId: z.ZodString;
                dokumentInfoId: z.ZodString;
                saksnummer: z.ZodOptional<z.ZodString>;
                tittel: z.ZodString;
                dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
                filtype: z.ZodString;
                harTilgang: z.ZodBoolean;
                url: z.ZodString;
                relevanteDatoer: z.ZodArray<z.ZodObject<{
                    dato: z.ZodString;
                    datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
                }, "strip", z.ZodTypeAny, {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }, {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }, {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }>, "many">;
            arbeidsgivere: z.ZodOptional<z.ZodArray<z.ZodObject<{
                organisasjonsnummer: z.ZodString;
                navn: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }, {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            søknadId: string;
            mottattTidspunkt: string;
            innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
            dokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            k9FormatInnsendelse?: {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            } | undefined;
            arbeidsgivere?: {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }[] | undefined;
        }, {
            søknadId: string;
            mottattTidspunkt: string;
            innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
            dokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            k9FormatInnsendelse?: {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            } | undefined;
            arbeidsgivere?: {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }[] | undefined;
        }>, "many">;
        aksjonspunkter: z.ZodArray<z.ZodObject<{
            venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
            tidsfrist: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }, {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }>, "many">;
        utgåendeDokumenter: z.ZodArray<z.ZodObject<{
            journalpostId: z.ZodString;
            dokumentInfoId: z.ZodString;
            saksnummer: z.ZodOptional<z.ZodString>;
            tittel: z.ZodString;
            dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
            filtype: z.ZodString;
            harTilgang: z.ZodBoolean;
            url: z.ZodString;
            relevanteDatoer: z.ZodArray<z.ZodObject<{
                dato: z.ZodString;
                datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
            }, "strip", z.ZodTypeAny, {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }, {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }, {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        opprettetTidspunkt: string;
        innsendelser: {
            søknadId: string;
            mottattTidspunkt: string;
            innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
            dokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            k9FormatInnsendelse?: {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            } | undefined;
            arbeidsgivere?: {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }[] | undefined;
        }[];
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        utgåendeDokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        avsluttetTidspunkt?: string | undefined;
    }, {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        opprettetTidspunkt: string;
        innsendelser: {
            søknadId: string;
            mottattTidspunkt: string;
            innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
            dokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            k9FormatInnsendelse?: {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            } | undefined;
            arbeidsgivere?: {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }[] | undefined;
        }[];
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        utgåendeDokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        avsluttetTidspunkt?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    saksnummer: string;
    utledetStatus: {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        saksbehandlingsFrist?: string | undefined;
    };
    fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
    ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
    behandlinger: {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        opprettetTidspunkt: string;
        innsendelser: {
            søknadId: string;
            mottattTidspunkt: string;
            innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
            dokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            k9FormatInnsendelse?: {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            } | undefined;
            arbeidsgivere?: {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }[] | undefined;
        }[];
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        utgåendeDokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        avsluttetTidspunkt?: string | undefined;
    }[];
    saksbehandlingsFrist?: string | undefined;
}, {
    saksnummer: string;
    utledetStatus: {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        saksbehandlingsFrist?: string | undefined;
    };
    fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
    ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
    behandlinger: {
        status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
        opprettetTidspunkt: string;
        innsendelser: {
            søknadId: string;
            mottattTidspunkt: string;
            innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
            dokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            k9FormatInnsendelse?: {
                søknadId?: string | undefined;
                versjon?: string | undefined;
                mottattDato?: string | undefined;
                søker?: {
                    norskIdentitetsnummer: string;
                } | undefined;
            } | undefined;
            arbeidsgivere?: {
                organisasjonsnummer: string;
                navn?: string | undefined;
            }[] | undefined;
        }[];
        aksjonspunkter: {
            venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
            tidsfrist: string;
        }[];
        utgåendeDokumenter: {
            url: string;
            journalpostId: string;
            dokumentInfoId: string;
            tittel: string;
            filtype: string;
            harTilgang: boolean;
            relevanteDatoer: {
                dato: string;
                datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
            }[];
            saksnummer?: string | undefined;
            dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
        }[];
        avsluttetTidspunkt?: string | undefined;
    }[];
    saksbehandlingsFrist?: string | undefined;
}>;
export declare const zPleietrengendeMedSak: z.ZodObject<{
    pleietrengende: z.ZodObject<{
        identitetsnummer: z.ZodString;
        fødselsdato: z.ZodString;
        aktørId: z.ZodString;
        fornavn: z.ZodOptional<z.ZodString>;
        mellomnavn: z.ZodOptional<z.ZodString>;
        etternavn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    }, {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    }>;
    sak: z.ZodObject<{
        saksnummer: z.ZodString;
        utledetStatus: z.ZodObject<{
            status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
            aksjonspunkter: z.ZodArray<z.ZodObject<{
                venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
                tidsfrist: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }>, "many">;
            saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        }, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        }>;
        saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
        fagsakYtelseType: z.ZodEnum<["DAGPENGER", "FRISINN", "SYKEPENGER", "PLEIEPENGER_SYKT_BARN", "PLEIEPENGER_NÆRSTÅENDE", "OMSORGSPENGER", "OMSORGSPENGER_KS", "OMSORGSPENGER_MA", "OMSORGSPENGER_AO", "OPPLÆRINGSPENGER", "ARBEIDSAVKLARINGSPENGER", "ENGANGSTØNAD", "FORELDREPENGER", "SVANGERSKAPSPENGER", "ENSLIG_FORSØRGER", "OBSOLETE", "UDEFINERT"]>;
        ytelseType: z.ZodEnum<["PSB", "PPN", "OMP_KS", "OMP_MA", "OMP_AO", "OLP"]>;
        behandlinger: z.ZodArray<z.ZodObject<{
            status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
            opprettetTidspunkt: z.ZodString;
            avsluttetTidspunkt: z.ZodOptional<z.ZodString>;
            innsendelser: z.ZodArray<z.ZodObject<{
                søknadId: z.ZodString;
                mottattTidspunkt: z.ZodString;
                innsendelsestype: z.ZodEnum<["SØKNAD", "ETTERSENDELSE", "ENDRINGSMELDING", "UKJENT"]>;
                k9FormatInnsendelse: z.ZodOptional<z.ZodObject<{
                    mottattDato: z.ZodOptional<z.ZodString>;
                    versjon: z.ZodOptional<z.ZodString>;
                    søker: z.ZodOptional<z.ZodObject<{
                        norskIdentitetsnummer: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        norskIdentitetsnummer: string;
                    }, {
                        norskIdentitetsnummer: string;
                    }>>;
                    søknadId: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                }, {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                }>>;
                dokumenter: z.ZodArray<z.ZodObject<{
                    journalpostId: z.ZodString;
                    dokumentInfoId: z.ZodString;
                    saksnummer: z.ZodOptional<z.ZodString>;
                    tittel: z.ZodString;
                    dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
                    filtype: z.ZodString;
                    harTilgang: z.ZodBoolean;
                    url: z.ZodString;
                    relevanteDatoer: z.ZodArray<z.ZodObject<{
                        dato: z.ZodString;
                        datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
                    }, "strip", z.ZodTypeAny, {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }, {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }, {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }>, "many">;
                arbeidsgivere: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    organisasjonsnummer: z.ZodString;
                    navn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }, {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }, {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }>, "many">;
            aksjonspunkter: z.ZodArray<z.ZodObject<{
                venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
                tidsfrist: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }>, "many">;
            utgåendeDokumenter: z.ZodArray<z.ZodObject<{
                journalpostId: z.ZodString;
                dokumentInfoId: z.ZodString;
                saksnummer: z.ZodOptional<z.ZodString>;
                tittel: z.ZodString;
                dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
                filtype: z.ZodString;
                harTilgang: z.ZodBoolean;
                url: z.ZodString;
                relevanteDatoer: z.ZodArray<z.ZodObject<{
                    dato: z.ZodString;
                    datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
                }, "strip", z.ZodTypeAny, {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }, {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }, {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    }, {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    pleietrengende: {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    };
    sak: {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    };
}, {
    pleietrengende: {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    };
    sak: {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    };
}>;
export declare const zSaksbehandlingtidDto: z.ZodObject<{
    saksbehandlingstidUker: z.ZodBigInt;
}, "strip", z.ZodTypeAny, {
    saksbehandlingstidUker: bigint;
}, {
    saksbehandlingstidUker: bigint;
}>;
export declare const zHentSøknaderData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
export declare const zHentSøknaderResponse: z.ZodArray<z.ZodObject<{
    barn: z.ZodObject<{
        fødselsdato: z.ZodString;
        fornavn: z.ZodString;
        mellomnavn: z.ZodOptional<z.ZodString>;
        etternavn: z.ZodString;
        aktørId: z.ZodString;
        identitetsnummer: z.ZodOptional<z.ZodString>;
        adressebeskyttelse$k9_sak_innsyn_api: z.ZodArray<z.ZodObject<{
            gradering: z.ZodEnum<["STRENGT_FORTROLIG_UTLAND", "STRENGT_FORTROLIG", "FORTROLIG", "UGRADERT"]>;
        }, "strip", z.ZodTypeAny, {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }, {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    }, {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    }>;
    søknad: z.ZodObject<{
        søknadId: z.ZodString;
        versjon: z.ZodString;
        mottattDato: z.ZodString;
        søker: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
        }, {
            norskIdentitetsnummer: string;
        }>;
        språk: z.ZodOptional<z.ZodEnum<["nb", "nn"]>>;
        ytelse: z.ZodUnion<[z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerAleneOmsorg">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerAleneOmsorg";
        }, {
            type: "OmsorgspengerAleneOmsorg";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            periode: z.ZodString;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerKroniskSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerKroniskSyktBarn";
        }, {
            type: "OmsorgspengerKroniskSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            kroniskEllerFunksjonshemming: z.ZodBoolean;
            høyereRisikoForFravær: z.ZodOptional<z.ZodBoolean>;
            høyereRisikoForFraværBeskrivelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerMidlertidigAlene">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerMidlertidigAlene";
        }, {
            type: "OmsorgspengerMidlertidigAlene";
        }>>, z.ZodObject<{
            barn: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">;
            annenForelder: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
                situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
                periode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }>;
            begrunnelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerUtbetaling">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerUtbetaling";
        }, {
            type: "OmsorgspengerUtbetaling";
        }>>, z.ZodObject<{
            fosterbarn: z.ZodOptional<z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">>;
            aktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            fraværsperioder: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            fraværsperioderKorrigeringIm: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            bosteder: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            utenlandsopphold: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Opplæringspenger">;
        }, "strip", z.ZodTypeAny, {
            type: "Opplæringspenger";
        }, {
            type: "Opplæringspenger";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            kurs: z.ZodObject<{
                kursholder: z.ZodObject<{
                    navn: z.ZodOptional<z.ZodString>;
                    institusjonsidentifikator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }>;
                kursperioder: z.ZodArray<z.ZodString, "many">;
                reise: z.ZodObject<{
                    reiserUtenforKursdager: z.ZodBoolean;
                    reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleiepengerSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "PleiepengerSyktBarn";
        }, {
            type: "PleiepengerSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            endringsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            annetDataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            infoFraPunsj: z.ZodOptional<z.ZodObject<{
                søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
                inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            beredskap: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            nattevåk: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }>;
            tilsynsordning: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleipengerLivetsSluttfase">;
        }, "strip", z.ZodTypeAny, {
            type: "PleipengerLivetsSluttfase";
        }, {
            type: "PleipengerLivetsSluttfase";
        }>>, z.ZodObject<{
            pleietrengende: z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            lovbestemtFerie: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Ungdomsytelse">;
        }, "strip", z.ZodTypeAny, {
            type: "Ungdomsytelse";
        }, {
            type: "Ungdomsytelse";
        }>>, z.ZodObject<{
            søknadType: z.ZodEnum<["DELTAKELSE_SØKNAD", "RAPPORTERING_SØKNAD"]>;
            søktFraDatoer: z.ZodArray<z.ZodString, "many">;
            inntekter: z.ZodOptional<z.ZodObject<{
                oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
                    arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
                    næringsinntekt: z.ZodOptional<z.ZodNumber>;
                    ytelse: z.ZodOptional<z.ZodNumber>;
                    periode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }>>;
            deltakelseId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }>>]>;
        journalposter: z.ZodOptional<z.ZodArray<z.ZodObject<{
            inneholderInfomasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderInformasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderMedisinskeOpplysninger: z.ZodBoolean;
            journalpostId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }>, "many">>;
        begrunnelseForInnsending: z.ZodOptional<z.ZodObject<{
            tekst: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tekst?: string | undefined;
        }, {
            tekst?: string | undefined;
        }>>;
        kildesystem: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }>;
    søknader: z.ZodOptional<z.ZodArray<z.ZodObject<{
        søknadId: z.ZodString;
        versjon: z.ZodString;
        mottattDato: z.ZodString;
        søker: z.ZodObject<{
            norskIdentitetsnummer: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            norskIdentitetsnummer: string;
        }, {
            norskIdentitetsnummer: string;
        }>;
        språk: z.ZodOptional<z.ZodEnum<["nb", "nn"]>>;
        ytelse: z.ZodUnion<[z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerAleneOmsorg">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerAleneOmsorg";
        }, {
            type: "OmsorgspengerAleneOmsorg";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            periode: z.ZodString;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerKroniskSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerKroniskSyktBarn";
        }, {
            type: "OmsorgspengerKroniskSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            kroniskEllerFunksjonshemming: z.ZodBoolean;
            høyereRisikoForFravær: z.ZodOptional<z.ZodBoolean>;
            høyereRisikoForFraværBeskrivelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerMidlertidigAlene">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerMidlertidigAlene";
        }, {
            type: "OmsorgspengerMidlertidigAlene";
        }>>, z.ZodObject<{
            barn: z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">;
            annenForelder: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                situasjon: z.ZodEnum<["INNLAGT_I_HELSEINSTITUSJON", "UTØVER_VERNEPLIKT", "FENGSEL", "SYKDOM", "ANNET"]>;
                situasjonBeskrivelse: z.ZodOptional<z.ZodString>;
                periode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            }>;
            begrunnelse: z.ZodOptional<z.ZodString>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OmsorgspengerUtbetaling">;
        }, "strip", z.ZodTypeAny, {
            type: "OmsorgspengerUtbetaling";
        }, {
            type: "OmsorgspengerUtbetaling";
        }>>, z.ZodObject<{
            fosterbarn: z.ZodOptional<z.ZodArray<z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>, "many">>;
            aktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            fraværsperioder: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            fraværsperioderKorrigeringIm: z.ZodOptional<z.ZodArray<z.ZodObject<{
                periode: z.ZodString;
                duration: z.ZodOptional<z.ZodString>;
                delvisFravær: z.ZodOptional<z.ZodObject<{
                    normalarbeidstid: z.ZodString;
                    fravær: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    normalarbeidstid: string;
                    fravær: string;
                }, {
                    normalarbeidstid: string;
                    fravær: string;
                }>>;
                årsak: z.ZodEnum<["STENGT_SKOLE_ELLER_BARNEHAGE", "SMITTEVERNHENSYN", "ORDINÆRT_FRAVÆR"]>;
                søknadÅrsak: z.ZodOptional<z.ZodEnum<["ARBEIDSGIVER_KONKURS", "NYOPPSTARTET_HOS_ARBEIDSGIVER", "KONFLIKT_MED_ARBEIDSGIVER"]>>;
                aktivitetFravær: z.ZodArray<z.ZodEnum<["ARBEIDSTAKER", "FRILANSER", "SELVSTENDIG_VIRKSOMHET"]>, "many">;
                organisasjonsnummer: z.ZodOptional<z.ZodString>;
                arbeidsforholdId: z.ZodOptional<z.ZodString>;
                arbeidsgiverOrgNr: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }, {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }>, "many">>;
            bosteder: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            utenlandsopphold: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }, {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Opplæringspenger">;
        }, "strip", z.ZodTypeAny, {
            type: "Opplæringspenger";
        }, {
            type: "Opplæringspenger";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            kurs: z.ZodObject<{
                kursholder: z.ZodObject<{
                    navn: z.ZodOptional<z.ZodString>;
                    institusjonsidentifikator: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }, {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                }>;
                kursperioder: z.ZodArray<z.ZodString, "many">;
                reise: z.ZodObject<{
                    reiserUtenforKursdager: z.ZodBoolean;
                    reisedager: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reisedagerBeskrivelse: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }, {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }, {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleiepengerSyktBarn">;
        }, "strip", z.ZodTypeAny, {
            type: "PleiepengerSyktBarn";
        }, {
            type: "PleiepengerSyktBarn";
        }>>, z.ZodObject<{
            barn: z.ZodObject<{
                norskIdentitetsnummer: z.ZodString;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            endringsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            annetDataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
            infoFraPunsj: z.ZodOptional<z.ZodObject<{
                søknadenInneholderInfomasjonSomIkkeKanPunsjes: z.ZodOptional<z.ZodBoolean>;
                inneholderMedisinskeOpplysninger: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }, {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            beredskap: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            nattevåk: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                perioderSomSkalSlettes: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }, {
                perioder: {};
                perioderSomSkalSlettes: {};
            }>;
            tilsynsordning: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            lovbestemtFerie: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>;
            omsorg: z.ZodObject<{
                relasjonTilBarnet: z.ZodOptional<z.ZodEnum<["MOR", "MEDMOR", "FAR", "FOSTERFORELDER", "ANNET"]>>;
                beskrivelseAvOmsorgsrollen: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }, {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            }>;
            erSammenMedBarnet: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }, {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PleipengerLivetsSluttfase">;
        }, "strip", z.ZodTypeAny, {
            type: "PleipengerLivetsSluttfase";
        }, {
            type: "PleipengerLivetsSluttfase";
        }>>, z.ZodObject<{
            pleietrengende: z.ZodObject<{
                norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                fødselsdato: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }, {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            }>;
            søknadsperiode: z.ZodArray<z.ZodString, "many">;
            trekkKravPerioder: z.ZodArray<z.ZodString, "many">;
            opptjeningAktivitet: z.ZodOptional<z.ZodObject<{
                selvstendigNæringsdrivende: z.ZodArray<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    virksomhetNavn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }, {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }>, "many">;
                frilanser: z.ZodOptional<z.ZodObject<{
                    startdato: z.ZodString;
                    sluttdato: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }, {
                    startdato: string;
                    sluttdato?: string | undefined;
                }>>;
                utenlandskeArbeidsforhold: z.ZodArray<z.ZodObject<{
                    ansettelsePeriode: z.ZodString;
                    land: z.ZodString;
                    arbeidsgiversnavn: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }, {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }>, "many">;
                andreAktiviteter: z.ZodArray<z.ZodObject<{
                    periode: z.ZodString;
                    annenAktivitetType: z.ZodEnum<["MILITÆR_ELLER_SIVILTJENESTE", "-"]>;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }, {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }, {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            }>>;
            bosteder: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            utenlandsopphold: z.ZodObject<{
                perioder: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                perioderSomSkalSlettes: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }, {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            }>;
            arbeidstid: z.ZodObject<{
                arbeidstakerList: z.ZodArray<z.ZodObject<{
                    norskIdentitetsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnummer: z.ZodOptional<z.ZodString>;
                    organisasjonsnavn: z.ZodOptional<z.ZodString>;
                    arbeidstidInfo: z.ZodObject<{
                        perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                    }, "strip", z.ZodTypeAny, {
                        perioder: {};
                    }, {
                        perioder: {};
                    }>;
                }, "strip", z.ZodTypeAny, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }, {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }>, "many">;
                frilanserArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
                selvstendigNæringsdrivendeArbeidstidInfo: z.ZodOptional<z.ZodObject<{
                    perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                }, "strip", z.ZodTypeAny, {
                    perioder: {};
                }, {
                    perioder: {};
                }>>;
            }, "strip", z.ZodTypeAny, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }, {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            }>;
            uttak: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            lovbestemtFerie: z.ZodOptional<z.ZodObject<{
                perioder: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            }, "strip", z.ZodTypeAny, {
                perioder: {};
            }, {
                perioder: {};
            }>>;
            dataBruktTilUtledning: z.ZodOptional<z.ZodObject<{
                harForståttRettigheterOgPlikter: z.ZodBoolean;
                harBekreftetOpplysninger: z.ZodBoolean;
                soknadDialogCommitSha: z.ZodOptional<z.ZodString>;
                annetData: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }, {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }, {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }>>, z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"Ungdomsytelse">;
        }, "strip", z.ZodTypeAny, {
            type: "Ungdomsytelse";
        }, {
            type: "Ungdomsytelse";
        }>>, z.ZodObject<{
            søknadType: z.ZodEnum<["DELTAKELSE_SØKNAD", "RAPPORTERING_SØKNAD"]>;
            søktFraDatoer: z.ZodArray<z.ZodString, "many">;
            inntekter: z.ZodOptional<z.ZodObject<{
                oppgittePeriodeinntekter: z.ZodArray<z.ZodObject<{
                    arbeidstakerOgFrilansInntekt: z.ZodOptional<z.ZodNumber>;
                    næringsinntekt: z.ZodOptional<z.ZodNumber>;
                    ytelse: z.ZodOptional<z.ZodNumber>;
                    periode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }, {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }, {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            }>>;
            deltakelseId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }, {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        }>>]>;
        journalposter: z.ZodOptional<z.ZodArray<z.ZodObject<{
            inneholderInfomasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderInformasjonSomIkkeKanPunsjes: z.ZodBoolean;
            inneholderMedisinskeOpplysninger: z.ZodBoolean;
            journalpostId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }, {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }>, "many">>;
        begrunnelseForInnsending: z.ZodOptional<z.ZodObject<{
            tekst: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tekst?: string | undefined;
        }, {
            tekst?: string | undefined;
        }>>;
        kildesystem: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }, {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    barn: {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    };
    søknad: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    };
    søknader?: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }[] | undefined;
}, {
    barn: {
        fødselsdato: string;
        fornavn: string;
        etternavn: string;
        aktørId: string;
        adressebeskyttelse$k9_sak_innsyn_api: {
            gradering: "STRENGT_FORTROLIG_UTLAND" | "STRENGT_FORTROLIG" | "FORTROLIG" | "UGRADERT";
        }[];
        mellomnavn?: string | undefined;
        identitetsnummer?: string | undefined;
    };
    søknad: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    };
    søknader?: {
        ytelse: ({
            type: string;
        } & {
            type: "OmsorgspengerAleneOmsorg";
        } & {
            periode: string;
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerKroniskSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            kroniskEllerFunksjonshemming: boolean;
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            høyereRisikoForFravær?: boolean | undefined;
            høyereRisikoForFraværBeskrivelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerMidlertidigAlene";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[];
            annenForelder: {
                norskIdentitetsnummer: string;
                situasjon: "INNLAGT_I_HELSEINSTITUSJON" | "UTØVER_VERNEPLIKT" | "FENGSEL" | "SYKDOM" | "ANNET";
                periode?: string | undefined;
                situasjonBeskrivelse?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            begrunnelse?: string | undefined;
        }) | ({
            type: string;
        } & {
            type: "OmsorgspengerUtbetaling";
        } & {
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            fosterbarn?: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            }[] | undefined;
            aktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            fraværsperioder?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            fraværsperioderKorrigeringIm?: {
                periode: string;
                årsak: "STENGT_SKOLE_ELLER_BARNEHAGE" | "SMITTEVERNHENSYN" | "ORDINÆRT_FRAVÆR";
                aktivitetFravær: ("ARBEIDSTAKER" | "FRILANSER" | "SELVSTENDIG_VIRKSOMHET")[];
                organisasjonsnummer?: string | undefined;
                duration?: string | undefined;
                delvisFravær?: {
                    normalarbeidstid: string;
                    fravær: string;
                } | undefined;
                søknadÅrsak?: "ARBEIDSGIVER_KONKURS" | "NYOPPSTARTET_HOS_ARBEIDSGIVER" | "KONFLIKT_MED_ARBEIDSGIVER" | undefined;
                arbeidsforholdId?: string | undefined;
                arbeidsgiverOrgNr?: string | undefined;
            }[] | undefined;
            bosteder?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
            utenlandsopphold?: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Opplæringspenger";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            opptjeningAktivitet: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            };
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            kurs: {
                kursholder: {
                    navn?: string | undefined;
                    institusjonsidentifikator?: string | undefined;
                };
                kursperioder: string[];
                reise: {
                    reiserUtenforKursdager: boolean;
                    reisedager?: string[] | undefined;
                    reisedagerBeskrivelse?: string | undefined;
                };
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleiepengerSyktBarn";
        } & {
            barn: {
                norskIdentitetsnummer: string;
                fødselsdato?: string | undefined;
            };
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            lovbestemtFerie: {
                perioder: {};
            };
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            uttak: {
                perioder: {};
            };
            omsorg: {
                relasjonTilBarnet?: "ANNET" | "MOR" | "MEDMOR" | "FAR" | "FOSTERFORELDER" | undefined;
                beskrivelseAvOmsorgsrollen?: string | undefined;
            };
            endringsperiode: string[];
            beredskap: {
                perioder: {};
                perioderSomSkalSlettes?: {} | undefined;
            };
            nattevåk: {
                perioder: {};
                perioderSomSkalSlettes: {};
            };
            tilsynsordning: {
                perioder: {};
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            annetDataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            infoFraPunsj?: {
                søknadenInneholderInfomasjonSomIkkeKanPunsjes?: boolean | undefined;
                inneholderMedisinskeOpplysninger?: boolean | undefined;
            } | undefined;
            erSammenMedBarnet?: boolean | undefined;
        }) | ({
            type: string;
        } & {
            type: "PleipengerLivetsSluttfase";
        } & {
            bosteder: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            utenlandsopphold: {
                perioder?: {} | undefined;
                perioderSomSkalSlettes?: {} | undefined;
            };
            søknadsperiode: string[];
            trekkKravPerioder: string[];
            arbeidstid: {
                arbeidstakerList: {
                    arbeidstidInfo: {
                        perioder: {};
                    };
                    norskIdentitetsnummer?: string | undefined;
                    organisasjonsnummer?: string | undefined;
                    organisasjonsnavn?: string | undefined;
                }[];
                frilanserArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
                selvstendigNæringsdrivendeArbeidstidInfo?: {
                    perioder: {};
                } | undefined;
            };
            pleietrengende: {
                norskIdentitetsnummer?: string | undefined;
                fødselsdato?: string | undefined;
            };
            dataBruktTilUtledning?: {
                harForståttRettigheterOgPlikter: boolean;
                harBekreftetOpplysninger: boolean;
                soknadDialogCommitSha?: string | undefined;
                annetData?: string | undefined;
            } | undefined;
            opptjeningAktivitet?: {
                selvstendigNæringsdrivende: {
                    perioder: {};
                    organisasjonsnummer?: string | undefined;
                    virksomhetNavn?: string | undefined;
                }[];
                utenlandskeArbeidsforhold: {
                    land: string;
                    ansettelsePeriode: string;
                    arbeidsgiversnavn: string;
                }[];
                andreAktiviteter: {
                    periode: string;
                    annenAktivitetType: "MILITÆR_ELLER_SIVILTJENESTE" | "-";
                }[];
                frilanser?: {
                    startdato: string;
                    sluttdato?: string | undefined;
                } | undefined;
            } | undefined;
            lovbestemtFerie?: {
                perioder: {};
            } | undefined;
            uttak?: {
                perioder: {};
            } | undefined;
        }) | ({
            type: string;
        } & {
            type: "Ungdomsytelse";
        } & {
            søknadType: "DELTAKELSE_SØKNAD" | "RAPPORTERING_SØKNAD";
            søktFraDatoer: string[];
            inntekter?: {
                oppgittePeriodeinntekter: {
                    periode: string;
                    arbeidstakerOgFrilansInntekt?: number | undefined;
                    næringsinntekt?: number | undefined;
                    ytelse?: number | undefined;
                }[];
            } | undefined;
            deltakelseId?: string | undefined;
        });
        søknadId: string;
        versjon: string;
        mottattDato: string;
        søker: {
            norskIdentitetsnummer: string;
        };
        språk?: "nb" | "nn" | undefined;
        journalposter?: {
            inneholderMedisinskeOpplysninger: boolean;
            inneholderInfomasjonSomIkkeKanPunsjes: boolean;
            inneholderInformasjonSomIkkeKanPunsjes: boolean;
            journalpostId: string;
        }[] | undefined;
        begrunnelseForInnsending?: {
            tekst?: string | undefined;
        } | undefined;
        kildesystem?: string | undefined;
    }[] | undefined;
}>, "many">;
export declare const zLastNedArbeidsgivermeldingData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodObject<{
        søknadId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        søknadId: string;
    }, {
        søknadId: string;
    }>;
    query: z.ZodObject<{
        organisasjonsnummer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        organisasjonsnummer: string;
    }, {
        organisasjonsnummer: string;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        organisasjonsnummer: string;
    };
    path: {
        søknadId: string;
    };
    body?: undefined;
}, {
    query: {
        organisasjonsnummer: string;
    };
    path: {
        søknadId: string;
    };
    body?: undefined;
}>;
export declare const zLastNedArbeidsgivermeldingResponse: z.ZodString;
export declare const zHentMineSakerData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
export declare const zHentMineSakerResponse: z.ZodObject<{
    pleietrengende: z.ZodObject<{
        identitetsnummer: z.ZodString;
        fødselsdato: z.ZodString;
        aktørId: z.ZodString;
        fornavn: z.ZodOptional<z.ZodString>;
        mellomnavn: z.ZodOptional<z.ZodString>;
        etternavn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    }, {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    }>;
    sak: z.ZodObject<{
        saksnummer: z.ZodString;
        utledetStatus: z.ZodObject<{
            status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
            aksjonspunkter: z.ZodArray<z.ZodObject<{
                venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
                tidsfrist: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }>, "many">;
            saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        }, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        }>;
        saksbehandlingsFrist: z.ZodOptional<z.ZodString>;
        fagsakYtelseType: z.ZodEnum<["DAGPENGER", "FRISINN", "SYKEPENGER", "PLEIEPENGER_SYKT_BARN", "PLEIEPENGER_NÆRSTÅENDE", "OMSORGSPENGER", "OMSORGSPENGER_KS", "OMSORGSPENGER_MA", "OMSORGSPENGER_AO", "OPPLÆRINGSPENGER", "ARBEIDSAVKLARINGSPENGER", "ENGANGSTØNAD", "FORELDREPENGER", "SVANGERSKAPSPENGER", "ENSLIG_FORSØRGER", "OBSOLETE", "UDEFINERT"]>;
        ytelseType: z.ZodEnum<["PSB", "PPN", "OMP_KS", "OMP_MA", "OMP_AO", "OLP"]>;
        behandlinger: z.ZodArray<z.ZodObject<{
            status: z.ZodEnum<["OPPRETTET", "UNDER_BEHANDLING", "PÅ_VENT", "AVSLUTTET"]>;
            opprettetTidspunkt: z.ZodString;
            avsluttetTidspunkt: z.ZodOptional<z.ZodString>;
            innsendelser: z.ZodArray<z.ZodObject<{
                søknadId: z.ZodString;
                mottattTidspunkt: z.ZodString;
                innsendelsestype: z.ZodEnum<["SØKNAD", "ETTERSENDELSE", "ENDRINGSMELDING", "UKJENT"]>;
                k9FormatInnsendelse: z.ZodOptional<z.ZodObject<{
                    mottattDato: z.ZodOptional<z.ZodString>;
                    versjon: z.ZodOptional<z.ZodString>;
                    søker: z.ZodOptional<z.ZodObject<{
                        norskIdentitetsnummer: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        norskIdentitetsnummer: string;
                    }, {
                        norskIdentitetsnummer: string;
                    }>>;
                    søknadId: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                }, {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                }>>;
                dokumenter: z.ZodArray<z.ZodObject<{
                    journalpostId: z.ZodString;
                    dokumentInfoId: z.ZodString;
                    saksnummer: z.ZodOptional<z.ZodString>;
                    tittel: z.ZodString;
                    dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
                    filtype: z.ZodString;
                    harTilgang: z.ZodBoolean;
                    url: z.ZodString;
                    relevanteDatoer: z.ZodArray<z.ZodObject<{
                        dato: z.ZodString;
                        datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
                    }, "strip", z.ZodTypeAny, {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }, {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }, {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }>, "many">;
                arbeidsgivere: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    organisasjonsnummer: z.ZodString;
                    navn: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }, {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }, {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }>, "many">;
            aksjonspunkter: z.ZodArray<z.ZodObject<{
                venteårsak: z.ZodEnum<["INNTEKTSMELDING", "MEDISINSK_DOKUMENTASJON", "FOR_TIDLIG_SOKNAD", "MELDEKORT"]>;
                tidsfrist: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }, {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }>, "many">;
            utgåendeDokumenter: z.ZodArray<z.ZodObject<{
                journalpostId: z.ZodString;
                dokumentInfoId: z.ZodString;
                saksnummer: z.ZodOptional<z.ZodString>;
                tittel: z.ZodString;
                dokumentType: z.ZodOptional<z.ZodEnum<["PLEIEPENGER_SYKT_BARN_SOKNAD", "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE", "ETTERLYST_INNTEKTSMELDING", "ETTERLYST_INNTEKTSMELDING_PURRING", "VEDTAK_INNVILGELSE", "VEDTAK_AVSLAG", "VEDTAK_FRITEKST", "VEDTAK_ENDRING", "VEDTAK_MANUELT", "VEDTAK_UENDRETUTFALL", "UKJENT"]>>;
                filtype: z.ZodString;
                harTilgang: z.ZodBoolean;
                url: z.ZodString;
                relevanteDatoer: z.ZodArray<z.ZodObject<{
                    dato: z.ZodString;
                    datotype: z.ZodEnum<["DATO_OPPRETTET", "DATO_SENDT_PRINT", "DATO_EKSPEDERT", "DATO_JOURNALFOERT", "DATO_REGISTRERT", "DATO_AVS_RETUR", "DATO_DOKUMENT", "UKJENT"]>;
                }, "strip", z.ZodTypeAny, {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }, {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }, {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }, {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    }, {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    pleietrengende: {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    };
    sak: {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    };
}, {
    pleietrengende: {
        fødselsdato: string;
        aktørId: string;
        identitetsnummer: string;
        fornavn?: string | undefined;
        mellomnavn?: string | undefined;
        etternavn?: string | undefined;
    };
    sak: {
        saksnummer: string;
        utledetStatus: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            saksbehandlingsFrist?: string | undefined;
        };
        fagsakYtelseType: "DAGPENGER" | "FRISINN" | "SYKEPENGER" | "PLEIEPENGER_SYKT_BARN" | "PLEIEPENGER_NÆRSTÅENDE" | "OMSORGSPENGER" | "OMSORGSPENGER_KS" | "OMSORGSPENGER_MA" | "OMSORGSPENGER_AO" | "OPPLÆRINGSPENGER" | "ARBEIDSAVKLARINGSPENGER" | "ENGANGSTØNAD" | "FORELDREPENGER" | "SVANGERSKAPSPENGER" | "ENSLIG_FORSØRGER" | "OBSOLETE" | "UDEFINERT";
        ytelseType: "PSB" | "PPN" | "OMP_KS" | "OMP_MA" | "OMP_AO" | "OLP";
        behandlinger: {
            status: "OPPRETTET" | "UNDER_BEHANDLING" | "PÅ_VENT" | "AVSLUTTET";
            opprettetTidspunkt: string;
            innsendelser: {
                søknadId: string;
                mottattTidspunkt: string;
                innsendelsestype: "UKJENT" | "SØKNAD" | "ETTERSENDELSE" | "ENDRINGSMELDING";
                dokumenter: {
                    url: string;
                    journalpostId: string;
                    dokumentInfoId: string;
                    tittel: string;
                    filtype: string;
                    harTilgang: boolean;
                    relevanteDatoer: {
                        dato: string;
                        datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                    }[];
                    saksnummer?: string | undefined;
                    dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
                }[];
                k9FormatInnsendelse?: {
                    søknadId?: string | undefined;
                    versjon?: string | undefined;
                    mottattDato?: string | undefined;
                    søker?: {
                        norskIdentitetsnummer: string;
                    } | undefined;
                } | undefined;
                arbeidsgivere?: {
                    organisasjonsnummer: string;
                    navn?: string | undefined;
                }[] | undefined;
            }[];
            aksjonspunkter: {
                venteårsak: "INNTEKTSMELDING" | "MEDISINSK_DOKUMENTASJON" | "FOR_TIDLIG_SOKNAD" | "MELDEKORT";
                tidsfrist: string;
            }[];
            utgåendeDokumenter: {
                url: string;
                journalpostId: string;
                dokumentInfoId: string;
                tittel: string;
                filtype: string;
                harTilgang: boolean;
                relevanteDatoer: {
                    dato: string;
                    datotype: "UKJENT" | "DATO_OPPRETTET" | "DATO_SENDT_PRINT" | "DATO_EKSPEDERT" | "DATO_JOURNALFOERT" | "DATO_REGISTRERT" | "DATO_AVS_RETUR" | "DATO_DOKUMENT";
                }[];
                saksnummer?: string | undefined;
                dokumentType?: "PLEIEPENGER_SYKT_BARN_SOKNAD" | "PLEIEPENGER_SYKT_BARN_ETTERSENDELSE" | "ETTERLYST_INNTEKTSMELDING" | "ETTERLYST_INNTEKTSMELDING_PURRING" | "VEDTAK_INNVILGELSE" | "VEDTAK_AVSLAG" | "VEDTAK_FRITEKST" | "VEDTAK_ENDRING" | "VEDTAK_MANUELT" | "VEDTAK_UENDRETUTFALL" | "UKJENT" | undefined;
            }[];
            avsluttetTidspunkt?: string | undefined;
        }[];
        saksbehandlingsFrist?: string | undefined;
    };
}>;
export declare const zHentSaksbehandlingstidData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
export declare const zHentSaksbehandlingstidResponse: z.ZodObject<{
    saksbehandlingstidUker: z.ZodBigInt;
}, "strip", z.ZodTypeAny, {
    saksbehandlingstidUker: bigint;
}, {
    saksbehandlingstidUker: bigint;
}>;
export declare const zHentDokumentData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodObject<{
        journalpostId: z.ZodString;
        dokumentInfoId: z.ZodString;
        variantFormat: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        journalpostId: string;
        dokumentInfoId: string;
        variantFormat: string;
    }, {
        journalpostId: string;
        dokumentInfoId: string;
        variantFormat: string;
    }>;
    query: z.ZodObject<{
        dokumentTittel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        dokumentTittel: string;
    }, {
        dokumentTittel: string;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        dokumentTittel: string;
    };
    path: {
        journalpostId: string;
        dokumentInfoId: string;
        variantFormat: string;
    };
    body?: undefined;
}, {
    query: {
        dokumentTittel: string;
    };
    path: {
        journalpostId: string;
        dokumentInfoId: string;
        variantFormat: string;
    };
    body?: undefined;
}>;
export declare const zHentDokumentResponse: z.ZodString;
//# sourceMappingURL=zod.gen.d.ts.map