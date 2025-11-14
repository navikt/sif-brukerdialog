import { innsyn } from '@navikt/k9-sak-innsyn-api';
import { InntektsmeldingStatusDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn/types.gen';
import z from 'zod';

import { parseMaybeDateStringToDate, parseMaybeDateStringToDateEndOfDay } from '../utils/jsonParseUtils';

/* ====================== Inntektsmelding(er) ====================== */

export { InntektsmeldingStatusDto as InntektsmeldingStatus };

export const InntektsmeldingSchema = innsyn.zSakInntektsmeldingDto.extend({
    startDatoPermisjon: z.preprocess(parseMaybeDateStringToDate, z.date()),
    mottattDato: z.preprocess(parseMaybeDateStringToDateEndOfDay, z.date()),
    innsendingstidspunkt: z.preprocess(parseMaybeDateStringToDate, z.date()),
    status: z.enum(InntektsmeldingStatusDto),

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
    refusjonOpphører: z.optional(z.preprocess(parseMaybeDateStringToDate, z.date())),
    utsettelsePerioder: z.optional(
        z.array(
            innsyn.zUtsettelseDto.extend({
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
