import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { parseMaybeDateStringToDate, parseMaybeDateStringToDateEndOfDay } from '../utils/jsonParseUtils';

/* ====================== Inntektsmelding(er) ====================== */

export enum InntektsmeldingStatus {
    I_BRUK = 'I_BRUK',
    ERSTATTET_AV_NYERE = 'ERSTATTET_AV_NYERE',
    IKKE_RELEVANT = 'IKKE_RELEVANT',
    MANGLER_DATO = 'MANGLER_DATO',
}

export const InntektsmeldingSchema = innsyn.zSakInntektsmeldingDto.extend({
    startDatoPermisjon: z.preprocess(parseMaybeDateStringToDate, z.date()),
    mottattDato: z.preprocess(parseMaybeDateStringToDateEndOfDay, z.date()),
    innsendingstidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()),
    status: z.enum(InntektsmeldingStatus),

    endringerRefusjon: z.optional(
        z.array(
            innsyn.zEndringRefusjonDto.extend({
                fom: z.preprocess(parseMaybeDateStringToDate, z.date()),
            }),
        ),
    ),

    graderinger: z.optional(
        z.array(
            innsyn.zGraderingDto.extend({
                periode: innsyn.zPeriodeDto.extend({
                    fom: z.preprocess(parseMaybeDateStringToDate, z.date()),
                    tom: z.preprocess(parseMaybeDateStringToDate, z.date()),
                }),
            }),
        ),
    ),

    naturalYtelser: z.optional(
        z.array(
            innsyn.zNaturalYtelseDto.extend({
                periode: innsyn.zPeriodeDto.extend({
                    fom: z.preprocess(parseMaybeDateStringToDate, z.date()),
                    tom: z.preprocess(parseMaybeDateStringToDate, z.date()),
                }),
            }),
        ),
    ),
});

export type Inntektsmelding = z.infer<typeof InntektsmeldingSchema>;

export const InntektsmeldingerSchema = z.array(InntektsmeldingSchema);

export type Inntektsmeldinger = z.infer<typeof InntektsmeldingerSchema>;
