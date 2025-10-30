import { z } from 'zod';

/* ====================== Hjelpere for dato/tid/number ====================== */

/* ====================== Enums fra PR'en ====================== */

export enum InntektsmeldingStatus {
    I_BRUK = 'I_BRUK',
    ERSTATTET_AV_NYERE = 'ERSTATTET_AV_NYERE',
    IKKE_RELEVANT = 'IKKE_RELEVANT',
    MANGLER_DATO = 'MANGLER_DATO',
}
export const InntektsmeldingStatusSchema = z.enum(InntektsmeldingStatus);

export const InntektsmeldingType = z.enum([
    'ORDINÆR',
    'OMSORGSPENGER_REFUSJON',
    'ARBEIDSGIVERINITIERT_NYANSATT',
    'ARBEIDSGIVERINITIERT_UREGISTRERT',
]);

export const InntektsmeldingInnsendingsårsak = z.enum(['NY', 'ENDRING', 'UDEFINERT']);

export const NaturalYtelseType = z.enum([
    'ELEKTRISK_KOMMUNIKASJON',
    'AKSJER_GRUNNFONDSBEVIS_TIL_UNDERKURS',
    'LOSJI',
    'KOST_DOEGN',
    'BESOEKSREISER_HJEM',
    'KOSTBESPARELSE_HJEM',
    'RENTEFORDEL_LAAN',
    'BIL',
    'KOST_DAGER',
    'BOLIG',
    'FORSIKRINGER',
    'FRI_TRANSPORT',
    'OPSJONER',
    'TILSKUDD_BARNEHAGE',
    'ANNET',
    'BEDRIFTSBARNEHAGE',
    'YRKESBIL_KILOMETER',
    'YRKESBIL_LISTEPRIS',
    'UTENLANDSK_PENSJONSORDNING',
    'UDEFINERT',
]);

export const UtsettelseÅrsak = z.enum([
    'ARBEID',
    'LOVBESTEMT_FERIE',
    'SYKDOM',
    'INSTITUSJONSOPPHOLD_SØKER',
    'INSTITUSJONSOPPHOLD_BARNET',
    'UDEFINERT',
]);

export const FagsakYtelseType = z.enum([
    'PLEIEPENGER_SYKT_BARN',
    'PLEIEPENGER_NÆRSTÅENDE',
    'OMSORGSPENGER_KS',
    'OMSORGSPENGER_MA',
    'OMSORGSPENGER_AO',
    'OPPLÆRINGSPENGER',
]);

/* ====================== Eksterne/ukjente typer ====================== */

const ApiDate = z.date();

const Periode = z.object({
    fraOgMed: ApiDate,
    tilOgMed: ApiDate,
});

/* ====================== Domeneobjekter ====================== */

export const BeløpSchema = z.object({
    verdi: z.number(),
});

export type Beløp = z.infer<typeof BeløpSchema>;

export const JournalpostIdSchema = z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z0-9]+$/, 'Kun bokstaver og tall er tillatt');
export type JournalpostId = z.infer<typeof JournalpostIdSchema>;

export const ArbeidsgiverSchema = z
    .object({
        navn: z.string(),
        arbeidsgiverOrgnr: z
            .string()
            .max(20)
            .regex(/^\d+$/, 'Må bestå av sifre')
            .optional()
            .nullable()
            .transform((v) => (v === null ? undefined : v)),
        arbeidsgiverAktørId: z
            .string()
            .max(20)
            .regex(/^\d+$/, 'Må bestå av sifre')
            .optional()
            .nullable()
            .transform((v) => (v === null ? undefined : v)),
    })
    .refine(
        (v) => Boolean(v.arbeidsgiverOrgnr) !== Boolean(v.arbeidsgiverAktørId),
        "Akkurat ett av 'arbeidsgiverOrgnr' eller 'arbeidsgiverAktørId' må være satt",
    );
export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>;

export const GraderingSchema = z.object({
    periode: Periode,
    arbeidstidProsent: z.number().min(0).max(500),
});
export type Gradering = z.infer<typeof GraderingSchema>;

export const NaturalYtelseSchema = z.object({
    periode: Periode,
    beloepPerMnd: BeløpSchema,
    type: NaturalYtelseType,
});
export type NaturalYtelse = z.infer<typeof NaturalYtelseSchema>;

export const PeriodeAndelSchema = z.object({
    periode: Periode,
    varighetPerDag: z.string().optional().nullable(), // kan være null i JSON, Java-kommentar sier “Hvis null...”
});
export type PeriodeAndel = z.infer<typeof PeriodeAndelSchema>;

export const RefusjonSchema = z.object({
    refusjonsbeløpMnd: BeløpSchema,
    fom: ApiDate,
});
export type Refusjon = z.infer<typeof RefusjonSchema>;

export const UtsettelsePeriodeSchema = z.object({
    periode: Periode,
    årsak: UtsettelseÅrsak,
});
export type UtsettelsePeriode = z.infer<typeof UtsettelsePeriodeSchema>;

/* ====================== Inntektsmelding(er) ====================== */

export const InntektsmeldingSchema = z.object({
    status: InntektsmeldingStatusSchema,
    saksnummer: z.string(),

    graderinger: z.array(GraderingSchema),
    naturalYtelser: z.array(NaturalYtelseSchema),
    utsettelsePerioder: z.array(UtsettelsePeriodeSchema),

    arbeidsgiver: ArbeidsgiverSchema,

    startDatoPermisjon: ApiDate.optional().nullable(),

    oppgittFravær: z.array(PeriodeAndelSchema),

    nærRelasjon: z.boolean(),

    journalpostId: JournalpostIdSchema,
    mottattDato: ApiDate,

    inntektBeløp: BeløpSchema,
    refusjonBeløpPerMnd: BeløpSchema,
    refusjonOpphører: ApiDate,

    innsendingstidspunkt: ApiDate,

    kildesystem: z.string(), // merket required i JSON
    inntektsmeldingType: InntektsmeldingType,

    endringerRefusjon: z.array(RefusjonSchema),

    innsendingsårsak: InntektsmeldingInnsendingsårsak,
    ytelseType: FagsakYtelseType,

    erstattetAv: z.array(JournalpostIdSchema),
});
export type Inntektsmelding = z.infer<typeof InntektsmeldingSchema>;

export const InntektsmeldingerSchema = z.object({
    inntektsmeldinger: z.array(InntektsmeldingSchema),
});
export type Inntektsmeldinger = z.infer<typeof InntektsmeldingerSchema>;
