import { z } from 'zod';

import { SakInntektsmeldingDtoSchema } from '../server/api-models/SakInntektsmeldingDtoSchema';
import { parseMaybeDateStringToDate } from '../utils/jsonParseUtils';

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

export const GraderingSchema = z.object({
    periode: Periode,
    arbeidstidProsent: z.number().min(0).max(500),
});
export type Gradering = z.infer<typeof GraderingSchema>;

export const NaturalYtelseSchema = z.object({
    periode: Periode,
    beloepPerMnd: z.number(),
    type: NaturalYtelseType,
});
export type NaturalYtelse = z.infer<typeof NaturalYtelseSchema>;

export const PeriodeAndelSchema = z.object({
    periode: Periode,
    varighetPerDag: z.string().optional().nullable(), // kan være null i JSON, Java-kommentar sier “Hvis null...”
});
export type PeriodeAndel = z.infer<typeof PeriodeAndelSchema>;

export const RefusjonSchema = z.object({
    refusjonsbeløpMnd: z.number(),
    fom: ApiDate,
});
export type Refusjon = z.infer<typeof RefusjonSchema>;

export const UtsettelsePeriodeSchema = z.object({
    periode: Periode,
    årsak: UtsettelseÅrsak,
});
export type UtsettelsePeriode = z.infer<typeof UtsettelsePeriodeSchema>;

/* ====================== Inntektsmelding(er) ====================== */

export const InntektsmeldingSchema = SakInntektsmeldingDtoSchema.extend({
    status: InntektsmeldingStatusSchema,
    startDatoPermisjon: z.preprocess(parseMaybeDateStringToDate, z.date()),
    mottattDato: z.preprocess(parseMaybeDateStringToDate, z.date()),
    innsendingstidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()),

    inntektsmeldingType: InntektsmeldingType.optional(),
    graderinger: z.array(GraderingSchema).optional(),
    naturalYtelser: z.array(NaturalYtelseSchema).optional(),
    utsettelsePerioder: z.array(UtsettelsePeriodeSchema).optional(),
    oppgittFravær: z.array(PeriodeAndelSchema).optional(),
    nærRelasjon: z.boolean().optional(),
    refusjonBeløpPerMnd: z.number().optional(),
    refusjonOpphører: ApiDate.optional(),
    endringerRefusjon: z.array(RefusjonSchema).optional(),
    innsendingsårsak: InntektsmeldingInnsendingsårsak.optional(),
    ytelseType: FagsakYtelseType.optional(),
});
export type Inntektsmelding = z.infer<typeof InntektsmeldingSchema>;

export const InntektsmeldingerSchema = z.array(InntektsmeldingSchema);

export type Inntektsmeldinger = z.infer<typeof InntektsmeldingerSchema>;
